import os
import re

# Define the path to your Next.js project
project_path = 'C:/Users/dell/Desktop/wok_shop/duvdu/duvdu_website/client'

# Define a regular expression pattern to match placeholder values
placeholder_pattern = re.compile(r'placeholder=["\'](.*?)["\']')

# Define the translation function wrapper
def wrap_translation(text):
    return f'{{t("{text}")}}'

# Function to process files and replace placeholder texts with translation function
def replace_placeholder_texts(directory):
    for root, dirs, files in os.walk(directory):
        # Skip .next and node_modules directories
        dirs[:] = [d for d in dirs if d not in ['.next', 'node_modules']]
        
        for file in files:
            if file.endswith(('.js', '.jsx', '.ts', '.tsx')):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    # Replace each placeholder value with the translation function
                    def replace_placeholder(match):
                        text = match.group(1)
                        return f'placeholder={wrap_translation(text)}'

                    content = placeholder_pattern.sub(replace_placeholder, content)
                    
                    # Write the modified content back to the file
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(content)
                
                except Exception as e:
                    print(f'Error processing file {file_path}: {e}')

# Run the function on the project directory
replace_placeholder_texts(project_path)

print('Placeholder replacement completed.')
