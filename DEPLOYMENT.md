# Deployment Guide

## 🚀 Quick Start

This portfolio is a static site that can be deployed to any web server or hosting platform.

## 📋 Pre-Deployment Checklist

- [x] All HTML files validated
- [x] JavaScript code refactored and tested
- [x] CSS consolidated and optimized
- [x] .DS_Store files removed
- [x] .gitignore configured
- [ ] Update profile picture: `aboutme-min.jpeg`
- [ ] Update resume: `navigation/assets/resume-min.jpg`
- [ ] Update personal info in HTML files

## 🌐 Deployment Options

### GitHub Pages (Recommended)
1. Push to GitHub repository
2. Go to Settings → Pages
3. Select branch (main/master)
4. Site will be live at `https://username.github.io`

### Netlify
1. Connect GitHub repository
2. Build command: (none needed)
3. Publish directory: `/`
4. Deploy!

### Vercel
1. Import GitHub repository
2. Framework: Other
3. Root directory: `/`
4. Deploy!

### Traditional Web Hosting
1. Upload all files via FTP/SFTP
2. Ensure `.htaccess` is uploaded
3. Set proper file permissions (644 for files, 755 for directories)
4. Test clean URLs work

## 🔧 Server Requirements

### Minimum
- Static file hosting
- Support for `.htaccess` (Apache) or equivalent URL rewriting

### Recommended
- HTTPS enabled
- Gzip compression
- HTTP/2 support
- CDN for global distribution

## 🎨 Customization Before Deploy

### Update Personal Information

1. **Landing Page** (`index.html`)
   - Name
   - Title/Role

2. **About Page** (`navigation/me.html`)
   - Objective text
   - Profile picture

3. **Resume Page** (`navigation/resume.html`)
   - Resume image

4. **Projects Page** (`navigation/projects.html`)
   - Project links
   - External links (YouTube, etc.)

### Update Assets

```bash
# Profile picture (recommended: 800x800px, optimized JPEG)
aboutme-min.jpeg

# Resume (recommended: 1200px width, optimized JPEG)
navigation/assets/resume-min.jpg

# Logo (SVG recommended)
navigation/assets/logo.svg
```

## 🔍 Testing Locally

### Option 1: Python Server
```bash
python3 -m http.server 8000
# Visit: http://localhost:8000
```

### Option 2: PHP Server
```bash
php -S localhost:8000
# Visit: http://localhost:8000
```

### Option 3: Node.js (http-server)
```bash
npx http-server -p 8000
# Visit: http://localhost:8000
```

## 🐛 Troubleshooting

### Clean URLs Not Working
- Ensure `.htaccess` is uploaded
- Check server supports `mod_rewrite`
- For Nginx, convert rules to nginx.conf format

### Games Not Loading
- Check browser console for errors
- Verify p5.js files are accessible
- Check file paths are correct

### Fonts Not Loading
- Verify Google Fonts CDN is accessible
- Check CORS headers if self-hosting fonts

### Images Not Displaying
- Verify image paths are correct
- Check file permissions
- Ensure images are optimized and not too large

## 📊 Performance Tips

### Image Optimization
```bash
# Install ImageMagick
brew install imagemagick  # macOS
apt-get install imagemagick  # Linux

# Optimize JPEG
convert input.jpg -quality 85 -strip output.jpg

# Convert to WebP (better compression)
cwebp -q 85 input.jpg -o output.webp
```

### Enable Caching
The `.htaccess` file already includes caching rules. Verify they're working:
```bash
curl -I https://yoursite.com/styles/main.css | grep -i cache
```

## 🔒 Security

### Headers Already Configured
- X-Content-Type-Options: nosniff
- X-Frame-Options: SAMEORIGIN
- X-XSS-Protection: 1; mode=block

### Additional Recommendations
- Enable HTTPS (Let's Encrypt is free)
- Add Content-Security-Policy header
- Regular dependency updates
- Monitor for vulnerabilities

## 📈 Analytics (Optional)

Add Google Analytics or similar:

```html
<!-- Add before </head> in all HTML files -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🎯 SEO Optimization

### Already Implemented
- Semantic HTML5
- Meta descriptions
- Alt text on images
- Clean URLs

### Additional Steps
1. Create `sitemap.xml`
2. Create `robots.txt`
3. Submit to Google Search Console
4. Add Open Graph tags for social sharing
5. Add structured data (JSON-LD)

## 📱 Mobile Testing

Test on multiple devices:
- iOS Safari
- Android Chrome
- Various screen sizes
- Touch interactions for games

## ✅ Post-Deployment

1. Test all navigation links
2. Verify games load and play correctly
3. Check responsive design on mobile
4. Test form submissions (if any)
5. Verify analytics tracking
6. Check page load speed (Google PageSpeed Insights)
7. Test across different browsers

## 🔄 Continuous Deployment

### GitHub Actions Example
```yaml
name: Deploy
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to hosting
        run: |
          # Your deployment script
```

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Verify all files uploaded correctly
3. Test locally first
4. Check server logs
5. Verify .htaccess rules are active

---

**Ready to deploy!** 🚀

Your portfolio is now production-ready with:
- ✅ Clean, modern code
- ✅ Optimized performance
- ✅ Responsive design
- ✅ Security headers
- ✅ SEO-friendly structure
