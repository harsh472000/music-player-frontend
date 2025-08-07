# 🎵 Music Player Frontend

🔗 [Live Demo](https://music-player-frontend-psi.vercel.app/)

A modern music player application built with **React**, **Vite**, and integrated with the **Spotify API**. Users can manage playlists, add/remove songs, and enjoy their favorite music with a sleek UI and responsive experience.

---

## ✨ Features

- 🎵 **Spotify API** integration for fetching songs
- 📝 Create, read, update, and delete playlists
- ➕ Add songs to specific playlists
- 🔒 Authentication system with protected routes
- 🌓 Light/dark theme support
- 📱 Fully responsive design

---

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- npm or yarn
- [Spotify Developer Account](https://developer.spotify.com/) (for API credentials)

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/music-player-frontend.git
cd music-player-frontend
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
VITE_SPOTIFY_CLIENT_ID=your_client_id
VITE_SPOTIFY_CLIENT_SECRET=your_client_secret
VITE_SPOTIFY_REDIRECT_URI=http://localhost:3000/callback
VITE_API_BASE_URL=http://localhost:your_backend_port
```

> Replace `your_client_id`, `your_client_secret`, and `your_backend_port` with actual values.

### 4. Start the development server

```bash
npm run dev
# or
yarn dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🧱 Project Structure

```
.
├── public/
├── src/
│   ├── assets/             # Static assets
│   ├── components/         # Reusable components
│   ├── layouts/
│   │   ├── AuthLayout/     # Authentication layout
│   │   ├── DashboardLayout/# Main app layout
│   │   └── RouteGuard/     # Route protection
│   ├── pages/
│   │   ├── authentication/ # Auth pages
│   │   └── dashboard/      # Main app pages
│   ├── routes/             # Route configurations
│   ├── services/           # API service modules
│   ├── themes/             # Theme configurations
│   ├── utils/              # Utility functions
│   ├── App.css             # Main styles
│   ├── App.jsx             # Root component
│   ├── index.css           # Global styles
│   └── main.jsx            # Entry point
├── .env                    # Environment variables
├── .gitignore              # Git ignore rules
└── vite.config.ts          # Vite configuration
```

---

## 📜 Available Scripts

| Script         | Description                           |
|----------------|---------------------------------------|
| `npm run dev`  | Start development server              |
| `npm run build`| Build app for production              |
| `npm run preview` | Preview production build locally  |
| `npm run lint` | Run ESLint                            |
| `npm run format` | Format code with Prettier          |

---

## 🎧 Spotify API Integration

To set up your own Spotify API access:

1. [Create a Spotify Developer account](https://developer.spotify.com/)
2. Register a new app
3. Set the **Redirect URI** to:  
   `http://localhost:3000/callback`
4. Copy the **Client ID** and **Client Secret**
5. Add them to your `.env` file as shown above

---

## 📦 Deployment

This project is configured for easy deployment to **Vercel**.

### To deploy:

1. Push your code to a GitHub repository
2. Go to [Vercel](https://vercel.com/) and create a new project
3. Import your GitHub repository
4. In **Project Settings > Environment Variables**, add the same `.env` values
5. Click **Deploy**

---

## 🤝 Contributing

Contributions are welcome! To contribute:

```bash
# Fork the repo
# Create a branch
git checkout -b feature/your-feature

# Make your changes
git commit -m 'Add some feature'

# Push and open a PR
git push origin feature/your-feature
```

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Spotify](https://developer.spotify.com/) for their powerful API
- [Vite](https://vitejs.dev/) for an amazing build tool
- [React](https://reactjs.org/) and the open-source community
