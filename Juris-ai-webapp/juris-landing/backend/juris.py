import requests
from bs4 import BeautifulSoup
import re
import json
import pandas as pd
from flask import Flask, request, render_template_string
import time

# Initialize Flask app
app = Flask(__name__)

# Function to scrape IPC sections from devgan.in (optional, uncomment if needed)
def scrape_ipc_sections():
    numbers = list(range(1, 512))  # IPC sections 1 to 511
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    ipc_data = {}

    for num in numbers:
        url = f"https://devgan.in/ipc/section/{num}/"
        print(f"Fetching: {url}")
        try:
            response = requests.get(url, headers=headers, timeout=10)
            if response.status_code != 200:
                print(f"Failed to fetch section {num}: {response.status_code}")
                continue

            soup = BeautifulSoup(response.content, "html.parser")
            section = soup.find("div", class_="section") or soup.find("main")  # Adjust based on site
            if not section:
                print(f"No section data for {num}")
                continue

            title_tag = section.find("h1") or section.find("h2")
            if title_tag:
                title_text = title_tag.get_text(strip=True)
                match = re.match(r"Section (\d+)\s*-\s*(.+)", title_text)
                if match:
                    section_num = match.group(1)
                    section_title = match.group(2)
                else:
                    continue

                desc_tag = section.find("p") or section.find("div", class_="description")
                description = desc_tag.get_text(strip=True) if desc_tag else "No description available"

                ipc_data[section_num] = {"title": section_title, "description": description}
            time.sleep(1)  # Rate limiting
        except requests.exceptions.RequestException as e:
            print(f"Error fetching section {num}: {e}")
            continue

    # Save to CSV
    if ipc_data:
        df = pd.DataFrame.from_dict(ipc_data, orient="index").reset_index()
        df.columns = ["Section", "Title", "Description"]
        df.to_csv("ipc_sections.csv", index=False)
        print("Scraping completed. Data saved to ipc_sections.csv")
    return ipc_data

# Load IPC data (use CSV or scrape if file doesn't exist)
try:
    df = pd.read_csv("ipc_sections.csv", on_bad_lines='skip')
except FileNotFoundError:
    print("ipc_sections.csv not found. Scraping data...")
    scrape_ipc_sections()  # Uncomment this line to enable scraping
    df = pd.read_csv("ipc_sections.csv", on_bad_lines='skip')

# Define keywords for matching
keywords = {
    "murder": ["murder", "killed", "stabbed", "shot", "death"],           # For 302
    "hurt": ["hurt", "hit", "beat", "injured", "assault"],               # For 323, 334
    "grievous_hurt": ["grievous", "serious injury", "maimed", "wounded"], # For 324
    "theft": ["stole", "theft", "robbed", "taken", "steal"],             # For 378
    "cheating": ["cheated", "fraud", "deceived", "dishonest", "scammed"], # For 420, 415
    "kidnapping": ["kidnap", "abduct", "hijack", "taken away"],          # For 363
    "trespass": ["trespass", "entered", "broke in", "intruded"],         # For 452
    "forgery": ["forged", "fake", "counterfeit", "fabricated"],          # For 463, 468
    "breach_of_trust": ["trust", "misappropriated", "embezzled", "betrayed"],  # For 406
    "extortion": ["extort", "ransom", "threatened", "demanded"],         # For 122
    "mischief": ["damage", "destroyed", "ruined", "vandalized"],         # For 425, 426
    "defamation": ["defamed", "slandered", "libel", "false statement"],  # For 499, 500
}

# Matching function
def find_ipc_sections(fir_text):
    fir_text = fir_text.lower()
    matches = []
    for index, row in df.iterrows():
        section = row["Section"]
        description = row["Description"].lower()
        for crime, keyword_list in keywords.items():
            pattern = "|".join(keyword_list)
            if re.search(pattern, fir_text) and re.search(pattern, description):
                matches.append((section, crime))
                break  # One match per section
    return matches if matches else [("No matching IPC section found", "N/A")]

# Flask routes
@app.route("/", methods=["GET", "POST"])
def home():
    if request.method == "POST":
        fir = request.form["fir"]
        matches = find_ipc_sections(fir)
        return render_template_string("""
            <h1>JurisAI - Result</h1>
            <p><strong>FIR:</strong> {{ fir }}</p>
            <h3>Suggested IPC Sections:</h3>
            <ul>
            {% for section, crime in matches %}
                <li>{{ section }} ({{ crime }})</li>
            {% endfor %}
            </ul>
            <a href="/">Try Another</a>
        """, fir=fir, matches=matches)
    return render_template_string("""
        <h1>JurisAI IPC Section Finder</h1>
        <form method="post">
            <textarea name="fir" rows="5" cols="50" placeholder="Enter FIR description here"></textarea><br>
            <input type="submit" value="Find IPC Sections">
        </form>
    """)

# Command-line testing function
def test_ipc_matcher():
    fir_cases = [
        "A stabbed B with a knife",                      # 302
        "X stole money from Y’s house",                  # 378
        "P hit Q with a stick causing injury",           # 323
        "Z cheated W out of ₹5000",                      # 420
        "M kidnapped N’s child",                         # 363
        "R hit S but acted in self-defense",             # 334
        "T stabbed U causing grievous hurt",             # 324
        "V broke into W’s house to commit theft",        # 452
        "X forged a cheque to deceive Y",                # 468
        "Z misappropriated funds entrusted by W",        # 406
        "Y created a fake document",                     # 463
        "T has committed forgery by creating fake documents to get into a college",  # 463
        "A threatened B to extort money",                # 122
        "X destroyed Y’s property",                      # 425
        "P vandalized Q’s car",                          # 426
        "R defamed S by spreading false rumors",         # 499
        "T slandered U in a newspaper",                  # 500
        "V deceived W to gain property",                 # 415
    ]
    for case in fir_cases:
        print(f"FIR: {case}")
        results = find_ipc_sections(case)
        for section, crime in results:
            print(f"Matched: {section} ({crime})")
        print()

if __name__ == "__main__":
    # Uncomment the line below to run the scraper first (if no CSV exists)
    # scrape_ipc_sections()

    # Run command-line tests
    print("Running IPC matcher tests...")
    test_ipc_matcher()

    # Start Flask app
    print("Starting Flask app...")
    app.run(debug=True)