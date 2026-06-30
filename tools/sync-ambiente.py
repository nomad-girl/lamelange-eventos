#!/usr/bin/env python3
"""
Sincroniza las fotos ambientadas ("Inspiración · en la mesa") de cada producto.

Cómo se usa:
  1) Dentro de la carpeta de cada modelo, crear una subcarpeta llamada  ambiente
     (ej:  assets/02-platos/perla-rosa/ambiente/ )
  2) Dejar ahí las fotos de mesa (jpg/png), con el nombre que sea.
  3) Correr:   python3 tools/sync-ambiente.py
     -> regenera  ambiente.js  con las fotos encontradas por producto.

No edita data.js: escribe un archivo aparte (ambiente.js) que el sitio lee solo.
"""
import os, json, subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))  # carpeta web-eventos
DATA = os.path.join(ROOT, 'data.js')
OUT  = os.path.join(ROOT, 'ambiente.js')
EXTS = ('.jpg', '.jpeg', '.png', '.webp')

# 1) Sacar id -> carpeta de cada producto, usando el propio data.js vía JXA.
jxa = "var window={};\n" + open(DATA, encoding='utf-8').read() + r"""
PRODUCTOS.map(function (p) {
  var f = (p.fotos && p.fotos[0]) || '';
  var dir = f ? f.replace(/\/[^/]*$/, '') : '';
  var id = p.id || (typeof productoId === 'function' ? productoId(p) : '');
  return id + '\t' + dir;
}).join('\n');
"""
tmp = '/tmp/_amb_dump.js'
open(tmp, 'w', encoding='utf-8').write(jxa)
res = subprocess.run(['osascript', '-l', 'JavaScript', tmp], capture_output=True, text=True)
os.remove(tmp)
if res.returncode != 0:
    raise SystemExit('Error leyendo data.js:\n' + res.stderr)

mapping = [ln.split('\t') for ln in res.stdout.strip().split('\n') if '\t' in ln]

# 2) Por cada producto, buscar su subcarpeta /ambiente y listar las fotos.
amb = {}
for pid, folder in mapping:
    if not pid or not folder:
        continue
    d = os.path.join(ROOT, folder, 'ambiente')
    if not os.path.isdir(d):
        continue
    files = sorted(f for f in os.listdir(d)
                   if f.lower().endswith(EXTS) and not f.startswith('.'))
    if files:
        amb[pid] = [folder + '/ambiente/' + f for f in files]

# 3) Escribir ambiente.js (archivo generado completo, no se edita a mano).
body = ('/* Generado por tools/sync-ambiente.py — fotos ambientadas por producto.\n'
        '   NO editar a mano: se regenera escaneando las subcarpetas /ambiente. */\n'
        'var AMBIENTE = ' + json.dumps(amb, ensure_ascii=False, indent=2) + ';\n')
open(OUT, 'w', encoding='utf-8').write(body)

print('ambiente.js actualizado: %d producto(s) con fotos ambientadas' % len(amb))
for k, v in amb.items():
    print('  - %s: %d foto(s)' % (k, len(v)))
if not amb:
    print('  (todavía no hay ninguna subcarpeta /ambiente con fotos)')
