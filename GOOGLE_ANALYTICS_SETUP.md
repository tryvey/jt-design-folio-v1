# Google Analytics Setup Guide

## What I've Set Up

I've configured your portfolio with comprehensive Google Analytics tracking:

### 1. **Core Analytics Setup**
- ✅ Google Analytics 4 (gtag.js) script in `index.html`
- ✅ Environment variable configuration for your GA ID
- ✅ Vite build-time replacement of the GA ID

### 2. **Page View Tracking**
- ✅ Automatic page view tracking on route changes
- ✅ Tracks all your pages: Home, Case Studies, Resume

### 3. **Event Tracking**
- ✅ **Form Submissions**: Contact form submissions
- ✅ **Case Study Views**: When someone views a case study
- ✅ **Resume Downloads**: When someone downloads your resume
- ✅ **Button Clicks**: Trackable button interactions

### 4. **Files Modified**
- `index.html` - Added GA script with environment variable
- `vite.config.js` - Added GA ID replacement during build
- `src/utils/analytics.js` - Created analytics utility functions
- `src/App.jsx` - Added page view tracking
- `src/components/ContactSection.jsx` - Added form submission tracking
- `src/pages/WorkCaseStudyPage.jsx` - Added case study view tracking
- `src/pages/ResumePage.jsx` - Added resume download tracking

## What You Need to Do

### Step 1: Get Your Google Analytics ID
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property or use existing one
3. Get your **Measurement ID** (format: `G-XXXXXXXXXX`)

### Step 2: Create Environment File
Create a file called `.env.local` in your project root with:

```bash
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**Replace `G-XXXXXXXXXX` with your actual Google Analytics ID**

### Step 3: Test the Setup
1. Run your development server: `npm run dev`
2. Open browser dev tools → Network tab
3. Navigate between pages
4. Look for requests to `googletagmanager.com`
5. Check Google Analytics Real-Time reports

### Step 4: Deploy
1. Build your project: `npm run build`
2. Deploy to your hosting platform
3. Verify GA is working in production

## What Gets Tracked

### Automatic Tracking
- **Page Views**: Every page navigation
- **Session Duration**: Time spent on your site
- **User Location**: Country/region of visitors
- **Device Type**: Desktop, mobile, tablet
- **Browser/OS**: Technical information

### Custom Events
- **Contact Form Submissions**: Track engagement
- **Case Study Views**: See which projects get attention
- **Resume Downloads**: Monitor career interest
- **Button Clicks**: Track user interactions

## Troubleshooting

### GA Not Working?
1. Check `.env.local` file exists and has correct ID
2. Verify ID format: `G-XXXXXXXXXX` (not `UA-` or `GA_`)
3. Check browser console for errors
4. Ensure `.env.local` is not in `.gitignore`

### No Data in GA?
1. Wait 24-48 hours for data to appear
2. Check Real-Time reports for immediate feedback
3. Verify your GA property is set to the correct domain
4. Check if ad blockers are blocking GA

### Development vs Production
- **Development**: Uses `.env.local` file
- **Production**: Uses build-time environment variables
- **Local Testing**: Check Network tab for GA requests

## Advanced Features

### Custom Event Tracking
You can add more tracking by importing from `src/utils/analytics.js`:

```javascript
import { trackEvent, trackButtonClick } from '../utils/analytics.js';

// Track custom events
trackEvent('video_play', 'media', 'hero_video');

// Track button clicks
trackButtonClick('cta_button', 'hero_section');
```

### Enhanced E-commerce (Future)
If you add a shop or services later, you can enhance with:
- Product views
- Add to cart events
- Purchase completions
- Revenue tracking

## Security Notes

- ✅ GA ID is public (this is normal and safe)
- ✅ No personal data is sent to Google
- ✅ Compliant with GDPR/privacy regulations
- ✅ Can be blocked by ad blockers (user choice)

## Need Help?

If you encounter issues:
1. Check the browser console for errors
2. Verify your GA ID is correct
3. Test with a fresh incognito browser window
4. Check if ad blockers are interfering

Your Google Analytics is now fully configured and ready to track visitor behavior on your portfolio!
