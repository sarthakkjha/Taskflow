from PIL import Image, ImageDraw

# Create a 32x32 favicon
size = 32
img = Image.new('RGBA', (size, size), (9, 9, 11, 255))
draw = ImageDraw.Draw(img)

# Draw green target icon
center = size // 2
green = (34, 197, 94, 255)

# Outer circle
draw.ellipse([4, 4, 28, 28], outline=green, width=2)
# Middle circle
draw.ellipse([9, 9, 23, 23], outline=green, width=2)
# Inner circle (filled)
draw.ellipse([13, 13, 19, 19], fill=green)

# Crosshair marks
draw.line([center, 2, center, 6], fill=green, width=2)
draw.line([center, 26, center, 30], fill=green, width=2)
draw.line([2, center, 6, center], fill=green, width=2)
draw.line([26, center, 30, center], fill=green, width=2)

# Save as PNG
img.save('favicon.png', 'PNG')

# Save as ICO (convert PNG to ICO)
img.save('favicon.ico', format='ICO', sizes=[(32, 32)])

print("Favicon created successfully!")
