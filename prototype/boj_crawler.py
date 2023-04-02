import requests
from bs4 import BeautifulSoup as bS
import make_users
import json
import re
from datetime import datetime

headers = {'User-Agent': 'Mozilla/5.0'}
with open('problems.json', 'r', encoding='utf-8') as f:
    problems = json.load(f)
f.close()
with open('date.json', 'r', encoding='utf-8') as f:
    ls = json.load(f)
f.close()
dead_line = datetime(*ls[-1])


def do():
    print(f'{len(ls)}주차 출석체크 시작')
    users = make_users.do()
    for user in users:
        cnt = 0
        for problem in problems[len(ls) - 1]:
            url = f'https://www.acmicpc.net/status?from_mine=1&problem_id={problem}&user_id={user["b_id"]}'
            html = requests.get(url, headers=headers)
            soup = bS(html.text, 'html.parser')
            p_list = soup.select('#status-table > tbody > tr')
            for elem in p_list:
                date = elem.select_one('td:nth-last-child(1) > a').get('title')
                d = datetime(*list(map(int, re.split(re.compile('[-: ]'), date))))
                if elem.select_one('.result-ac') and d < dead_line:
                    cnt += 1
                    break
        if cnt == len(problems):
            user['atnd'] = True
    with open(f'check{len(ls)}.json', 'w', encoding='utf-8') as chk:
        json.dump(users, chk, ensure_ascii=False, indent='\t')
    chk.close()


if __name__ == '__main__':
    do()
