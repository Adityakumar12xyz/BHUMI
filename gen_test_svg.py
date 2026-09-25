import json

with open('india_states_official.geojson', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Find true non-outlier bounds
# Let's inspect all coordinates
all_x = []
all_y = []

for feat in data['features']:
    geom = feat['geometry']
    def collect(coords):
        if len(coords) == 2 and isinstance(coords[0], (int, float)):
            if coords[0] > -500 and coords[1] > -500: # filter dummy -999 if any
                all_x.append(coords[0])
                all_y.append(coords[1])
        else:
            for c in coords:
                collect(c)
    collect(geom['coordinates'])

min_x, max_x = min(all_x), max(all_x)
min_y, max_y = min(all_y), max(all_y)

print(f"Filtered bounds: X [{min_x}, {max_x}], Y [{min_y}, {max_y}]")
width = max_x - min_x + 200
height = max_y - min_y + 200

# Generate SVG
svg_parts = [
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" style="background:#111;">',
    '<style>.state{fill:#234;stroke:#678;stroke-width:2}.state:hover{fill:#4a8;cursor:pointer}</style>'
]

for feat in data['features']:
    name = feat['properties']['name']
    hc_key = feat['properties'].get('hc-key', '')
    geom = feat['geometry']
    g_type = geom['type']
    coords = geom['coordinates']
    
    path_d = []
    
    def ring_to_d(ring):
        cmds = []
        for i, pt in enumerate(ring):
            if pt[0] < -500 or pt[1] < -500:
                continue
            x = pt[0] - min_x + 100
            y = max_y - pt[1] + 100 # invert Y for SVG
            if i == 0 or len(cmds) == 0:
                cmds.append(f"M {x:.1f} {y:.1f}")
            else:
                cmds.append(f"L {x:.1f} {y:.1f}")
        if cmds:
            cmds.append("Z")
        return " ".join(cmds)

    if g_type == 'Polygon':
        for ring in coords:
            d = ring_to_d(ring)
            if d: path_d.append(d)
    elif g_type == 'MultiPolygon':
        for poly in coords:
            for ring in poly:
                d = ring_to_d(ring)
                if d: path_d.append(d)
                
    d_attr = " ".join(path_d)
    svg_parts.append(f'<path class="state" id="{hc_key}" data-name="{name}" d="{d_attr}"><title>{name}</title></path>')

svg_parts.append('</svg>')

svg_content = "\n".join(svg_parts)
with open("test_india.svg", "w", encoding="utf-8") as out:
    out.write(svg_content)

print(f"Generated test_india.svg! Length: {len(svg_content)}")
