import re
import xml.etree.ElementTree as ET

with open('India-locator-map-blank.svg', 'r', encoding='utf-8') as f:
    content = f.read()

print("SVG Length:", len(content))
# Find viewBox or width/height
viewbox_match = re.search(r'viewBox="([^"]+)"', content)
if viewbox_match:
    print("viewBox:", viewbox_match.group(1))

# Check for state codes or names
ids = re.findall(r'<path[^>]*id="([^"]+)"', content)
print("Path IDs count:", len(ids))
print("First 20 IDs:", ids[:20])

# Check for g elements with id
g_ids = re.findall(r'<g[^>]*id="([^"]+)"', content)
print("Group IDs count:", len(g_ids))
print("Group IDs:", g_ids[:20])
