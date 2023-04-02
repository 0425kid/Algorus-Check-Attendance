import json
from datetime import datetime
from datetime import timedelta


def add_days(source, cnt):
    return source + timedelta(days=cnt)


def do():
    with open('date.json', 'r', encoding='utf-8') as f:
        try:
            jf = json.load(f)
        except json.decoder.JSONDecodeError:
            jf = []
    f.close()

    with open('date.json', 'w', encoding='utf-8') as f:
        temp = []
        for elem in jf:
            temp.append(tuple(elem))
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
