import json


def do():
    with open('../data/members.json', 'r', encoding='utf-8') as f:
        users = json.load(f)
    f.close()
    for elem in users:
        elem['Attendance'] = False
    return users
