import re
import pandas as pd

# Load IPC data
df = pd.read_csv("ipc_sections.csv")

# Define keywords for matching (expanded for new sections)
keywords = {
    "murder": ["murder", "killed", "stabbed", "shot", "death"],           # For 302
    "hurt": ["hurt", "hit", "beat", "injured", "assault"],               # For 323, 334
    "grievous_hurt": ["grievous", "serious injury", "maimed", "wounded"], # For 324
    "theft": ["stole", "theft", "robbed", "taken", "steal"],             # For 378
    "cheating": ["cheated", "fraud", "deceived", "dishonest"],           # For 420
    "kidnapping": ["kidnap", "abduct", "hijack", "taken away"],          # For 363
    "trespass": ["trespass", "entered", "broke in", "intruded"],         # For 452
    "forgery": ["forged", "fake", "counterfeit", "fabricated"],          # For 463, 468
    "breach_of_trust": ["trust", "misappropriated", "embezzled", "betrayed"],  # For 406
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

# Test it with updated FIR cases
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
    "T has committed fogergy by creating fake documents to get into a college" #463
]

for case in fir_cases:
    print(f"FIR: {case}")
    results = find_ipc_sections(case)
    for section, crime in results:
        print(f"Matched: {section} ({crime})")
    print()

# import re
# import pandas as pd

# # Load IPC data
# df = pd.read_csv("ipc_sections.csv")

# # Define keywords for matching (expand based on descriptions)
# keywords = {
#     "murder": ["murder", "killed", "stabbed", "shot", "death"],
#     "hurt": ["hurt", "hit", "beat", "injured", "assault"],
#     "theft": ["stole", "theft", "robbed", "taken", "steal"],
#     "cheating": ["cheated", "fraud", "deceived", "dishonest"],
#     "kidnapping": ["kidnap", "abduct", "hijack", "take as hostage"]
# }

# # Matching function
# def find_ipc_sections(fir_text):
#     fir_text = fir_text.lower()
#     matches = []
    
#     for index, row in df.iterrows():
#         section = row["Section"]
#         description = row["Description"].lower()
#         for crime, keyword_list in keywords.items():
#             pattern = "|".join(keyword_list)  # e.g., "murder|killed|stabbed"
#             if re.search(pattern, fir_text) and re.search(pattern, description):
#                 matches.append((section, crime))
#                 break  # One match per section for now
    
#     return matches if matches else [("No matching IPC section found", "N/A")]

# # Test it
# fir_cases = [
#     "A stabbed B with a knife",
#     "X stole money from Y’s house",
#     "P hit Q with a stick causing injury",
#     "Z cheated W out of ₹5000"
# ]

# for case in fir_cases:
#     print(f"FIR: {case}")
#     results = find_ipc_sections(case)
#     for section, crime in results:
#         print(f"Matched: {section} ({crime})")
#     print()