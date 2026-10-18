# Kunji's Vintage Scrapbook Puzzle 💌

A free, mobile-friendly, three-screen birthday website for GitHub Pages.

## Add your photo
1. Open the `assets` folder.
2. Replace `kunji-photo.jpg` with your own image.
3. Keep the filename exactly `kunji-photo.jpg` (lowercase, `.jpg`).
4. If your original photo is PNG or HEIC, convert/export it to JPG first.

The same image is used on the cover, puzzle, and congratulations page.

## Preview on your computer
Open `index.html` in Chrome. The site uses plain HTML/CSS/JavaScript and normally works directly from a file. Internet is only needed for the optional Google Fonts; fallback fonts still work offline.

## Publish free using GitHub Pages
1. Sign in to https://github.com
2. Click **+** → **New repository**.
3. Name it `kunji-scrapbook` and set it to **Public**.
4. Create the repository.
5. Click **Add file** → **Upload files**.
6. Upload `index.html`, `style.css`, `script.js`, `README.md`, and the `assets` folder with `kunji-photo.jpg` inside it.
7. Click **Commit changes**.
8. Open **Settings** → **Pages**.
9. Under **Build and deployment**, choose **Deploy from a branch**.
10. Choose branch `main`, folder `/(root)`, and click **Save**.
11. Wait a minute or two. GitHub will show your public website URL on the Pages settings screen.

Your URL will usually look like:
`https://YOUR-USERNAME.github.io/kunji-scrapbook/`

## How the puzzle works
- 32 tiles in a 4-column × 8-row grid.
- The final tile is the empty space.
- Only adjacent tiles can slide.
- The shuffle is generated through legal moves, so the puzzle is solvable.
- The congratulations page is only opened when all tiles are in the correct order.

## Edit the final message
Open `index.html` and find the text inside `.final-message`. Edit the words between the `<p>` and `</p>` tags. Keep the tags themselves.
