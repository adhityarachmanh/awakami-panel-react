import os
import subprocess
import sys
import shutil


def to_pascal_case(snake_str):
    components = snake_str.split('_')
    return ''.join(x.title() for x in components)

def replace_template_variables(base_template_path, new_template_path, feature_name, pascal_case_feature_name):
    shutil.copy(base_template_path, new_template_path)

    # Read the content of the template file
    with open(new_template_path, 'r') as file:
        content = file.read()

    # Replace %example% with feature_name.lower()
    content = content.replace('%example%', feature_name.lower())
    content = content.replace('%Example%', pascal_case_feature_name)

    # Write the modified content back to the file
    with open(new_template_path, 'w') as file:
        file.write(content)

def generate_feature(feature_name, pascal_case_feature_name, feature_path):
    print(f"Creating new feature '{feature_name}'...")
    # Create the feature directory if it doesn't exist
    os.makedirs(feature_path, exist_ok=True)

    # Step 1: Generate html
    base_template_path = "templates/html.txt"
    new_template_path = f"{feature_path}/{feature_name.lower()}.component.html"
    replace_template_variables(base_template_path, new_template_path, feature_name, pascal_case_feature_name)

    # Step 2: Generate component
    base_template_path = "templates/component.txt"
    new_template_path = f"{feature_path}/{feature_name.lower()}.component.ts"
    replace_template_variables(base_template_path, new_template_path, feature_name, pascal_case_feature_name)

    # Step 3: Generate service
    base_template_path = "templates/service.txt"
    new_template_path = f"{feature_path}/{feature_name.lower()}.service.ts"
    replace_template_variables(base_template_path, new_template_path, feature_name, pascal_case_feature_name)

    # Step 4: Generate styles
    base_template_path = "templates/scss.txt"
    new_template_path = f"{feature_path}/{feature_name.lower()}.component.scss"
    replace_template_variables(base_template_path, new_template_path, feature_name, pascal_case_feature_name)

    # Step 5: Update the routes file
    update_routes_file(feature_name, pascal_case_feature_name)

    # Step 6: Update the app_menu file
    update_app_menu_file(feature_name, pascal_case_feature_name)

    print("Component and service generated, route registered, and menu updated successfully.")

def update_routes_file(feature_name, pascal_case_feature_name):
    routes_file_path = "src/app/app.routes.ts"
    new_import = f"import {{ {pascal_case_feature_name}Component }} from './modules/portal/{feature_name.lower()}/{feature_name.lower()}.component';\n"
    new_route = f"""
    {{
        path: '{feature_name.lower()}',
        component: {pascal_case_feature_name}Component,
    }},
    """

    with open(routes_file_path, 'r') as file:
        lines = file.readlines()

    # Check if the route is already registered
    route_exists = any(f"path: '{feature_name.lower()}'" in line for line in lines)
    import_exists = any(f"{pascal_case_feature_name}Component" in line for line in lines)

    if not route_exists and not import_exists:
        # Insert the new import statement
        for i in range(len(lines)):
            if lines[i].startswith("import") and f"{pascal_case_feature_name}Component" not in lines[i]:
                lines.insert(i + 1, new_import)
                break

        # Insert the new route at the end of the children array within the portal section
        for i in range(len(lines)):
            if "path: 'portal'," in lines[i]:
                for j in range(i, len(lines)):
                    if "children: [" in lines[j]:
                        for k in range(j, len(lines)):
                            if "]," in lines[k]:
                                lines.insert(k, new_route)
                                break
                        break
                break

        with open(routes_file_path, 'w') as file:
            file.writelines(lines)
        print(f"Route for '{feature_name}' has been added to app.routes.ts")
    else:
        print(f"Route for '{feature_name}' already exists in app.routes.ts. Skipping route registration.")

def update_app_menu_file(feature_name, pascal_case_feature_name):
    app_menu_file_path = "src/app/constants/app_menu.ts"
    new_menu_item = f"""
    {{
        id: '{feature_name.lower()}',
        label: '{pascal_case_feature_name}',
        routerLink: '/portal/{feature_name.lower()}',
        iconClass: 'pi pi-file',
    }},
    """

    with open(app_menu_file_path, 'r') as file:
        menu_lines = file.readlines()

    # Check if the menu item already exists
    menu_exists = any(f"id: '{feature_name.lower()}'" in line for line in menu_lines)

    if not menu_exists:
        # Insert the new menu item
        for i in range(len(menu_lines)):
            if "export const appMenus: MenuItem[] = [" in menu_lines[i]:
                for j in range(i, len(menu_lines)):
                    if "];" in menu_lines[j]:
                        menu_lines.insert(j, new_menu_item)
                        break
                break

        with open(app_menu_file_path, 'w') as file:
            file.writelines(menu_lines)
        print(f"Menu item for '{feature_name}' has been added to app_menu.ts")
    else:
        print(f"Menu item for '{feature_name}' already exists in app_menu.ts. Skipping menu registration.")


def main():
    if len(sys.argv) < 2:
        print("Usage: python generate.py <FeatureName>")
        sys.exit(1)

    feature_name = sys.argv[1]
    pascal_case_feature_name = to_pascal_case(feature_name)
    feature_path = f"src/app/modules/portal/{feature_name.lower()}"

    # Check if the feature already exists
    if os.path.exists(feature_path):
        print(f"Feature '{feature_name}' already exists at {feature_path}")
        user_input = input("Do you want to overwrite it? (y/n): ").lower()
        if user_input != 'y':
            print("Operation cancelled.")
            sys.exit(0)
        else:
            generate_feature(feature_name, pascal_case_feature_name, feature_path)
    else:
        generate_feature(feature_name, pascal_case_feature_name, feature_path)
        


def run_command(command):
    process = subprocess.Popen(
        command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    for line in process.stdout:
        print(line.decode(), end='')
    process.wait()


if __name__ == "__main__":
    main()
