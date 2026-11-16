#!/usr/bin/env python3
"""Stop the update if a file of this public page must not be public.

  python3 tools/check_public.py [<site root>]

This page is public (board, 2026-11-15). The check reads every file of the site except .git/ and the
rendered images in shots/: the copied design folders, the viewer, the tools and the README. A file must not:
- name another app or a person (Apple rule: Apple must never be able to link the two apps);
- hold a secret, a key, a token, an Apple team id, an e-mail address or a real IP address;
- load anything from an Apple host.
The names are in this file only as SHA-256 hashes, so the file itself names nobody. The check prints the
file and the rule, never the matched text, so a secret does not go into a log.
"""
import hashlib, ipaddress, os, re, sys, unicodedata

ROOT = sys.argv[1] if len(sys.argv) > 1 else os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SKIP_DIRS = {".git", "shots"}
TEXT = (".html", ".htm", ".json", ".md", ".css", ".js", ".cjs", ".mjs", ".py", ".sh", ".svg", ".txt", ".xml", ".csv", ".yml", ".yaml")

# ---- names (SHA-256 of the lower-case name, letters and digits only) ----
OTHER_APPS = {"a7e2f3a9b0b96410c18bcb90c389b6d3004c3b35751f30a0ac0d667580b32e6c"}  # other apps (pieces of a word, or two words written apart)
PERSON_WORDS = {
    "7cc4464f2fddd42edbc99bd348f5a5edfe0fc8cb4833f95b09ac002c99c3bab7",
    "8a9d416b73afa7e0b7af2dc7df2aec5dbbf555ff5ac7000a50179cdb42143c5c",
    "e1a96de780970b6c81c973e95d76bc62fddfda4232efde5896519ddd5b1b264e",
    "22dadcbb47b620c884dfcd6ad128fb8326a1dd3641cf5395f585d18a2525c80b",
    "5e5a400162e00126b343c84fc5702ffa965f03588437a094cbf77d3d4dd514e8",
    "bbffc340171bde34c4cc4c4a3946388e58ff7d184bb505c090cb1f20274d0e07",
}  # first and family names of people (whole words)
PERSON_PARTS = {"62cfbfd0f282bad71ebfb0643338b2499b9c30533e46669221522d9515ede896"}  # a device named after a person (piece of a word)
ALLOW_WORDS = {"mithatcolakel", "mithat3313"}  # the GitHub owner of this page: it is in the page address
ALLOW_EMAILS = set()


def sha(s):
    return hashlib.sha256(s.encode("utf-8")).hexdigest()


def fold(text):
    """Lower case, accents removed (c-cedilla is c), so a name matches however it is written."""
    t = unicodedata.normalize("NFKD", text)
    return "".join(ch for ch in t if not unicodedata.combining(ch))


WORD = re.compile(r"[a-z0-9]+")
CAMEL = re.compile(r"[A-Z][a-z]+|[a-z]+|[A-Z]+(?![a-z])|[0-9]+")
LENS = range(6, 17)  # piece lengths to test; the names are inside this range
_memo = {}


def pieces(s, join=None):
    """Every piece of s with a length in LENS. With join: only the pieces that cover position join."""
    for n in LENS:
        first, last = (0, len(s) - n) if join is None else (max(0, join - n + 1), min(len(s) - n, join - 1))
        for i in range(first, last + 1):
            yield s[i:i + n]


def word_problems(w):
    if w not in _memo:
        found = set()
        if w not in ALLOW_WORDS and len(w) <= 64:
            hs = {sha(p) for p in pieces(w)}
            if hs & OTHER_APPS:
                found.add("names another app")
            if sha(w) in PERSON_WORDS or hs & PERSON_PARTS:
                found.add("names a person")
        _memo[w] = found
    return _memo[w]


def name_problems(text):
    """'other app' and 'person' checks on one text. Returns a set of rule names."""
    folded = fold(text)
    words = WORD.findall(folded.lower())
    found = set()
    for w in set(words):
        found |= word_problems(w)
    # Names inside a word written in camel case ("NameIphone").
    for w in set(re.findall(r"[A-Za-z0-9]+", folded)):
        if w.lower() in ALLOW_WORDS:
            continue
        if any(sha(x.lower()) in PERSON_WORDS for x in CAMEL.findall(w)):
            found.add("names a person")
    # Two words written apart ("x y", "x-y", "x_y"): test the pieces that cover the join.
    for a, b in set(zip(words, words[1:])):
        if a in ALLOW_WORDS or b in ALLOW_WORDS or len(a) > 64 or len(b) > 64:
            continue
        key = (a, b)
        if key not in _memo:
            _memo[key] = any(sha(p) in OTHER_APPS for p in pieces(a + b, join=len(a)))
        if _memo[key]:
            found.add("names another app")
    return found


RULES = [
    ("holds a private key", re.compile(r"-----BEGIN [A-Z ]*PRIVATE KEY-----")),
    ("holds a token", re.compile(r"\b(gh[pousr]_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}|sk_(live|test)_[A-Za-z0-9]{10,}|xox[abpr]-[A-Za-z0-9-]{10,}|AKIA[0-9A-Z]{16}|AIza[0-9A-Za-z_-]{35})\b")),
    ("holds a JWT", re.compile(r"\beyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.")),
    ("holds an Apple team id", re.compile(r"(?i:DEVELOPMENT_TEAM|TeamIdentifier)|(?i:team[\s_-]?id)\W{0,4}[A-Z0-9]{10}\b")),
    ("loads from an Apple host", re.compile(r"(src|href|srcset|url\(|@import|fetch\()\s*=?\s*[\"']?[^\"'\s)]*(apple\.com|icloud\.com|mzstatic\.com|cdn-apple\.com|aaplimg\.com|apple-cloudkit\.com|itunes\.com|appstore\.com)", re.I)),
]
EMAIL = re.compile(r"\b[A-Za-z0-9._%+-]+@([A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.([A-Za-z]{2,}))\b")
IMAGE_TLD = {"png", "jpg", "jpeg", "gif", "webp", "svg", "pdf", "json"}
IPV4 = re.compile(r"(?<![\d.])(\d{1,3}(?:\.\d{1,3}){3})(?![\d.])")
DOC_NETS = [ipaddress.ip_network(n) for n in ("192.0.2.0/24", "198.51.100.0/24", "203.0.113.0/24")]


def ip_problem(text):
    for m in IPV4.finditer(text):
        try:
            ip = ipaddress.ip_address(m.group(1))
        except ValueError:
            continue
        if all(int(p) <= 9 for p in m.group(1).split(".")):  # a version number such as 5.0.7.4
            continue
        if ip.is_private or ip.is_loopback or ip.is_unspecified or any(ip in n for n in DOC_NETS):
            continue
        return True
    return False


def email_problem(text):
    for m in EMAIL.finditer(text):
        dom, tld = m.group(1).lower(), m.group(2).lower()
        if m.group(0).lower() in ALLOW_EMAILS:
            continue
        if tld in IMAGE_TLD or dom.startswith("example.") or dom.endswith(".example") or dom == "example.com":
            continue
        if dom == "users.noreply.github.com":
            continue
        return True
    return False


SELF = os.path.relpath(os.path.abspath(__file__), os.path.abspath(ROOT))  # this file holds the patterns themselves
hits = []
for d, dirs, files in os.walk(ROOT):
    dirs[:] = sorted(x for x in dirs if not (d == ROOT and x in SKIP_DIRS) and x != ".git")
    for f in sorted(files):
        p = os.path.join(d, f)
        rel = os.path.relpath(p, ROOT)
        for why in sorted(name_problems(rel.replace(os.sep, " "))):
            hits.append((rel, why + " (file name)"))
        if not f.lower().endswith(TEXT):
            continue
        text = open(p, encoding="utf-8", errors="ignore").read()
        for why in sorted(name_problems(text)):
            hits.append((rel, why))
        if rel == SELF:
            continue
        for why, rx in RULES:
            if rx.search(text):
                hits.append((rel, why))
        if email_problem(text):
            hits.append((rel, "holds an e-mail address"))
        if not f.lower().endswith(".svg") and ip_problem(text):  # SVG path numbers look like addresses
            hits.append((rel, "holds a real IP address"))

if hits:
    print("STOP: these files must not go on the public page:", file=sys.stderr)
    for rel, why in hits:
        print(f"  {rel}: {why}", file=sys.stderr)
    print("Do not commit. Fix the source on design-system, then run tools/update.sh again.", file=sys.stderr)
    sys.exit(1)
print("Public check passed: no other app, person, secret, personal data or Apple host.")
