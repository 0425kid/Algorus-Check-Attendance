import json
import os


# 기존 유저 목록에 출석 상태 추가 후 반환
def do():
    with open(os.path.join(*os.getcwd().split(os.path.sep)[0:-1], 'data', 'members.json'), 'r', encoding='utf-8') as f:
        users = json.load(f)
    f.close()
    for elem in users:
        elem['atnd'] = False
    return users
