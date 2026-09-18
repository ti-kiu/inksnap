#!/usr/bin/env python3
"""InkPreview PSEO 批量生成脚本 (v4 - 通过Worker端点)
用法: python3 generate_tattoos.py [--styles geometric] [--count 3]
"""
import argparse, base64, json, os, sys, time, urllib.request, urllib.error
from pathlib import Path

API_URL = "https://api.inkpreview.co/api/batch-generate"
ADMIN_KEY = "inkpreview-batch-2024"
OUT_DIR = Path(__file__).parent.parent / "public" / "images" / "ideas"

STYLES = {
    "geometric": "geometric tattoo design, sacred geometry, clean lines, symmetrical patterns, mandala elements",
    "japanese": "japanese irezumi tattoo design, koi fish, dragon, cherry blossoms, waves, traditional",
    "minimalist": "minimalist fine-line tattoo design, simple clean lines, small delicate, single needle",
    "blackwork": "blackwork tattoo design, bold solid black, high contrast, negative space",
    "fine-line": "fine line tattoo design, delicate single needle, hairline detail, elegant",
    "traditional": "traditional American tattoo design, bold outlines, classic motifs, limited palette",
    "realism": "photorealistic tattoo design, highly detailed, realistic shading and depth",
    "tribal": "polynesian tribal tattoo design, bold black patterns, cultural motifs",
    "watercolor": "watercolor tattoo design, flowing colors, paint splash, artistic brushstrokes",
    "neo-traditional": "neo-traditional tattoo design, modern with rich detail, dimensional shading",
    "ornamental": "ornamental tattoo design, mandala, dotwork, jewellery-like patterns",
    "script-lettering": "script lettering tattoo design, elegant typography, calligraphy",
    "anime": "anime manga tattoo design, character art, dynamic poses, Japanese pop culture",
    "floral": "floral botanical tattoo design, peonies, roses, wildflowers, botanical line art",
    "snake-dragon": "snake dragon tattoo design, serpentine form, coiled, scales detail",
    "small-simple": "small simple tattoo design, tiny symbol, minimalist, first tattoo",
}

def generate_image(prompt: str, style: str) -> bytes | None:
    """Generate image via Worker endpoint."""
    payload = json.dumps({"prompt": prompt, "style": style}).encode()
    req = urllib.request.Request(API_URL, data=payload, headers={
        "X-Admin-Key": ADMIN_KEY,
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; InkPreview/1.0)",
    })
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            data = json.loads(resp.read())
            if data.get("success") and data.get("imageBase64"):
                return base64.b64decode(data["imageBase64"])
            else:
                print(f"  ✗ Error: {data.get('error', 'unknown')}", file=sys.stderr)
                return None
    except Exception as e:
        print(f"  ✗ Error: {e}", file=sys.stderr)
        return None

def to_webp(raw: bytes) -> bytes | None:
    """Convert image bytes to WebP, resize to 600x750, compress <60KB."""
    try:
        from PIL import Image
        import io
        img = Image.open(io.BytesIO(raw))
        img = img.resize((600, 750), Image.LANCZOS)
        buf = io.BytesIO()
        img.save(buf, format="WEBP", quality=80, method=6)
        webp = buf.getvalue()
        # If > 60KB, reduce quality
        quality = 75
        while len(webp) > 60 * 1024 and quality > 40:
            buf = io.BytesIO()
            img.save(buf, format="WEBP", quality=quality, method=6)
            webp = buf.getvalue()
            quality -= 5
        return webp
    except ImportError:
        return raw if len(raw) < 200 * 1024 else None

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--styles", default="all", help="Comma-separated style slugs or 'all'")
    ap.add_argument("--count", type=int, default=24, help="Images per style")
    ap.add_argument("--offset", type=int, default=1, help="Start numbering from")
    ap.add_argument("--delay", type=float, default=10.0, help="Seconds between API calls")
    args = ap.parse_args()

    if args.styles == "all":
        selected = list(STYLES.keys())
    else:
        selected = [s.strip() for s in args.styles.split(",")]

    total = len(selected) * args.count
    print(f"Generating {total} images ({len(selected)} styles × {args.count})")
    print(f"Output: {OUT_DIR}")
    print(f"Using Worker endpoint: {API_URL}")
    print()

    generated = 0
    skipped = 0
    failed = 0

    for style_slug in selected:
        if style_slug not in STYLES:
            print(f"Unknown style: {style_slug}, skipping")
            continue

        out_dir = OUT_DIR / style_slug
        out_dir.mkdir(parents=True, exist_ok=True)
        prompt_base = STYLES[style_slug]
        print(f"▸ {style_slug} ({args.count} images)")

        for i in range(args.offset, args.offset + args.count):
            fname = f"{i:02d}.webp"
            fpath = out_dir / fname
            if fpath.exists() and fpath.stat().st_size > 1000:
                skipped += 1
                continue

            prompt = f"{prompt_base}, isolated on solid pure white background, no person, high contrast, tattoo flash sheet style"
            raw = generate_image(prompt, style_slug)
            if not raw:
                failed += 1
                time.sleep(args.delay)
                continue

            webp = to_webp(raw)
            if webp:
                fpath.write_bytes(webp)
                size_kb = len(webp) / 1024
                generated += 1
                print(f"  ✓ {fname} ({size_kb:.1f} KB)")
            else:
                failed += 1

            time.sleep(args.delay)

    print(f"\nDone: {generated} generated, {skipped} skipped (existing), {failed} failed")

if __name__ == "__main__":
    main()
