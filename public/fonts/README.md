# Font Files Directory

## Mozilla Headline Font Setup

To use the Mozilla Headline font in your portfolio, place the following font files in this directory:

### Required Files:
- `MozillaHeadline-Regular.woff2` (recommended - best compression)
- `MozillaHeadline-Regular.woff` (fallback)
- `MozillaHeadline-Bold.woff2` (recommended - best compression)
- `MozillaHeadline-Bold.woff` (fallback)

### Where to Get the Font:
The Mozilla Headline font is a custom font created by Mozilla. You'll need to:
1. Download it from Mozilla's design resources (if publicly available)
2. Or use a similar alternative like "Inter" or "Roboto" which are freely available

### Current Setup:
- **Typewriter Animation**: Uses Mozilla Headline (when font files are present)
- **Headings (h1-h6)**: Uses Inter font (clean, modern sans-serif)
- **Body Text**: Uses Inter font
- **Fallbacks**: System fonts if web fonts fail to load

### Font Loading:
The fonts are configured to load with `font-display: swap` for optimal performance.
