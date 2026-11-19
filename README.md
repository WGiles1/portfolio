# Personal portfolio website

Single-file pages: `index.html` (home) and `projects.html` (the three-project page). CSS and JavaScript are inline; open `index.html` in a browser to start.

## Main sections

- Home top navigation: **Bio / Cover Letter**, **Projects** (opens `projects.html`), **Contact**, **Resume**.
- The homepage hero buttons link to Projects and Contact.
- The contact section uses `willgilesrmn@yahoo.com`; LinkedIn has been removed.
- The resume is embedded from `assets/resume.pdf` and has a download button.
- `projects.html` contains the insurance-policy finder, Rochester parking finder, and portable security device. The app/map graphics are concept mockups; replace them with real screenshots or photos as the projects develop.
- `visual-examples.html` is a separate visual direction board for the three concepts.
- Biography and cover letter remain placeholders; add your cover letter at `assets/cover-letter.pdf` or change its link.

## Editing

- Search `index.html` for `EDIT:` to find notes and placeholders.
- Replace text in `[square brackets]` with your own copy.
- Update any `href="#"` or sample email/profile URL to your real links.
- Add `assets/cover-letter.pdf` and `assets/resume.pdf`, or change those button URLs.
- Colors, fonts and page width are in the `:root` block near the top of the `<style>` tag.

## Images

Create an `assets/` folder next to `index.html`. Each patterned box is an image placeholder labelled with a suggested filename. Put an image inside the relevant `.ph` element, for example:

```html
<div class="ph hero-art" data-label="">
  <img src="assets/hero.png" alt="Describe the image">
</div>
```

Set `data-label=""` (or remove it) to hide the placeholder label. The image covers its box.

## Fonts

Loaded from Google Fonts: Antonio (headlines), Barlow Condensed (nav/buttons),
Instrument Sans (body), Space Mono (small labels). Swap them in `:root` and the `<link>` tag.
