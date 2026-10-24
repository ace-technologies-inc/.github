# www.acetechnologies.net

Static version of the ACE Technologies site, converted from the WordPress theme in the parent directory. No build step: edit the HTML directly.

```
index.html            home (hero slider, partner carousel)
about/ services/ partners/
i3x/                  i3X Explorer landing page (copy of website/ in ace-technologies-inc/i3X-Explorer)
404.html              also redirects /i3X/... to /i3x/... (GitHub Pages is case-sensitive)
assets/css/style.css  theme stylesheet
assets/js/            nav menu + slider
assets/images/        theme images
assets/uploads/       former wp-content/uploads media
CNAME                 www.acetechnologies.net
```

The header and footer are repeated in each page, so a nav change has to be made in all five HTML files.

## Deploying on GitHub Pages

1. Push this folder as the root of a repo, e.g. `ace-technologies-inc/acetechnologies.net`.
2. In the repo, go to Settings → Pages → Source: "Deploy from a branch", `main` / `/ (root)`.
3. Custom domain: `www.acetechnologies.net` (already set in `CNAME`). Turn on "Enforce HTTPS" once the certificate is issued.
4. DNS:
   - `www` → CNAME → `ace-technologies-inc.github.io`
   - apex `acetechnologies.net` → A records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (GitHub redirects the apex to www)
5. Optionally verify the domain under the org's Settings → Pages so nobody else can claim it.

## Preview locally

```
python3 -m http.server 8000
```

Opening `index.html` straight from disk (`file://`) also works: asset paths are relative, and a small inline script points directory links at `index.html` only when opened from disk. `404.html` keeps root-absolute paths because Pages serves it at arbitrary URLs.

Note: macOS is case-insensitive, so `/i3X/` works locally even though on Pages it goes through the 404 redirect.
