export const MonitorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-3/5 h-3/5 z-10">
    <defs>
      <linearGradient id="monitor-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#ffffff', stopOpacity: 0.9}}></stop>
        <stop offset="100%" style={{stopColor: '#f0f0f0', stopOpacity: 0.7}}></stop>
      </linearGradient>
    </defs>
    <circle cx="100" cy="100" r="40" fill="none" stroke="url(#monitor-grad)" strokeWidth="4"></circle>
    <circle cx="100" cy="100" r="45" fill="none" stroke="url(#monitor-grad)" strokeWidth="1" opacity="0.5"></circle>
    <circle cx="100" cy="100" r="50" fill="none" stroke="url(#monitor-grad)" strokeWidth="0.5" opacity="0.3"></circle>
    <line x1="100" y1="60" x2="100" y2="140" stroke="url(#monitor-grad)" strokeWidth="4"></line>
    <circle cx="100" cy="60" r="8" fill="url(#monitor-grad)"></circle>
    <rect x="80" y="90" width="40" height="8" rx="4" fill="url(#monitor-grad)"></rect>
    <rect x="90" y="110" width="20" height="8" rx="4" fill="url(#monitor-grad)"></rect>
  </svg>
)

export const CalculateIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-3/5 h-3/5 z-10">
    <defs>
      <linearGradient id="calculate-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#ffffff', stopOpacity: 0.9}}></stop>
        <stop offset="100%" style={{stopColor: '#f0f0f0', stopOpacity: 0.7}}></stop>
      </linearGradient>
    </defs>
    <rect x="30" y="30" width="140" height="10" rx="5" fill="url(#calculate-grad)"></rect>
    <g className="pendulum-middle">
      <line x1="100" y1="40" x2="100" y2="110" stroke="#ffffff" strokeWidth="2"></line>
      <circle cx="100" cy="120" r="15" fill="url(#calculate-grad)"></circle>
    </g>
    <g className="pendulum-right">
      <line x1="140" y1="40" x2="140" y2="110" stroke="#ffffff" strokeWidth="2"></line>
      <circle cx="140" cy="120" r="15" fill="url(#calculate-grad)"></circle>
    </g>
    <g className="pendulum-left">
      <line x1="60" y1="40" x2="40" y2="90" stroke="#ffffff" strokeWidth="2"></line>
      <circle cx="40" cy="100" r="15" fill="url(#calculate-grad)"></circle>
      <circle cx="40" cy="100" r="20" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.5"></circle>
      <circle cx="40" cy="100" r="25" fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.3"></circle>
    </g>
  </svg>
)

export const TradeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-3/5 h-3/5 z-10">
    <defs>
      <linearGradient id="trade-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#ffffff', stopOpacity: 0.9}}></stop>
        <stop offset="100%" style={{stopColor: '#f0f0f0', stopOpacity: 0.7}}></stop>
      </linearGradient>
    </defs>
    <rect x="40" y="40" width="120" height="120" rx="10" fill="none" stroke="url(#trade-grad)" strokeWidth="4"></rect>
    <path d="M60 120 L90 80 L120 120 L140 60" fill="none" stroke="url(#trade-grad)" strokeWidth="4"></path>
    <circle cx="60" cy="120" r="6" fill="url(#trade-grad)"></circle>
    <circle cx="90" cy="80" r="6" fill="url(#trade-grad)"></circle>
    <circle cx="120" cy="120" r="6" fill="url(#trade-grad)"></circle>
    <circle cx="140" cy="60" r="6" fill="url(#trade-grad)"></circle>
  </svg>
)

export const NeutralIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-3/5 h-3/5 z-10">
    <defs>
      <linearGradient id="neutral-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#ffffff', stopOpacity: 0.9}}></stop>
        <stop offset="100%" style={{stopColor: '#f0f0f0', stopOpacity: 0.7}}></stop>
      </linearGradient>
    </defs>
    <circle cx="100" cy="100" r="50" fill="none" stroke="url(#neutral-grad)" strokeWidth="4"></circle>
    <circle cx="100" cy="100" r="45" fill="none" stroke="url(#neutral-grad)" strokeWidth="1" opacity="0.5"></circle>
    <circle cx="100" cy="100" r="40" fill="none" stroke="url(#neutral-grad)" strokeWidth="0.5" opacity="0.3"></circle>
    <path d="M70 100 A30,30 0 0,1 130,100" fill="none" stroke="url(#neutral-grad)" strokeWidth="4"></path>
    <path d="M130 100 A30,30 0 0,1 70,100" fill="none" stroke="url(#neutral-grad)" strokeWidth="4"></path>
    <circle cx="70" cy="100" r="6" fill="url(#neutral-grad)"></circle>
    <circle cx="130" cy="100" r="6" fill="url(#neutral-grad)"></circle>
  </svg>
)

// 默认导出一个组件，可以根据 type 和 category 参数选择使用哪个图标
interface ModuleIconProps {
  type?: "module" | "experiment"
  category?: string
}

export default function ModuleIcon({ type = "module", category }: ModuleIconProps) {
  // 默认使用 MonitorIcon
  return <MonitorIcon />
}