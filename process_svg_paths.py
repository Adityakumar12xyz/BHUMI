import json
import re

with open('test_india.svg', 'r', encoding='utf-8') as f:
    svg_text = f.read()

# Let's map state keys to official state codes
CODE_MAP = {
    'jammu and kashmir': 'JK',
    'himachal pradesh': 'HP',
    'punjab': 'PB',
    'chandigarh': 'CH',
    'uttarakhand': 'UK',
    'haryana': 'HR',
    'nct of delhi': 'DL',
    'rajasthan': 'RJ',
    'uttar pradesh': 'UP',
    'bihar': 'BR',
    'sikkim': 'SK',
    'arunanchal pradesh': 'AR',
    'nagaland': 'NL',
    'manipur': 'MN',
    'mizoram': 'MZ',
    'tripura': 'TR',
    'meghalaya': 'ML',
    'assam': 'AS',
    'west bengal': 'WB',
    'jharkhand': 'JH',
    'odisha': 'OD',
    'chhattisgarh': 'CG',
    'madhya pradesh': 'MP',
    'gujarat': 'GJ',
    'daman and diu': 'DD',
    'dadara and nagar havelli': 'DN',
    'maharashtra': 'MH',
    'telangana': 'TG',
    'andhra pradesh': 'AP',
    'karnataka': 'KA',
    'goa': 'GA',
    'lakshadweep': 'LD',
    'kerala': 'KL',
    'tamil nadu': 'TN',
    'puducherry': 'PY',
    'andaman and nicobar': 'AN'
}

# Let's extract paths and calculate centroid of each
paths = re.findall(r'<path[^>]*id="([^"]+)"[^>]*data-name="([^"]+)"[^>]*d="([^"]+)"', svg_text)
print(f"Total paths extracted: {len(paths)}")

state_data = {}
for p_id, p_name, p_d in paths:
    code = CODE_MAP.get(p_id, p_id[:2].upper())
    # find all numbers in d
    coords = [float(x) for x in re.findall(r'[-+]?\d*\.?\d+', p_d)]
    xs = coords[0::2]
    ys = coords[1::2]
    if xs and ys:
        cx = sum(xs) / len(xs)
        cy = sum(ys) / len(ys)
        state_data[code] = {
            'id': p_id,
            'name': p_name,
            'code': code,
            'cx': round(cx, 1),
            'cy': round(cy, 1),
            'd': p_d
        }
        print(f"{code:4s}: {p_name:25s} center=({cx:.1f}, {cy:.1f})")

with open('state_paths.json', 'w', encoding='utf-8') as out:
    json.dump(state_data, out)

print("Saved state_paths.json successfully!")
