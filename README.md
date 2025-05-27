# JT Design Portfolio

A modern React portfolio site with dark/light mode and content stored as markdown.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Content Structure

All content is stored as markdown files in the `/public/content` directory:

- **Main Files**
  - `about.md` - About section content
  - `hero-header.md` - Hero section header
  - `hero-content.md` - Hero section content
  - `footer.md` - Footer links

- **Case Studies** (in `/public/content/case-studies/`)
  - Individual markdown files for each case study
  - Format: frontmatter + content

## Adding Images

1. **Place images in the right folders:**
   - Case study images: `/public/images/case-studies/`
   - General images: `/public/images/`

2. **Reference images in markdown:**
   ```markdown
   ![Image description](/images/your-image.png)
   ```

3. **For case study frontmatter:**
   ```markdown
   ---
   title: Project Name
   coverImage: /images/case-studies/project-image.png
   ---
   ```

4. **Creating image subfolders:**
   For larger projects with multiple images, create a dedicated subfolder:
   ```
   /public/images/case-studies/project-name/image1.png
   ```

## Features

- Dark/light mode with system preference detection
- Responsive design with Tailwind CSS
- Floating header with glass effect
- Markdown content for easy updates
- Client-side routing
