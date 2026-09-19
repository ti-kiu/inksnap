import json, re

with open('/root/projects/tattoo-tool/frontend/src/data/pseo-content.json') as f:
    data = json.load(f)

# Each placement gets unique style+number combos — no overlap
placement_images = {
    'ankle':      [('anime','01'),('fine-line','02'),('minimalist','03'),('small-simple','04'),('floral','05'),('watercolor','06'),('dotwork','07'),('sacred-geometry','08')],
    'back':       [('japanese','09'),('neo-traditional','10'),('realism','11'),('tribal','12'),('blackwork','13'),('ornamental','14'),('chinese-lattice','15'),('flame','16')],
    'forearm':    [('geometric','17'),('traditional','18'),('snake-dragon','19'),('script-lettering','20'),('dotwork','21'),('sacred-geometry','22'),('chinese-lattice','23'),('flame','24')],
    'ribs':       [('fine-line','09'),('watercolor','10'),('floral','11'),('minimalist','12'),('anime','13'),('small-simple','14'),('dotwork','15'),('sacred-geometry','16')],
    'shoulder':   [('japanese','17'),('neo-traditional','18'),('realism','19'),('ornamental','20'),('blackwork','21'),('tribal','22'),('chinese-lattice','23'),('flame','24')],
    'thigh':      [('geometric','01'),('traditional','02'),('snake-dragon','03'),('script-lettering','04'),('anime','05'),('watercolor','06'),('dotwork','07'),('sacred-geometry','08')],
    'upper-arm':  [('japanese','01'),('neo-traditional','02'),('realism','03'),('ornamental','04'),('blackwork','05'),('tribal','06'),('chinese-lattice','07'),('flame','08')],
    'wrist':      [('fine-line','17'),('minimalist','18'),('small-simple','19'),('floral','20'),('anime','21'),('watercolor','22'),('dotwork','23'),('sacred-geometry','24')],
}

for placement, images in placement_images.items():
    key = f'placement-{placement}'
    if key not in data:
        continue

    body = data[key].get('bodyHtml', '')
    img_pattern = r'<img[^>]*src="([^"]+)"[^>]*>'
    img_matches = list(re.finditer(img_pattern, body))

    new_body = body
    replaced = 0
    for i, match in enumerate(img_matches[:8]):
        old_src = match.group(1)
        if '/images/ideas/' in old_src:
            style, num = images[i]
            new_src = f'/images/ideas/{style}/{num}.webp'
            new_body = new_body.replace(old_src, new_src, 1)
            replaced += 1

    data[key]['bodyHtml'] = new_body
    print(f'{key}: replaced {replaced} images')

with open('/root/projects/tattoo-tool/frontend/src/data/pseo-content.json', 'w') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print('Done')