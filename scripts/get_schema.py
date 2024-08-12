import psycopg2
from tabulate import tabulate
import json


def get_schema(dbname, user, password, host, port):
    try:
        # Connect to the PostgreSQL database
        connection = psycopg2.connect(
            dbname=dbname,
            user=user,
            password=password,
            host=host,
            port=port
        )
        cursor = connection.cursor()

        # Execute the query to get schema information
        cursor.execute("""
            SELECT table_schema, table_name
            FROM information_schema.tables
            WHERE table_type = 'BASE TABLE' AND table_schema NOT IN ('information_schema', 'pg_catalog');
        """)

        # Fetch all results
        tables = cursor.fetchall()

        # Print the schema information in table format
        # print(tabulate(tables, headers=["Schema", "Table"], tablefmt="pretty"))

        # Execute the query to get foreign key relationships
        # cursor.execute("""
        #     SELECT
        #         tc.table_schema,
        #         tc.table_name,
        #         kcu.column_name,
        #         ccu.table_schema AS foreign_table_schema,
        #         ccu.table_name AS foreign_table_name,
        #         ccu.column_name AS foreign_column_name
        #     FROM
        #         information_schema.table_constraints AS tc
        #         JOIN information_schema.key_column_usage AS kcu
        #           ON tc.constraint_name = kcu.constraint_name
        #           AND tc.table_schema = kcu.table_schema
        #         JOIN information_schema.constraint_column_usage AS ccu
        #           ON ccu.constraint_name = tc.constraint_name
        #           AND ccu.table_schema = tc.table_schema
        #     WHERE tc.constraint_type = 'FOREIGN KEY';
        # """)

        # relationships = cursor.fetchall()

        # relationships_dict = {}
        # for rel in relationships:
        #     key = (rel[0], rel[1])  # (table_schema, table_name)
        #     if key not in relationships_dict:
        #         relationships_dict[key] = []
        #     relationships_dict[key].append(rel)

        # Print the foreign key relationships in table format under each table
        for table in tables:
            print(table[1])
            cursor.execute(f"""
                SELECT column_name, data_type
                FROM information_schema.columns
                WHERE table_schema = '{table[0]}' AND table_name = '{table[1]}';
            """)

            # Fetch all results
            columns = cursor.fetchall()
            # print(columns)
            table_fields = {
                "table": table[1],
                "fields": [{"key": column[0], "type": column[1]} for column in columns]
            }
            print(table_fields)
            # if (table[0], table[1]) in relationships_dict:
            #     print("\nRelations:")
            #     print(tabulate(relationships_dict[(table[0], table[1])], headers=["Table Schema", "Table Name", "Column Name", "Foreign Table Schema", "Foreign Table Name", "Foreign Column Name"], tablefmt="pretty"))
            # else:

            #     cursor.execute(f"""
            #         SELECT
            #             tc.table_name
            #         FROM
            #             information_schema.table_constraints AS tc
            #             JOIN information_schema.key_column_usage AS kcu
            #               ON tc.constraint_name = kcu.constraint_name
            #               AND tc.table_schema = kcu.table_schema
            #             JOIN information_schema.constraint_column_usage AS ccu
            #               ON ccu.constraint_name = tc.constraint_name
            #               AND ccu.table_schema = tc.table_schema
            #         WHERE tc.constraint_type = 'FOREIGN KEY'
            #         AND (kcu.table_schema = '{table[0]}' AND kcu.table_name = '{table[1]}')
            #         OR (ccu.table_schema = '{table[0]}' AND ccu.table_name = '{table[1]}')
            #         AND NOT (kcu.table_schema = '{table[0]}' AND kcu.table_name = '{table[1]}' AND ccu.table_schema = '{table[0]}' AND ccu.table_name = '{table[1]}');
            #     """)
            #     potential_relationships = cursor.fetchall()
            #     if potential_relationships:
            #         print("\nRelations:")
            #         print(tabulate(potential_relationships, headers=["Table Name"], tablefmt="pretty"))
            #     else:
            #         print("No potential foreign key relationships found")

            # # Execute the query to get columns and their types for the current table
            # cursor.execute(f"""
            #     SELECT column_name, data_type
            #     FROM information_schema.columns
            #     WHERE table_schema = '{table[0]}' AND table_name = '{table[1]}';
            # """)

            # # Fetch all results
            # columns = cursor.fetchall()

            # # Print the columns and their types in table format
            # print("\nColumns:")
            # print(tabulate(columns, headers=["Column Name", "Data Type"], tablefmt="pretty"))

    except Exception as error:
        print(f"Error: {error}")

    finally:
        if connection:
            cursor.close()
            connection.close()


# Example usage
get_schema('db_awk', 'postgres', 'postgres', 'localhost', '5432')
