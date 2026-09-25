# ITE 212 Grade Reveal

React + Vite + Framer Motion classroom grade reveal app.

## Run

```bash
npm install
npm run dev
```

## Add memes

Place MP4 files here:

- `public/memes/pass/pass-01.mp4`
- `public/memes/pass/pass-02.mp4`
- `public/memes/fail/fail-01.mp4`
- `public/memes/fail/fail-02.mp4`
- `public/memes/neutral/neutral-01.mp4`

The app falls back to a skip screen if a video is missing.

## Important

This prototype keeps student data in a JSON file for local classroom use. Do not deploy a complete grade list publicly. For production, move grade lookup to a protected server/API and authenticate students.
