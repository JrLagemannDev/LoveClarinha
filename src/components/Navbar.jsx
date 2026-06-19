import {
  BookHeart,
  Camera,
  Film,
  Heart,
  Home,
  LockKeyhole,
  LogIn,
  LogOut,
  Menu,
  Music2,
  Sparkles,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const baseItems = [
  { to: '/', label: 'Inicio', icon: Home },
  { to: '/fotos', label: 'Fotos', icon: Camera },
  { to: '/historias', label: 'Historias', icon: BookHeart },
  { to: '/filmes-series', label: 'Filmes e series vistos', icon: Film },
  { to: '/musicas', label: 'Nossas musicas', icon: Music2 },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const items = isLoggedIn
    ? [
        ...baseItems,
        { to: '/declaracoes', label: 'Declaracoes', icon: Sparkles },
      ]
    : [...baseItems, { to: '/login', label: 'Login', icon: LogIn }];

  function handleLogout() {
    logout();
    setIsOpen(false);
    navigate('/');
  }

  useEffect(() => {
    function handleScroll() {
      setIsAtTop(window.scrollY <= 8);
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      data-site-navbar
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isAtTop && !isOpen && !isHovered
          ? 'border-b border-transparent bg-transparent backdrop-blur-0 shadow-none'
          : 'border-b border-white/40 bg-cherry/90 shadow-card backdrop-blur-xl'
      }`}
    >
      <nav className="page-shell flex min-h-20 items-center justify-between gap-4">
        <NavLink
          to="/"
          className="inline-flex items-center gap-3 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-cherry"
          onClick={() => setIsOpen(false)}
        >
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-cherry shadow-card">
            <Heart className="h-5 w-5 fill-cherry" aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-xl font-black text-white">
              LoveClarinha
            </span>
            <span className="block text-xs font-black uppercase tracking-[0.18em] text-white/80">
              cantinho especial
            </span>
          </span>
        </NavLink>

        <div className="hidden items-center gap-1 lg:flex">
          {items.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'nav-link-active' : ''}`
              }
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              <span>{label}</span>
            </NavLink>
          ))}
          {isLoggedIn && (
            <button type="button" onClick={handleLogout} className="nav-link">
              <LogOut className="h-4 w-4" aria-hidden="true" />
              <span>Sair</span>
            </button>
          )}
        </div>

        <button
          type="button"
          className="icon-button lg:hidden"
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-white/35 bg-cherry/95 px-4 py-4 shadow-card lg:hidden">
          <div className="mx-auto grid max-w-md gap-2">
            {items.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `nav-link justify-start ${isActive ? 'nav-link-active' : ''}`
                }
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span>{label}</span>
              </NavLink>
            ))}
            {isLoggedIn && (
              <button
                type="button"
                onClick={handleLogout}
                className="nav-link justify-start"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                <span>Sair</span>
              </button>
            )}
            {!isLoggedIn && (
              <p className="flex items-center gap-2 px-4 py-2 text-xs text-ink/60">
                <LockKeyhole className="h-4 w-4" aria-hidden="true" />
                Tem uma surpresa esperando por voce.
              </p>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
