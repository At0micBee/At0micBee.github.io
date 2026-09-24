# Personal website

A four-page resume and portfolio site made with plain HTML, CSS, and a small slideshow script. The pages are `index.html`, `publications.html`, `public-events.html`, and `resume.html`; their shared styles are in `assets/styles.css`.

## Preview locally

From this folder, run `python3 -m http.server 8000`, then open [http://localhost:8000](http://localhost:8000). Stop the server with Ctrl+C.

## Make it yours

The header logo and browser icon use `assets/logo.png`. The home slideshow uses the five images in `assets/slides/` and `assets/slideshow.js`; it advances automatically, has previous/next and pause controls, and starts paused when reduced motion is requested. The Public Events feature uses `assets/jwst-full-mirror.jpg`. The site uses Google Fonts when available and falls back to Georgia and Arial.

The files are ready to be served as a static GitHub Pages site. Publishing can be configured after the content is reviewed.
