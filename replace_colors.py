import os
import re

file_path = 'src/App.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

replacements = {
    r'bg-\[\#E9D5FF\]': 'bg-lumina-bg-primary',
    r'bg-\[\#D8B4FE\]': 'bg-lumina-bg-secondary',
    r'border-\[\#C084FC\]': 'border-lumina-border',
    r'text-\[\#2B124C\]': 'text-lumina-text-main',
    r'text-\[\#4C1D95\]': 'text-lumina-text-sub',
    r'bg-\[\#6D28D9\]': 'bg-lumina-accent',
    r'text-\[\#E9D5FF\]': 'text-lumina-bg-primary',
    r'text-\[\#6D28D9\]': 'text-lumina-accent',
    r'hover:bg-\[\#C084FC\]': 'hover:bg-lumina-border',
    r'hover:bg-\[\#8B5CF6\]': 'hover:bg-lumina-accent-hover',
    r'hover:bg-\[\#4C1D95\]': 'hover:bg-lumina-text-sub',
    r'text-\[\#8B5CF6\]': 'text-lumina-accent-hover',
    r'bg-\[\#C084FC\]': 'bg-lumina-border',
    r'bg-\[\#F3E8FF\]': 'bg-lumina-surface-light',
    r'bg-\[\#8B5CF6\]': 'bg-lumina-accent-hover',
    r'border-\[\#6D28D9\]': 'border-lumina-accent',
    r'shadow-\[\#6D28D9\]': 'shadow-lumina-accent',
    r'from-\[\#D8B4FE\]': 'from-lumina-bg-secondary',
    r'from-\[\#E9D5FF\]': 'from-lumina-bg-primary',
    r'text-\[\#A78BFA\]': 'text-purple-400', # A78BFA is standard tailwind purple-400
}

for old, new in replacements.items():
    content = re.sub(old, new, content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print('Replacement complete.')
