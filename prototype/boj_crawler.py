import requests
from bs4 import BeautifulSoup as bS
import make_users
import json
import re
from datetime import datetime
import threading
from enum import Enum
import time


def print_vane():
    symbols = Enum('e', '| / - \\')
    print(f'running  ', end='')
    while True:
        for elem in symbols:
            print(f'\b{elem.name}', end='')
            time.sleep(0.5)


def do():
    vane_thread = threading.Thread(target=print_vane)
    vane_thread.daemon = True
    vane_thread.start()

    # 봇 탐지 방지 헤더 코드
    headers = {'User-Agent': 'Mozilla/5.0'}

    # 전체 주차 문제 리스트 불러 오기
    with open('/home/ubuntu/Algorus-Check-Attendance/prototype/problems.json', 'r', encoding='utf-8') as f:
        problems = json.load(f)
    f.close()

    # 최신 날짜 불러 오기
    with open('/home/ubuntu/Algorus-Check-Attendance/prototype/date.json', 'r', encoding='utf-8') as f:
        ls = json.load(f)
    f.close()
    dead_line = datetime(*ls[-1])
    # 해당 코드 참조
    users = make_users.do()
    for user in users:
        cnt = 0  # 푼 문제 개수
        # 전체 주차 문제 목록의 최신 주차 문제 목록
        for problem in problems[len(ls) - 1]:
            url = f'https://www.acmicpc.net/status?from_mine=1&problem_id={problem}&user_id={user["b_id"]}'
            html = requests.get(url, headers=headers)
            soup = bS(html.text, 'html.parser')
            p_list = soup.select('#status-table > tbody > tr')
            for elem in p_list:
                date = elem.select_one('td:nth-last-child(1) > a').get('title')
                d = datetime(*list(map(int, re.split(re.compile('[-: ]'), date))))
                # 맞은 문제 and 기한 내에 해결 했는지 판단
                if elem.select_one('.result-ac') and d < dead_line:
                    cnt += 1
                    # 한 문제를 여러번 푼 것으로
                    # 여러 문제를 해결 했다고 판단 방지 및 최적화
                    break
        # 주차별 문제 개수와 푼 문제 수가 동일한 지 판단 후 출석 처리
        if cnt == len(problems[len(ls) - 1]):
            user['atnd'] = True
    with open(f'/home/ubuntu/Algorus-Check-Attendance/prototype/check{len(ls)}.json', 'w', encoding='utf-8') as chk:
        json.dump(users, chk, ensure_ascii=False, indent='\t')
    chk.close()


# 개별 실행용
if __name__ == '__main__':
    do()
