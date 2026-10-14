# Static Web Server Test Plan

For each test, record URL, status, response headers, timing, bytes transferred, cache state and relevant server logs.

## Baseline
- [ ] Homepage returns 200.
- [ ] CSS, JavaScript, images and fonts appear in browser DevTools.
- [ ] A missing URL returns HTTP 404.
- [ ] Redirect route returns the expected 3xx and Location header.
- [ ] Access/error logs record requests and useful failure details.

## Delivery and caching
- [ ] Compare first and repeat requests.
- [ ] Compare HTML cache policy with CSS/JS/font policy.
- [ ] Inspect ETag, Last-Modified, Cache-Control, Content-Type and Content-Length.
- [ ] Try conditional requests using If-None-Match or If-Modified-Since.
- [ ] Verify gzip/Brotli using GET requests and response headers.
- [ ] Add a large local file and test full and range downloads.

## Browser behavior
- [ ] Compare lazy-loaded and eager-loaded images.
- [ ] Disable cache in DevTools and reload.
- [ ] Block third-party hosts and compare the waterfall.
- [ ] Test slow network and CPU throttling.
- [ ] Observe font loading and layout shifts.
- [ ] Test keyboard navigation and reduced-motion preference.

## Apache versus Nginx
- [ ] Use the same files, domain/TLS conditions and client.
- [ ] Keep compression/cache policies equivalent.
- [ ] Record versions and configuration.
- [ ] Start with low concurrency before increasing it.
- [ ] Review logs and CPU/memory/network metrics.

Only test systems you own or are authorized to test. Avoid aggressive or unbounded load tests on a production VPS.
