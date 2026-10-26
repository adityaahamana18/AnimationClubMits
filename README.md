# Animation Club — Madhav Institute of Technology & Science (MITS), Gwalior

A modern, visually stunning, fully responsive creative studio website for the **Animation Club of MITS Gwalior**.

> *"WE DON'T JUST IMAGINE. WE ANIMATE."*

---

## 🎨 Creative Studio Aesthetic & Design Direction

- **Theme & Colors:** Clean, off-white/cream primary canvas with **electric purple (`#7928CA`)**, **vibrant orange (`#FF4D00`)**, deep slate black accents, and neobrutalist offset shadows.
- **Typography:** Bold, editorial typography featuring **Clash Display**, **Plus Jakarta Sans**, and monospace technical tags (**Space Mono**).
- **Micro-Interactions:** Custom desktop interactive cursor, responsive scroll-triggered reveal animations, floating badges, interactive cards with kinetic depth, gallery lightbox, and smooth scrolling.
- **Responsiveness:** Fluid grid and layout supporting mobile, tablet, and desktop screens with an intuitive full-screen mobile drawer menu.

---

## 🛠️ Technology Stack

- **HTML5:** Semantic architecture, accessible landmarks, and rich SEO meta tags.
- **CSS3:** Custom properties (CSS variables), CSS grid, flexbox, keyframe animations, glassmorphism, and neobrutalist shadows.
- **Vanilla JavaScript (ES6+):** Modular, lightweight engine with zero heavy frameworks (No React/Next.js overhead).
- **Lucide Icons:** Clean, consistent iconography loaded via CDN.
- **Fontshare & Google Fonts:** High-impact typography.

---

## 📂 Project Structure

```
animation-club/
├── index.html               # Main website entry point
├── css/
│   └── style.css            # Studio design system, responsive styles & animations
├── js/
│   ├── data.js              # Centralized data store (Events, Team, Domains, Gallery, Config)
│   └── script.js            # Interactive engine (Cursor, Lightbox, Dynamic rendering, Filters)
├── assets/
│   ├── icons/               # Club vector icons & branding
│   ├── images/              # Visual assets & creative artwork
│   └── posters/             # Official event posters (e.g., FRAME SHIFT)
└── README.md                # Project documentation
```

---

## ⚙️ How to Customize & Maintain Content

All club data is centralized in **`js/data.js`**. Organizers can easily update information without touching the core HTML structure:

### 1. Updating Club Socials & Recruitment
In `js/data.js`, modify `CLUB_CONFIG`:
```javascript
const CLUB_CONFIG = {
  clubName: "Animation Club, MITS Gwalior",
  socials: {
    instagram: "https://instagram.com/your_handle",
    linkedin: "https://linkedin.com/company/your_page",
    email: "animationclub@mitsgwalior.in"
  },
  recruitment: {
    isOpen: true, // Toggle to false to close recruitment
    formUrl: "https://forms.google.com/your-form-link",
    closedMessage: "Recruitment is currently closed for this term."
  }
};
```

### 2. Adding / Modifying Events
In `js/data.js`, update the `EVENTS_DATA` array:
- Set `status: "upcoming"` for live announcements with registration links.
- Set `status: "past"` for completed challenges and highlight reels.

### 3. Adding Team Members
In `js/data.js`, update `TEAM_DATA` to add core leads, mentors, or faculty coordinators with their designations and verified social links.

### 4. Updating the Creative Gallery
Add new artwork items to `GALLERY_DATA` with title, creator credit, category (`motion`, `3d`, `2d`, `posters`, `edits`, `memes`, `art`), and descriptions.

---

## 🚀 Running the Website Locally

You can run this project with any local static server:

### Option 1: VS Code Live Server
1. Open the `Animation Club` folder in VS Code.
2. Right-click on `index.html` and select **"Open with Live Server"**.

### Option 2: Python Simple HTTP Server
```bash
# In the project directory:
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

### Option 3: Node `npx serve`
```bash
npx serve .
```

---

## 🌟 Key Highlights & Features

- **Editorial Hero Section:** Bold typography, realtime animated viewport, floating motion tags, and live stats strip.
- **10 Interactive Creative Domains:** 2D Animation, 3D Animation, Video Editing, Motion Graphics, Graphic Design, Digital Art & Illustration, Content Creation, Creative Tech & Code, Marketing & Socials, and Event Hosting.
- **Flagship Event Feature:** Prominent spotlight for **FRAME SHIFT — Creative Animation & Meme Challenge**, with poster visuals and filterable tabs.
- **Asymmetric Portfolio Gallery:** Multi-discipline filtering with modal lightbox inspect view.
- **Genuine Lead & Query Dispatch:** Form inputs validate and open a direct email client pre-filled with subject and context (preventing fake dummy submissions).
- **Accessible & Performance-Minded:** Respects `prefers-reduced-motion` and includes semantic ARIA attributes.

