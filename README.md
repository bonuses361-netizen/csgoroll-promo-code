# CSGORoll Bonus Website

A responsive affiliate marketing website for CSGORoll promo code **GET3BOXES** offering 3 free cases + 5% deposit bonus.

**Domain:** csgorollbonus.com

## Features

- Fully responsive design (mobile, tablet, desktop)
- Modern dark theme matching CSGORoll's official style
- SEO optimized with meta tags, structured data, and sitemap
- WordPress-like code structure
- ~3000 words of unique, helpful content on homepage
- FAQ accordion, animated sections, and interactive elements
- Affiliate links with proper `rel="nofollow noopener"` attributes

## Pages

1. **Homepage** (`index.html`) - Main landing page with promo code information
2. **About Us** (`about.html`) - Information about the website
3. **Contact Us** (`contact.html`) - Contact form and information
4. **Terms of Service** (`terms.html`) - Terms and Privacy Policy

## File Structure

```
/
├── index.html              # Homepage
├── about.html              # About Us page
├── contact.html            # Contact page
├── terms.html              # Terms & Privacy Policy
├── sitemap.xml             # XML sitemap for search engines
├── robots.txt              # Robots directives
├── README.md               # This file
└── assets/
    ├── css/
    │   └── style.css       # Main stylesheet
    ├── js/
    │   └── main.js         # JavaScript functionality
    └── images/
        ├── favicon.svg     # SVG favicon
        └── (add images)    # See below
```

## Required Images

Add the following images to `assets/images/`:

1. **csgoroll-logo.png** - Main logo (used in header and footer)
   - Recommended size: 150x40px or similar ratio

2. **csgoroll-hero.jpg** - Hero section image
   - Recommended size: 550x400px or larger

3. **Favicon files** (generate from logo):
   - `favicon-16x16.png` - 16x16px
   - `favicon-32x32.png` - 32x32px
   - `apple-touch-icon.png` - 180x180px

4. **csgoroll-og-image.jpg** - Open Graph social sharing image
   - Recommended size: 1200x630px

### Generating Favicons

You can use online tools like [favicon.io](https://favicon.io/) or [realfavicongenerator.net](https://realfavicongenerator.net/) to generate favicon files from your logo.

## Affiliate Link

All CTA buttons and promotional links point to:
```
https://www.csgoroll.gg/r/get3boxes
```

All affiliate links include `rel="nofollow noopener"` for proper SEO handling.

## Promo Code Details

- **Code:** GET3BOXES
- **Bonus:** 3 free cases + 5% deposit bonus
- **Platform:** CSGORoll

## SEO Features

- Optimized meta title and description
- Open Graph tags for social sharing
- Twitter Card meta tags
- Schema.org structured data
- XML sitemap
- Robots.txt
- Semantic HTML5 structure
- Internal linking between pages

## Customization

### Changing Colors

Edit the CSS variables in `assets/css/style.css`:

```css
:root {
    --primary-color: #e53935;
    --primary-hover: #ff5252;
    --secondary-color: #ff6b35;
    --background-dark: #0d0d0f;
    /* ... more variables */
}
```

### Updating Affiliate Link

Search and replace all instances of:
```
https://www.csgoroll.gg/r/get3boxes
```

### Updating Promo Code

Search and replace all instances of `GET3BOXES` with your new code.

## Deployment

1. Upload all files to your web server
2. Add your images to `assets/images/`
3. Configure your server to serve `index.html` as the default document
4. Ensure HTTPS is enabled for security
5. Submit sitemap.xml to Google Search Console

### Apache .htaccess (optional)

Create a `.htaccess` file for clean URLs:

```apache
DirectoryIndex index.html

<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    
    # Remove .html extension
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME}\.html -f
    RewriteRule ^(.*)$ $1.html [L]
</IfModule>
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

## License

This project is created for csgorollbonus.com. All content is original and created for affiliate marketing purposes.

## Disclaimer

This is an affiliate website. Users must be 18+ to gamble. Gambling involves risk - please play responsibly.
