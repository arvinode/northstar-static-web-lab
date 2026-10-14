# NorthStar Studio — Web Server Static Lab

A standalone, multi-page static business-style website for practicing web-server behavior on your own VPS. This repository intentionally contains **no PHP, database, form submission backend, build system, or framework**.

## Goals

Use the same website to learn and compare Apache HTTP Server and Nginx:

- Static file delivery and MIME types
- HTTP status codes, redirects and redirect chains
- 404 and 500 error page configuration
- Access/error logs and request tracing
- Browser cache behavior, `Cache-Control`, `ETag` and `Last-Modified`
- Gzip/Brotli compression where supported
- Image/font/JavaScript/CSS loading and browser waterfalls
- Third-party requests, iframes and external media
- Local large-file delivery, range requests and download behavior
- Basic security headers, directory access and file permissions
- Controlled performance testing and repeatable before/after comparisons

The fictional company is **Northstar Studio**. It is not a real business.

## Stack

- HTML5
- CSS3
- Vanilla JavaScript
- External Google Fonts and Unsplash image URLs
- Apache or Nginx for serving files
- Git/GitHub for version control

No build step is required. The site can be served directly from a document root.

## Pages

- `index.html` — deliberately long homepage with business sections, image cards, testimonials, FAQ disclosures, media preview and a server-testing checklist
- `about.html`
- `services.html`
- `journal.html`
- `article.html`
- `media.html`
- `contact.html` — informational only; no form submission
- `privacy.html`
- `redirect.html` — useful as a redirect target/test page
- `404.html`
- `500.html`
- `robots.txt`

## Quick local test

From the repository root:

```bash
python3 -m http.server 8080
```

Open `http://127.0.0.1:8080/`. This is only a convenient preview server, not a replacement for Apache/Nginx testing.

## Deploy on a VPS

Copy the contents of this repository to a dedicated document root, for example:

```bash
sudo mkdir -p /var/www/web-server-static
sudo cp -a . /var/www/web-server-static/
sudo chown -R root:root /var/www/web-server-static
sudo find /var/www/web-server-static -type d -exec chmod 755 {} \;
sudo find /var/www/web-server-static -type f -exec chmod 644 {} \;
```

Adapt ownership to your OS and deployment process. Do not blindly change ownership of unrelated directories. Configure your chosen web server to use `/var/www/web-server-static` as its document root.

Example configuration snippets are in `server-config/apache-static-vhost.conf` and `server-config/nginx-static-server.conf`. Review and adapt domain names, paths, TLS certificates, log paths and distribution-specific syntax before enabling them. Validate configuration (`apachectl configtest` or `nginx -t`) before reload.

## Centralized visual configuration

- `assets/js/site-config.js` — site name, font families, font import URL, accent colors, content width, animation toggle and analytics opt-in.
- `assets/css/site.css` — layout, spacing, component styles and CSS variables.
- `assets/js/site.js` — small shared interactions, reveal animations, current year and optional browser-only notice.

Change a font once in `site-config.js` and confirm that the configuration maps to the CSS variables used by the stylesheet. External font changes require a browser reload and internet access. You can also self-host font files under `assets/fonts/` if you want to compare third-party versus local delivery.

## Heavy media and third-party requests

External Unsplash images and Google Fonts require internet access and are not delivered by your VPS. Their load time can vary independently of your server. Use DevTools Network to distinguish your own origin from third-party hosts.

For controlled transfer tests, put your own large test files under `assets/media/` and link them from `media.html`. Do not commit huge test files unless intended; use Git LFS or keep test data outside the repository if needed. Only use media you have permission to host.

## Analytics and privacy

Analytics is disabled by default. Only enable it with a test property and appropriate consent/privacy handling. Do not send personal or sensitive data to analytics. Third-party resources can disclose visitor IP addresses and request metadata to their providers; see `privacy.html`.

## Useful test commands

```bash
# Response headers
curl -I https://YOUR-DOMAIN/

# Follow redirects and show response headers
curl -sS -L -D - -o /dev/null https://YOUR-DOMAIN/redirect.html

# Download a file and show transfer details
curl -o /dev/null -sS -w 'status=%{http_code} bytes=%{size_download} time=%{time_total}s\n' https://YOUR-DOMAIN/

# Ask for gzip support
curl -I -H 'Accept-Encoding: gzip' https://YOUR-DOMAIN/assets/css/site.css

# Test a missing URL (should return 404 when server configuration is correct)
curl -I https://YOUR-DOMAIN/this-page-should-not-exist.html

# Request a byte range from a local test asset
curl -v -H 'Range: bytes=0-1023' https://YOUR-DOMAIN/assets/media/YOUR-TEST-FILE.bin -o /dev/null
```

Compression may not be applied to `HEAD` requests or may vary by server configuration; verify with a `GET` request and inspect the response headers. A custom error document alone does not guarantee the correct HTTP status code—verify it with `curl`.

## Safe performance testing

Start with low concurrency and test only infrastructure you own or are explicitly authorized to test. Record the exact server version, VPS size, TLS settings, cache state, test duration and client location. Avoid unbounded stress tests that can exhaust your VPS or affect other tenants.

Suggested progression:

1. Warm and cold single requests
2. Repeated page loads in DevTools
3. Local asset download tests at increasing file sizes
4. Small concurrency test
5. Compare Apache and Nginx with the same content and equivalent settings
6. Repeat after changing only one variable

## GitHub setup

Create a separate empty repository, for example `web-server-static-lab`, then run:

```bash
git init
git add .
git commit -m "Initial static web server lab"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/web-server-static-lab.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

## License

This project code is provided under the MIT License. External images/fonts remain subject to their respective providers' terms and licenses.
