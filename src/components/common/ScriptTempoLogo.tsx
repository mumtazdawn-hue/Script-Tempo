import React from 'react';

interface ScriptTempoLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  iconOnly?: boolean;
  className?: string;
  theme?: 'light' | 'dark';
}

export const ScriptTempoLogo: React.FC<ScriptTempoLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  iconOnly = false,
  className = '',
  theme = 'light',
}) => {
  // Sizing definitions
  const dimensions = {
    sm: {
      iconSize: 34,
      scriptText: 'text-[15px]',
      tempoText: 'text-[15px]',
      subText: 'text-[7.5px]',
      gap: 'gap-2',
      tracking: 'tracking-[0.18em]',
    },
    md: {
      iconSize: 44,
      scriptText: 'text-xl',
      tempoText: 'text-xl',
      subText: 'text-[9px]',
      gap: 'gap-2.5',
      tracking: 'tracking-[0.22em]',
    },
    lg: {
      iconSize: 58,
      scriptText: 'text-2xl',
      tempoText: 'text-2xl',
      subText: 'text-[11px]',
      gap: 'gap-3',
      tracking: 'tracking-[0.24em]',
    },
  }[size];

  const scriptColor = theme === 'dark' ? 'text-white' : 'text-[#0B357B]';
  const subtextColor = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';

  return (
    <div className={`inline-flex items-center ${dimensions.gap} select-none ${className}`}>
      {/* High-Precision Professional ST Emblem with 02:30 Timecode Badge */}
      <svg
        width={dimensions.iconSize}
        height={dimensions.iconSize}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-xs transition-transform duration-200 group-hover:scale-[1.03]"
        aria-hidden="true"
      >
        <defs>
          {/* Cobalt-to-Cyan Electric Ribbon Gradient */}
          <linearGradient id="stBlueGradient" x1="12" y1="18" x2="88" y2="88" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00C2FF" />
            <stop offset="30%" stopColor="#0080FF" />
            <stop offset="70%" stopColor="#0A4DC2" />
            <stop offset="100%" stopColor="#05256D" />
          </linearGradient>

          {/* Sunset Tangerine-to-Gold Ribbon Gradient */}
          <linearGradient id="stOrangeGradient" x1="18" y1="12" x2="92" y2="85" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFC72C" />
            <stop offset="35%" stopColor="#FF8A00" />
            <stop offset="75%" stopColor="#FF5500" />
            <stop offset="100%" stopColor="#E03200" />
          </linearGradient>

          {/* Shadow/depth gradient for 3D ribbon crossover */}
          <linearGradient id="stDepthShadow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </linearGradient>

          {/* Timecode badge container */}
          <linearGradient id="stTimerBg" x1="0" y1="0" x2="38" y2="18" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0A1E4A" />
            <stop offset="100%" stopColor="#040D24" />
          </linearGradient>

          <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="2" floodColor="#0A4DC2" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* --- Background Ambient Glow Base --- */}
        <circle cx="50" cy="50" r="44" fill="#0080FF" fillOpacity="0.04" />

        {/* --- 1. Orange Dynamic Upper Loop of S & T --- */}
        <path
          d="M 36 28 C 42 16, 68 12, 82 20 C 94 27, 94 36, 84 38 C 72 40, 56 42, 42 47 C 32 51, 30 62, 38 70 C 48 80, 72 84, 76 93 C 78 98, 70 100, 60 98 C 48 95, 38 87, 40 76"
          stroke="url(#stOrangeGradient)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* --- 2. T-Stem Central Structural Pillar --- */}
        <path
          d="M 57 38 L 45 88"
          stroke="#072F7D"
          strokeWidth="9.5"
          strokeLinecap="round"
        />

        {/* --- 3. Dynamic Cyan-Blue S-Curve Ribbon (Foreground) --- */}
        <path
          d="M 85 28 C 76 28, 48 29, 32 37 C 18 44, 16 58, 25 68 C 36 79, 58 83, 67 89 C 76 94, 75 99, 64 100 C 51 101, 36 96, 26 86 C 21 81, 16 73, 20 64"
          stroke="url(#stBlueGradient)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#softGlow)"
        />

        {/* --- 4. Sleek Precision Timecode Pill ("02:30") --- */}
        <g transform="translate(32, 27)">
          {/* Pill Container */}
          <rect
            x="0"
            y="0"
            width="42"
            height="18"
            rx="4"
            fill="url(#stTimerBg)"
            stroke="#2563EB"
            strokeWidth="1"
          />
          {/* Top highlight line */}
          <line x1="4" y1="1.5" x2="38" y2="1.5" stroke="#60A5FA" strokeWidth="0.75" strokeOpacity="0.6" />

          {/* Time digits in crisp monospace */}
          <text
            x="21"
            y="12.5"
            textAnchor="middle"
            fill="#FFFFFF"
            fontFamily="JetBrains Mono, ui-monospace, SFMono-Regular, monospace"
            fontSize="9"
            fontWeight="700"
            letterSpacing="0.6"
          >
            02:30
          </text>
        </g>

        {/* Subtle Specular Glint on Blue Ribbon */}
        <path
          d="M 34 38 C 38 35, 48 33, 56 32"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.45"
        />
      </svg>

      {/* Typography: SCRIPT TEMPO + SCRIPT CALCULATOR FOR CREATORS */}
      {!iconOnly && (
        <div className="flex flex-col justify-center">
          {/* Main Brand Words */}
          <div className="flex items-center gap-1 leading-none">
            <span
              className={`${dimensions.scriptText} font-black ${scriptColor} tracking-[0.03em] uppercase`}
            >
              SCRIPT
            </span>
            <span
              className={`${dimensions.tempoText} font-black uppercase bg-gradient-to-r from-[#FF8A00] via-[#FFA800] to-[#FF5500] bg-clip-text text-transparent tracking-[0.03em]`}
            >
              TEMPO
            </span>
          </div>

          {/* Subtitle Slogan */}
          {showSubtitle && (
            <span
              className={`${dimensions.subText} ${dimensions.tracking} ${subtextColor} font-bold uppercase mt-1 leading-none whitespace-nowrap`}
            >
              Script Calculator for Creators
            </span>
          )}
        </div>
      )}
    </div>
  );
};
