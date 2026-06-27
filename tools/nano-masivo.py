#!/usr/bin/env python3
"""
NANO MASIVO — aplica el mismo prompt de Nano Banana Pro a TODAS las fotos
de una carpeta, automaticamente. Mismo estilo que en OpenArt, sin hacerlo una por una.

Uso:
    GEMINI_API_KEY=tu_key python3 nano-masivo.py <carpeta_entrada> [carpeta_salida]

Por defecto salida = <carpeta_entrada>/nano
- Saltea las que ya estan hechas (se puede re-correr sin repetir / sin recobrar).
- Reintenta ante errores temporales.
- Pausa entre llamadas para no chocar con limites de la API.
"""
import sys, os, glob, time, io
from google import genai
from google.genai import types
from PIL import Image

PROMPT = ("rehace la imagen TAL CUAL pero que no se vean las cintas de guia del fondo. "
          "agregale sombra como de luz natural que entra por la venta  y fondo blanco de estudio de foto. "
          "respeta la toma cenital. no se ve la ventana")
MODEL = "gemini-3-pro-image-preview"   # Nano Banana Pro
PAUSA = 3        # segundos entre fotos
REINTENTOS = 3   # por foto ante error temporal
SIZE = 1200      # lado final (cuadrado 1:1 para portada)

def cuadrar(data):
    """Normaliza a cuadrado 1:1 de SIZE px. Si no es cuadrada, rellena con blanco
    (no recorta, para no perder la sombra). Devuelve bytes JPG."""
    im = Image.open(io.BytesIO(data)).convert("RGB")
    w, h = im.size
    if w != h:
        lado = max(w, h)
        fondo = Image.new("RGB", (lado, lado), (255, 255, 255))
        fondo.paste(im, ((lado - w) // 2, (lado - h) // 2))
        im = fondo
    im = im.resize((SIZE, SIZE), Image.LANCZOS)
    out = io.BytesIO(); im.save(out, "JPEG", quality=92)
    return out.getvalue()

IN  = sys.argv[1] if len(sys.argv) > 1 else "."
OUT = sys.argv[2] if len(sys.argv) > 2 else os.path.join(IN, "nano")
KEY = os.environ.get("GEMINI_API_KEY")
if not KEY:
    print("FALTA la API key. Corré:  GEMINI_API_KEY=tu_key python3 nano-masivo.py <carpeta>")
    sys.exit(1)

os.makedirs(OUT, exist_ok=True)
client = genai.Client(api_key=KEY)

exts = ("*.jpg", "*.jpeg", "*.JPG", "*.JPEG", "*.png", "*.PNG")
files = []
for e in exts:
    files += glob.glob(os.path.join(IN, e))
files = sorted(set(files))
total = len(files)
print(f"[nano-masivo] {total} fotos en {IN}\n[nano-masivo] salida -> {OUT}\n", flush=True)

def procesar(path):
    data = open(path, "rb").read()
    mime = "image/png" if path.lower().endswith(".png") else "image/jpeg"
    r = client.models.generate_content(
        model=MODEL,
        contents=[types.Part.from_bytes(data=data, mime_type=mime), PROMPT])
    for p in r.candidates[0].content.parts:
        if getattr(p, "inline_data", None) and p.inline_data.data:
            return p.inline_data.data
    return None

done = skipped = errs = 0
t0 = time.time()
for i, f in enumerate(files, 1):
    name = os.path.splitext(os.path.basename(f))[0]
    dst = os.path.join(OUT, name + ".jpg")
    if os.path.exists(dst):
        skipped += 1
        print(f"[{i}/{total}] {name}  (ya existe, salto)", flush=True)
        continue
    ok = False
    for intento in range(1, REINTENTOS + 1):
        try:
            img = procesar(f)
            if img:
                open(dst, "wb").write(cuadrar(img))
                done += 1; ok = True
                el = time.time() - t0; eta = el / done * (total - i)
                print(f"[{i}/{total}] {name}  OK  ({len(img)} bytes)  ETA {eta/60:.1f}min", flush=True)
            else:
                print(f"[{i}/{total}] {name}  sin imagen (intento {intento})", flush=True)
            break
        except Exception as ex:
            msg = str(ex)[:120]
            if intento < REINTENTOS:
                print(f"[{i}/{total}] {name}  error, reintento {intento}: {msg}", flush=True)
                time.sleep(8 * intento)
            else:
                errs += 1
                print(f"[{i}/{total}] {name}  ERROR final: {msg}", flush=True)
    time.sleep(PAUSA)

print(f"\n[nano-masivo] LISTO. ok={done} saltados={skipped} errores={errs} "
      f"tiempo={(time.time()-t0)/60:.1f}min", flush=True)
