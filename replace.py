import os
import re
import json

# Define the path to your Next.js project and the JSON file
project_path = 'C:/Users/dell/Desktop/wok_shop/duvdu/duvdu_website/client'
json_file_path = 'C:/Users/dell/Desktop/wok_shop/duvdu/duvdu_website/extracted_texts.json'

# Load texts from JSON file
def load_texts_from_json(json_file):
    with open(json_file, 'r', encoding='utf-8') as f:
        texts = json.load(f)
    return texts

# Define the translation function wrapper
def wrap_translation(text):
    return f'{{t("{text}")}}'

# Define regex patterns
html_tag_pattern = re.compile(r'>([^<]+?)<', re.DOTALL)  # Matches text between HTML tags
comment_pattern = re.compile(r'<!--.*?-->', re.DOTALL)  # Matches HTML comments
attribute_pattern = re.compile(r'(\w+)=["\'][^"\']*["\']')  # Matches HTML attributes

# Function to check if the text is valid for translation
def is_valid_static_text(text):
    # Skip text that contains curly braces or newlines
    return not re.search(r'{.*?}', text) and '\n' not in text and text.strip()

# Function to replace static text inside HTML elements
def replace_text_in_files(directory, texts):
    for root, dirs, files in os.walk(directory):
        # Skip .next and node_modules directories
        dirs[:] = [d for d in dirs if d not in ['.next', 'node_modules']]
        
        for file in files:
            if file.endswith(('.js', '.jsx', '.ts', '.tsx')):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    # Remove HTML comments
                    content = comment_pattern.sub('', content)
                    
                    # Function to replace static text
                    def replace_static_text(match):
                        text = match.group(1).strip()
                        if is_valid_static_text(text) and text in texts:
                            return f'>{wrap_translation(text)}<'
                        return match.group(0)

                    # Replace text within HTML tags
                    content = html_tag_pattern.sub(replace_static_text, content)
                    
                    # Write the modified content back to the file
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(content)
                
                except Exception as e:
                    print(f'Error processing file {file_path}: {e}')

# Load texts from JSON and replace in files
texts = load_texts_from_json(json_file_path)
replace_text_in_files(project_path, texts)

print('Text replacement completed.')
