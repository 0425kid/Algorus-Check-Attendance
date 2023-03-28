import json
from datetime import datetime


def do():
    with open('date.json', 'w', encoding='utf-8') as f:
        ls = list(map(int, str(datetime.today().date()).split('-')))
        ls.append(12)
        json.dump(ls, f, ensure_ascii=False)
    f.close()
