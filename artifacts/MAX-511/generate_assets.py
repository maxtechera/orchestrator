from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import textwrap

OUT = Path(__file__).resolve().parent
W, H = 1080, 1920
BG = (7, 17, 31)
CARD = (17, 38, 64)
ACCENT = (135, 247, 198)
MUTED = (164, 182, 201)
WHITE = (244, 247, 251)
PINK = (255, 139, 214)

slides = [
    ("Día 1", "Dolor + conversación", [
        "Tu contenido no falla por falta de ideas.",
        "Falla por falta de sistema diario.",
        "Poll: ¿Tus stories venden o solo mantienen presencia?",
        "CTA: respóndeme STORIES"
    ]),
    ("Día 2", "Framework + newsletter", [
        "Hook + prueba + pregunta + CTA.",
        "No necesitas diseño complejo.",
        "Necesitas una secuencia repetible.",
        "CTA: entra a la newsletter"
    ]),
    ("Día 3", "Prueba social + workshop", [
        "Una story bien armada suma conversaciones.",
        "Más replies = más intención.",
        "Question: ideas, consistencia o convertir.",
        "CTA: workshop waitlist"
    ]),
    ("Día 4", "Behind the scenes + replies", [
        "Qué fricción siente la audiencia.",
        "Qué micro-prueba mostrar.",
        "Qué acción mínima pedir.",
        "CTA: responde y te mando plantilla"
    ]),
    ("Día 5", "Plantilla + office hours", [
        "Hook listo para usar.",
        "Prueba con insight o resultado.",
        "Pregunta para activar respuesta.",
        "CTA: súmate a office hours"
    ]),
    ("Día 6", "Segmentación", [
        "Stories para separar curiosidad e intención.",
        "Poll: ¿más ideas o más conversión?",
        "Ideas → newsletter.",
        "Conversión → DM"
    ]),
    ("Día 7", "Cierre + conversión", [
        "Las stories son un canal diario de demanda.",
        "Generan taps, replies y conversiones.",
        "Repite la secuencia con intención.",
        "CTA: únete al workshop"
    ])
]

font_paths = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
]
for p in font_paths:
    if not Path(p).exists():
        raise SystemExit(f"Missing font: {p}")

bold = ImageFont.truetype(font_paths[0], 88)
sub = ImageFont.truetype(font_paths[0], 44)
body = ImageFont.truetype(font_paths[1], 46)
small = ImageFont.truetype(font_paths[1], 34)

for i, (day, title, bullets) in enumerate(slides, start=1):
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle((60, 70, W - 60, H - 70), radius=48, fill=CARD)
    draw.text((110, 130), "MAX-511", font=small, fill=ACCENT)
    draw.text((110, 190), day, font=bold, fill=WHITE)
    draw.text((110, 310), title, font=sub, fill=PINK)
    draw.text((110, 410), "Stories pack para newsletter + workshop", font=small, fill=MUTED)

    y = 520
    for bullet in bullets:
        lines = textwrap.wrap(bullet, width=28)
        draw.rounded_rectangle((105, y - 18, W - 105, y + 90 + 52 * (len(lines)-1)), radius=28, fill=(13,27,46))
        draw.text((140, y), "•", font=sub, fill=ACCENT)
        draw.text((190, y), "\n".join(lines), font=body, fill=WHITE, spacing=10)
        y += 170 + 46 * (len(lines)-1)

    draw.text((110, H - 210), "max-techera | sistema de stories manual y repetible", font=small, fill=MUTED)
    img.save(OUT / f"slide-{i:02d}.png")
