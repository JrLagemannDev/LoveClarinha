import FloatingDecorations from './FloatingDecorations.jsx';
import Navbar from './Navbar.jsx';

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <FloatingDecorations />
      <Navbar />
      <main className="relative z-10">{children}</main>
      <footer className="relative z-10 border-t border-white/40 bg-cherry/80 py-6 text-center text-sm font-extrabold text-white backdrop-blur">
        Feito com carinho para a Clarinha. LoveClarinha e o nosso cantinho rosa.
      </footer>
    </div>
  );
}
