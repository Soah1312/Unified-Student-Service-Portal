# React Concepts — Unified Student Service Portal

---

## 1. State Lifting

### What it is
When two or more components need to share the same data, you "lift" the state up to their **common parent**. The parent holds the state and passes it down as props, and passes callback functions down so children can update it.

### Where it's used

**[AdminNotices.jsx](file:///c:/Users/soahf/Desktop/Unified-Student-Service-Portal/client/src/pages/AdminNotices.jsx) → [NoticeCard.jsx](file:///c:/Users/soahf/Desktop/Unified-Student-Service-Portal/client/src/components/NoticeCard.jsx)**

```jsx
// AdminNotices.jsx (PARENT) — holds the list
const [notices, setNotices] = useState([]);

const handleDelete = async (id) => {
  const res = await noticeService.deleteNotice(id);
  if (res.success) setNotices(prev => prev.filter(n => n.id !== id)); // updates parent state
};

// passes callback DOWN to child
<NoticeCard notice={notice} onDelete={handleDelete} onEdit={handleEdit} />
```

```jsx
// NoticeCard.jsx (CHILD) — doesn't own state, calls parent callback
<button onClick={() => onDelete(notice.id)}>Delete</button>
//                        ↑ triggers parent's handleDelete
```

The [NoticeCard](file:///c:/Users/soahf/Desktop/Unified-Student-Service-Portal/client/src/components/NoticeCard.jsx#5-81) doesn't know about Firestore. It just says "something happened" and the parent decides what to do. This keeps the child **reusable**.

**[AdminSeed.jsx](file:///c:/Users/soahf/Desktop/Unified-Student-Service-Portal/client/src/pages/AdminSeed.jsx) → [SeedOption](file:///c:/Users/soahf/Desktop/Unified-Student-Service-Portal/client/src/pages/AdminSeed.jsx#73-101) component**

```jsx
// AdminSeed.jsx (PARENT) — owns running state
const [running, setRunning] = useState(false);

// passes it down so child buttons are disabled while seeding
<SeedOption disabled={running} onSeed={seedNotices} onClear={clearNotices} />
```

---

## 2. Conditional Rendering

### What it is
Showing or hiding parts of the UI based on state or props. Three common patterns used in this project:

| Pattern | Syntax | Use case |
|---------|--------|----------|
| Short-circuit | `condition && <JSX />` | Render only if true |
| Ternary | `condition ? <A /> : <B />` | Render one of two things |
| Early return | `if (...) return <JSX />` | Bail out early (loading, auth) |

### Where it's used

**Early return for loading state — [AdminNotices.jsx](file:///c:/Users/soahf/Desktop/Unified-Student-Service-Portal/client/src/pages/AdminNotices.jsx)**
```jsx
if (loading) return (
  <div>Loading notices...</div>
);
// rest of page only renders after data is fetched
```

**Early return for auth guard — [AdminLayout.jsx](file:///c:/Users/soahf/Desktop/Unified-Student-Service-Portal/client/src/components/layout/AdminLayout.jsx)**
```jsx
if (authState === 'loading') return <div>Verifying session…</div>;
if (authState === 'unauthed') return <Navigate to="/admin/login" replace />;
// only reaches here if authenticated
```

**Ternary for empty state — [AdminNotices.jsx](file:///c:/Users/soahf/Desktop/Unified-Student-Service-Portal/client/src/pages/AdminNotices.jsx)**
```jsx
{notices.length === 0 ? (
  <div>The notice board is empty.</div>
) : (
  <div className="notice-admin-grid">
    {notices.map(notice => <NoticeCard ... />)}
  </div>
)}
```

**Short-circuit for error message — [AdminLogin.jsx](file:///c:/Users/soahf/Desktop/Unified-Student-Service-Portal/client/src/pages/AdminLogin.jsx)**
```jsx
{error && (
  <div style={{ borderLeft: '3px solid var(--accent)' }}>
    <p>{error}</p>
  </div>
)}
```

**Short-circuit for admin-only UI — [Events.jsx](file:///c:/Users/soahf/Desktop/Unified-Student-Service-Portal/client/src/pages/Events.jsx)**
```jsx
{isAdmin && (
  <a href="/events/create">+ Create Event</a>
)}
```

**Short-circuit for action buttons — [NoticeCard.jsx](file:///c:/Users/soahf/Desktop/Unified-Student-Service-Portal/client/src/components/NoticeCard.jsx)**
```jsx
{onEdit && <button onClick={() => onEdit(notice)}>Edit</button>}
{onDelete && <button onClick={() => onDelete(notice.id)}>Delete</button>}
// buttons only show if the callback prop was passed
```

**Short-circuit for event time — [EventCard.jsx](file:///c:/Users/soahf/Desktop/Unified-Student-Service-Portal/client/src/components/EventCard.jsx)**
```jsx
{event.time && (
  <div>{event.time}</div>
)}
```

---

## 3. Event Handling

### What it is
Responding to user interactions — clicks, form submissions, input changes — using event handler functions attached to JSX elements.

### Where it's used

**Form submit — [AdminLogin.jsx](file:///c:/Users/soahf/Desktop/Unified-Student-Service-Portal/client/src/pages/AdminLogin.jsx)**
```jsx
const handleLogin = async (e) => {
  e.preventDefault();        // stops page reload
  setLoading(true);
  const res = await adminService.login(email, password);
  if (res.success) navigate('/admin/dashboard');
  else setError(res.message);
  setLoading(false);
};

<form onSubmit={handleLogin}>...</form>
```

**Input change (controlled input) — [NoticeForm.jsx](file:///c:/Users/soahf/Desktop/Unified-Student-Service-Portal/client/src/components/NoticeForm.jsx)**
```jsx
const handleChange = (e) => 
  setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//                               ↑ uses input's name attribute as key

<input name="title" value={formData.title} onChange={handleChange} />
<input name="category" value={formData.category} onChange={handleChange} />
// same handler for every field
```

**Button click — [AdminSeed.jsx](file:///c:/Users/soahf/Desktop/Unified-Student-Service-Portal/client/src/pages/AdminSeed.jsx)**
```jsx
<Button onClick={() => seedNotices()}>Seed</Button>
<Button onClick={() => clearNotices()}>Clear</Button>
```

**Mouse hover (inline style swap) — [NoticeCard.jsx](file:///c:/Users/soahf/Desktop/Unified-Student-Service-Portal/client/src/components/NoticeCard.jsx)**
```jsx
<div
  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-dark)'}
  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
>
```

**Checkbox change — [Events.jsx](file:///c:/Users/soahf/Desktop/Unified-Student-Service-Portal/client/src/pages/Events.jsx)**
```jsx
<input
  type="checkbox"
  checked={isAdmin}
  onChange={() => dispatch(toggleAdminMode())}
/>
```

---

## 4. React Hooks

### `useState`
Declares a state variable. Returns `[value, setter]`. Calling the setter triggers a re-render.

**Used in almost every file. Key examples:**

```jsx
// AdminNotices.jsx
const [notices, setNotices] = useState([]);   // data list
const [loading, setLoading] = useState(true); // loading flag

// AdminLogin.jsx
const [email, setEmail]       = useState('');
const [password, setPassword] = useState('');
const [error, setError]       = useState('');
const [loading, setLoading]   = useState(false);

// AdminLayout.jsx
const [authState, setAuthState]         = useState('loading'); // 'loading'|'authed'|'unauthed'
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

// AdminSeed.jsx
const [logs, setLogs]       = useState([]);   // terminal log lines
const [running, setRunning] = useState(false);
```

---

### `useEffect`
Runs side effects **after** render. Used for: fetching data, subscriptions, timers. Takes a dependency array — runs again only when those values change. Empty array `[]` = run once on mount.

```jsx
// AdminNotices.jsx — fetch on mount
useEffect(() => { fetchNotices(); }, []);
//                                   ↑ empty = runs once when component loads

// AdminLayout.jsx — Firebase auth listener
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setAuthState(user && ALLOWED_ADMIN_EMAILS.includes(user.email) ? 'authed' : 'unauthed');
  });
  return unsubscribe; // ← cleanup: removes listener when component unmounts
}, []);

// AdminSeed.jsx — auto-scroll log to bottom
useEffect(() => {
  logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [logs]); // ← runs every time logs array changes
```

---

### `useRef`
Holds a mutable value that **doesn't cause a re-render** when changed. Also used to directly reference a DOM element.

```jsx
// AdminSeed.jsx — reference the bottom of the log div
const logEndRef = useRef(null);

// attached to a real DOM element
<div ref={logEndRef} />

// called imperatively to scroll to it
logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
```

---

### `useNavigate`
From React Router. Returns a function to navigate programmatically (not via a link click).

```jsx
// AdminLogin.jsx
const navigate = useNavigate();
navigate('/admin/dashboard');   // after successful login

// AdminNotices.jsx
navigate('/admin/notices/create');          // go to create page
navigate(`/admin/notices/edit/${notice.id}`, { state: { notice } }); // go to edit, pass data
```

---

### `useParams`
From React Router. Reads URL path parameters.

```jsx
// CreateNotice.jsx — URL: /admin/notices/edit/:id
const { id } = useParams();
const isEditing = Boolean(id); // true on edit, false on create
```

---

### `useLocation`
From React Router. Reads the current URL and any state passed during navigation.

```jsx
// CreateNotice.jsx
const location = useLocation();
const initialData = location.state?.notice || null;
// AdminNotices passed `notice` object via navigate() — received here to pre-fill form
```

---

### `useSelector` & `useDispatch` (Redux hooks)
```jsx
// Events.jsx
const { user, isAdmin } = useSelector(state => state.auth);
// reads from Redux store — re-renders when these values change

const dispatch = useDispatch();
dispatch(toggleAdminMode());
// sends an action to Redux — updates the store
```

---

### `useContext` — Not directly used
This project uses **Redux** instead of Context for global state. But `<Provider>` from `react-redux` internally uses React Context under the hood to make the store available to all components.

> If you removed Redux and wanted to share `user` across components without it, you'd use `createContext` + `useContext` instead.

---

## 5. Redux

### What it is
A global state store. Any component can read from it or update it without prop drilling.

### Setup in this project

```
main.jsx
  └── <Provider store={store}>   ← makes store available everywhere
        store/index.js           ← configureStore({ reducer: { auth } })
        store/authSlice.js       ← state shape + actions (login, logout, toggleAdminMode)
```

### State shape
```js
{
  auth: {
    user: { id: "student_001", name: "Test Student" },
    isAdmin: false,
    isAuthenticated: true,
  }
}
```

### Where it's consumed — [Events.jsx](file:///c:/Users/soahf/Desktop/Unified-Student-Service-Portal/client/src/pages/Events.jsx)

```jsx
const { user, isAdmin } = useSelector(state => state.auth);
const currentUserId = user?.id; // used in registerEvent(eventId, userId)

dispatch(toggleAdminMode()); // flips isAdmin in the store
```

### Actions defined but not yet wired
[login](file:///c:/Users/soahf/Desktop/Unified-Student-Service-Portal/client/src/services/adminService.js#11-33) and [logout](file:///c:/Users/soahf/Desktop/Unified-Student-Service-Portal/client/src/services/adminService.js#34-38) actions exist in [authSlice.js](file:///c:/Users/soahf/Desktop/Unified-Student-Service-Portal/client/src/store/authSlice.js) but aren't called yet. The Firebase Auth and Redux auth currently run independently — connecting them would be a future improvement.

---

## 6. Routing in React (React Router v6)

### Setup
```jsx
// main.jsx
<BrowserRouter>   ← enables URL-based navigation
  <App />
</BrowserRouter>
```

### Route map — [App.jsx](file:///c:/Users/soahf/Desktop/Unified-Student-Service-Portal/client/src/App.jsx)

```
/                          → redirects to /dashboard
/dashboard                 → Dashboard.jsx        (inside Layout)
/notices                   → Notices.jsx          (inside Layout)
/events                    → Events.jsx           (inside Layout)
/notifications             → Notifications.jsx    (inside Layout)
/seed                      → SeedDatabase.jsx     (inside Layout)

/admin/login               → AdminLogin.jsx       (standalone)
/admin/dashboard           → AdminDashboard.jsx   (inside AdminLayout — protected)
/admin/notices             → AdminNotices.jsx     (inside AdminLayout — protected)
/admin/notices/create      → CreateNotice.jsx     (inside AdminLayout — protected)
/admin/notices/edit/:id    → CreateNotice.jsx     (inside AdminLayout — protected)
/admin/seed                → AdminSeed.jsx        (inside AdminLayout — protected)
```

### Nested routes + `<Outlet />`
```jsx
// App.jsx
<Route element={<AdminLayout />}>      ← shell component
  <Route path="/admin/dashboard" element={<AdminDashboard />} />
  <Route path="/admin/notices"   element={<AdminNotices />} />
</Route>

// AdminLayout.jsx
<main>
  <AdminSidebar />
  <Outlet />   ← AdminDashboard / AdminNotices render here
</main>
```
Sidebar is always visible. Only `<Outlet>` swaps on navigation.

### `<Navigate>` — JSX redirects
```jsx
// App.jsx — redirect root
<Route path="/" element={<Navigate to="/dashboard" replace />} />

// AdminLayout.jsx — auth guard
if (authState === 'unauthed') return <Navigate to="/admin/login" replace />;
```

### `<NavLink>` — active link styling — [AdminSidebar.jsx](file:///c:/Users/soahf/Desktop/Unified-Student-Service-Portal/client/src/components/AdminSidebar.jsx)
```jsx
<NavLink
  to="/admin/dashboard"
  style={({ isActive }) => ({
    borderLeft: isActive ? '3px solid var(--accent)' : '3px solid transparent',
    color: isActive ? 'var(--text-invert)' : 'rgba(245,245,240,0.45)',
  })}
>
  Dashboard
</NavLink>
```

### `useNavigate` — code-driven navigation
```jsx
// AdminLogin.jsx — after login
navigate('/admin/dashboard');

// AdminNotices.jsx — go to edit with data
navigate(`/admin/notices/edit/${notice.id}`, { state: { notice } });
```

### `useParams` — dynamic URL segments
```jsx
// CreateNotice.jsx — /admin/notices/edit/:id
const { id } = useParams(); // "abc123"
```

### `useLocation` — read navigation state
```jsx
// CreateNotice.jsx
const location = useLocation();
const initialData = location.state?.notice; // notice object passed from AdminNotices
```
