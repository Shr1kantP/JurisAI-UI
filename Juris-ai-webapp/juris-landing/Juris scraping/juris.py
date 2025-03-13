import re
import pandas as pd
from flask import Flask, request, render_template_string
import sys

# Initialize Flask app
app = Flask(__name__)

# Load IPC data (shared between both functionalities)
try:
    df = pd.read_csv("ipc_sections.csv", on_bad_lines='skip')
except FileNotFoundError:
    print("Error: ipc_sections.csv not found. Please ensure the file exists.")
    sys.exit(1)

# Define keywords for matching (shared)
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

# Matching function (shared between CLI and web app)
def find_ipc_sections(fir_text):
    fir_text = fir_text.lower()
    matches = []
    for index, row in df.iterrows():
        section = row["Section"]
        description = row["Description"].lower()
        for crime, keyword_list in keywords.items():
            pattern = "|".join(keyword_list)  # e.g., "murder|killed|stabbed"
            if re.search(pattern, fir_text) and re.search(pattern, description):
                matches.append((section, crime))
                break  # One match per section
    return matches if matches else [("No matching IPC section found", "N/A")]

# Flask web app routes
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

# Command-line test cases from ipc_matcher.py
def run_tests():
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

# Main execution logic
if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "--test":
        # Run the command-line tests if '--test' flag is provided
        run_tests()
    else:
        # Otherwise, start the Flask web app
        app.run(debug=True)