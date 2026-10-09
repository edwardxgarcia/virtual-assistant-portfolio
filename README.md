# Edward Moncera: Virtual Assistant Portfolio

A plain HTML, CSS, and JavaScript website. No build step, no paid services.

## Files
- `index.html`: page content (text for every section)
- `style.css`: colors, fonts, layout (colors are at the top in `:root`)
- `script.js`: the work samples list (`PROJECTS`), the sample viewer, and the mobile menu
- `samples/`: downloadable sample files (CSV opens in Excel and Google Sheets; MD opens in any text editor)
- `assets/favicon.svg`: browser tab icon

## Photo and logos
- **Photo:** save your photo as `assets/photo.jpg` (about 800 x 1000 px, portrait). It then appears in the hero automatically. Until the file exists, the photo area stays hidden.
- **Logos:** stored in `assets/logos/`. The ServiceNow logo is `assets/logos/servicenow.png`.
- **Packages:** edit the prices and lists in the `#packages` section of `index.html`.

## Publish on GitHub Pages (free)
1. Sign in at github.com and click **New repository**. Name it `virtual-assistant-portfolio`, set it to Public, and create it.
2. Click **uploading an existing file**, drag in everything inside this folder (keep the `samples` and `assets` folders), and click **Commit changes**.
3. Go to **Settings > Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then **Save**.
4. After a minute, your site appears at `https://YOUR-USERNAME.github.io/virtual-assistant-portfolio/`.

## Editing
- **Text:** open `index.html` and change the words between the tags.
- **Add a work sample:** put the file in `samples/`, then copy one block in `PROJECTS` in `script.js` and edit it.
- **Skills:** edit the `<li>` items in the Skills section of `index.html`.
- **Design:** change the color values at the top of `style.css`.

Note: opening `index.html` directly from your computer works, but sample previews need the site to be online. Downloads always work.
