import os
import re
import json

# Define the path to your Next.js project and the JSON output file
project_path = 'C:/Users/dell/Desktop/wok_shop/duvdu/duvdu_website/client'
json_output_path = 'arrow_btn_texts.json'

# Define a regular expression pattern to match ArrowBtn text attribute
arrow_btn_pattern = re.compile(r'<ArrowBtn[^>]*\btext=["\']([^"\']*)["\'][^>]*>')

# Function to extract text attribute values from ArrowBtn components
def extract_arrow_btn_texts(directory):
    texts = {}
    
    for root, dirs, files in os.walk(directory):
        # Skip .next and node_modules directories
        dirs[:] = [d for d in dirs if d not in ['.next', 'node_modules']]
        
        for file in files:
            if file.endswith(('.js', '.jsx', '.ts', '.tsx')):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    # Find all ArrowBtn text attribute values
                    matches = arrow_btn_pattern.findall(content)
                    for match in matches:
                        texts[match] = ""  # Initialize with empty value
                
                except Exception as e:
                    print(f'Error processing file {file_path}: {e}')
    
    return texts

# Function to save texts to a JSON file
def save_texts_to_json(texts, json_file):
    with open(json_file, 'w', encoding='utf-8') as f:
        json.dump(texts, f, ensure_ascii=False, indent=4)

# Extract ArrowBtn texts and save to JSON
texts = extract_arrow_btn_texts(project_path)
save_texts_to_json(texts, json_output_path)

print('ArrowBtn text extraction completed.')
