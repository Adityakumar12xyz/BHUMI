# -*- coding: utf-8 -*-
"""
verify_compiled_app.py
Verifies the integrity of bhumi-insight-v2.html
"""
import re

with open('bhumi-insight-v2.html', 'r', encoding='utf-8') as f:
    content = f.read()

print("File size:", len(content), "bytes")
print("Total lines:", content.count('\n'))

# Check DOCTYPE and closing tags
assert content.startswith("<!DOCTYPE html>"), "Missing doctype"
assert "</html>" in content, "Missing </html>"
assert "</body>" in content, "Missing </body>"
assert "</script>" in content, "Missing </script>"

# Check persona buttons
personas = ['btn-role-Officer', 'btn-role-Institution', 'btn-role-Researcher', 'btn-role-Reviewer', 'btn-role-Public']
for p in personas:
    assert p in content, f"Missing persona button {p}"
print("All 5 persona buttons verified!")

# Check comparison modal
assert "comparison-modal" in content, "Missing comparison modal"
assert "Fark Samjhein" in content or "Fark Dekhein" in content, "Missing Fark Samjhein"
print("Comparison modal verified!")

# Check JavaScript functions
funcs = [
    'switchRole',
    'renderOfficerDashboard',
    'renderInstitutionDashboard',
    'renderResearcherDashboard',
    'renderReviewerDashboard',
    'renderCitizenDashboard',
    'renderMapTab',
    'renderPapersTab',
    'renderSimulateTab',
    'renderEvidenceTab',
    'renderChatTab',
    'renderAdminTab',
    'openRoleComparisonModal',
    'grantClearance',
    'flagDiscrepancy'
]
for fn in funcs:
    assert f"function {fn}" in content or f"{fn}(" in content, f"Missing function {fn}"
print(f"All {len(funcs)} critical JavaScript functions verified!")

# Check JSON datasets
assert "window.BHUMI_STATES =" in content, "Missing BHUMI_STATES"
assert "window.BHUMI_PAPERS =" in content, "Missing BHUMI_PAPERS"
assert "window.BHUMI_AI =" in content, "Missing BHUMI_AI"
assert "window.BHUMI_REVIEWS =" in content, "Missing BHUMI_REVIEWS"
print("All 4 data stores verified!")

print("ALL CHECKS PASSED PERFECTLY!")
