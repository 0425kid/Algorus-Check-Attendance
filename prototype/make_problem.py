import json

with open('problems.json', 'r', encoding='utf-8') as f:
    jf = json.load(f)
f.close()

with open('problems.json', 'w', encoding='utf-8') as f:
    jf = list(jf)
    ls = list(map(int, input('Enter the list of problems in a row.\n').split()))
    jf.append(ls)
    json.dump(jf, f, ensure_ascii=False)
f.close()
