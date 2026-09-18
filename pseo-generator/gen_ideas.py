#!/usr/bin/env python3
"""InkPreview PSEO 图库页生成器（纯标准库）

用法:
    python gen_ideas.py                      # 读同目录 styles.json -> 输出 out/
    python gen_ideas.py --config styles.json --out out

产出:
    out/hub.html                图库总览墙（/tattoo-ideas）
    out/<style-slug>.html       每个风格的图库页（/tattoo-ideas/<slug>）
    out/placement-<slug>.html   部位页占位（/tattoo-ideas/placement/<slug>）—— 需补正文

图片规则（重要，务必按此放置）:
    路径: /images/ideas/<style-slug>/<NN>.webp   (NN = 01..NN)
    尺寸: 600x750 (4:5)，WebP，单张 < 60KB，缩略图 < 25KB
    存放: Cloudflare 静态资源（与站点同仓部署），**不要放 Cloudinary**（免费额度 25 credits/月 存储+带宽+转换共用，营销图会烧穿）
    命名: 语义化，如 geometric-tattoo-forearm-01.webp
"""

import argparse
import html
import json
import os
import re

# ---------------------------------------------------------------- 设计 token
CSS = """
:root{
  --cream:#FEFCF8; --warm-white:#F9F6F0; --sand:#EDE8DF; --charcoal:#2D2D2D;
  --stone:#6B6560; --sage:#8FA68B; --sage-light:#D4E2D1; --sage-dark:#5C7A57;
  --terracotta:#C4907A; --terracotta-light:#F0DDD4; --ink:#1A1A1A;
  --shadow-card:0 4px 16px rgba(45,45,45,.06); --shadow-soft:0 1px 3px rgba(45,45,45,.05);
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:var(--cream);color:var(--charcoal);font-family:'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif;font-size:16px;line-height:1.65;-webkit-font-smoothing:antialiased}
h1,h2,h3{font-family:'DM Serif Display',Georgia,serif;font-weight:400;color:var(--ink);line-height:1.2}
a{color:inherit;text-decoration:none}
.wrap{max-width:1200px;margin:0 auto;padding:0 24px}
.narrow{max-width:820px;margin:0 auto;padding:0 24px}

/* nav */
nav{position:sticky;top:0;z-index:50;background:rgba(254,252,248,.92);backdrop-filter:blur(10px);border-bottom:1px solid rgba(237,232,223,.7)}
nav .wrap{display:flex;align-items:center;justify-content:space-between;padding:16px 24px}
.brand{font-family:'DM Serif Display',serif;font-size:24px;color:var(--ink)}
.navlinks{display:none;align-items:center;gap:32px;font-size:14px;font-weight:500}
.navlinks a{color:var(--stone);transition:color .15s}
.navlinks a:hover{color:var(--charcoal)}
.navlinks a.active{color:var(--sage-dark)}
.btn{display:inline-flex;align-items:center;gap:8px;border-radius:8px;font-weight:500;transition:all .15s;cursor:pointer;border:none}
.btn-primary{background:var(--sage);color:#fff;padding:11px 22px;font-size:14.5px}
.btn-primary:hover{background:var(--sage-dark)}
.btn-ghost{border:1px solid var(--sand);background:transparent;color:var(--charcoal);padding:10px 20px;font-size:14.5px}
.btn-ghost:hover{background:var(--warm-white)}
.btn-lg{padding:15px 30px;font-size:16px}
@media(min-width:900px){.navlinks{display:flex}}

/* breadcrumb */
.crumb{font-size:13px;color:var(--stone);padding:20px 0 0}
.crumb a:hover{color:var(--sage-dark);text-decoration:underline}
.crumb span{color:var(--sand);margin:0 8px}

/* hero */
.hero{padding:28px 0 36px}
.hero h1{font-size:clamp(30px,4.6vw,46px);margin-bottom:14px}
.hero p{font-size:17.5px;color:var(--stone);max-width:720px}
.hero .cta-row{display:flex;flex-wrap:wrap;gap:12px;margin-top:22px}
.stat-row{display:flex;flex-wrap:wrap;gap:28px;margin-top:26px;font-size:13.5px;color:var(--stone)}
.stat-row b{display:block;font-size:22px;font-family:'DM Serif Display',serif;color:var(--ink)}

/* chips */
.chips{display:flex;flex-wrap:wrap;gap:9px;margin:26px 0 8px}
.chip{border:1px solid var(--sand);border-radius:999px;padding:7px 15px;font-size:13.5px;color:var(--stone);background:var(--warm-white);transition:all .15s}
.chip:hover{border-color:var(--sage);color:var(--sage-dark)}
.chip.on{background:var(--sage);border-color:var(--sage);color:#fff}

/* gallery grid */
.grid{display:grid;gap:16px;grid-template-columns:repeat(2,1fr);margin:22px 0 8px}
@media(min-width:640px){.grid{grid-template-columns:repeat(3,1fr)}}
@media(min-width:1024px){.grid{grid-template-columns:repeat(4,1fr)}}
.grid-wide{grid-template-columns:repeat(2,1fr)}
@media(min-width:768px){.grid-wide{grid-template-columns:repeat(4,1fr)}}

.card{background:var(--warm-white);border:1px solid var(--sand);border-radius:14px;overflow:hidden;box-shadow:var(--shadow-soft);transition:transform .18s,box-shadow .18s;display:block}
.card:hover{transform:translateY(-3px);box-shadow:var(--shadow-card)}
.ph{position:relative;aspect-ratio:4/5;background:linear-gradient(135deg,#EDE8DF 0%,#E4DED3 100%);overflow:hidden}
.ph::after{content:'';position:absolute;inset:0;background:
  radial-gradient(circle at 50% 42%,rgba(143,166,139,.20) 0 18%,transparent 19%),
  linear-gradient(180deg,transparent 60%,rgba(45,45,45,.04) 100%)}
.ph img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:2}
.card-body{padding:13px 15px 16px}
.card-body .t{font-family:'DM Serif Display',serif;font-size:17px;color:var(--ink)}
.card-body .d{font-size:12.5px;color:var(--stone);margin-top:5px;line-height:1.5}
.card-body .m{font-size:11.5px;color:var(--sage-dark);margin-top:9px;font-weight:500;letter-spacing:.02em}

/* section heads */
section{padding:34px 0}
h2.sec{font-size:clamp(23px,3vw,31px);margin-bottom:12px}
.sec-sub{color:var(--stone);font-size:16px;max-width:760px;margin-bottom:18px}

/* prose */
.prose{font-size:16px;color:#3a3a3a}
.prose h2{font-size:26px;margin:34px 0 12px}
.prose h3{font-size:20px;margin:24px 0 9px}
.prose p{margin:11px 0}
.prose ul{margin:11px 0 11px 20px}
.prose li{margin:6px 0}
.prose strong{color:var(--ink)}
.prose a{color:var(--sage-dark);text-decoration:underline;text-underline-offset:3px}

/* steps */
.steps{display:grid;gap:16px;grid-template-columns:1fr;margin-top:18px}
@media(min-width:768px){.steps{grid-template-columns:repeat(3,1fr)}}
.step{background:#fff;border:1px solid var(--sand);border-radius:12px;padding:20px}
.step .n{width:30px;height:30px;border-radius:999px;background:var(--sage-light);color:var(--sage-dark);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;margin-bottom:11px}
.step h3{font-size:17px;margin-bottom:6px}
.step p{font-size:14px;color:var(--stone)}

/* FAQ */
.faq details{background:var(--warm-white);border:1px solid var(--sand);border-radius:11px;padding:15px 18px;margin-bottom:10px}
.faq summary{font-weight:600;font-size:15.5px;cursor:pointer;color:var(--ink);list-style:none}
.faq summary::-webkit-details-marker{display:none}
.faq summary::after{content:'+';float:right;color:var(--sage-dark);font-weight:400;font-size:19px;line-height:1}
.faq details[open] summary::after{content:'−'}
.faq p{margin-top:10px;font-size:14.5px;color:#3a3a3a}

/* cta band */
.band{background:linear-gradient(135deg,#F9F6F0,#F0EDE5);border:1px solid var(--sand);border-radius:18px;padding:34px 30px;text-align:center;margin:34px 0}
.band h2{font-size:clamp(22px,3vw,30px);margin-bottom:10px}
.band p{color:var(--stone);max-width:600px;margin:0 auto 20px}

/* related */
.rel{display:flex;flex-wrap:wrap;gap:9px;margin-top:14px}
.rel a{border:1px solid var(--sand);background:#fff;border-radius:999px;padding:7px 15px;font-size:13.5px;color:var(--charcoal)}
.rel a:hover{border-color:var(--sage);color:var(--sage-dark)}

/* footer */
footer{border-top:1px solid var(--sand);margin-top:44px;padding:34px 0 44px;font-size:13.5px;color:var(--stone)}
.foot-grid{display:grid;gap:26px;grid-template-columns:1fr}
@media(min-width:768px){.foot-grid{grid-template-columns:2fr 1fr 1fr 1fr}}
footer h4{font-size:13px;color:var(--ink);font-family:'DM Sans',sans-serif;font-weight:700;margin-bottom:10px;letter-spacing:.04em;text-transform:uppercase}
footer li{list-style:none;margin:6px 0}
footer a:hover{color:var(--sage-dark)}
.foot-note{margin-top:26px;padding-top:18px;border-top:1px solid var(--sand);font-size:12.5px}
"""

FONTS = ('<link rel="preconnect" href="https://fonts.googleapis.com">'
         '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
         '<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&family=DM+Serif+Display&display=swap" rel="stylesheet">')

# ---------------------------------------------------------------- 组件
def nav(active=""):
    def cls(k):
        return ' class="active"' if k == active else ""
    return f"""<nav>
  <div class="wrap">
    <a href="/" class="brand">InkPreview</a>
    <div class="navlinks">
      <a href="/tattoo-simulator"{cls('sim')}>Tattoo Simulator</a>
      <a href="/tattoo-stencil-generator"{cls('stencil')}>Stencil Maker</a>
      <a href="/tattoo-ideas/hub"{cls('ideas')}>Tattoo Ideas</a>
      <a href="/pricing"{cls('pricing')}>Pricing</a>
      <a href="/tattoo-simulator" class="btn btn-primary">Try Free</a>
    </div>
  </div>
</nav>"""

def footer(styles):
    style_links = "".join(
        f'<li><a href="/tattoo-ideas/{s["slug"]}">{html.escape(s["name"])} Tattoo Ideas</a></li>'
        for s in styles[:8])
    return f"""<footer>
  <div class="wrap foot-grid">
    <div>
      <div class="brand" style="margin-bottom:8px">InkPreview</div>
      <p style="max-width:320px">Preview any tattoo on your own body before you commit. Free AI simulator, stencil maker and cover-up designer.</p>
    </div>
    <div>
      <h4>Tools</h4>
      <ul>
        <li><a href="/tattoo-simulator">Tattoo Simulator</a></li>
        <li><a href="/tattoo-stencil-generator">Stencil Generator</a></li>
        <li><a href="/tattoo-cover-up-design">Cover-Up Designer</a></li>
        <li><a href="/pricing">Pricing</a></li>
      </ul>
    </div>
    <div>
      <h4>Ideas by style</h4>
      <ul>{style_links}</ul>
    </div>
    <div>
      <h4>Company</h4>
      <ul>
        <li><a href="/privacy">Privacy Policy</a></li>
        <li><a href="/terms">Terms of Service</a></li>
        <li><a href="/refund-policy">Refund Policy</a></li>
        <li><a href="/cookie-policy">Cookie Policy</a></li>
      </ul>
    </div>
  </div>
  <div class="wrap foot-note">
    <p>Tattoo imagery on this page is AI-generated for inspiration only. Consult a licensed artist before booking.</p>
    <p style="margin-top:6px">© 2026 InkPreview. All rights reserved.</p>
  </div>
</footer>"""

def ph_block(style_slug, idx, alt, eager=False):
    """图片位：真图存在则显示，缺失时回退为素色占位（便于本地预览）。"""
    src = f'{IMAGE_BASE}/{style_slug}/{idx:02d}.webp'
    loading = 'eager' if eager else 'lazy'
    return (f'<div class="ph">'
            f'<img src="{src}" alt="{html.escape(alt)}" width="600" height="750" '
            f'loading="{loading}" decoding="async" '
            f'onerror="this.style.display=\'none\'"></div>')

def jsonld(obj):
    return ('<script type="application/ld+json">'
            + json.dumps(obj, ensure_ascii=False, separators=(',', ':'))
            + '</script>')

def page(title, desc, canonical, body, ld_blocks, preload=None):
    ld = "\n".join(jsonld(b) for b in ld_blocks)
    pl = f'\n  <link rel="preload" as="image" href="{preload}" fetchpriority="high">' if preload else ''
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{html.escape(title)}</title>
  <meta name="description" content="{html.escape(desc)}">
  <link rel="canonical" href="{canonical}">{pl}
  {FONTS}
  <style>{CSS}</style>
  {ld}
</head>
<body>
{body}
</body>
</html>
"""

# ---------------------------------------------------------------- 文案
HUB_INTRO = """<p>Tattoo ideas are easy to find and hard to choose between. The problem is not a shortage of
designs — it is that a design you liked on someone else's forearm can look completely different on your own
shoulder, at your own size, in your own skin tone. Every gallery below is built so you can browse the style
first, then see it on a real body photorealistically before you book anything.</p>
<p>Start with the styles most people ask for — <strong>minimalist</strong> and <strong>fine line</strong> if
this is your first tattoo, <strong>blackwork</strong> and <strong>geometric</strong> if you want something that
still reads clearly at a distance, <strong>Japanese</strong> or <strong>realism</strong> if you are planning a
larger piece that will take multiple sessions. Each style page includes placement notes, sizing guidance and
the practical questions artists actually ask you in the chair.</p>"""

HUB_CHOOSE = """<h2 class="sec">How to choose a style you will not regret</h2>
<div class="prose narrow" style="padding:0">
<h3>1. Match the style to how much space you want to cover</h3>
<p>Fine line, minimalist and small script designs suit a wrist, collarbone or ankle because they rely on
delicate detail rather than impact. Blackwork, Japanese and realism need real estate — a forearm, thigh,
shoulder or back — because they are built from gradients and large shapes that turn to mush when scaled down.
Choosing a style that fights your available space is the single most common reason people end up unhappy.</p>
<h3>2. Think about how it ages, not how it looks today</h3>
<p>Ink spreads slightly over the years and fine detail softens first. Bold outlines, solid black and clear
negative space stay legible for decades; hairline lettering and tiny photorealistic portraits are the first
to blur. If you want the piece to still work at fifty, weight the line work over the intricacy.</p>
<h3>3. Preview it at your size before you commit</h3>
<p>The preview stage is where most bad decisions get caught. Use the <a href="/tattoo-simulator">tattoo
simulator</a> to place a design on your own photo at roughly the size you are considering, and look at it
from a distance. If it reads clearly at arm's length, it will hold up. If you have to squint, ask your artist
to simplify the design rather than shrink it.</p>
<h3>4. Bring reference, not instructions</h3>
<p>Every style page here is reference material. A licensed artist will redraw any of it in their own hand —
that is the point. Bring three to five references, tell them what you like about each, and let them build
something that fits your body rather than copying a design pixel for pixel.</p>
</div>"""

def style_copy(name, kw):
    return f"""<div class="prose">
<h2>What defines a {name.lower()} tattoo</h2>
<p>{name} work is recognised by how it handles line, contrast and negative space rather than by subject matter.
The rules are consistent across arms, ribs and backs: the composition has to stay readable as the body moves,
which is why experienced artists design to the placement instead of drawing flat on paper and hoping the shape
survives the skin.</p>
<h3>Design notes from the chair</h3>
<ul>
  <li><strong>Line weight:</strong> heavier outlines read better over time; hairline detail is the first thing to blur as ink settles.</li>
  <li><strong>Scale:</strong> plan the smallest size you are happy with, then go 15–20% larger — shrinking detail is what kills legibility.</li>
  <li><strong>Flow:</strong> the piece should follow the muscle it sits on, not sit on top of it like a sticker.</li>
  <li><strong>Contrast:</strong> keep value range wide — the difference between the darkest and lightest area is what makes the piece pop from across a room.</li>
</ul>
<h3>Choosing a placement for a {name.lower()} piece</h3>
<p>Forearm and upper arm are the most forgiving: flat enough for detail, visible enough to enjoy, and easy to
cover if you need to. Ribs and spine give a long vertical canvas that suits flowing compositions, but they are
among the most painful areas and the ink can distort with weight change. Wrists, ankles and hands are high
visibility and high friction — expect faster fading and touch-ups. If you are unsure, preview two placements
side by side with the <a href="/tattoo-simulator">simulator</a> before deciding.</p>
<h3>Size, sessions and cost</h3>
<p>Most artists price {name.lower()} work by the hour or by the session rather than by design. A small piece
is typically a single sitting; anything covering a forearm usually takes two to four sessions, spaced three to
six weeks apart so the skin can heal between passes. Ask three questions before booking: how many sessions
they expect, what the hourly rate is, and whether touch-ups after healing are included.</p>
<h3>Pain and aftercare, realistically</h3>
<p>Pain scales with proximity to bone and nerve density — outer forearm is mild, ribs, ribs and feet are not.
The first twenty minutes are the worst and it settles after that. Aftercare is unglamorous and decisive:
keep it clean, moisturise thinly and often, do not scratch, and keep it out of direct sun and pools for the
first two weeks. Sun exposure over the following years is what fades a tattoo long before the ink does.</p>
<h3>Common mistakes with {name.lower()} designs</h3>
<ul>
  <li>Choosing the design at screen size and never viewing it on the body at the target scale.</li>
  <li>Packing fine detail into a small area instead of simplifying the shape.</li>
  <li>Copying a design exactly without asking the artist to adapt it to that specific muscle group.</li>
  <li>Skipping the touch-up session once the piece has healed and settled.</li>
</ul>
<h3>Frequently asked about {kw}</h3>
<p>Use the gallery above as starting reference, then use the simulator to check the design against your own
body. If you are also planning lettering or a cover-up, look at
<a href="/tattoo-ideas/script-lettering">script &amp; lettering</a> and the
<a href="/tattoo-cover-up-design">cover-up designer</a> before you commit to a size.</p>
</div>"""

# ---------------------------------------------------------------- 生成
def build_hub(cfg, styles):
    base = cfg["domain"]
    cards = []
    for s in styles:
        alt = f'{s["name"].lower()} tattoo idea preview'
        cards.append(f"""<a class="card" href="/tattoo-ideas/{s['slug']}">
  {ph_block(s['slug'], 1, alt)}
  <div class="card-body">
    <div class="t">{html.escape(s['name'])} Tattoo Ideas</div>
    <div class="d">{html.escape(s['blurb'])}</div>
    <div class="m">{s['images']} designs →</div>
  </div>
</a>""")
    placement_chips = "".join(
        f'<a class="chip" href="/tattoo-ideas/placement/{p["slug"]}">{p["name"]} tattoos</a>'
        for p in cfg["placements"])

    body = f"""{nav('ideas')}
<main class="wrap">
  <div class="crumb"><a href="/">Home</a><span>/</span><strong style="color:var(--charcoal)">Tattoo Ideas</strong></div>

  <header class="hero">
    <h1>Tattoo Ideas — Browse by Style, Then See It On You</h1>
    {HUB_INTRO}
    <div class="cta-row">
      <a href="/tattoo-simulator" class="btn btn-primary btn-lg">Preview a design on my body — free</a>
      <a href="/tattoo-stencil-generator" class="btn btn-ghost btn-lg">Make a stencil</a>
    </div>
    <div class="stat-row">
      <div><b>16</b>styles covered</div>
      <div><b>380+</b>reference designs</div>
      <div><b>8</b>placement guides</div>
      <div><b>10s</b>to preview one on your photo</div>
    </div>
  </header>

  <section>
    <h2 class="sec">Browse by style</h2>
    <p class="sec-sub">Pick the style you are drawn to, then open its gallery. Every page also links to the
    simulator so you can test the design on your own body at the size you actually want.</p>
    <div class="grid">{''.join(cards)}</div>
  </section>

  <section>
    <h2 class="sec">Browse by placement</h2>
    <p class="sec-sub">Placement decides how a design flows and how much detail it can hold.</p>
    <div class="chips">{placement_chips}
      <a class="chip" href="/tattoo-ideas/placement/neck">Neck</a>
      <a class="chip" href="/tattoo-ideas/placement/hand">Hand</a>
      <a class="chip" href="/tattoo-ideas/placement/chest">Chest</a>
    </div>
    <div class="grid">
      {''.join(f'<a class="card" href="/tattoo-ideas/placement/{p["slug"]}">{ph_block("geometric", 2, p["name"] + " tattoo placement")}<div class="card-body"><div class="t">{p["name"]} Tattoos</div><div class="d">Flow, size and pain notes for the {p["name"].lower()}.</div></div></a>' for p in cfg["placements"][:4])}
    </div>
  </section>

  <section>{HUB_CHOOSE}</section>

  <section>
    <div class="band">
      <h2>Not sure which one suits your body?</h2>
      <p>Upload one photo, describe the design, and see it on your own skin in about ten seconds. No sign-up
      needed for your first preview.</p>
      <a href="/tattoo-simulator" class="btn btn-primary btn-lg">Try the free simulator</a>
    </div>
  </section>

  <section>
    <h2 class="sec">Popular within tattoo ideas</h2>
    <div class="rel">
      {''.join(f'<a href="/tattoo-ideas/{s["slug"]}">{html.escape(s["name"])} tattoo ideas</a>' for s in styles)}
    </div>
  </section>
</main>
{footer(styles)}"""

    ld = [
        {"@context": "https://schema.org", "@type": "CollectionPage",
         "name": "Tattoo Ideas — Browse by Style",
         "description": "Browse tattoo ideas by style and placement, then preview them on your own body with a free AI tattoo simulator.",
         "url": f"{base}/tattoo-ideas/hub",
         "isPartOf": {"@type": "WebSite", "name": "InkPreview", "url": base},
         "hasPart": [{"@type": "CollectionPage", "name": f'{s["name"]} Tattoo Ideas',
                      "url": f'{base}/tattoo-ideas/{s["slug"]}'} for s in styles]},
        {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": base},
            {"@type": "ListItem", "position": 2, "name": "Tattoo Ideas", "item": f"{base}/tattoo-ideas/hub"}]},
    ]
    return page("Tattoo Ideas — Browse 16 Styles & 380+ Designs | InkPreview",
                "Browse tattoo ideas by style (minimalist, fine line, blackwork, Japanese, geometric and more) and placement. Preview any design on your own body free with InkPreview.",
                f"{base}/tattoo-ideas/hub", body, ld)

def build_style(cfg, s, all_styles):
    base = cfg["domain"]
    name, slug, kw = s["name"], s["slug"], s["keywords"]
    n = s["images"]
    gallery = []
    for i in range(1, n + 1):
        alt = f'{name.lower()} tattoo idea {i} — {kw[0]} reference design'
        gallery.append(f'<a class="card" href="#" aria-label="{html.escape(alt)}">{ph_block(slug, i, alt, eager=(i <= 4))}</a>')

    related = [x for x in all_styles if x["slug"] != slug][:6]
    faqs = [
        (f"How much does a {name.lower()} tattoo cost?",
         f"Most artists charge by the hour or by session rather than by design. A small {name.lower()} piece is usually one sitting; larger pieces covering a forearm or back typically run two to four sessions. Ask for the hourly rate, the expected number of sessions, and whether touch-ups are included."),
        (f"How do I know if a {name.lower()} design will suit my body?",
         "Upload a photo to the simulator and place the design at the size you are considering, then look at it from a distance. If it stays readable at arm's length, it will hold up on skin."),
        (f"Do {name.lower()} tattoos age well?",
         "Bold line work, solid contrast and clear negative space age the best. Very fine detail and tiny lettering soften first as ink settles and skin changes."),
        (f"Is it safe to bring a {name.lower()} reference to my artist?",
         "Yes. Bring three to five references and explain what you like about each one. A good artist will redraw the idea for your body instead of copying it exactly."),
        (f"Which placement works best for {name.lower()} designs?",
         "Outer forearm and upper arm are the most forgiving for detail and visibility. Ribs and spine suit long flowing compositions but are more painful; wrists and hands fade faster."),
    ]
    faq_html = "".join(
        f'<details><summary>{html.escape(q)}</summary><p>{html.escape(a)}</p></details>' for q, a in faqs)

    body = f"""{nav('ideas')}
<main class="wrap">
  <div class="crumb"><a href="/">Home</a><span>/</span><a href="/tattoo-ideas/hub">Tattoo Ideas</a><span>/</span><strong style="color:var(--charcoal)">{html.escape(name)}</strong></div>

  <header class="hero">
    <h1>{html.escape(name)} Tattoo Ideas</h1>
    <p>{html.escape(s['blurb'])} Browse {n} reference designs below, then preview any of them on your own
    body with the free <a href="/tattoo-simulator" style="color:var(--sage-dark);text-decoration:underline">tattoo simulator</a>.</p>
    <div class="cta-row">
      <a href="/tattoo-simulator" class="btn btn-primary btn-lg">See it on my skin — free</a>
      <a href="/tattoo-stencil-generator" class="btn btn-ghost btn-lg">Turn one into a stencil</a>
    </div>
  </header>

  <div class="chips">
    {''.join(f'<a class="chip{" on" if x["slug"] == slug else ""}" href="/tattoo-ideas/{x["slug"]}">{html.escape(x["name"])}</a>' for x in all_styles)}
  </div>

  <section>
    <h2 class="sec">{html.escape(name)} tattoo ideas</h2>
    <p class="sec-sub">{n} reference designs. Click any design to preview it on your own photo — the simulator
    keeps the design on your skin while you adjust size and placement.</p>
    <div class="grid">{''.join(gallery)}</div>
  </section>

  <section>
    <h2 class="sec">Preview any of these on your body in 3 steps</h2>
    <div class="steps">
      <div class="step"><div class="n">1</div><h3>Upload a photo</h3><p>A clear, well-lit photo of the area you are considering. Phone camera is fine.</p></div>
      <div class="step"><div class="n">2</div><h3>Describe or pick the design</h3><p>Choose a style from the gallery or describe what you want in plain words.</p></div>
      <div class="step"><div class="n">3</div><h3>Compare and decide</h3><p>Adjust size and placement, then share the preview with your artist as reference.</p></div>
    </div>
  </section>

  <section>{style_copy(name, kw[0])}</section>

  <section>
    <h2 class="sec">FAQ — {html.escape(name)} tattoos</h2>
    <div class="faq">{faq_html}</div>
  </section>

  <section>
    <div class="band">
      <h2>Still deciding? Put it on your skin first.</h2>
      <p>Upload a photo and see any of these {n} designs on your own body in about ten seconds. No sign-up for
      your first preview.</p>
      <a href="/tattoo-simulator" class="btn btn-primary btn-lg">Open the simulator</a>
    </div>
  </section>

  <section>
    <h2 class="sec">Related styles</h2>
    <div class="rel">
      {''.join(f'<a href="/tattoo-ideas/{x["slug"]}">{html.escape(x["name"])} tattoo ideas</a>' for x in related)}
      <a href="/tattoo-ideas/hub">All tattoo ideas →</a>
    </div>
  </section>
</main>
{footer(all_styles)}"""

    images_ld = [{
        "@type": "ImageObject",
        "contentUrl": f'{base}{IMAGE_BASE}/{slug}/{i:02d}.webp',
        "name": f'{name} tattoo idea {i}',
        "description": f'Reference design for {kw[0]}',
        "width": 600, "height": 750,
    } for i in range(1, n + 1)]
    ld = [
        {"@context": "https://schema.org", "@type": "ImageGallery",
         "name": f"{name} Tattoo Ideas", "url": f"{base}/tattoo-ideas/{slug}",
         "about": kw[0], "image": images_ld},
        {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Home", "item": base},
            {"@type": "ListItem", "position": 2, "name": "Tattoo Ideas", "item": f"{base}/tattoo-ideas/hub"},
            {"@type": "ListItem", "position": 3, "name": f"{name} Tattoo Ideas", "item": f"{base}/tattoo-ideas/{slug}"}]},
        {"@context": "https://schema.org", "@type": "FAQPage",
         "mainEntity": [{"@type": "Question", "name": q,
                         "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in faqs]},
    ]
    return page(f"{name} Tattoo Ideas — {n} Designs to Preview Free | InkPreview",
                f"{n} {name.lower()} tattoo ideas with placement, sizing and cost notes. Preview any design on your own body free with the InkPreview tattoo simulator.",
                f"{base}/tattoo-ideas/{slug}", body, ld,
                preload=f'{IMAGE_BASE}/{slug}/01.webp')

def build_placement(cfg, p, all_styles):
    base = cfg["domain"]
    others = "".join(f'<a href="/tattoo-ideas/placement/{x["slug"]}">{x["name"]}</a>'
                     for x in cfg["placements"] if x["slug"] != p["slug"])
    cards = "".join(
        f'<a class="card" href="/tattoo-ideas/{s["slug"]}">{ph_block(s["slug"], 3, s["name"] + " tattoo on " + p["name"])}'
        f'<div class="card-body"><div class="t">{html.escape(s["name"])} on {p["name"]}</div></div></a>'
        for s in all_styles[:8])
    body = f"""{nav('ideas')}
<main class="wrap">
  <div class="crumb"><a href="/">Home</a><span>/</span><a href="/tattoo-ideas/hub">Tattoo Ideas</a><span>/</span><strong style="color:var(--charcoal)">{p["name"]}</strong></div>
  <header class="hero">
    <h1>{p["name"]} Tattoo Ideas</h1>
    <p>How designs flow on the {p["name"].lower()}, what size actually works there, and how to preview one on
    your own photo before you book.</p>
    <div class="cta-row"><a href="/tattoo-simulator" class="btn btn-primary btn-lg">Preview on my {p["name"].lower()}</a></div>
  </header>
  <section>
    <h2 class="sec">Styles that work well on the {p["name"].lower()}</h2>
    <div class="grid">{cards}</div>
  </section>
  <section>
    <div class="band">
      <h2>Check it on your own body first</h2>
      <p>Upload a photo of your {p["name"].lower()} and place any design from the galleries above.</p>
      <a href="/tattoo-simulator" class="btn btn-primary btn-lg">Open the simulator</a>
    </div>
  </section>
  <section>
    <h2 class="sec">Other placements</h2>
    <div class="rel">{others}<a href="/tattoo-ideas/hub">All tattoo ideas →</a></div>
  </section>
</main>
{footer(all_styles)}"""
    ld = [{"@context": "https://schema.org", "@type": "CollectionPage",
           "name": f"{p['name']} Tattoo Ideas", "url": f"{base}/tattoo-ideas/placement/{p['slug']}"}]
    return page(f"{p['name']} Tattoo Ideas — Size, Flow & Free Preview | InkPreview",
                f"{p['name']} tattoo ideas: what works on this placement, sizing guidance and a free simulator to preview any design on your own photo.",
                f"{base}/tattoo-ideas/placement/{p['slug']}", body, ld)

# ---------------------------------------------------------------- main
IMAGE_BASE = "/images/ideas"

def main():
    ap = argparse.ArgumentParser()
    here = os.path.dirname(os.path.abspath(__file__))
    ap.add_argument("--config", default=os.path.join(here, "styles.json"))
    ap.add_argument("--out", default=os.path.join(here, "out"))
    args = ap.parse_args()

    global IMAGE_BASE
    with open(args.config, encoding="utf-8") as f:
        cfg = json.load(f)
    IMAGE_BASE = cfg.get("image_base", IMAGE_BASE)
    styles = cfg["styles"]
    os.makedirs(args.out, exist_ok=True)

    written = []
    def dump(fn, content):
        path = os.path.join(args.out, fn)
        with open(path, "w", encoding="utf-8") as fh:
            fh.write(content)
        written.append((fn, len(content)))

    dump("hub.html", build_hub(cfg, styles))
    for s in styles:
        dump(f"{s['slug']}.html", build_style(cfg, s, styles))
    for p in cfg["placements"]:
        dump(f"placement-{p['slug']}.html", build_placement(cfg, p, styles))

    print(f"生成 {len(written)} 个页面 → {args.out}")
    for fn, size in written[:6]:
        print(f"  {fn}  ({size//1024} KB)")
    print(f"  … 共 {len(written)} 个（hub 1 + 风格页 {len(styles)} + 部位页 {len(cfg['placements'])}）")

if __name__ == "__main__":
    main()
