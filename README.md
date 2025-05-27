# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# JT Portfolio

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```
3. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173)

## Editing Content

- All main content is in the `/public/content` folder as markdown files:
  - `hero.md` – Hero section (name, title, intro, call-to-action)
  - `about.md` – About/intro section
  - `case-studies.md` – Case studies (title, image, description, link)
  - `links.md` – Footer/social/contact links
- Images are in `/public/images`. Reference them in markdown as `/images/your-image.jpg`.

## Deploying to Netlify (Recommended)

### One-time Setup

1. **Push your project to a GitHub repository.**
2. **Go to [Netlify](https://app.netlify.com/) and sign up or log in.**
3. **Click "Add new site" > "Import an existing project".**
4. **Connect your GitHub account and select your portfolio repository.**
5. **Configure the build settings:**
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **(Optional) Base directory:** leave blank
6. **Click "Deploy site".**

### Automatic Deploys on Every Commit

- Netlify will automatically build and deploy your site every time you push changes to your GitHub repository (main branch by default).
- You can see deploy logs and preview URLs in the Netlify dashboard.

### Custom Domain (Optional)

1. In Netlify, go to your site settings > Domain management.
2. Add your custom domain and follow the instructions to update your DNS.

---

**Edit the markdown files in `/public/content` to update your site. No code changes needed!**

## Build Process Updates

The build process has been updated to properly handle content files:

1. **Pre-build**: Content files are copied to the public directory
2. **Build**: Vite builds the application
3. **Post-build**: Content files are directly copied to the dist folder and removed from public

Additionally, the following files were added for proper routing in production:
- `public/_redirects` for Netlify deployments
- `public/.htaccess` for Apache servers

To test the build locally:
```bash
npm run build
npm run preview
```
