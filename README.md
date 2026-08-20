# Boot-Camp-KB — Professional redesign

This branch contains a professional redesign of the static website and a small Express server skeleton.

What I changed
- Rewrote index.html with semantic markup, meta tags, and a responsive layout.
- Replaced the original CSS with a modern, accessible stylesheet (style.css).
- Split client JS into client/script.js and added a simple server in server/server.js using Express and Mongoose.
- Added .gitignore and .env.example.

How to run locally
1. Install Node.js (16+ recommended).
2. Copy .env.example to .env and update values.
3. npm install (no package.json in this commit; run `npm init -y` and install dependencies listed below).

Recommended dependencies
- express
- mongoose
- bcryptjs
- jsonwebtoken
- dotenv

Notes
- I intentionally left images and videos as optional assets (place in image/ or video/).
- Before deploying, update JWT_SECRET and MONGO_URI in .env.
