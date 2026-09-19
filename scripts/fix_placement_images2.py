import json, re

with open('/root/projects/tattoo-tool/frontend/src/data/pseo-content.json') as f:
    data = json.load(f)

# 8 placements × 8 images = 64 unique style+num combos (no overlap at all)
placement_images = {
    'ankle':      [('anime','01'),('anime','02'),('fine-line','01'),('fine-line','02'),('minimalist','01'),('minimalist','02'),('small-simple','01'),('small-simple','02')],
    'back':       [('japanese','01'),('japanese','02'),('neo-traditional','01'),('neo-traditional','02'),('realism','01'),('realism','02'),('tribal','01'),('tribal','02')],
    'forearm':    [('geometric','01'),('geometric','02'),('traditional','01'),('traditional','02'),('snake-dragon','01'),('snake-dragon','02'),('script-lettering','01'),('script-lettering','02')],
    'ribs':       [('floral','01'),('floral','02'),('watercolor','01'),('watercolor','02'),('blackwork','01'),('blackwork','02'),('ornamental','01'),('ornamental','02')],
    'shoulder':   [('chinese-lattice','01'),('chinese-lattice','02'),('flame','01'),('flame','02'),('dotwork','01'),('dotwork','02'),('sacred-geometry','01'),('sacred-geometry','02')],
    'thigh':      [('anime','03'),('anime','04'),('fine-line','03'),('fine-line','04'),('minimalist','03'),('minimalist','04'),('small-simple','03'),('small-simple','04')],
    'upper-arm':  [('japanese','03'),('japanese','04'),('neo-traditional','03'),('neo-traditional','04'),('realism','03'),('realism','04'),('tribal','03'),('tribal','04')],
    'wrist':      [('geometric','03'),('geometric','04'),('traditional','03'),('traditional','04'),('snake-dragon','03'),('snake-dragon','04'),('script-lettering','03'),('script-lettering','04')],
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
    print(f'{key}: replaced {replaced}')

with open('/root/projects/tattoo-tool/frontend/src/data/pseo-content.json', 'w') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

# Verify
all_imgs = []
for key, val in data.items():
    if key.startswith('placement-'):
        body = val.get('bodyHtml', '')
        imgs = re.findall(r'src="(/images/ideas/[^"]+)"', body)
        for img in imgs:
            all_imgs.append(img)

from collections import Counter
dupes = sum(1 for c in Counter(all_imgs).values() if c > 1)
print(f'Total: {len(all_imgs)}, Unique: {len(set(all_imgs))}, Dupes: {dupes}')