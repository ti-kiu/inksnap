import json

with open('/root/projects/tattoo-tool/frontend/src/data/pseo-content.json') as f:
    data = json.load(f)

# Add jsonLd to new styles
new_styles = {
    "chinese-lattice": {
        "name": "Chinese Lattice",
        "desc": "chinese lattice tattoo ideas",
        "img_name": "Chinese Lattice tattoo idea"
    },
    "flame": {
        "name": "Flame",
        "desc": "flame tattoo ideas",
        "img_name": "Flame tattoo idea"
    },
    "dotwork": {
        "name": "Dotwork",
        "desc": "dotwork tattoo ideas",
        "img_name": "Dotwork tattoo idea"
    },
    "sacred-geometry": {
        "name": "Sacred Geometry",
        "desc": "sacred geometry tattoo ideas",
        "img_name": "Sacred Geometry tattoo idea"
    }
}

for slug, info in new_styles.items():
    if slug in data and 'jsonLd' not in data[slug]:
        # Generate image list for ImageGallery
        images = []
        for i in range(1, 25):
            images.append({
                "@type": "ImageObject",
                "contentUrl": f"https://inkpreview.co/images/ideas/{slug}/{i:02d}.webp",
                "name": f"{info['img_name']} {i}",
                "description": f"Reference design for {info['desc']}",
                "width": 600,
                "height": 750
            })
        
        # Create ImageGallery JSON-LD
        gallery_jsonld = json.dumps({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            "name": f"{info['name']} Tattoo Ideas",
            "url": f"https://inkpreview.co/tattoo-ideas/{slug}",
            "about": info['desc'],
            "image": images
        })
        
        # Create FAQ JSON-LD
        faq_jsonld = json.dumps({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": f"What are {info['name'].lower()} tattoos?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": f"{info['name']} tattoos feature distinctive patterns and techniques that create unique visual effects. Browse our gallery of 24 {info['name'].lower()} tattoo ideas and preview any design on your own body with InkPreview's free simulator."
                    }
                },
                {
                    "@type": "Question",
                    "name": f"Where is the best placement for a {info['name'].lower()} tattoo?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": f"The best placement depends on the size and detail of your {info['name'].lower()} design. Popular placements include forearm, upper arm, back, shoulder, and thigh. Use InkPreview to preview the design on different body areas."
                    }
                }
            ]
        })
        
        # Create BreadcrumbList JSON-LD
        breadcrumb_jsonld = json.dumps({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://inkpreview.co"},
                {"@type": "ListItem", "position": 2, "name": "Tattoo Ideas", "item": "https://inkpreview.co/tattoo-ideas/hub"},
                {"@type": "ListItem", "position": 3, "name": f"{info['name']} Tattoo Ideas", "item": f"https://inkpreview.co/tattoo-ideas/{slug}"}
            ]
        })
        
        data[slug]['jsonLd'] = [gallery_jsonld, faq_jsonld, breadcrumb_jsonld]
        print(f"Added jsonLd to {slug}")

with open('/root/projects/tattoo-tool/frontend/src/data/pseo-content.json', 'w') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Done")