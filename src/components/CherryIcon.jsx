import { useId } from 'react';

export default function CherryIcon({ className = '' }) {
  const baseId = useId().replaceAll(':', '');
  const redGradientId = `${baseId}-red`;
  const darkRedGradientId = `${baseId}-dark-red`;
  const leafGradientId = `${baseId}-leaf`;
  const shadowId = `${baseId}-shadow`;

  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={redGradientId} cx="30%" cy="24%" r="74%">
          <stop offset="0%" stopColor="#FFB3C8" />
          <stop offset="32%" stopColor="#F43F5E" />
          <stop offset="72%" stopColor="#C9184A" />
          <stop offset="100%" stopColor="#7F0D2E" />
        </radialGradient>
        <radialGradient id={darkRedGradientId} cx="34%" cy="24%" r="76%">
          <stop offset="0%" stopColor="#FFD1DD" />
          <stop offset="30%" stopColor="#FB3D5F" />
          <stop offset="72%" stopColor="#B80F3E" />
          <stop offset="100%" stopColor="#6E0825" />
        </radialGradient>
        <linearGradient id={leafGradientId} x1="44" y1="5" x2="60" y2="18">
          <stop stopColor="#7BD66C" />
          <stop offset="1" stopColor="#1E7C3A" />
        </linearGradient>
        <filter id={shadowId} x="0" y="0" width="64" height="68">
          <feDropShadow dx="0" dy="4" stdDeviation="2.5" floodColor="#7F0D2E" floodOpacity="0.35" />
        </filter>
      </defs>
      <path
        d="M31 28C33 18 40 9 52 6"
        stroke="#1F7A3A"
        strokeWidth="4.8"
        strokeLinecap="round"
      />
      <path
        d="M37 30C40 20 47 14 58 16"
        stroke="#2F8F4E"
        strokeWidth="4.8"
        strokeLinecap="round"
      />
      <path
        d="M43 14C48 6 55 4 61 7C58 16 50 19 43 14Z"
        fill={`url(#${leafGradientId})`}
      />
      <g filter={`url(#${shadowId})`}>
        <circle cx="23" cy="42" r="15" fill={`url(#${redGradientId})`} />
        <circle cx="43" cy="44" r="14" fill={`url(#${darkRedGradientId})`} />
      </g>
      <ellipse cx="18" cy="36" rx="5" ry="4" fill="#FFE1EA" opacity="0.92" />
      <ellipse cx="38" cy="38" rx="4.4" ry="3.6" fill="#FFE1EA" opacity="0.88" />
      <path
        d="M18 55C24 59 33 56 36 49"
        stroke="#8A0B2E"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.28"
      />
      <path
        d="M40 55C46 58 53 55 55 49"
        stroke="#780823"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  );
}
