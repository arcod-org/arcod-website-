type P = { className?: string; size?: number };
const base = (size = 18) => ({ width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true });

export const ArrowIcon = ({ size = 16, className }: P) => (<svg {...base(size)} strokeWidth={2.2} className={className}><path d="M5 12h14M13 6l6 6-6 6" /></svg>);
export const HeartIcon = ({ size = 16, className }: P) => (<svg {...base(size)} className={className}><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" /></svg>);
export const MenuIcon = ({ size = 22 }: P) => (<svg {...base(size)}><path d="M4 7h16M4 12h16M4 17h16" /></svg>);
export const XIcon = ({ size = 20 }: P) => (<svg {...base(size)} strokeWidth={2.4}><path d="M6 6l12 12M18 6L6 18" /></svg>);
export const PinIcon = ({ size = 14 }: P) => (<svg {...base(size)}><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>);
export const CalIcon = ({ size = 16 }: P) => (<svg {...base(size)}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></svg>);
export const ClockIcon = ({ size = 16 }: P) => (<svg {...base(size)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>);
export const ShieldIcon = ({ size = 18, className }: P) => (<svg {...base(size)} strokeWidth={2.4} className={className}><path d="M12 2l7 4v6c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></svg>);
export const DownloadIcon = ({ size = 20 }: P) => (<svg {...base(size)}><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><path d="M14 3v6h6M12 17v-6M9 14l3 3 3-3" /></svg>);
export const ChevronL = ({ size = 20 }: P) => (<svg {...base(size)}><path d="M15 18l-6-6 6-6" /></svg>);
export const ChevronR = ({ size = 20 }: P) => (<svg {...base(size)}><path d="M9 18l6-6-6-6" /></svg>);
export const ChevronD = ({ size = 14 }: P) => (<svg {...base(size)} strokeWidth={2.2}><path d="M6 9l6 6 6-6" /></svg>);
export const PlayIcon = ({ size = 24 }: P) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M8 5v14l11-7z" /></svg>);
export const CheckIcon = ({ size = 28 }: P) => (<svg {...base(size)} strokeWidth={2.4}><path d="M5 12l5 5L20 7" /></svg>);
