import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import Declarations from './pages/Declarations.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Music from './pages/Music.jsx';
import NotFound from './pages/NotFound.jsx';
import Photos from './pages/Photos.jsx';
import Stories from './pages/Stories.jsx';
import Watchlist from './pages/Watchlist.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function PrivateRoute({ children }) {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fotos" element={<Photos />} />
            <Route path="/historias" element={<Stories />} />
            <Route path="/filmes-series" element={<Watchlist />} />
            <Route path="/musicas" element={<Music />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/declaracoes"
              element={
                <PrivateRoute>
                  <Declarations />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}
