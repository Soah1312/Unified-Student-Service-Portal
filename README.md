# 🎓 Unified Student Service Portal (USSP)

A modern, high-performance, and modular platform built to centralize student services. Featuring a premium glassmorphic UI and an edge-native backend.

## 🚀 Key Features

- **Dashboard**: High-level overview of campus activity.
- **Notices**: Real-time academic and administrative notices with a built-in commenting system.
- **Events**: Explore and register for campus events with live capacity tracking.
- **Notifications**: Instant alerts for important updates.
- **Profile**: Comprehensive view of academic performance (CGPA, Credits, etc.).

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router v6](https://reactrouter.com/)

### Backend
- **Framework**: [Hono.js](https://hono.dev/)
- **Runtime**: [Cloudflare Workers](https://workers.cloudflare.com/) (Edge Runtime)
- **Deployment**: [Wrangler](https://developers.cloudflare.com/workers/wrangler/)
- **CI/CD**: [GitHub Actions](https://github.com/features/actions)

---

## 💻 Getting Started

### Prerequisites
- Node.js (v20.x recommended)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Soah1312/Unified-Student-Service-Portal.git
   cd Unified-Student-Service-Portal
   ```

2. **Setup Backend**:
   ```bash
   cd server
   npm install
   npm run dev
   ```

3. **Setup Frontend**:
   ```bash
   cd ../client
   npm install
   npm run dev
   ```

4. **Access the App**:
   - Frontend: `http://localhost:5173`
   - Local API: `http://localhost:8787`

---

## 🚀 Deployment

### Backend (Cloudflare Workers)
The backend is automatically deployed to Cloudflare via GitHub Actions on every push to the `main` branch.

**Manual Deployment**:
```bash
cd server
npm run deploy
```

---

## 📂 Project Structure

```text
├── client/                # React Vite Application
│   ├── src/
│   │   ├── components/    # Reusable UI & Layout components
│   │   ├── pages/         # Application pages
│   │   ├── services/      # API communication layer
│   │   └── index.css      # Core styles & Tailwind v4
├── server/                # Hono.js Cloudflare Worker
│   ├── src/
│   │   ├── routes/        # Modular Hono API routes
│   │   └── services/      # Business logic & mock data services
│   └── wrangler.toml      # Cloudflare configuration
└── .github/workflows/     # CI/CD Deployment pipeline
```

---

## 📝 Roadmap & Future Scope
- [ ] **Database Integration**: Migrate in-memory state to [Cloudflare D1](https://developers.cloudflare.com/d1/).
- [ ] **Real-time Engine**: Implement real-time notifications with WebSockets/Durable Objects.
- [ ] **Authentication**: Secure endpoints with JSON Web Tokens (JWT).
- [ ] **File Storage**: Use [Cloudflare R2](https://developers.cloudflare.com/r2/) for resource uploads.

---

## 🤝 Contributing
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
This project is licensed under the MIT License.
