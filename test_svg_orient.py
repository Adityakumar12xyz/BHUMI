import json

with open('india_states_official.geojson', 'r', encoding='utf-8') as f:
    data = json.load(f)

# The coordinates in highcharts geojson are scaled integers.
# Let's inspect coordinates for Jammu and Kashmir and Tamil Nadu to see orientation
min_x, max_x = float('inf'), float('-inf')
min_y, max_y = float('inf'), float('-inf')

for feat in data['features']:
    geom = feat['geometry']
    def get_pts(coords):
        if len(coords) == 2 and isinstance(coords[0], (int, float)):
            yield coords
        else:
            for c in coords:
                yield from get_pts(c)
    pts = list(get_pts(geom['coordinates']))
    xs = [p[0] for p in pts]
    ys = [p[1] for p in pts]
    min_x = min(min_x, min(xs))
    max_x = max(max_x, max(xs))
    min_y = min(min_y, min(ys))
    max_y = max(max_y, max(ys))

print(f"Overall bounds: X [{min_x}, {max_x}], Y [{min_y}, {max_y}]")

for feat in data['features']:
    name = feat['properties']['name']
    if name in ['Jammu and Kashmir', 'Tamil Nadu', 'Gujarat', 'Arunanchal Pradesh']:
        pts = list(get_pts(feat['geometry']['coordinates']))
        avg_x = sum(p[0] for p in pts)/len(pts)
        avg_y = sum(p[1] for p in pts)/len(pts)
        print(f"State: {name:20s} avg_x: {avg_x:.1f}, avg_y: {avg_y:.1f}")
