import json


# 기존 유저 목록에 출석 상태 추가 후 반환
def do():
    with open('/home/ubuntu/Algorus-Check-Attendance/data/members.json', 'r', encoding='utf-8') as f:
        users = json.load(f)
    f.close()
    for elem in users:
        elem['atnd'] = False
    return users
