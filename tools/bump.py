#!/usr/bin/env python3
"""
Sube la versión (?v=N) de los assets en los HTML — de forma SEGURA.
Lee TODO el archivo primero y recién después escribe (nunca trunca antes de leer).

Uso:  python3 tools/bump.py 19
"""
import re, sys, os

VERSION = sys.argv[1] if len(sys.argv) > 1 else None
if not VERSION:
    print("uso: python3 tools/bump.py <numero>"); sys.exit(1)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HTML = ['index.html', 'catalogo.html', 'producto.html', 'solicitud.html', 'tea-party.html', 'ambientacion.html', 'plateria.html']

for fn in HTML:
    path = os.path.join(ROOT, fn)
    if not os.path.exists(path):
        continue
    s = open(path, encoding='utf-8').read()      # 1) leer TODO primero
    if not s.strip():
        print(f"⚠️  {fn} está vacío — lo salto (no lo piso)"); continue
    s = re.sub(r'\?v=\d+', '?v=' + VERSION, s)    # 2) transformar en memoria
    open(path, 'w', encoding='utf-8').write(s)    # 3) recién ahora escribir
    print(f"  {fn} -> ?v={VERSION} ({len(s)} bytes)")
print("OK")
