import json

with open('problems.json', 'w', encoding='utf-8') as f:
    ls = list(map(int, input('Enter the list of problems in a row.\n').split()))
    json.dump(ls, f, ensure_ascii=False)
f.close()
