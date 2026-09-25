import urllib.request
import re

urls = [
    'https://raw.githubusercontent.com/Anuj-Raghuvanshi/India-Map-SVG/master/india.svg',
    'https://raw.githubusercontent.com/ajitsen/India-map-svg/master/india-map.svg',
    'https://raw.githubusercontent.com/deekayen/svg-country-maps/master/svg/in.svg',
    'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/svg/india.svg',
    'https://upload.wikimedia.org/wikipedia/commons/1/18/India_states_and_union_territories_map.svg'
]

for url in urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=5) as res:
            data = res.read().decode('utf-8', errors='ignore')
            print(url, "SUCCESS len:", len(data))
            # check for state abbreviations like IN-MH, IN-UP, or UP, MH, etc.
            matches = re.findall(r'id="([A-Z]{2}|IN-[A-Z]{2})"', data)
            print("  State code matches:", matches[:10])
            with open("india_states_named.svg", "w", encoding="utf-8") as out:
                out.write(data)
            break
    except Exception as e:
        print(url, "failed:", e)
