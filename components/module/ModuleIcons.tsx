
/**
 * 碳监测图标：优化后的动态监测界面，波形流动、传感器脉冲、底座呼吸效果，增强实时数据监测的视觉表现。
 */
export const MonitorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-3/5 h-3/5 z-10">
    <defs>
      <linearGradient id="monitor-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#ffffff', stopOpacity: 0.9}}></stop>
        <stop offset="100%" style={{stopColor: '#f0f0f0', stopOpacity: 0.7}}></stop>
      </linearGradient>
    </defs>
    
    {/* 动态监测屏幕 */}
    <rect x="40" y="50" width="120" height="80" rx="5" fill="none" stroke="url(#monitor-grad)" strokeWidth="4">
      <animate attributeName="opacity" values="1;0.95;1" dur="3s" repeatCount="indefinite"/>
    </rect>

    {/* 流动波形图 */}
    <polyline points="50,90 60,85 70,100 80,80 90,95 100,75 110,85 120,80 130,95 140,90 150,80" 
      fill="none" stroke="url(#monitor-grad)" strokeWidth="3" strokeLinecap="round"
      strokeDasharray="20 5" strokeDashoffset="0">
      <animate attributeName="stroke-dashoffset" values="0;25;0" dur="1.5s" repeatCount="indefinite"/>
    </polyline>

    {/* 呼吸效果底座 */}
    <path d="M70,130 L130,130 L125,140 L75,140 Z" fill="url(#monitor-grad)">
      <animate attributeName="opacity" values="1;0.9;1" dur="2s" repeatCount="indefinite"/>
    </path>

    {/* 脉冲传感器节点 */}
    <g>
      <circle cx="50" cy="45" r="8" fill="url(#monitor-grad)">
        <animate attributeName="r" values="8;10;8" dur="1.2s" repeatCount="indefinite"/>
      </circle>
      <line x1="50" y1="45" x2="60" y2="55" stroke="url(#monitor-grad)" strokeWidth="2">
        <animate attributeName="stroke-width" values="2;3;2" dur="1.2s" repeatCount="indefinite"/>
      </line>
    </g>
    
    <g>
      <circle cx="150" cy="45" r="8" fill="url(#monitor-grad)">
        <animate attributeName="r" values="8;10;8" dur="1.2s" repeatCount="indefinite" begin="0.6s"/>
      </circle>
      <line x1="150" y1="45" x2="140" y2="55" stroke="url(#monitor-grad)" strokeWidth="2">
        <animate attributeName="stroke-width" values="2;3;2" dur="1.2s" repeatCount="indefinite" begin="0.6s"/>
      </line>
    </g>
  </svg>
)

/**
 * 碳核算图标：优化后的计算器形象，显示屏显示CO₂e，右侧添加动态树木生长动画，体现碳足迹计算与生态平衡的概念。
 */
export const CalculateIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-3/5 h-3/5 z-10">
    <defs>
      <linearGradient id="calculate-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#ffffff', stopOpacity: 0.9}}></stop>
        <stop offset="100%" style={{stopColor: '#f0f0f0', stopOpacity: 0.7}}></stop>
      </linearGradient>
    </defs>
    {/* 计算器主体 */}
    <rect x="50" y="40" width="100" height="120" rx="8" fill="none" stroke="url(#calculate-grad)" strokeWidth="4" />
    {/* 计算器显示屏 */}
    <rect x="60" y="50" width="80" height="25" rx="3" fill="url(#calculate-grad)" opacity="0.7" />
    {/* CO2 公式显示 */}
    <text x="70" y="68" fill="#ffffff" fontSize="16" fontFamily="monospace">CO₂e</text>
    {/* 简化后的按键布局 */}
    <rect x="70" y="85" width="20" height="20" rx="3" fill="url(#calculate-grad)" />
    <rect x="110" y="85" width="20" height="20" rx="3" fill="url(#calculate-grad)" />
    <rect x="70" y="115" width="20" height="20" rx="3" fill="url(#calculate-grad)" />
    <rect x="110" y="115" width="20" height="20" rx="3" fill="url(#calculate-grad)" />
    <rect x="70" y="145" width="60" height="20" rx="3" fill="url(#calculate-grad)" />
    {/* 动态树木生长动画 */}
    <g transform="translate(160,100)">
      <path d="M0,0 L0,-20" stroke="url(#calculate-grad)" strokeWidth="2" strokeDasharray="20" strokeDashoffset="20">
        <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1s" repeatCount="indefinite" />
      </path>
      <path d="M-10,-20 Q0,-30 10,-20" fill="none" stroke="url(#calculate-grad)" strokeWidth="2" />
      <path d="M-8,-25 Q0,-35 8,-25" fill="none" stroke="url(#calculate-grad)" strokeWidth="2" />
      <path d="M-6,-30 Q0,-40 6,-30" fill="none" stroke="url(#calculate-grad)" strokeWidth="2" />
    </g>
    {/* 数据流动效果 */}
    <path d="M140,70 Q160,80 170,90" fill="none" stroke="url(#calculate-grad)" strokeWidth="2" strokeDasharray="5">
      <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
    </path>
  </svg>
)

/**
 * 碳交易图标：优化后的动态交易界面，价格走势流动、箭头双向移动、柱状图波动，增强市场动态感。
 */
export const TradeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-3/5 h-3/5 z-10">
    <defs>
      <linearGradient id="trade-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#ffffff', stopOpacity: 0.9}}></stop>
        <stop offset="100%" style={{stopColor: '#f0f0f0', stopOpacity: 0.7}}></stop>
      </linearGradient>
    </defs>
    {/* 动态交易背景 */}
    <rect x="40" y="60" width="120" height="80" rx="5" fill="none" stroke="url(#trade-grad)" strokeWidth="3">
      <animate attributeName="opacity" values="1;0.9;1" dur="3s" repeatCount="indefinite" />
    </rect>
    {/* 流动价格走势线 */}
    <polyline points="50,100 70,90 90,110 110,80 130,95 150,70" 
      fill="none" stroke="url(#trade-grad)" strokeWidth="3" strokeLinecap="round"
      strokeDasharray="20" strokeDashoffset="0">
      <animate attributeName="stroke-dashoffset" values="0;40;0" dur="2s" repeatCount="indefinite" />
    </polyline>
    {/* 动态碳符号 */}
    <g>
      <circle cx="65" cy="45" r="15" fill="none" stroke="url(#trade-grad)" strokeWidth="3">
        <animate attributeName="r" values="15;18;15" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <text x="60" y="50" fill="url(#trade-grad)" fontSize="14" fontWeight="bold">
        <animate attributeName="font-size" values="14;16;14" dur="1.5s" repeatCount="indefinite" />
        C
      </text>
    </g>
    <g>
      <circle cx="135" cy="45" r="15" fill="none" stroke="url(#trade-grad)" strokeWidth="3">
        <animate attributeName="r" values="15;18;15" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <text x="130" y="50" fill="url(#trade-grad)" fontSize="14" fontWeight="bold">
        <animate attributeName="font-size" values="14;16;14" dur="1.5s" repeatCount="indefinite" />
        C
      </text>
    </g>
    {/* 双向移动箭头 */}
    <g transform="translate(0,0)">
      <path d="M85,45 L115,45" fill="none" stroke="url(#trade-grad)" strokeWidth="3">
        <animate attributeName="stroke-width" values="3;4;3" dur="1s" repeatCount="indefinite" />
      </path>
      <path d="M110,40 L115,45 L110,50" fill="none" stroke="url(#trade-grad)" strokeWidth="3">
        <animateTransform attributeName="transform" type="translate" values="0,0;2,0;0,0" dur="1s" repeatCount="indefinite" />
      </path>
    </g>
    {/* 波动柱状图 */}
    <rect x="55" y="150" width="20" height="15" fill="url(#trade-grad)">
      <animate attributeName="height" values="15;25;15" dur="2s" repeatCount="indefinite" />
      <animate attributeName="y" values="150;140;150" dur="2s" repeatCount="indefinite" />
    </rect>
    <rect x="90" y="145" width="20" height="20" fill="url(#trade-grad)">
      <animate attributeName="height" values="20;30;20" dur="2.5s" repeatCount="indefinite" />
      <animate attributeName="y" values="145;135;145" dur="2.5s" repeatCount="indefinite" />
    </rect>
    <rect x="125" y="140" width="20" height="25" fill="url(#trade-grad)">
      <animate attributeName="height" values="25;35;25" dur="3s" repeatCount="indefinite" />
      <animate attributeName="y" values="140;130;140" dur="3s" repeatCount="indefinite" />
    </rect>
  </svg>
)

/**
 * 碳中和图标：优化后的动态平衡效果，地球缓慢旋转，树木生长，工厂排放烟雾，平衡符号上下浮动，生动展现碳中和概念。
 */
export const NeutralIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-3/5 h-3/5 z-10">
    <defs>
      <linearGradient id="neutral-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#ffffff', stopOpacity: 0.9}}></stop>
        <stop offset="100%" style={{stopColor: '#f0f0f0', stopOpacity: 0.7}}></stop>
      </linearGradient>
    </defs>
    
    {/* 动态地球 */}
    <g transform="rotate(0 100 100)">
      <circle cx="100" cy="100" r="45" fill="none" stroke="url(#neutral-grad)" strokeWidth="3">
        <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="20s" repeatCount="indefinite"/>
      </circle>
      {/* 静态经纬线 */}
      <ellipse cx="100" cy="100" rx="45" ry="15" fill="none" stroke="url(#neutral-grad)" strokeWidth="1" />
      <line x1="55" y1="100" x2="145" y2="100" stroke="url(#neutral-grad)" strokeWidth="1" />
      <line x1="100" y1="55" x2="100" y2="145" stroke="url(#neutral-grad)" strokeWidth="1" />
    </g>

    {/* 生长树木 */}
    <path d="M65,115 C65,100 75,95 70,85 C80,90 85,85 75,70 C90,80 90,90 85,100 C95,95 90,115 75,115 Z" fill="url(#neutral-grad)" opacity="0">
      <animate attributeName="opacity" from="0" to="1" dur="2s" fill="freeze"/>
      <animateTransform attributeName="transform" type="scale" from="0.5" to="1" additive="sum" origin="75 100" dur="2s" fill="freeze"/>
    </path>

    {/* 动态工厂 */}
    <g>
      <path d="M125,135 L140,135 L140,115 L135,115 L135,110 L130,110 L130,115 L125,115 Z" fill="url(#neutral-grad)"/>
      {/* 飘动烟雾 */}
      <path d="M135,105 L140,95 L145,100 L140,105 Z" fill="url(#neutral-grad)" opacity="0.7">
        <animate attributeName="opacity" values="0.7;0.4;0.7" dur="3s" repeatCount="indefinite"/>
        <animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" dur="3s" repeatCount="indefinite"/>
      </path>
    </g>

    {/* 动态平衡系统 */}
    <g transform="translate(0,0)">
      <line x1="85" y1="145" x2="115" y2="145" stroke="url(#neutral-grad)" strokeWidth="2">
        <animate attributeName="y1" values="145;135;145" dur="1.5s" repeatCount="indefinite"/>
        <animate attributeName="y2" values="145;135;145" dur="1.5s" repeatCount="indefinite"/>
        <animate attributeName="stroke-width" values="2;3;2" dur="1.5s" repeatCount="indefinite"/>
      </line>
      <circle cx="100" cy="145" r="3" fill="url(#neutral-grad)">
        <animate attributeName="cy" values="145;135;145" dur="1.5s" repeatCount="indefinite"/>
        <animateTransform attributeName="transform" type="rotate" values="0 100 145;10 100 145;-10 100 145;0 100 145" dur="3s" repeatCount="indefinite"/>
      </circle>
    </g>

    {/* 顶部平衡点 */}
    <circle cx="100" cy="40" r="5" fill="url(#neutral-grad)">
      <animate attributeName="r" values="5;6;5" dur="1.5s" repeatCount="indefinite"/>
    </circle>
  </svg>
)

// ModuleIcon 组件，根据 category 参数选择使用哪个图标
interface ModuleIconProps {
  category?: "monitor" | "calculate" | "trade" | "neutral"
}

export default function ModuleIcon({ category = "monitor" }: ModuleIconProps) {
  switch (category) {
    case "calculate":
      return <CalculateIcon />
    case "trade":
      return <TradeIcon />
    case "neutral":
      return <NeutralIcon />
    case "monitor":
    default:
      return <MonitorIcon />
  }
}
