import urllib.request
import json
import time

url = 'https://code.highcharts.com/mapdata/countries/in/custom/in-all-disputed.geo.json'
print("Connecting to", url)
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})

with urllib.request.urlopen(req, timeout=30) as res:
    data = res.read()
    print("Received bytes:", len(data))
    with open("india_states_official.geojson", "wb") as f:
        f.write(data)
    print("Successfully saved to india_states_official.geojson!")
