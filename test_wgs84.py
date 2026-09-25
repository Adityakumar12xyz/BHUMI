import urllib.request
import json

urls = [
    'https://raw.githubusercontent.com/Subhash9325/GeoJson-Data-of-Indian-States/master/Indian_States',
    'https://cdn.jsdelivr.net/gh/Subhash9325/GeoJson-Data-of-Indian-States@master/Indian_States',
    'https://cdn.jsdelivr.net/gh/geohacker/india@master/state/india_telengana.geojson',
    'https://cdn.jsdelivr.net/gh/gadm/gadm-geojson@master/IND/gadm41_IND_1.json',
    'https://cdn.jsdelivr.net/npm/india-states-geojson@1.0.0/india_states.geojson'
]

for u in urls:
    try:
        req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10) as res:
            d = json.loads(res.read())
            print(u, 'SUCCESS! len:', len(d.get('features', [])))
            # check coords of first feature
            geom = d['features'][0]['geometry']
            c = geom['coordinates']
            while isinstance(c[0], list):
                c = c[0]
            print('Sample point (lon, lat):', c[:2])
            with open('india_states_wgs84.geojson', 'w', encoding='utf-8') as out:
                json.dump(d, out)
            print('Saved to india_states_wgs84.geojson')
            break
    except Exception as e:
        print(u, 'FAILED:', e)
