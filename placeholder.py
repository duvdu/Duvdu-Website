import os
import re
import json

# Define the path to your Next.js project and the JSON output file
project_path = 'C:/Users/dell/Desktop/wok_shop/duvdu/duvdu_website/client'
json_output_path = 'placeholders.json'

# Define a regular expression pattern to match placeholder values
placeholder_pattern = re.compile(r'placeholder=["\'](.*?)["\']')

# Function to extract placeholder values from files
def extract_placeholders(directory):
    placeholders = set()
    
    for root, dirs, files in os.walk(directory):
        # Skip .next and node_modules directories
        dirs[:] = [d for d in dirs if d not in ['.next', 'node_modules']]
        
        for file in files:
            if file.endswith(('.js', '.jsx', '.ts', '.tsx')):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    # Find all placeholder values
                    matches = placeholder_pattern.findall(content)
                    placeholders.update(matches)
                
                except Exception as e:
                    print(f'Error processing file {file_path}: {e}')
    
    return list(placeholders)

# Function to save placeholders to a JSON file
def save_placeholders_to_json(placeholders, json_file):
    with open(json_file, 'w', encoding='utf-8') as f:
        json.dump(placeholders, f, ensure_ascii=False, indent=4)

# Extract placeholders and save to JSON
placeholders = extract_placeholders(project_path)
save_placeholders_to_json(placeholders, json_output_path)

print('Placeholder extraction completed.')
