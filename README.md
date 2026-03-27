# 🎓 Unified Student Service Portal (USSP)

A modern, high-performance, and modular platform built to centralize student services. The app now runs as a frontend-only Firebase application.

## 🚀 Key Features

- **Dashboard**: High-level overview of campus activity.
- **Notices**: Real-time academic and administrative notices with a built-in commenting system.
- **Events**: Explore and register for campus events with live capacity tracking.
- **Notifications**: Instant alerts for important updates.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 18](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **State**: [Redux Toolkit](https://redux-toolkit.js.org/)

### Backend-as-a-Service
- **Database**: [Firebase Firestore](https://firebase.google.com/docs/firestore)
- **Authentication**: [Firebase Auth](https://firebase.google.com/docs/auth)

---

## 💻 Getting Started

### Prerequisites
- Node.js (v20.x recommended)
- npm or yarn
- A Firebase project with Firestore and Authentication enabled

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Soah1312/Unified-Student-Service-Portal.git
   cd Unified-Student-Service-Portal
   ```

2. **Setup Frontend**:
   ```bash
   cd client
   npm install
   npm run dev
   ```

3. **Configure Environment Variables**:
   Create `client/.env` and set:
   ```env
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=...
   VITE_FIREBASE_PROJECT_ID=...
   VITE_FIREBASE_STORAGE_BUCKET=...
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   ```

4. **Access the App**:
   - Frontend: `http://localhost:5173`

---

## 📂 Project Structure

```text
├── client/                # React Vite Application
│   ├── src/
│   │   ├── components/    # Reusable UI & Layout components
│   │   ├── pages/         # Application pages
│   │   ├── services/      # Firebase data/service layer
│   │   └── index.css      # Core styles & Tailwind v4
└── .github/workflows/     # CI/CD workflows (optional)
```

---

## 📝 Roadmap & Future Scope
- [ ] **Role Management**: Add fine-grained RBAC for admin/editor/student roles.
- [ ] **Real-time Updates**: Use Firestore listeners for live notice/event updates.
- [ ] **Security Rules**: Harden Firestore and Auth rules for production.
- [ ] **File Storage**: Add media uploads using [Firebase Storage](https://firebase.google.com/docs/storage).

---

## 🤝 Contributing
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
This project is licensed under the MIT License.
