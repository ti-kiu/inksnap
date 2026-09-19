import json

with open('/root/projects/tattoo-tool/frontend/src/data/pseo-content.json') as f:
    data = json.load(f)

new_styles = {
    "chinese-lattice": {
        "title": "Chinese Lattice Tattoo Ideas — 24 Geometric Patterns to Preview Free",
        "description": "24 Chinese lattice tattoo ideas with placement, sizing and cost notes. Preview any design on your own body free with the InkPreview tattoo simulator.",
        "canonical": "https://inkpreview.co/tattoo-ideas/chinese-lattice",
        "bodyHtml": ""
    },
    "flame": {
        "title": "Flame Tattoo Ideas — 24 Fire & Heat Designs to Preview Free",
        "description": "24 flame tattoo ideas with placement, sizing and cost notes. Preview any design on your own body free with the InkPreview tattoo simulator.",
        "canonical": "https://inkpreview.co/tattoo-ideas/flame",
        "bodyHtml": ""
    },
    "dotwork": {
        "title": "Dotwork Tattoo Ideas — 24 Stippled Designs to Preview Free",
        "description": "24 dotwork tattoo ideas with placement, sizing and cost notes. Preview any design on your own body free with the InkPreview tattoo simulator.",
        "canonical": "https://inkpreview.co/tattoo-ideas/dotwork",
        "bodyHtml": ""
    },
    "sacred-geometry": {
        "title": "Sacred Geometry Tattoo Ideas — 24 Spiritual Patterns to Preview Free",
        "description": "24 sacred geometry tattoo ideas with placement, sizing and cost notes. Preview any design on your own body free with the InkPreview tattoo simulator.",
        "canonical": "https://inkpreview.co/tattoo-ideas/sacred-geometry",
        "bodyHtml": ""
    }
}

for slug, style_data in new_styles.items():
    if slug not in data:
        data[slug] = style_data
        print(f"Added: {slug}")

with open('/root/projects/tattoo-tool/frontend/src/data/pseo-content.json', 'w') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"\nTotal styles: {len([k for k in data.keys() if not k.startswith('placement-') and k != 'hub'])}")