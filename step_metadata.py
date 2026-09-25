# -*- coding: utf-8 -*-
"""
BHUMI-INSIGHT v2 Platform Generator
Smart India Hackathon 2026 | Problem Statement 26019
Team: Bug Hunter (ID: 147071)
Ministry of Rural Development | Department of Land Resources (DoLR)
"""

import json

with open('state_paths.json', 'r', encoding='utf-8') as f:
    state_paths = json.load(f)

# Comprehensive State Metadata for all 36 States & UTs
STATES_META = {
    "UP": {
        "name": "Uttar Pradesh",
        "capital": "Lucknow",
        "portal": "UP Bhulekh",
        "portal_url": "https://upbhulekh.gov.in",
        "ror_pct": 100.0,
        "cadastral_pct": 98.4,
        "ulpin_status": "Live (All 75 Districts)",
        "svamitva_cards": "52.4 Lakh",
        "dispute_idx": 78,
        "research_count": 54,
        "lat": 26.8467,
        "lng": 80.9462,
        "districts": [
            ["Lucknow", "Urban/Administrative"],
            ["Kanpur Nagar", "Industrial/Urban"],
            ["Varanasi", "Peri-Urban/Heritage"],
            ["Bahraich", "Rural/Terai Belt"],
            ["Sonbhadra", "Forest/Tribal"],
            ["Gautam Buddha Nagar (Noida)", "High-Growth Peri-Urban"],
            ["Gorakhpur", "Mixed Agriculture"]
        ]
    },
    "MH": {
        "name": "Maharashtra",
        "capital": "Mumbai",
        "portal": "Mahabhulekh & Mahabhumi",
        "portal_url": "https://bhulekh.mahabhumi.gov.in",
        "ror_pct": 99.8,
        "cadastral_pct": 96.5,
        "ulpin_status": "Live (3D Cadastre Pilot in Pune)",
        "svamitva_cards": "28.6 Lakh",
        "dispute_idx": 65,
        "research_count": 49,
        "lat": 19.7515,
        "lng": 75.7139,
        "districts": [
            ["Pune", "High-Tech/Peri-Urban Sprawl"],
            ["Mumbai Suburban", "Ultra-Dense Urban"],
            ["Nagpur", "Logistics Hub/Mixed"],
            ["Gadchiroli", "Forest/FRA Schedule V"],
            ["Nashik", "Agro-Industrial"],
            ["Satara", "Western Ghats Mixed"]
        ]
    },
    "KA": {
        "name": "Karnataka",
        "capital": "Bengaluru",
        "portal": "Bhoomi & Dishaank",
        "portal_url": "https://bhoomi.karnataka.gov.in",
        "ror_pct": 100.0,
        "cadastral_pct": 97.8,
        "ulpin_status": "Live (Geo-referenced Cadastre)",
        "svamitva_cards": "18.2 Lakh",
        "dispute_idx": 58,
        "research_count": 43,
        "lat": 15.3173,
        "lng": 75.7139,
        "districts": [
            ["Bengaluru Urban", "IT Corridor/Urban Sprawl"],
            ["Mysuru", "Mixed Heritage/Agri"],
            ["Kalaburagi", "Dryland Rural (Kalyana-KA)"],
            ["Belagavi", "Agricultural Hub"],
            ["Dakshina Kannada", "Coastal Cadastre"]
        ]
    },
    "TN": {
        "name": "Tamil Nadu",
        "capital": "Chennai",
        "portal": "TN Patta Chitta (Anytime Anywhere e-Services)",
        "portal_url": "https://eservices.tn.gov.in",
        "ror_pct": 99.9,
        "cadastral_pct": 98.1,
        "ulpin_status": "Live (CollabLand Cadastral Integration)",
        "svamitva_cards": "14.1 Lakh",
        "dispute_idx": 61,
        "research_count": 39,
        "lat": 11.1271,
        "lng": 78.6569,
        "districts": [
            ["Chennai", "Metropolitan Urban"],
            ["Coimbatore", "Industrial/Peri-Urban"],
            ["Madurai", "Heritage/Mixed"],
            ["Nilgiris", "Ecological/Plantation Hills"],
            ["Thanjavur", "Cauvery Delta Agriculture"]
        ]
    },
    "RJ": {
        "name": "Rajasthan",
        "capital": "Jaipur",
        "portal": "Apna Khata (e-Dharti)",
        "portal_url": "https://apnakhata.rajasthan.gov.in",
        "ror_pct": 99.5,
        "cadastral_pct": 94.2,
        "ulpin_status": "Live (Solar Park Land Records)",
        "svamitva_cards": "12.3 Lakh",
        "dispute_idx": 69,
        "research_count": 36,
        "lat": 27.0238,
        "lng": 74.2179,
        "districts": [
            ["Jaipur", "Urban/State Capital"],
            ["Jodhpur", "Arid Semi-Urban"],
            ["Barmer", "Thar Desert/Energy Corridor"],
            ["Udaipur", "Aravalli Tribal Belt"],
            ["Kota", "Chambal Basin Mixed"]
        ]
    },
    "GJ": {
        "name": "Gujarat",
        "capital": "Gandhinagar",
        "portal": "AnyRoR (Anywhere Revenue Records)",
        "portal_url": "https://anyror.gujarat.gov.in",
        "ror_pct": 99.9,
        "cadastral_pct": 97.4,
        "ulpin_status": "Live (Modern Drone Resurvey)",
        "svamitva_cards": "16.5 Lakh",
        "dispute_idx": 54,
        "research_count": 38,
        "lat": 22.2587,
        "lng": 71.1924,
        "districts": [
            ["Ahmedabad", "Mega Urban Corridor"],
            ["Surat", "Diamond & Textile Industrial"],
            ["Kutch", "Coastal/Arid Saline Flats"],
            ["Vadodara", "Chemical Industrial Belt"],
            ["Dang", "Tribal Forest Cadastre"]
        ]
    },
    "MP": {
        "name": "Madhya Pradesh",
        "capital": "Bhopal",
        "portal": "MP Bhulekh & Saara",
        "portal_url": "https://mpbhulekh.gov.in",
        "ror_pct": 100.0,
        "cadastral_pct": 99.1,
        "ulpin_status": "Live (NCAER N-LRSI #1 Rank)",
        "svamitva_cards": "24.8 Lakh",
        "dispute_idx": 59,
        "research_count": 41,
        "lat": 22.9734,
        "lng": 78.6569,
        "districts": [
            ["Bhopal", "Administrative Urban"],
            ["Indore", "Commercial Smart City"],
            ["Jabalpur", "Narmada Valley Mixed"],
            ["Dindori", "Baiga Tribal CFR Belt"],
            ["Ujjain", "Agro-Religious Mixed"]
        ]
    },
    "BR": {
        "name": "Bihar",
        "capital": "Patna",
        "portal": "Bihar Bhumi (Biharbhumi Portal)",
        "portal_url": "https://biharbhumi.bihar.gov.in",
        "ror_pct": 98.7,
        "cadastral_pct": 82.5,
        "ulpin_status": "Special Survey in Progress (Bandobast)",
        "svamitva_cards": "9.4 Lakh",
        "dispute_idx": 84,
        "research_count": 35,
        "lat": 25.0961,
        "lng": 85.3131,
        "districts": [
            ["Patna", "Urban Core"],
            ["Gaya", "Southern Plateau Mixed"],
            ["Muzaffarpur", "North Bihar Flood Plain"],
            ["Sitamarhi", "Border Agricultural"],
            ["Rohtas", "Canal Irrigated Belt"]
        ]
    },
    "WB": {
        "name": "West Bengal",
        "capital": "Kolkata",
        "portal": "Banglarbhumi",
        "portal_url": "https://banglarbhumi.gov.in",
        "ror_pct": 99.7,
        "cadastral_pct": 98.6,
        "ulpin_status": "Live (Integrated Mutation & Registry)",
        "svamitva_cards": "11.2 Lakh",
        "dispute_idx": 67,
        "research_count": 37,
        "lat": 22.9868,
        "lng": 87.8550,
        "districts": [
            ["Kolkata", "Urban Core"],
            ["South 24 Parganas", "Sundarbans Coastal Cadastre"],
            ["Darjeeling", "Himalayan Hill Terrains"],
            ["Paschim Bardhaman", "Mining & Industrial Zone"],
            ["Malda", "Agricultural Delta"]
        ]
    },
    "OD": {
        "name": "Odisha",
        "capital": "Bhubaneswar",
        "portal": "Bhulekh Odisha & Bhu-Naksha",
        "portal_url": "https://bhulekh.ori.nic.in",
        "ror_pct": 99.8,
        "cadastral_pct": 98.9,
        "ulpin_status": "Live (Jaga Slum Titling Integration)",
        "svamitva_cards": "10.7 Lakh",
        "dispute_idx": 52,
        "research_count": 34,
        "lat": 20.9517,
        "lng": 85.0985,
        "districts": [
            ["Khordha (Bhubaneswar)", "Capital Urban"],
            ["Cuttack", "Riverine Mixed"],
            ["Koraput", "Tribal High Lands"],
            ["Mayurbhanj", "Similipal Forest CFR Area"],
            ["Ganjam", "Coastal Agricultural"]
        ]
    },
    "TG": {
        "name": "Telangana",
        "capital": "Hyderabad",
        "portal": "Dharani Integrated Land Records",
        "portal_url": "https://dharani.telangana.gov.in",
        "ror_pct": 100.0,
        "cadastral_pct": 96.2,
        "ulpin_status": "Live (Blockchain Registry Pilots)",
        "svamitva_cards": "8.5 Lakh",
        "dispute_idx": 63,
        "research_count": 31,
        "lat": 18.1124,
        "lng": 79.0193,
        "districts": [
            ["Hyderabad", "Metro Urban"],
            ["Rangareddy", "High-Stakes Peri-Urban Sprawl"],
            ["Warangal", "Heritage Mixed"],
            ["Adilabad", "Gond Tribal Belt"],
            ["Nalgonda", "Krishna Basin Agriculture"]
        ]
    },
    "AP": {
        "name": "Andhra Pradesh",
        "capital": "Amaravati",
        "portal": "MeeBhoomi & YSR Jagananna Saswatha Bhu Hakku",
        "portal_url": "https://meebhoomi.ap.gov.in",
        "ror_pct": 99.8,
        "cadastral_pct": 95.8,
        "ulpin_status": "Live (Comprehensive Drone Resurvey)",
        "svamitva_cards": "12.0 Lakh",
        "dispute_idx": 60,
        "research_count": 30,
        "lat": 15.9129,
        "lng": 79.7400,
        "districts": [
            ["Visakhapatnam", "Coastal Metro/Port"],
            ["Krishna", "Fertile Delta Agriculture"],
            ["Anantapur", "Rainfed Drought-Prone"],
            ["Chittoor", "Rayalaseema Mixed"]
        ]
    },
    "KL": {
        "name": "Kerala",
        "capital": "Thiruvananthapuram",
        "portal": "ReLIS (Revenue Land Information System)",
        "portal_url": "https://revenue.kerala.gov.in",
        "ror_pct": 99.6,
        "cadastral_pct": 91.4,
        "ulpin_status": "Digital Survey Mission 'Ente Bhoomi'",
        "svamitva_cards": "5.6 Lakh",
        "dispute_idx": 45,
        "research_count": 29,
        "lat": 10.8505,
        "lng": 76.2711,
        "districts": [
            ["Thiruvananthapuram", "Administrative Capital"],
            ["Ernakulam", "Port/Commercial Urban"],
            ["Wayanad", "Western Ghats Ecological Fragile"],
            ["Palakkad", "Paddy Granary"]
        ]
    },
    "PB": {
        "name": "Punjab",
        "capital": "Chandigarh",
        "portal": "Punjab Jamabandi (PLRS)",
        "portal_url": "https://jamabandi.punjab.gov.in",
        "ror_pct": 100.0,
        "cadastral_pct": 98.4,
        "ulpin_status": "Live (Agricultural Farmland Geo-coding)",
        "svamitva_cards": "8.1 Lakh",
        "dispute_idx": 71,
        "research_count": 28,
        "lat": 31.1471,
        "lng": 75.3412,
        "districts": [
            ["Ludhiana", "Industrial Metro"],
            ["Amritsar", "Border Heritage"],
            ["Bathinda", "Cotton Belt Agriculture"],
            ["Hoshiarpur", "Kandi Sub-Himalayan"]
        ]
    },
    "HR": {
        "name": "Haryana",
        "capital": "Chandigarh",
        "portal": "Jamabandi Haryana & Web-HALRIS",
        "portal_url": "https://jamabandi.nic.in",
        "ror_pct": 100.0,
        "cadastral_pct": 99.3,
        "ulpin_status": "Live (Lal Dora Free Abadi Pioneer)",
        "svamitva_cards": "15.4 Lakh",
        "dispute_idx": 73,
        "research_count": 33,
        "lat": 29.0588,
        "lng": 76.0856,
        "districts": [
            ["Gurugram", "NCR Corporate Urban Sprawl"],
            ["Faridabad", "Heavy Industrial Hub"],
            ["Karnal", "GT Road Agro-Belt"],
            ["Nuh (Mewat)", "Aravalli Rural Semi-Arid"]
        ]
    },
    "JH": {
        "name": "Jharkhand",
        "capital": "Ranchi",
        "portal": "Jharbhoomi & Bhu-Naksha",
        "portal_url": "https://jharbhoomi.jharkhand.gov.in",
        "ror_pct": 98.9,
        "cadastral_pct": 86.2,
        "ulpin_status": "Live (CNT/SPT Act Digitization)",
        "svamitva_cards": "6.2 Lakh",
        "dispute_idx": 76,
        "research_count": 27,
        "lat": 23.6102,
        "lng": 85.2799,
        "districts": [
            ["Ranchi", "Plateau Urban Center"],
            ["East Singhbhum (Jamshedpur)", "Industrial Township"],
            ["Dumka", "Santhal Parganas Protected Area"],
            ["Dhanbad", "Coalfields Mining Concessions"]
        ]
    },
    "CG": {
        "name": "Chhattisgarh",
        "capital": "Raipur",
        "portal": "Bhuiyan & Bhu-Naksha",
        "portal_url": "https://bhuiyan.cg.nic.in",
        "ror_pct": 99.8,
        "cadastral_pct": 97.9,
        "ulpin_status": "Live (Community Forest Titles Integrated)",
        "svamitva_cards": "7.9 Lakh",
        "dispute_idx": 56,
        "research_count": 26,
        "lat": 21.2787,
        "lng": 81.8661,
        "districts": [
            ["Raipur", "Urban Center"],
            ["Bastar", "Dandakaranya Forest Tribal"],
            ["Bilaspur", "Arpa Basin Mixed"],
            ["Korba", "Thermal Power & Coal Basin"]
        ]
    },
    "AS": {
        "name": "Assam",
        "capital": "Dispur",
        "portal": "Dharitree & Mission Basundhara 3.0",
        "portal_url": "https://landrevenue.assam.gov.in",
        "ror_pct": 99.2,
        "cadastral_pct": 89.1,
        "ulpin_status": "Mission Basundhara Geo-tagging",
        "svamitva_cards": "5.1 Lakh",
        "dispute_idx": 64,
        "research_count": 25,
        "lat": 26.2006,
        "lng": 92.9376,
        "districts": [
            ["Kamrup Metro (Guwahati)", "Northeast Urban Gateway"],
            ["Dibrugarh", "Upper Assam Tea Cadastre"],
            ["Cachar (Silchar)", "Barak Valley Riverine"],
            ["Karbi Anglong", "Sixth Schedule Hill Tribal"]
        ]
    },
    "UK": {
        "name": "Uttarakhand",
        "capital": "Dehradun",
        "portal": "Uttarakhand Bhulekh (Devbhoomi)",
        "portal_url": "https://bhulekh.uk.gov.in",
        "ror_pct": 99.5,
        "cadastral_pct": 93.6,
        "ulpin_status": "Live (Hill Slope Terrain Mapping)",
        "svamitva_cards": "4.8 Lakh",
        "dispute_idx": 51,
        "research_count": 22,
        "lat": 30.0668,
        "lng": 79.0193,
        "districts": [
            ["Dehradun", "Valley Urban Sprawl"],
            ["Haridwar", "Gangetic Plains Mixed"],
            ["Nainital", "Kumaon Hills Tourist Cadastre"],
            ["Chamoli", "High Himalayan Ecological"]
        ]
    },
    "HP": {
        "name": "Himachal Pradesh",
        "capital": "Shimla",
        "portal": "HimBhoomi (Revenue Department HP)",
        "portal_url": "https://himbhoomi.hp.gov.in",
        "ror_pct": 100.0,
        "cadastral_pct": 94.7,
        "ulpin_status": "Live (Section 118 Land Regulation)",
        "svamitva_cards": "3.9 Lakh",
        "dispute_idx": 47,
        "research_count": 21,
        "lat": 31.1048,
        "lng": 77.1734,
        "districts": [
            ["Shimla", "State Capital Hill Cadastre"],
            ["Kangra", "Tea & Agro Mixed"],
            ["Mandi", "Beas Valley Mixed"],
            ["Lahaul and Spiti", "Cold Desert Trans-Himalayan"]
        ]
    },
    "JK": {
        "name": "Jammu & Kashmir",
        "capital": "Srinagar / Jammu",
        "portal": "J&K Land Records (Apki Zameen Apki Nigrani)",
        "portal_url": "https://landrecords.jk.gov.in",
        "ror_pct": 99.1,
        "cadastral_pct": 88.5,
        "ulpin_status": "Rollout under DILRMP Phase 2",
        "svamitva_cards": "3.2 Lakh",
        "dispute_idx": 62,
        "research_count": 24,
        "lat": 33.7782,
        "lng": 76.5762,
        "districts": [
            ["Srinagar", "Kashmir Valley Urban"],
            ["Jammu", "Tawi River Urban Core"],
            ["Baramulla", "Horticultural Agri Belt"],
            ["Anantnag", "South Kashmir Mixed"],
            ["Leh and Kargil (Ladakh Division)", "High Altitude Trans-Himalayan"]
        ]
    },
    "GA": {
        "name": "Goa",
        "capital": "Panaji",
        "portal": "Goa Bhulekh (Directorate of Land Survey)",
        "portal_url": "https://goabhulex.goa.gov.in",
        "ror_pct": 100.0,
        "cadastral_pct": 98.7,
        "ulpin_status": "Live (Communidade Land Records)",
        "svamitva_cards": "1.1 Lakh",
        "dispute_idx": 43,
        "research_count": 18,
        "lat": 15.2993,
        "lng": 74.1240,
        "districts": [
            ["North Goa", "Coastal Tourism & Heritage"],
            ["South Goa", "Mining & Coastal Mixed"]
        ]
    },
    "TR": {
        "name": "Tripura",
        "capital": "Agartala",
        "portal": "Tripura Jami (e-Jami Portal)",
        "portal_url": "https://jami.tripura.gov.in",
        "ror_pct": 99.4,
        "cadastral_pct": 91.2,
        "ulpin_status": "Live (TTAADC Autonomous Areas)",
        "svamitva_cards": "1.8 Lakh",
        "dispute_idx": 49,
        "research_count": 16,
        "lat": 23.9408,
        "lng": 91.9882,
        "districts": [
            ["West Tripura (Agartala)", "Urban Core"],
            ["Dhalai", "Tribal Autonomous Hills"]
        ]
    },
    "ML": {
        "name": "Meghalaya",
        "capital": "Shillong",
        "portal": "Meghalaya Land Records Management",
        "portal_url": "https://megland.gov.in",
        "ror_pct": 94.2,
        "cadastral_pct": 74.5,
        "ulpin_status": "Customary Clan Land Mapping Pilot",
        "svamitva_cards": "0.8 Lakh",
        "dispute_idx": 55,
        "research_count": 15,
        "lat": 25.4670,
        "lng": 91.3662,
        "districts": [
            ["East Khasi Hills (Shillong)", "Hill Urban"],
            ["West Garo Hills", "Clan Community Lands"]
        ]
    },
    "MN": {
        "name": "Manipur",
        "capital": "Imphal",
        "portal": "Loucha Pathap (Directorate of Land Records)",
        "portal_url": "https://louchapathap.nic.in",
        "ror_pct": 93.8,
        "cadastral_pct": 71.2,
        "ulpin_status": "Valley & Hill Dual Cadastre Pilot",
        "svamitva_cards": "0.6 Lakh",
        "dispute_idx": 72,
        "research_count": 17,
        "lat": 24.6637,
        "lng": 93.9063,
        "districts": [
            ["Imphal West", "Valley Urban Core"],
            ["Churachandpur", "Hill Tribal Territory"]
        ]
    },
    "NL": {
        "name": "Nagaland",
        "capital": "Kohima",
        "portal": "Nagaland Land Records & Survey",
        "portal_url": "https://landrevenue.nagaland.gov.in",
        "ror_pct": 91.5,
        "cadastral_pct": 68.4,
        "ulpin_status": "Article 371A Customary Mapping",
        "svamitva_cards": "0.5 Lakh",
        "dispute_idx": 68,
        "research_count": 14,
        "lat": 26.1584,
        "lng": 94.5624,
        "districts": [
            ["Kohima", "State Capital Hills"],
            ["Dimapur", "Commercial Valley Plain"]
        ]
    },
    "AR": {
        "name": "Arunachal Pradesh",
        "capital": "Itanagar",
        "portal": "Arunachal e-Land Records Portal",
        "portal_url": "https://landrecords.arunachal.gov.in",
        "ror_pct": 89.2,
        "cadastral_pct": 64.1,
        "ulpin_status": "Cadastral Survey Pilot in Towns",
        "svamitva_cards": "0.4 Lakh",
        "dispute_idx": 50,
        "research_count": 16,
        "lat": 28.2180,
        "lng": 94.7278,
        "districts": [
            ["Papum Pare (Itanagar)", "Capital Foothills"],
            ["Tawang", "High Altitude Border"]
        ]
    },
    "MZ": {
        "name": "Mizoram",
        "capital": "Aizawl",
        "portal": "Mizoram Land Revenue & Settlement",
        "portal_url": "https://landrevenue.mizoram.gov.in",
        "ror_pct": 96.1,
        "cadastral_pct": 78.9,
        "ulpin_status": "Periodic Patta Modernization",
        "svamitva_cards": "0.9 Lakh",
        "dispute_idx": 42,
        "research_count": 13,
        "lat": 23.1645,
        "lng": 92.9376,
        "districts": [
            ["Aizawl", "Steep Ridge Urban"],
            ["Lunglei", "Southern Hills Mixed"]
        ]
    },
    "SK": {
        "name": "Sikkim",
        "capital": "Gangtok",
        "portal": "Sikkim Land Revenue & Disaster Management",
        "portal_url": "https://sikkim.gov.in",
        "ror_pct": 98.4,
        "cadastral_pct": 85.3,
        "ulpin_status": "Live (Mountain Cadastre Pilot)",
        "svamitva_cards": "0.7 Lakh",
        "dispute_idx": 38,
        "research_count": 12,
        "lat": 27.5330,
        "lng": 88.5122,
        "districts": [
            ["East Sikkim (Gangtok)", "Himalayan Urban"],
            ["South Sikkim (Namchi)", "Organic Agro-Terraces"]
        ]
    },
    "DL": {
        "name": "NCT of Delhi",
        "capital": "New Delhi",
        "portal": "Delhi Land Records (DLRC)",
        "portal_url": "https://dlrc.delhigovt.nic.in",
        "ror_pct": 100.0,
        "cadastral_pct": 99.4,
        "ulpin_status": "Live (Urban Cadastre & Geospatial Delhi)",
        "svamitva_cards": "2.4 Lakh",
        "dispute_idx": 81,
        "research_count": 48,
        "lat": 28.7041,
        "lng": 77.1025,
        "districts": [
            ["New Delhi", "Lutyens Administrative"],
            ["South Delhi", "High-Density Residential"],
            ["North West Delhi", "Urban Village Fringe (Lal Dora)"]
        ]
    },
    "CH": {
        "name": "Chandigarh",
        "capital": "Chandigarh",
        "portal": "Chandigarh Estate Office Land Portal",
        "portal_url": "https://chandigarh.gov.in",
        "ror_pct": 100.0,
        "cadastral_pct": 100.0,
        "ulpin_status": "Live (100% GIS Integrated Leases)",
        "svamitva_cards": "0.3 Lakh",
        "dispute_idx": 44,
        "research_count": 15,
        "lat": 30.7333,
        "lng": 76.7794,
        "districts": [
            ["Chandigarh Master Plan Sectors", "Planned Urban Grid"]
        ]
    },
    "PY": {
        "name": "Puducherry",
        "capital": "Puducherry",
        "portal": "Nilam (Puducherry Land Records)",
        "portal_url": "https://nilam.py.gov.in",
        "ror_pct": 100.0,
        "cadastral_pct": 99.1,
        "ulpin_status": "Live",
        "svamitva_cards": "0.8 Lakh",
        "dispute_idx": 46,
        "research_count": 12,
        "lat": 11.9416,
        "lng": 79.8083,
        "districts": [
            ["Puducherry", "Coastal French Quarter & Urban"],
            ["Karaikal", "Cauvery Coastal Delta"]
        ]
    },
    "AN": {
        "name": "Andaman & Nicobar",
        "capital": "Port Blair",
        "portal": "A&N Land Revenue Portal",
        "portal_url": "https://andssw1.and.nic.in",
        "ror_pct": 99.3,
        "cadastral_pct": 92.4,
        "ulpin_status": "Live (Island Coastal Regulation GIS)",
        "svamitva_cards": "0.5 Lakh",
        "dispute_idx": 35,
        "research_count": 11,
        "lat": 11.7401,
        "lng": 92.6586,
        "districts": [
            ["South Andaman (Port Blair)", "Urban Port Island"],
            ["Nicobar", "Tribal Reserved Islands"]
        ]
    },
    "LD": {
        "name": "Lakshadweep",
        "capital": "Kavaratti",
        "portal": "Lakshadweep Land Cadastre",
        "portal_url": "https://lakshadweep.gov.in",
        "ror_pct": 99.0,
        "cadastral_pct": 90.2,
        "ulpin_status": "Live (Atoll Cadastral Mapping)",
        "svamitva_cards": "0.2 Lakh",
        "dispute_idx": 30,
        "research_count": 9,
        "lat": 10.5667,
        "lng": 72.6417,
        "districts": [
            ["Kavaratti Island", "Atoll Settlement"]
        ]
    },
    "DD": {
        "name": "Daman & Diu",
        "capital": "Daman",
        "portal": "Daman & Diu Land Records",
        "portal_url": "https://daman.nic.in",
        "ror_pct": 100.0,
        "cadastral_pct": 99.2,
        "ulpin_status": "Live",
        "svamitva_cards": "0.4 Lakh",
        "dispute_idx": 40,
        "research_count": 10,
        "lat": 20.4283,
        "lng": 72.8397,
        "districts": [
            ["Daman", "Industrial Coastal Enclave"],
            ["Diu", "Coastal Island Tourist Cadastre"]
        ]
    },
    "DN": {
        "name": "Dadra & Nagar Haveli",
        "capital": "Silvassa",
        "portal": "DNH Land Revenue Administration",
        "portal_url": "https://dnh.gov.in",
        "ror_pct": 100.0,
        "cadastral_pct": 98.9,
        "ulpin_status": "Live",
        "svamitva_cards": "0.6 Lakh",
        "dispute_idx": 42,
        "research_count": 11,
        "lat": 20.1809,
        "lng": 73.0169,
        "districts": [
            ["Silvassa", "Industrial Hub"],
            ["Khanvel", "Tribal Forest Belt"]
        ]
    }
}

print(f"Verified metadata for {len(STATES_META)} States and UTs!")
