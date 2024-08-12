import requests
import sys
import random
import string


def generate_random_string(length=8):
    letters = string.ascii_letters
    return ''.join(random.choice(letters) for i in range(length))


def create_user(bearer_token, count):
    url = "http://localhost:8300/api/v1/user/create"
    headers = {
        "Authorization": f"Bearer {bearer_token}",
        "Content-Type": "application/json"
    }

    for _ in range(count):
        data = {
            "name": generate_random_string(),
            "email": f"{generate_random_string()}@example.com",
            "password": generate_random_string()
        }

        response = requests.post(url, headers=headers, json=data)

        if response.status_code == 200:
            print("User created successfully")
        else:
            print(
                f"Failed to create user: {response.status_code} - {response.text}")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python genDummy.py <bearer_token> <count>")
        sys.exit(1)

    bearer_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkFkaGl0eWEgUmFjaG1hbiBIIiwiVXNlcklkIjoiMSIsIkNyZWF0ZWREYXRlIjoiMjAyNC0wOC0wOFQwODoyNzozMy42NzI5OTAwIiwiZW1haWwiOiJhZG1pbkBlbWFpbC5jb20iLCJuYmYiOjE3MjM0NTU1NDUsImV4cCI6MTcyNDA2MDM0NSwiaWF0IjoxNzIzNDU1NTQ1LCJpc3MiOiJIZGN1QVBJUHJvamVjdCIsImF1ZCI6IkhkY3VXZWJDbGllbnQifQ.lBr_uTmnnYYu6sYtSnWWOrBT9pG7xWlyCZDIsXBZLaE"
    count = int(sys.argv[1])
    create_user(bearer_token, count)
