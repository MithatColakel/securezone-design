#!/usr/bin/env python3
"""Build viewer/data.json from the Claude Design files in this folder.

Reads the two canvases (boards, pages, section titles, sticky notes):
  design-canvas/project/canvas.json    -> Screens  (frame ids "screens/<file name>")
  design-paywalls/project/canvas.json  -> Paywalls (frame ids "paywalls/<file name>")
and the @dsCard markers of design-system/project/components/*/preview.html.

  python3 tools/build_data.py <commit> [<branch>]
"""
import json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
commit = sys.argv[1] if len(sys.argv) > 1 else "unknown"
branch = sys.argv[2] if len(sys.argv) > 2 else "design-system"
CANVASES = [("screens", "Screens", "design-canvas/project"), ("paywalls", "Paywalls", "design-paywalls/project")]

pages, nboards, nsections, nnotes = [], 0, 0, 0
for cid, cname, folder in CANVASES:
    canvas = json.load(open(os.path.join(ROOT, folder, "canvas.json"), encoding="utf-8"))
    cpages = canvas.get("pages") or [{"id": "main", "name": "Canvas"}]
    first = cpages[0]["id"]
    notes = list(canvas.get("notes", {}).values())
    for pg in cpages:
        pid = pg["id"]
        on = lambda item: (item.get("page") or first) == pid
        sections = sorted(
            ({"title": n["text"], "x": n["x"], "y": n["y"], "maxW": n.get("maxW")} for n in notes if on(n) and n.get("kind") == "title1"),
            key=lambda s: s["y"],
        )
        stickies = [
            {"x": n["x"], "y": n["y"], "w": n.get("w", 640), "text": n["text"], "fill": n.get("fill", "blue")}
            for n in notes if on(n) and n.get("kind") is None and "text" in n
        ]

        def section_of(y):
            cur = None
            for s in sections:
                if s["y"] <= y:
                    cur = s["title"]
            return cur or "Index"

        boards = []
        for name in canvas["order"]:
            b = canvas["boards"][name]
            if not on(b):
                continue
            stem = re.sub(r"\.dc\.html$", "", name)
            boards.append({
                "id": f"{cid}/{stem}", "name": stem, "file": f"{folder}/{name}", "title": b.get("title", stem),
                "x": b["x"], "y": b["y"], "w": b["w"], "h": b["h"], "section": section_of(b["y"]),
            })
        if not boards and not stickies:
            continue
        pages.append({"id": f"{cid}-{pid}", "canvas": cid, "canvasName": cname, "name": pg["name"],
                      "boards": boards, "sections": sections, "notes": stickies})
        nboards += len(boards); nsections += len(sections); nnotes += len(stickies)

comp_dir = os.path.join(ROOT, "design-system/project/components")
cards = []
for d in sorted(os.listdir(comp_dir)):
    prev = os.path.join(comp_dir, d, "preview.html")
    if not os.path.exists(prev):
        continue
    first_line = open(prev, encoding="utf-8").readline()
    group = re.search(r'group="([^"]*)"', first_line)
    sub = re.search(r'subtitle="([^"]*)"', first_line)
    h = re.search(r"height=(\d+)", first_line)
    w = re.search(r"width=(\d+)", first_line)
    readme = os.path.join(comp_dir, d, "README.md")
    cards.append({
        "id": d, "title": d, "group": group.group(1) if group else "Cover",
        "subtitle": sub.group(1) if sub else "", "w": int(w.group(1)) if w else 960, "h": int(h.group(1)) if h else 600,
        "file": f"design-system/project/components/{d}/preview.html",
        "readme": f"design-system/project/components/{d}/README.md" if os.path.exists(readme) else None,
    })
group_order = ["Cover", "Foundations", "Onboarding", "Home", "Servers", "Paywalls", "Sheets", "Settings", "Controls", "App"]
groups = []
for g in group_order + sorted({c["group"] for c in cards} - set(group_order)):
    items = [c for c in cards if c["group"] == g]
    if items:
        groups.append({"name": g, "cards": items})

data = {
    "title": "Securezone VPN",
    "source": {"repo": "MithatColakel/SecurezoneVPN", "branch": branch, "commit": commit},
    "pages": pages,
    "ds": {"readme": "design-system/project/README.md", "groups": groups},
}
os.makedirs(os.path.join(ROOT, "viewer"), exist_ok=True)
with open(os.path.join(ROOT, "viewer/data.json"), "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, separators=(",", ":"))
print(f"{len(pages)} pages, {nboards} boards, {nsections} sections, {nnotes} notes, {len(cards)} cards")
