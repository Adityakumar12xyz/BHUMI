import json
import re

with open('bhumi-insight-v2.html', 'r', encoding='utf-8') as f:
    text = f.read()

print('File size:', len(text))
print('Has <!DOCTYPE html>:', text.startswith('<!DOCTYPE html>'))
print('Has </html> at end:', text.strip().endswith('</html>'))

# Check all 4 datasets
m_states = re.search(r'window\.BHUMI_STATES\s*=\s*(\{.*?\});\s*window\.BHUMI_PAPERS', text, re.DOTALL)
m_papers = re.search(r'window\.BHUMI_PAPERS\s*=\s*(\[.*?\]);\s*window\.BHUMI_AI', text, re.DOTALL)
m_ai = re.search(r'window\.BHUMI_AI\s*=\s*(\{.*?\});\s*window\.BHUMI_REVIEWS', text, re.DOTALL)
m_rev = re.search(r'window\.BHUMI_REVIEWS\s*=\s*(\[.*?\]);', text, re.DOTALL)

print('States parsed:', len(json.loads(m_states.group(1))))
print('Papers parsed:', len(json.loads(m_papers.group(1))))
print('AI parsed:', len(json.loads(m_ai.group(1))))
print('Reviews parsed:', len(json.loads(m_rev.group(1))))

keywords = [
    'Sh. S. Sharma, IAS',
    'Dr. K. N. Rao',
    'Prof. M. K. Iyer',
    'Dr. Ananya Verma',
    'Guest Citizen',
    'Level 4: National Executive Full Access',
    'State Evidence Review',
    'loginAs',
    'logoutToPublic',
    'locked-preview-overlay'
]
for kw in keywords:
    print(f'Contains "{kw}": {kw in text}')
