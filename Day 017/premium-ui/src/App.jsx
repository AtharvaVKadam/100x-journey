import { Sparkles, Zap, Shield } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden text-white font-sans">
      
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-pulse"></div>

      <div className="relative z-10 max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Meet the Future of UI.
          </h1>
          <p className="text-slate-400 text-lg">Mastering pure visual architecture and glassmorphism.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl hover:bg-white/10 transition duration-300 cursor-pointer group">
            <Sparkles className="text-purple-400 w-10 h-10 mb-4 group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold mb-2">Lightning Fast Rendering</h2>
            <p className="text-slate-400">Building UI that doesn't just work, but feels premium. Utilizing Tailwind's backdrop filters to create depth.</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl hover:bg-white/10 transition duration-300 cursor-pointer group">
            <Zap className="text-blue-400 w-10 h-10 mb-4 group-hover:scale-110 transition-transform" />
            <h2 className="text-xl font-bold mb-2">Performance</h2>
            <p className="text-slate-400 text-sm">Zero lag. 60fps animations.</p>
          </div>

          <div className="md:col-span-3 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl hover:bg-white/10 transition duration-300 cursor-pointer flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold mb-1">Bank-Grade Security</h2>
              <p className="text-slate-400 text-sm">Because a pretty UI still needs a tough backend.</p>
            </div>
            <Shield className="text-emerald-400 w-12 h-12" />
          </div>
        </div>
      </div>

    </div>
  );
}