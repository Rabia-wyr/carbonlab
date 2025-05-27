import { Button } from "@/components/ui/button"

export function HeroBanner() {
  return (
    <div id="intro" className="relative h-[600px] bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white mb-12">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center space-y-6 max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          碳经济与管理AI实训平台：领航新一代绿色未来
        </h1>
        <p className="text-xl md:text-2xl">
          全链条低碳实训，让你成为“双碳”时代的专业人才
        </p>
        <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105">
          立即体验
        </Button>
      </div>
    </div>
  )
}
