import json
import os
from pathlib import Path
from os import path

# p = str(Path(os.getcwd()).parent)
#
# with open(path.join(p, 'data/members.json'), 'r', encoding='utf-8') as a:
#     user_data = json.load(a)
# a.close()
#
# for elem in user_data:
#     elem['status'] = []
#     elem['cnt'] = 0
#
# for i in range(1, 9):
#     with open(f'check{i}.json', 'r', encoding='utf-8') as f:
#         fd = json.load(f)
#         for j in range(len(fd)):
#             if fd[j]['atnd']:
#                 user_data[j]['status'].append(1)
#                 user_data[j]['cnt'] += 1
#             else:
#                 user_data[j]['status'].append(0)
#     f.close()
#
# with open('attendance_result.json', 'w', encoding='utf-8') as res:
#     json.dump(user_data, res, ensure_ascii=False, indent='\t')
# res.close()

cnt6 = 0
cnt7 = 0
cnt8 = 0

with open('attendance_result.json', 'r', encoding='utf-8') as res:
    ls = json.load(res)
res.close()

for e in ls:
    if e['cnt'] == 6:
        cnt6 += 1
        print(e['name'], e['cnt'])
    if e['cnt'] == 7:
        cnt7 += 1
        print(e['name'], e['cnt'])
    if e['cnt'] == 8:
        cnt8 += 1
        print(e['name'], e['cnt'])

print(cnt6, cnt7, cnt8)
