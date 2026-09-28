# Yang Chen · Academic Homepage

A static academic homepage for GitHub Pages. No build step or runtime dependencies are required.

## Preview locally

From this directory, run:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open <http://127.0.0.1:8765/>. You can also open `index.html` directly.

## Update the page

- `index.html`: profile, news, research map, publications, awards, and service.
- `styles.css`: desktop and mobile layouts, typography, and colors.
- `app.js`: research map interactions and publication tabs.
- `assets/`: portrait, paper figures, logo, and CV.

Add news inside `<ol class="news-list">`, with the most recent month first. Use a machine-readable month and a short English announcement:

```html
<li class="news-item">
  <time datetime="2026-09">Sep 2026</time>
  <p>Paper name has been accepted to <strong>Conference 2026</strong>!</p>
</li>
```

When a paper's status changes, update both the selected publication card and the full publication list. Keep workshop acceptance and any separate main submission status distinct. The August 2026 EMNLP announcement is intentionally an aggregate count; add paper entries when titles and author details are available.

The research map uses responsive topic cards: three branches on desktop and a vertical tree on mobile. Select a topic or internship to read its details and open related projects. Native buttons support Tab, Enter, and Space; selection is announced to screen readers. Research descriptions and related links are maintained in `app.js`. Publication tabs support Left/Right, Home, and End keys.

## GitHub Pages

All asset paths are relative, so the site works under a repository path such as `/yangchen/`. Publish the directory containing `index.html` using the repository's GitHub Pages configuration.
