import json
from datetime import datetime
from datetime import timedelta


# 날짜 덧셈
def add_days(source, cnt):
    return source + timedelta(days=cnt)


def do():
    with open('/home/ubuntu/Algorus-Check-Attendance/prototype/date.json', 'r', encoding='utf-8') as f:
        # json 파일이 비어 있으면 error
        try:
            jf = json.load(f)
        except json.decoder.JSONDecodeError:
            jf = []
    f.close()

    with open('/home/ubuntu/Algorus-Check-Attendance/prototype/date.json', 'w', encoding='utf-8') as f:
        temp = []
        for elem in jf:
            temp.append(tuple(elem))
        # 날짜의 중복을 막기 위한 코드
        # set 안에 list 불가 -> tuple 형태로 저장
        data = set(temp)
        ls = list(map(int, str(add_days(datetime.today(), - datetime.today().weekday()).date()).split('-')))
        ls.append(12)
        data.add(tuple(ls))
        data = sorted(list(data))
        json.dump(data, f, ensure_ascii=False)
    f.close()


# 개별 실행용
if __name__ == '__main__':
    do()
