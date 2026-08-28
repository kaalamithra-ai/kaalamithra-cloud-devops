from PIL import Image

SRC = r'c:\Users\Dzone\Downloads\cloud-devops-website\cloud-devops-website\images\cloud-devops.jpeg'
OUT = r'c:\Users\Dzone\Downloads\cloud-devops-website\cloud-devops-website\images\hero-cloud-devops.jpeg'

img = Image.open(SRC)
print('size:', img.size)

# Sample exact design colors from the mockup for the rebuilt page
points = {
    'nav_strip':   (800, 20),
    'page_bg':     (10, 450),
    'crop_tl':     (565, 75),
    'crop_br':     (1540, 505),
    'btn_purple':  (150, 484),
    'stats_band':  (300, 555),
    'service_card':(200, 700),
    'hero_bg':     (520, 430),
}
for name, (x, y) in points.items():
    print(f'{name}: rgb{img.getpixel((x, y))} #%02x%02x%02x' % img.getpixel((x, y))[:3])

# Crop the hero illustration cluster (cloud + floating badges + dashboard)
crop = img.crop((560, 72, 1545, 512))
crop.save(OUT, quality=92)
print('saved:', OUT, 'size:', crop.size)