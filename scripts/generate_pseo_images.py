#!/usr/bin/env python3
"""Generate PSEO images for new tattoo styles using SiliconFlow API."""
import os
import sys
import json
import time
import requests
from pathlib import Path

API_URL = "https://api.siliconflow.cn/v1/images/generations"
MODEL = "Kwai-Kolors/Kolors"

# Try to get API key from environment or worker secrets
API_KEY = os.environ.get("SILICONFLOW_API_KEY", "")

STYLES = {
    "chinese-lattice": [
        "Chinese lattice geometric pattern tattoo design, intricate interlocking hexagonal and diamond shapes, traditional Chinese window lattice motif, black ink on white background, clean lines, symmetrical, tattoo flash art",
        "Chinese crystal weaving pattern tattoo, delicate geometric mesh design with jade-like elements, traditional Chinese craft inspired, fine line work, black and grey, tattoo reference",
        "Chinese lattice rose window pattern tattoo, circular mandala with traditional Chinese geometric interlocking shapes, ornate, detailed, black ink, tattoo flash",
        "Chinese ice crack pattern tattoo, organic geometric lattice inspired by cracked ice in Chinese art, abstract angular lines, minimalist, black ink on white",
        "Chinese lattice border pattern tattoo, horizontal band of interlocking geometric shapes, traditional window screen design, clean precise lines, black ink",
        "Chinese hexagonal lattice tattoo, honeycomb pattern with traditional Chinese decorative elements, geometric precision, fine line, tattoo art",
        "Chinese lattice sleeve band tattoo, circular pattern wrapping around arm, traditional Chinese window design, symmetrical, detailed, black ink",
        "Chinese geometric star pattern tattoo, eight-pointed star with lattice fill, traditional Chinese motif, bold outline, intricate interior, tattoo flash",
        "Chinese lattice phoenix frame tattoo, geometric border enclosing phoenix silhouette, traditional Chinese craft pattern, detailed line work",
        "Chinese double happiness lattice tattoo, geometric pattern incorporating Chinese character motif, symmetrical, ornamental, black ink",
        "Chinese lattice wave pattern tattoo, geometric interpretation of ocean waves using interlocking shapes, flowing design, black ink",
        "Chinese plum blossom lattice tattoo, geometric grid with plum blossom elements integrated, nature meets geometry, fine line tattoo",
        "Chinese lattice dragon scale pattern tattoo, overlapping geometric scales inspired by Chinese dragon imagery, textured, detailed, black ink",
        "Chinese endless knot lattice tattoo, interlocking geometric pattern with no beginning or end, Buddhist-inspired, symmetrical, tattoo art",
        "Chinese lattice mountain pattern tattoo, geometric representation of mountain landscape using traditional grid motif, scenic, black ink",
        "Chinese pagoda lattice frame tattoo, architectural geometric pattern framing a pagoda silhouette, detailed, ornamental",
        "Chinese lattice butterfly pattern tattoo, geometric butterfly design with traditional Chinese lattice fill, delicate, symmetrical",
        "Chinese geometric cloud pattern tattoo, stylized cloud forms using lattice technique, flowing geometric shapes, traditional Chinese motif",
        "Chinese lattice fish scale pattern tattoo, overlapping semicircles in traditional Chinese arrangement, textured, detailed, black ink",
        "Chinese window lattice tattoo, rectangular frame with intricate traditional Chinese window pattern, architectural detail, fine line",
        "Chinese lattice lotus pattern tattoo, geometric lotus flower with lattice petals, sacred geometry meets Chinese tradition, detailed",
        "Chinese interlocking circles lattice tattoo, overlapping circular patterns creating geometric negative space, modern Chinese design",
        "Chinese lattice peony pattern tattoo, stylized peony flower rendered in geometric lattice technique, ornate, detailed, black ink",
        "Chinese lattice border sleeve tattoo, continuous geometric pattern designed for arm wrapping, traditional Chinese window motif, precise"
    ],
    "flame": [
        "Flame tattoo design, realistic fire with orange red and yellow gradients, dynamic flowing shapes, traditional flame art, tattoo flash on white background",
        "Japanese Hokusai flame pattern tattoo, stylized fire waves in ukiyo-e style, bold outlines, flowing curves, traditional Japanese fire motif",
        "Sacred flame tattoo, eternal flame with halo of light, spiritual fire design, symmetrical, detailed, black and grey with subtle color",
        "Flame sleeve band tattoo, horizontal ring of fire wrapping around arm, dynamic movement, traditional tattoo style, bold colors",
        "Candle flame tattoo, single elegant flame with melting wax, moody atmospheric, fine line work, black and grey realism",
        "Flame skull tattoo, human skull engulfed in stylized flames, dark dramatic design, bold outlines, traditional tattoo art",
        "Phoenix flame tattoo, rising from ashes with dramatic fire plumage, dynamic composition, detailed, bold colors on white",
        "Flame tribal pattern tattoo, Polynesian-inspired flame motifs in black tribal style, bold solid shapes, flowing design",
        "Campfire flame tattoo, small cozy campfire with dancing flames, minimalist design, warm colors, fine line detail",
        "Flame heart tattoo, heart shape formed by stylized flames, love and passion motif, bold colors, traditional tattoo style",
        "Flame serpent tattoo, snake coiled through stylized fire, dynamic movement, detailed scales and flame interaction",
        "Flame rose tattoo, rose with petals transitioning into flames, fire and beauty fusion, detailed, dramatic",
        "Blue flame tattoo, hot blue fire design, ethereal supernatural quality, cool color palette, modern tattoo style",
        "Flame sword tattoo, blade engulfed in sacred fire, warrior motif, detailed metalwork and flame interaction",
        "Flame dragon tattoo, Chinese dragon surrounded by stylized flames, dynamic composition, traditional Asian art influence",
        "Torch flame tattoo, Olympic-style torch with bright burning flame, classical design, detailed, bold",
        "Flame crown tattoo, ring of fire forming a royal crown shape, power and authority motif, symmetrical, detailed",
        "Volcanic flame tattoo, erupting volcano with flowing lava and flames, dramatic landscape, bold colors",
        "Flame feather tattoo, single feather with edges dissolving into flames, transformation motif, delicate, detailed",
        "Flame eye tattoo, all-seeing eye surrounded by mystical flames, occult symbolism, detailed linework",
        "Flame butterfly tattoo, butterfly with wings made of stylized fire, transformation and passion, delicate",
        "Candle ritual flame tattoo, ceremonial candle with magical flame, mystical atmosphere, fine detail",
        "Flame tree tattoo, tree of life with flame-like branches, nature meets fire, organic flowing design",
        "Flame compass tattoo, navigation compass surrounded by ring of fire, adventure motif, detailed, bold"
    ],
    "dotwork": [
        "Dotwork mandala tattoo, intricate circular pattern made entirely of dots, sacred geometry, meditative design, black ink on white",
        "Dotwork mountain landscape tattoo, scenic mountain range rendered in stipple technique, atmospheric, gradient dot density",
        "Dotwork geometric wolf tattoo, wolf portrait created with stipple dots, geometric framework, detailed, black and grey",
        "Dotwork sacred heart tattoo, traditional sacred heart design rendered in dot technique, ornate, detailed, devotional art",
        "Dotwork tree of life tattoo, organic tree form created entirely with dots, roots and branches, detailed stipple work",
        "Dotwork arrow tattoo, straight arrow with geometric dotwork patterns, precision and direction, clean stipple technique",
        "Dotwork crescent moon tattoo, lunar crescent filled with stipple pattern, celestial, delicate, night sky motif",
        "Dotwork compass rose tattoo, navigation compass with intricate dotwork detail, adventure theme, precise stipple",
        "Dotwork lotus flower tattoo, lotus rendered in graduated dot density, spiritual symbol, meditative, detailed",
        "Dotwork mountain goat tattoo, goat portrait in stipple technique on geometric mountain backdrop, detailed",
        "Dotwork diamond tattoo, faceted diamond with dotwork shading creating depth and brilliance, geometric, detailed",
        "Dotwork jellyfish tattoo, translucent jellyfish rendered in delicate dotwork, underwater scene, ethereal quality",
        "Dotwork snake tattoo, coiled serpent with dotwork scales, detailed texture, flowing composition, black ink",
        "Dotwork sun and moon tattoo, celestial bodies in dotwork technique, duality theme, balanced composition",
        "Dotwork peony tattoo, large peony flower rendered in graduated stipple, organic forms, detailed shading",
        "Dotwork hourglass tattoo, hourglass with sand rendered in dot technique, time theme, detailed, atmospheric",
        "Dotwork owl tattoo, owl portrait with dotwork feathers, wisdom symbol, detailed texture, dramatic",
        "Dotwork wave tattoo, ocean wave in Japanese style rendered with dots, flowing movement, detailed stipple",
        "Dotwork phoenix tattoo, mythical bird in stipple technique, rising from dots, transformation theme, detailed",
        "Dotwork galaxy tattoo, spiral galaxy rendered entirely with dots, cosmic scale, gradient density, ethereal",
        "Dotwork lion tattoo, lion portrait in stipple technique, regal and powerful, detailed dotwork shading",
        "Dotwork feather tattoo, single feather with each barb rendered as individual dots, delicate, precise",
        "Dotwork eye tattoo, realistic eye with iris rendered in concentric dotwork circles, detailed, mesmerizing",
        "Dotwork tree ring tattoo, cross-section of tree with growth rings in dotwork, nature time-keeping, detailed"
    ],
    "sacred-geometry": [
        "Flower of Life tattoo, overlapping circles forming sacred geometric pattern, ancient symbol, precise, symmetrical, black ink",
        "Metatron's Cube tattoo, complex geometric figure connecting all Platonic solids, sacred geometry, detailed, mystical",
        "Sri Yantra tattoo, interlocking triangles forming sacred Hindu geometric pattern, spiritual, symmetrical, detailed",
        "Seed of Life tattoo, seven overlapping circles forming flower-like pattern, sacred geometry seed, simple, profound",
        "Tree of Life geometric tattoo, tree silhouette with sacred geometry framework, nature meets mathematics, detailed",
        "Vesica Piscis tattoo, two overlapping circles creating sacred almond shape, fundamental sacred geometry, minimal",
        "Golden Ratio spiral tattoo, Fibonacci spiral with sacred geometric overlay, mathematical beauty, flowing",
        "Platonic solids tattoo, five geometric solids arranged in sacred pattern, mathematical precision, educational",
        "Merkaba tattoo, star tetrahedron sacred geometry, light body symbol, three-dimensional illusion, detailed",
        "Geometric mandala tattoo, circular sacred pattern with radial symmetry, meditative design, intricate, detailed",
        "Sacred geometry rose tattoo, rose flower constructed from geometric sacred patterns, nature meets math, beautiful",
        "Toroidal field tattoo, sacred geometry torus pattern, energy flow visualization, three-dimensional, dynamic",
        "Geometric lotus tattoo, lotus flower built from sacred geometric shapes, spiritual, symmetrical, precise",
        "Sacred geometry eye tattoo, all-seeing eye within geometric sacred framework, mystical, detailed, symbolic",
        "Geometric DNA tattoo, double helix with sacred geometry overlay, science meets spirituality, modern, detailed",
        "Sacred geometry heart tattoo, anatomical heart with geometric sacred pattern overlay, detailed, symbolic",
        "Geometric tree tattoo, tree silhouette with leaves as sacred geometric shapes, nature math fusion, detailed",
        "Sacred geometry sun tattoo, sun with radiating geometric sacred pattern, celestial, symmetrical, bold",
        "Geometric butterfly tattoo, butterfly wings with sacred geometry patterns, transformation and math, delicate",
        "Sacred geometry wolf tattoo, wolf portrait within geometric sacred framework, wild meets spiritual, detailed",
        "Geometric galaxy tattoo, spiral galaxy with sacred geometry overlay, cosmic patterns, mathematical, ethereal",
        "Sacred geometry feather tattoo, feather with internal sacred geometric pattern, detail meets simplicity",
        "Geometric lion tattoo, lion face constructed from sacred geometric shapes, regal, mathematical, bold",
        "Sacred geometry serpent tattoo, serpent coiled in sacred geometric pattern, infinity and wisdom, detailed"
    ]
}

def generate_image(prompt, output_path, api_key):
    """Generate a single image using SiliconFlow API."""
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": MODEL,
        "prompt": prompt,
        "image_size": "768x1024",
        "num_inference_steps": 20,
        "guidance_scale": 7.5
    }
    
    try:
        resp = requests.post(API_URL, headers=headers, json=payload, timeout=60)
        resp.raise_for_status()
        data = resp.json()
        
        if "images" in data and len(data["images"]) > 0:
            image_url = data["images"][0].get("url", "")
            if image_url:
                # Download and save
                img_resp = requests.get(image_url, timeout=30)
                img_resp.raise_for_status()
                
                # Convert to WebP
                from PIL import Image
                import io
                
                img = Image.open(io.BytesIO(img_resp.content))
                img = img.resize((600, 750), Image.LANCZOS)
                img.save(output_path, "WEBP", quality=85)
                return True
    except Exception as e:
        print(f"Error: {e}")
    return False

def main():
    api_key = API_KEY
    if not api_key:
        print("Error: SILICONFLOW_API_KEY not set")
        sys.exit(1)
    
    base_dir = Path("/root/projects/tattoo-tool/frontend/public/images/ideas")
    
    for style_slug, prompts in STYLES.items():
        style_dir = base_dir / style_slug
        style_dir.mkdir(parents=True, exist_ok=True)
        
        print(f"\n=== Generating {style_slug} ({len(prompts)} images) ===")
        
        for i, prompt in enumerate(prompts, 1):
            output_path = style_dir / f"{i:02d}.webp"
            
            if output_path.exists():
                print(f"  {i:02d}.webp - already exists, skipping")
                continue
            
            success = generate_image(prompt, output_path, api_key)
            if success:
                size_kb = output_path.stat().st_size / 1024
                print(f"  {i:02d}.webp - OK ({size_kb:.0f}KB)")
            else:
                print(f"  {i:02d}.webp - FAILED")
            
            time.sleep(1)  # Rate limiting
    
    print("\n=== Done ===")

if __name__ == "__main__":
    main()