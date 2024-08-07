import os
import re
import json

# Define the path to your Next.js project and the JSON output file
project_path = 'C:/Users/dell/Desktop/wok_shop/duvdu/duvdu_website/client'
json_output_path = 'header_texts.json'

# Define a regular expression pattern to match header attribute values within braces
header_pattern = re.compile(r'header\s*=\s*\{["\']([^"\']*)["\']\}')

# Function to extract header attribute values
def extract_header_texts(directory):
    headers = {}
    
    for root, dirs, files in os.walk(directory):
        # Skip .next and node_modules directories
        dirs[:] = [d for d in dirs if d not in ['.next', 'node_modules']]
        
        for file in files:
            if file.endswith(('.js', '.jsx', '.ts', '.tsx')):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    # Find all header attribute values within braces
                    matches = header_pattern.findall(content)
                    for match in matches:
                        headers[match] = ""  # Initialize with empty value
                
                except Exception as e:
                    print(f'Error processing file {file_path}: {e}')
    
    return headers

# Function to save headers to a JSON file
def save_headers_to_json(headers, json_file):
    with open(json_file, 'w', encoding='utf-8') as f:
        json.dump(headers, f, ensure_ascii=False, indent=4)

# Extract header texts and save to JSON
headers = extract_header_texts(project_path)
save_headers_to_json(headers, json_output_path)

print('Header text extraction completed.')
