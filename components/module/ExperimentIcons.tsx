export const DataIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-3/5 h-3/5 z-10">
    <defs>
      <linearGradient id="data-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#ffffff', stopOpacity: 0.9}}></stop>
        <stop offset="100%" style={{stopColor: '#f0f0f0', stopOpacity: 0.7}}></stop>
      </linearGradient>
    </defs>
    <rect x="50" y="50" width="100" height="100" rx="8" fill="none" stroke="url(#data-grad)" strokeWidth="4"></rect>
    <line x1="50" y1="80" x2="150" y2="80" stroke="url(#data-grad)" strokeWidth="2"></line>
    <line x1="50" y1="110" x2="150" y2="110" stroke="url(#data-grad)" strokeWidth="2"></line>
    <line x1="80" y1="50" x2="80" y2="150" stroke="url(#data-grad)" strokeWidth="2"></line>
    <line x1="110" y1="50" x2="110" y2="150" stroke="url(#data-grad)" strokeWidth="2"></line>
    <circle cx="80" cy="80" r="8" fill="url(#data-grad)"></circle>
    <circle cx="110" cy="110" r="8" fill="url(#data-grad)"></circle>
  </svg>
)

export const ModelIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-3/5 h-3/5 z-10">
    <defs>
      <linearGradient id="model-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#ffffff', stopOpacity: 0.9}}></stop>
        <stop offset="100%" style={{stopColor: '#f0f0f0', stopOpacity: 0.7}}></stop>
      </linearGradient>
    </defs>
    <circle cx="100" cy="60" r="20" fill="none" stroke="url(#model-grad)" strokeWidth="4"></circle>
    <circle cx="60" cy="120" r="20" fill="none" stroke="url(#model-grad)" strokeWidth="4"></circle>
    <circle cx="140" cy="120" r="20" fill="none" stroke="url(#model-grad)" strokeWidth="4"></circle>
    <line x1="100" y1="80" x2="60" y2="100" stroke="url(#model-grad)" strokeWidth="3"></line>
    <line x1="100" y1="80" x2="140" y2="100" stroke="url(#model-grad)" strokeWidth="3"></line>
    <line x1="80" y1="120" x2="120" y2="120" stroke="url(#model-grad)" strokeWidth="3"></line>
  </svg>
)

export const TestIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-3/5 h-3/5 z-10">
    <defs>
      <linearGradient id="test-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#ffffff', stopOpacity: 0.9}}></stop>
        <stop offset="100%" style={{stopColor: '#f0f0f0', stopOpacity: 0.7}}></stop>
      </linearGradient>
    </defs>
    <path d="M70 40 L130 40 L150 80 L100 160 L50 80 Z" fill="none" stroke="url(#test-grad)" strokeWidth="4"></path>
    <line x1="100" y1="80" x2="100" y2="120" stroke="url(#test-grad)" strokeWidth="4"></line>
    <circle cx="100" cy="130" r="6" fill="url(#test-grad)"></circle>
  </svg>
)

export const EvaluateIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-3/5 h-3/5 z-10">
    <defs>
      <linearGradient id="evaluate-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#ffffff', stopOpacity: 0.9}}></stop>
        <stop offset="100%" style={{stopColor: '#f0f0f0', stopOpacity: 0.7}}></stop>
      </linearGradient>
    </defs>
    <rect x="40" y="70" width="120" height="60" rx="10" fill="none" stroke="url(#evaluate-grad)" strokeWidth="4"></rect>
    <line x1="60" y1="90" x2="80" y2="110" stroke="url(#evaluate-grad)" strokeWidth="4"></line>
    <line x1="80" y1="110" x2="110" y2="80" stroke="url(#evaluate-grad)" strokeWidth="4"></line>
    <circle cx="140" cy="100" r="10" fill="none" stroke="url(#evaluate-grad)" strokeWidth="4"></circle>
  </svg>
)

// ExperimentIcon 组件，根据 category 参数选择使用哪个图标
interface ExperimentIconProps {
  category?: "data" | "model" | "test" | "evaluate"
}

export default function ExperimentIcon({ category = "data" }: ExperimentIconProps) {
  switch (category) {
    case "model":
      return <ModelIcon />
    case "test":
      return <TestIcon />
    case "evaluate":
      return <EvaluateIcon />
    case "data":
    default:
      return <DataIcon />
  }
} 