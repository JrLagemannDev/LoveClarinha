import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Layout from './components/Layout.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';

const Curiosities = lazy(() => import('./pages/Curiosities.jsx'));
const Declarations = lazy(() => import('./pages/Declarations.jsx'));
const Home = lazy(() => import('./pages/Home.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Music = lazy(() => import('./pages/Music.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));
const Photos = lazy(() => import('./pages/Photos.jsx'));
const Stories = lazy(() => import('./pages/Stories.jsx'));
const Watchlist = lazy(() => import('./pages/Watchlist.jsx'));

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
        <Layout>
          <Suspense fallback={<div className="page-shell page-section">Carregando...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/fotos" element={<Photos />} />
              <Route path="/historias" element={<Stories />} />
              <Route path="/filmes-series" element={<Watchlist />} />
              <Route path="/musicas" element={<Music />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/curiosidades"
                element={
                  <PrivateRoute>
                    <Curiosities />
                  </PrivateRoute>
                }
              />
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
          </Suspense>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}
