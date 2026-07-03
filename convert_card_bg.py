from PIL import Image
import os

img = Image.open('images/card_bg.png')
img.save('images/card_bg.webp', 'WEBP', quality=88, method=6)

orig = os.path.getsize('images/card_bg.png')
webp = os.path.getsize('images/card_bg.webp')
print(f'Original PNG: {orig} bytes ({orig/1024:.0f} KB)')
print(f'WebP: {webp} bytes ({webp/1024:.0f} KB)')
print(f'Savings: {(1 - webp/orig)*100:.1f}%')
