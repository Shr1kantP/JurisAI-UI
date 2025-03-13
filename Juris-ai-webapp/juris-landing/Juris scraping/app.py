from flask import Flask, request, render_template_string
import pandas as pd
import re

app = Flask(__name__)

# Load IPC data
df = pd.read_csv("ipc_sections.csv")

# Define keywords for matching (expanded for new sections)
keywords = {
    "murder": ["murder", "killed", "stabbed", "shot", "death"],          # For 302
    "hurt": ["hurt", "hit", "beat", "injured", "assault"],              # For 323, 334
    "grievous_hurt": ["grievous", "serious injury", "maimed", "wounded"],  # For 324
    "theft": ["stole", "theft", "robbed", "taken", "steal"],            # For 378
    "cheating": ["cheated", "fraud", "deceived", "dishonest", "scammed"],          # For 420
    "kidnapping": ["kidnap", "abduct", "hijack", "taken away"],         # For 363
    "trespass": ["trespass", "entered", "broke in", "intruded"],        # For 452
    "forgery": ["forged", "fake", "counterfeit", "fabricated"],         # For 463, 468
}

# Matching function
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
                break  # One match per section for now
    return matches if matches else [("No matching IPC section found", "N/A")]

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

if __name__ == "__main__":
    app.run(debug=True)

# from flask import Flask, request, render_template_string
# import pandas as pd
# import re

# app = Flask(__name__)

# # Load IPC data and define keywords (same as above)
# df = pd.read_csv("ipc_sections.csv")
# keywords = {
#     "murder": ["murder", "killed", "stabbed", "shot", "death"],
#     "hurt": ["hurt", "hit", "beat", "injured", "assault"],
#     "theft": ["stole", "theft", "robbed", "taken", "steal"],
#     "cheating": ["cheated", "fraud", "deceived", "dishonest"]
# }

# def find_ipc_sections(fir_text):
#     fir_text = fir_text.lower()
#     matches = []
#     for index, row in df.iterrows():
#         section = row["Section"]
#         description = row["Description"].lower()
#         for crime, keyword_list in keywords.items():
#             pattern = "|".join(keyword_list)
#             if re.search(pattern, fir_text) and re.search(pattern, description):
#                 matches.append((section, crime))
#                 break
#     return matches if matches else [("No matching IPC section found", "N/A")]

# @app.route("/", methods=["GET", "POST"])
# def home():
#     if request.method == "POST":
#         fir = request.form["fir"]
#         matches = find_ipc_sections(fir)
#         return render_template_string("""
#             <h1>IPC Section Finder - Result</h1>
#             <p><strong>FIR:</strong> {{ fir }}</p>
#             <h3>Suggested IPC Sections:</h3>
#             <ul>
#             {% for section, crime in matches %}
#                 <li>{{ section }} ({{ crime }})</li>
#             {% endfor %}
#             </ul>
#             <a href="/">Try Another</a>
#         """, fir=fir, matches=matches)
#     return render_template_string("""
#         <h1>IPC Section Finder</h1>
#         <form method="post">
#             <textarea name="fir" rows="5" cols="50" placeholder="Enter FIR description here"></textarea><br>
#             <input type="submit" value="Find IPC Sections">
#         </form>
#     """)

# if __name__ == "__main__":
#     app.run(debug=True)