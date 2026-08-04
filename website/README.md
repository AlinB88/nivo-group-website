# NIVO Group website

The canonical public website for NIVO Group. It is a lightweight, static Vite
site that presents Nivo as the group's guide through four horizontal chapters:
the base Nivo, Advisory, IT Services, and the planned Logistics chapter.

## Local development

```sh
npm install
npm run dev
```

Create a production build with:

```sh
npm run build
```

The deployable static files are written to `dist/`. For Hostinger, upload the
contents of `dist/` to the main domain's document root. The former test
subdomain is no longer needed once the main-domain deployment is confirmed.

## Structure

```text
website/
├── assets/
│   ├── nivo/       # Approved Nivo renders and wardrobe notes
│   └── lottie/     # Reserved for approved lightweight animations
├── content.js      # English and draft Arabic page content
├── index.html      # Semantic site shell
├── main.js         # Language, chapter, and horizontal journey behavior
└── styles.css      # Visual system, responsive layout, and motion
```

Business copy belongs in `content.js`; keep structure, behavior, and styling
in their respective files. Do not invent services, claims, legal wording, or
Arabic translations. The current Arabic copy is a draft that requires review.

## Quality checks

```sh
npm run format
npm run check
npm run lint
npm run build
```
