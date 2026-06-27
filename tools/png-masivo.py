#!/usr/bin/env python3
"""
PNG masivo — recorta el fondo de fotos cenitales sobre fondo blanco
y exporta PNG transparente, recortado al objeto.

Uso:
    python3 png-masivo.py <carpeta_entrada> [carpeta_salida]

Por defecto salida = <carpeta_entrada>/pngs
Salta los que ya estan hechos (se puede re-correr sin repetir).
"""
import sys, os, glob, time
from PIL import Image
from rembg import remove, new_session

IN  = sys.argv[1] if len(sys.argv) > 1 else "."
OUT = sys.argv[2] if len(sys.argv) > 2 else os.path.join(IN, "pngs")
PAD = 24      # margen transparente alrededor del objeto
MAXSIZE = 1800  # lado mayor de la foto de entrada (resize previo: mas rapido + liviano)

os.makedirs(OUT, exist_ok=True)
session = new_session("u2net")

exts = ("*.jpg", "*.jpeg", "*.JPG", "*.JPEG", "*.png", "*.PNG")
files = []
for e in exts:
    files += glob.glob(os.path.join(IN, e))
files = sorted(set(files))

total = len(files)
print(f"[png-masivo] {total} imagenes en {IN}")
print(f"[png-masivo] salida -> {OUT}\n", flush=True)

done = skipped = errs = 0
t0 = time.time()
for i, f in enumerate(files, 1):
    name = os.path.splitext(os.path.basename(f))[0]
    dst = os.path.join(OUT, name + ".png")
    if os.path.exists(dst):
        skipped += 1
        print(f"[{i}/{total}] {name}  (ya existe, salto)", flush=True)
        continue
    try:
        src = Image.open(f).convert("RGBA")
        if max(src.size) > MAXSIZE:
            r = MAXSIZE / max(src.size)
            src = src.resize((round(src.size[0]*r), round(src.size[1]*r)), Image.LANCZOS)
        cut = remove(src, session=session,
                     alpha_matting=True,
                     alpha_matting_foreground_threshold=240,
                     alpha_matting_background_threshold=15,
                     alpha_matting_erode_size=8)
        bbox = cut.getbbox()
        if bbox:
            x0, y0, x1, y1 = bbox
            x0 = max(0, x0 - PAD); y0 = max(0, y0 - PAD)
            x1 = min(cut.size[0], x1 + PAD); y1 = min(cut.size[1], y1 + PAD)
            cut = cut.crop((x0, y0, x1, y1))
        cut.save(dst)
        done += 1
        el = time.time() - t0
        eta = el / done * (total - i)
        print(f"[{i}/{total}] {name}  OK  {cut.size[0]}x{cut.size[1]}  ETA {eta/60:.1f}min", flush=True)
    except Exception as ex:
        errs += 1
        print(f"[{i}/{total}] {name}  ERROR: {ex}", flush=True)

print(f"\n[png-masivo] LISTO. ok={done} saltados={skipped} errores={errs} "
      f"tiempo={(time.time()-t0)/60:.1f}min", flush=True)
