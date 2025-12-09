
# Apple Clone Project

This is a **clone of the Apple Store website**, built primarily for learning and demonstration purposes. The **frontend** is built using **React** and **Vite**. The **iPhone page** fetches data from a backend MySQL database and displays embedded YouTube videos. The project showcases **product browsing**, **SPA routing**, and **responsive design**.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Build & Deployment](#build--deployment)
- [License](#license)

## Demo

Frontend deployed on Netlify: [https://appllefrontend.netlify.app/]. Backend database (MySQL) serves the iPhone page data. Clicking on an iPhone link fetches the product data from the backend and displays the details along with an embedded YouTube video.

## Features

- Browse Apple products with a focus on the iPhone page.  
- Fetch iPhone product data from backend MySQL database.  
- Display embedded YouTube videos for product demos.  
- Responsive design for desktop and mobile.  
- SPA routing using React Router.

## Tech Stack

- **Frontend:** React, Vite  
- **Styling:** CSS Modules  
- **Routing:** React Router  
- **Backend (for iPhone page data):** MySQL  
- **Build Tool:** Vite  
- **Deployment:** Netlify (frontend)

## Project Structure

```

Apple_Clone/
├─ frontend/           # React + Vite frontend
│  ├─ package.json
│  ├─ src/
│  └─ ...
├─ backend/            # MySQL database (serves iPhone data)
└─ README.md           # This file

````

## Setup & Installation

1. Clone the repository:

```bash
git clone https://github.com/Redieteshome/appleClone.git
````

2. Navigate to frontend folder:

```bash
cd appleClone/frontend
```

3. Install dependencies:

```bash
npm install
```

4. Run locally:

```bash
npm run dev
```

The frontend will start at `http://localhost:5173`. Ensure your backend/MySQL database is running for the iPhone page to fetch data.

## Environment Variables

If your frontend connects to a backend service, create a `.env` file in `frontend`:

```
VITE_BACKEND_URL=http://your-backend-url
```

Use it in code like this:

```javascript
const API_URL = import.meta.env.VITE_BACKEND_URL;
fetch(`${API_URL}/iphone`);
```

Using environment variables allows easy switching between local and deployed backend.

## Build & Deployment

1. Build for production:

```bash
npm run build
```

This generates the `dist` folder.

2. Deploy to Netlify:

* **Base directory:** `frontend`
* **Build command:** `npm run build`
* **Publish directory:** `dist`
* Add `VITE_BACKEND_URL` as an environment variable in Netlify if needed.

## License

This project is **open source** and available under the [MIT License](LICENSE).


