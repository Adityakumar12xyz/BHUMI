# -*- coding: utf-8 -*-
with open('bhumi_app_part2.js', 'r', encoding='utf-8') as f:
    js = f.read()

stack = []
in_str = None
escape = False
for i, ch in enumerate(js):
    if escape:
        escape = False
        continue
    if ch == '\\':
        escape = True
        continue
    if in_str:
        if ch == in_str:
            in_str = None
        continue
    if ch in ('"', "'", '`'):
        in_str = ch
        continue
    if ch in '({[':
        stack.append((ch, i))
    elif ch in ')}]':
        if not stack:
            print(f'Unmatched closing {ch} at char {i}')
            break
        opener, pos = stack.pop()
        pairs = {')': '(', '}': '{', ']': '['}
        if opener != pairs[ch]:
            print(f'Mismatched {opener} and {ch} at {pos} and {i}')
            break
else:
    if stack:
        print('Unclosed brackets remaining:', stack[:5])
    else:
        print('All brackets, braces and parentheses in bhumi_app_part2.js are perfectly balanced!')
