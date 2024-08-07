import os
import re
import json

# Define the path to your Next.js project
project_path = 'C:/Users/dell/Desktop/wok_shop/duvdu/duvdu_website/client'

# Define a regular expression pattern to match text inside HTML tags, excluding attributes
html_pattern = re.compile(r'<[^>]*>([^<]*)</[^>]*>', re.DOTALL)

# Function to check if the text contains only static content
def is_static_text(text):
    # Skip text that contains curly braces or newlines
    return not re.search(r'{.*?}', text) and '\n' not in text and text.strip()

# Function to process files and extract static text
def extract_text_from_files(directory):
    extracted_texts = {}
    for root, dirs, files in os.walk(directory):
        # Skip .next and node_modules directories
        dirs[:] = [d for d in dirs if d not in ['.next', 'node_modules']]
        
        for file in files:
            if file.endswith(('.js', '.jsx', '.ts', '.tsx')):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    # Find all static text inside HTML tags
                    matches = html_pattern.findall(content)
                    
                    for match in matches:
                        match = match.strip()
                        if is_static_text(match):
                            if match not in extracted_texts:
                                extracted_texts[match] = ""
                
                except Exception as e:
                    print(f'Error processing file {file_path}: {e}')
    
    return extracted_texts

# Extract text from files and write to JSON
def write_text_to_json(directory, output_file):
    extracted_texts = extract_text_from_files(directory)
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(extracted_texts, f, ensure_ascii=False, indent=4)

# Run the extraction and write to JSON
output_json_file = 'extracted_texts.json'
write_text_to_json('C:/Users/dell/Desktop/wok_shop/duvdu/duvdu_website', output_json_file)

print(f'Text extraction completed. Output saved to {output_json_file}')
