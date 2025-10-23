
# Lavansh Choubey — Portfolio

This repository hosts my personal portfolio website. The content, design, and code in this repo are authored and maintained by me.

Quick links
- Live site: https://lavansh-portfolio-7i5p.vercel.app/
- Resume: https://drive.google.com/file/d/1Bq2aMXg6kc84LU1xtnYoe6n_7mNlNRpU/view?usp=sharing
- Contact: https://github.com/lavansh1306 (or add your preferred contact/email)

About
-----
This site showcases my projects, achievements, and contact information. It's built with modern web tooling and optimized for fast local development and easy deployment.

Technologies
------------
- Vite
- React + TypeScript
- Tailwind CSS
- Framer Motion
- react-three/fiber and three.js (for 3D visuals)
- shadcn/ui + Radix UI

Run locally
-----------
These are the commands I use to develop this site locally. Make sure you have a Node.js version supported by the project (Node 18+ is recommended).

```sh
# Install dependencies
npm install

# Run dev server (hot-reload)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

Deployment
----------
I deploy the site using Vercel (recommended) or GitHub Pages.

- Vercel: Import the GitHub repository into Vercel and use the default build command (`npm run build`). If you use Node 18 and encounter dependency peer issues, enable `--legacy-peer-deps` or pin compatible package versions.
- GitHub Pages: Build locally with `npm run build` and publish the `dist/` folder. A GitHub Actions workflow can be used to automate this.

Notes about dependencies and licenses
-----------------------------------
This project includes a number of third-party libraries. Please review their licenses if you plan to redistribute code or assets. The libraries used are standard open-source packages; any license requirements should be preserved when redistributing.

If you're preparing this site for public or commercial release, double-check compatibility of packages like `@react-three/drei` with your React version and follow the libraries' license terms.

Contact
-------
If you want to get in touch, reach out via GitHub: https://github.com/lavansh1306

--
Portfolio maintained by Lavansh Choubey

