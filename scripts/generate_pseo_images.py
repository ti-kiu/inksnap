#!/usr/bin/env python3
"""Generate PSEO images via SiliconFlow API for new tattoo styles."""
import os
import sys
import json
import time
import requests
from pathlib import Path
from PIL import Image
import io

API_URL = "https://api.siliconflow.cn/v1/images/generations"
MODEL = "Kwai-Kolors/Kolors"

# API key from environment
API_KEY = os.environ.get("SILICONFLOW_API_KEY", "")
if not API_KEY:
    print("Error: Set SILICONFLOW_API_KEY environment variable")
    print("Usage: SILICONFLOW_API_KEY=sk-xxx python3 generate_pseo_images.py")
    sys.exit(1)

STYLES = {
    "chinese-lattice": [
        "Chinese lattice geometric pattern tattoo, intricate interlocking hexagonal shapes, traditional window lattice motif, black ink on white background, clean lines, symmetrical, tattoo flash art",
        "Chinese crystal weaving pattern tattoo, delicate geometric mesh with jade-like elements, traditional craft inspired, fine line work, black and grey",
        "Chinese lattice rose window tattoo, circular mandala with interlocking geometric shapes, ornate detailed, black ink",
        "Chinese ice crack pattern tattoo, organic geometric lattice from cracked ice in Chinese art, abstract angular lines, minimalist",
        "Chinese lattice border tattoo, horizontal band of interlocking shapes, traditional window screen design, clean precise lines",
        "Chinese hexagonal lattice tattoo, honeycomb pattern with decorative elements, geometric precision, fine line",
        "Chinese lattice sleeve band tattoo, circular pattern wrapping around arm, traditional window design, symmetrical detailed",
        "Chinese geometric star tattoo, eight-pointed star with lattice fill, traditional motif, bold outline, intricate interior",
        "Chinese lattice phoenix frame tattoo, geometric border enclosing phoenix silhouette, traditional craft pattern, detailed line work",
        "Chinese double happiness lattice tattoo, geometric pattern with Chinese character motif, symmetrical ornamental",
        "Chinese lattice wave tattoo, geometric interpretation of ocean waves using interlocking shapes, flowing design",
        "Chinese plum blossom lattice tattoo, geometric grid with plum blossom elements, nature meets geometry, fine line",
        "Chinese lattice dragon scale tattoo, overlapping geometric scales from Chinese dragon imagery, textured detailed",
        "Chinese endless knot lattice tattoo, interlocking pattern with no beginning or end, Buddhist-inspired, symmetrical",
        "Chinese lattice mountain tattoo, geometric mountain landscape using traditional grid motif, scenic",
        "Chinese pagoda lattice frame tattoo, architectural geometric pattern framing pagoda silhouette, ornamental",
        "Chinese lattice butterfly tattoo, geometric butterfly with traditional lattice fill, delicate symmetrical",
        "Chinese geometric cloud tattoo, stylized cloud forms using lattice technique, flowing shapes, traditional motif",
        "Chinese lattice fish scale tattoo, overlapping semicircles in traditional arrangement, textured detailed",
        "Chinese window lattice tattoo, rectangular frame with intricate traditional window pattern, architectural fine line",
        "Chinese lattice lotus tattoo, geometric lotus with lattice petals, sacred geometry meets tradition, detailed",
        "Chinese interlocking circles tattoo, overlapping circular patterns creating geometric negative space, modern",
        "Chinese lattice peony tattoo, stylized peony in geometric lattice technique, ornate detailed",
        "Chinese lattice border sleeve tattoo, continuous geometric pattern for arm wrapping, traditional window motif, precise"
    ],
    "flame": [
        "Flame tattoo design, realistic fire with orange red yellow gradients, dynamic flowing, traditional flame art, black white background",
        "Japanese Hokusai flame tattoo, stylized fire waves in ukiyo-e style, bold outlines, flowing curves",
        "Sacred flame tattoo, eternal flame with halo of light, spiritual fire design, symmetrical detailed",
        "Flame sleeve band tattoo, horizontal ring of fire wrapping around arm, dynamic movement, traditional bold",
        "Candle flame tattoo, single elegant flame with melting wax, moody atmospheric, fine line black grey",
        "Flame skull tattoo, human skull engulfed in stylized flames, dark dramatic, bold outlines traditional",
        "Phoenix flame tattoo, rising from ashes with dramatic fire plumage, dynamic composition detailed",
        "Flame tribal tattoo, Polynesian-inspired flame motifs in black tribal style, bold solid flowing",
        "Campfire flame tattoo, small cozy campfire with dancing flames, minimalist warm colors fine line",
        "Flame heart tattoo, heart shape formed by stylized flames, love passion motif, bold colors traditional",
        "Flame serpent tattoo, snake coiled through stylized fire, dynamic movement, detailed scales flame",
        "Flame rose tattoo, rose petals transitioning into flames, fire beauty fusion, detailed dramatic",
        "Blue flame tattoo, hot blue fire design, ethereal supernatural, cool color palette modern",
        "Flame sword tattoo, blade engulfed in sacred fire, warrior motif, detailed metalwork flame",
        "Flame dragon tattoo, Chinese dragon surrounded by stylized flames, dynamic Asian art influence",
        "Torch flame tattoo, Olympic-style torch with bright burning flame, classical detailed bold",
        "Flame crown tattoo, ring of fire forming royal crown, power authority motif, symmetrical detailed",
        "Volcanic flame tattoo, erupting volcano with flowing lava flames, dramatic landscape bold colors",
        "Flame feather tattoo, feather with edges dissolving into flames, transformation motif, delicate detailed",
        "Flame eye tattoo, all-seeing eye surrounded by mystical flames, occult symbolism detailed linework",
        "Flame butterfly tattoo, butterfly wings made of stylized fire, transformation passion, delicate",
        "Candle ritual flame tattoo, ceremonial candle with magical flame, mystical atmosphere fine detail",
        "Flame tree tattoo, tree of life with flame-like branches, nature meets fire, organic flowing",
        "Flame compass tattoo, navigation compass surrounded by ring of fire, adventure motif detailed bold"
    ],
    "dotwork": [
        "Dotwork mandala tattoo, intricate circular pattern made entirely of dots, sacred geometry, meditative black ink",
        "Dotwork mountain landscape tattoo, scenic mountain range in stipple technique, atmospheric gradient dot density",
        "Dotwork geometric wolf tattoo, wolf portrait created with stipple dots, geometric framework, detailed black grey",
        "Dotwork sacred heart tattoo, traditional sacred heart in dot technique, ornate detailed devotional",
        "Dotwork tree of life tattoo, organic tree form created entirely with dots, roots branches, detailed stipple",
        "Dotwork arrow tattoo, straight arrow with geometric dotwork patterns, precision direction, clean stipple",
        "Dotwork crescent moon tattoo, lunar crescent filled with stipple pattern, celestial delicate night sky",
        "Dotwork compass rose tattoo, navigation compass with intricate dotwork detail, adventure theme precise",
        "Dotwork lotus flower tattoo, lotus in graduated dot density, spiritual symbol, meditative detailed",
        "Dotwork mountain goat tattoo, goat portrait in stipple on geometric mountain backdrop, detailed",
        "Dotwork diamond tattoo, faceted diamond with dotwork shading creating depth brilliance, geometric detailed",
        "Dotwork jellyfish tattoo, translucent jellyfish in delicate dotwork, underwater scene, ethereal",
        "Dotwork snake tattoo, coiled serpent with dotwork scales, detailed texture, flowing composition black ink",
        "Dotwork sun and moon tattoo, celestial bodies in dotwork technique, duality theme balanced",
        "Dotwork peony tattoo, large peony in graduated stipple, organic forms, detailed shading",
        "Dotwork hourglass tattoo, hourglass with sand in dot technique, time theme, detailed atmospheric",
        "Dotwork owl tattoo, owl portrait with dotwork feathers, wisdom symbol, detailed texture dramatic",
        "Dotwork wave tattoo, ocean wave in Japanese style with dots, flowing movement, detailed stipple",
        "Dotwork phoenix tattoo, mythical bird in stipple technique, rising from dots, transformation detailed",
        "Dotwork galaxy tattoo, spiral galaxy entirely with dots, cosmic scale, gradient density ethereal",
        "Dotwork lion tattoo, lion portrait in stipple technique, regal powerful, detailed dotwork shading",
        "Dotwork feather tattoo, single feather with barbs as individual dots, delicate precise",
        "Dotwork eye tattoo, realistic eye with iris in concentric dotwork circles, detailed mesmerizing",
        "Dotwork tree ring tattoo, cross-section of tree with growth rings in dotwork, nature time-keeping detailed"
    ],
    "sacred-geometry": [
        "Flower of Life tattoo, overlapping circles forming sacred geometric pattern, ancient symbol, precise symmetrical",
        "Metatron Cube tattoo, complex geometric figure connecting Platonic solids, sacred geometry, detailed mystical",
        "Sri Yantra tattoo, interlocking triangles forming sacred Hindu pattern, spiritual symmetrical detailed",
        "Seed of Life tattoo, seven overlapping circles forming flower-like pattern, sacred geometry seed",
        "Tree of Life geometric tattoo, tree silhouette with sacred geometry framework, nature mathematics detailed",
        "Vesica Piscis tattoo, two overlapping circles creating sacred almond shape, fundamental sacred geometry",
        "Golden Ratio spiral tattoo, Fibonacci spiral with sacred geometric overlay, mathematical beauty flowing",
        "Platonic solids tattoo, five geometric solids in sacred pattern, mathematical precision educational",
        "Merkaba tattoo, star tetrahedron sacred geometry, light body symbol, three-dimensional illusion detailed",
        "Geometric mandala tattoo, circular sacred pattern with radial symmetry, meditative intricate detailed",
        "Sacred geometry rose tattoo, rose from geometric sacred patterns, nature meets math beautiful",
        "Toroidal field tattoo, sacred geometry torus pattern, energy flow visualization, three-dimensional dynamic",
        "Geometric lotus tattoo, lotus from sacred geometric shapes, spiritual symmetrical precise",
        "Sacred geometry eye tattoo, all-seeing eye within geometric sacred framework, mystical detailed symbolic",
        "Geometric DNA tattoo, double helix with sacred geometry overlay, science meets spirituality modern",
        "Sacred geometry heart tattoo, anatomical heart with geometric sacred pattern overlay, detailed symbolic",
        "Geometric tree tattoo, tree silhouette with leaves as sacred geometric shapes, nature math fusion",
        "Sacred geometry sun tattoo, sun with radiating geometric sacred pattern, celestial symmetrical bold",
        "Geometric butterfly tattoo, butterfly wings with sacred geometry patterns, transformation math delicate",
        "Sacred geometry wolf tattoo, wolf portrait within geometric sacred framework, wild meets spiritual detailed",
        "Geometric galaxy tattoo, spiral galaxy with sacred geometry overlay, cosmic patterns mathematical ethereal",
        "Sacred geometry feather tattoo, feather with internal sacred geometric pattern, detail meets simplicity",
        "Geometric lion tattoo, lion face from sacred geometric shapes, regal mathematical bold",
        "Sacred geometry serpent tattoo, serpent coiled in sacred geometric pattern, infinity wisdom detailed"
    ]
}

def generate_image(prompt, output_path, api_key, retries=3):
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
    
    for attempt in range(retries):
        try:
            resp = requests.post(API_URL, headers=headers, json=payload, timeout=120)
            if resp.status_code == 429:
                wait = int(resp.headers.get("Retry-After", 10))
                print(f"    Rate limited, waiting {wait}s...")
                time.sleep(wait)
                continue
            resp.raise_for_status()
            data = resp.json()
            
            if "images" in data and len(data["images"]) > 0:
                image_url = data["images"][0].get("url", "")
                if image_url:
                    img_resp = requests.get(image_url, timeout=60)
                    img_resp.raise_for_status()
                    
                    img = Image.open(io.BytesIO(img_resp.content))
                    img = img.resize((600, 750), Image.Resampling.LANCZOS)
                    img.save(output_path, "WEBP", quality=85)
                    return True
        except Exception as e:
            if attempt < retries - 1:
                time.sleep(5)
            else:
                print(f"    Error: {e}")
    return False

def main():
    base_dir = Path("/root/projects/tattoo-tool/frontend/public/images/ideas")
    
    total = sum(len(v) for v in STYLES.values())
    done = 0
    failed = 0
    
    for style_slug, prompts in STYLES.items():
        style_dir = base_dir / style_slug
        style_dir.mkdir(parents=True, exist_ok=True)
        
        print(f"\n=== {style_slug} ({len(prompts)} images) ===")
        
        for i, prompt in enumerate(prompts, 1):
            output_path = style_dir / f"{i:02d}.webp"
            
            # Check if it's a placeholder (small file, < 5KB)
            if output_path.exists() and output_path.stat().st_size > 5000:
                done += 1
                print(f"  {i:02d}.webp - OK (already generated)")
                continue
            
            success = generate_image(prompt, output_path, API_KEY)
            if success:
                size_kb = output_path.stat().st_size / 1024
                done += 1
                print(f"  {i:02d}.webp - OK ({size_kb:.0f}KB)")
            else:
                failed += 1
                print(f"  {i:02d}.webp - FAILED")
            
            time.sleep(2)  # Rate limiting
    
    print(f"\n=== Done: {done}/{total} generated, {failed} failed ===")

if __name__ == "__main__":
    main()