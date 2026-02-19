import { useState, useEffect } from "react";
import { Sparkles, Zap, Shield, CreditCard, Home, Check, Code2, Clock, Loader2 } from "lucide-react";

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [showToast, setShowToast] = useState(false);
  
  const [history, setHistory] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/history")
      .then(res => res.json())
      .then(data => setHistory(data.history))
      .catch(err => console.error("Backend not running:", err));
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true); 

    try {
      const response = await fetch("http://localhost:3000/api/v1/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: "Premium Dashboard" }) 
      });
      
      const result = await response.json();

      setIsGenerating(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      
      setHistory([result.data, ...history]);

    } catch (error) {
      console.error("Failed to generate:", error);
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center p-6 relative overflow-hidden text-white font-sans">
      
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-pulse"></div>

      <nav className="relative z-20 flex gap-2 mb-12 bg-white/5 backdrop-blur-xl p-2 rounded-2xl border border-white/10 shadow-2xl">
        <button onClick={() => setActivePage("home")} className={`px-6 py-2 rounded-xl flex items-center gap-2 font-semibold transition-all ${activePage === "home" ? "bg-white/15 shadow-inner" : "hover:bg-white/5 text-slate-400"}`}>
          <Home className="w-4 h-4" /> Dashboard
        </button>
        <button onClick={() => setActivePage("pricing")} className={`px-6 py-2 rounded-xl flex items-center gap-2 font-semibold transition-all ${activePage === "pricing" ? "bg-white/15 shadow-inner" : "hover:bg-white/5 text-slate-400"}`}>
          <CreditCard className="w-4 h-4" /> Pro Plans
        </button>
      </nav>

      <div className="relative z-10 w-full max-w-5xl">
        {activePage === "home" ? <HomePage onGenerate={handleGenerate} history={history} isGenerating={isGenerating} /> : <PricingPage />}
      </div>

      {showToast && (
        <div className="fixed bottom-8 right-8 bg-emerald-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-8 fade-in duration-300 z-50">
          <Sparkles className="w-5 h-5" />
          <span className="font-semibold text-lg">AI Component Generated!</span>
        </div>
      )}
    </div>
  );
}

function HomePage({ onGenerate, history, isGenerating }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Meet the Future of UI.
        </h1>
        <p className="text-slate-400 text-lg">Mastering pure visual architecture and glassmorphism.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition duration-300 group">
              <Sparkles className="text-purple-400 w-10 h-10 mb-4 group-hover:scale-110 transition-transform" />
              <h2 className="text-2xl font-bold mb-2">Lightning Fast Rendering</h2>
              <p className="text-slate-400">Building UI that doesn't just work, but feels premium.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition duration-300 group">
              <Zap className="text-blue-400 w-10 h-10 mb-4 group-hover:scale-110 transition-transform" />
              <h2 className="text-xl font-bold mb-2">Performance</h2>
              <p className="text-slate-400 text-sm">Zero lag. 60fps animations.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl flex flex-col justify-center">
              <h2 className="text-xl font-bold mb-1">Bank-Grade Security</h2>
              <Shield className="text-emerald-400 w-8 h-8 mt-2" />
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-2 rounded-2xl shadow-2xl flex items-center gap-4 group hover:border-purple-500/50 hover:shadow-purple-500/20 transition-all duration-500">
            <div className="bg-purple-500/20 p-3 rounded-xl group-hover:bg-purple-500/40 transition-colors">
              <Sparkles className="text-purple-400 w-6 h-6 animate-pulse" />
            </div>
            <input type="text" placeholder="Ask the AI to generate a UI component..." className="bg-transparent w-full text-white placeholder-slate-500 outline-none text-lg" />
            
            <button 
              onClick={onGenerate}
              disabled={isGenerating}
              className={`${isGenerating ? "bg-purple-800 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-500"} text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2 whitespace-nowrap`}
            >
              {isGenerating ? (
                <>Generating... <Loader2 className="w-4 h-4 animate-spin" /></>
              ) : (
                <>Generate <Zap className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl h-fit">
          <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
            <Clock className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-bold">Recent Activity</h2>
          </div>
          <div className="flex flex-col gap-4">
            {history.length === 0 ? (
               <p className="text-slate-500 text-sm animate-pulse">Connecting to server...</p>
            ) : (
              history.map((item) => (
                <div key={item.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer animate-in fade-in slide-in-from-right-4">
                  <div className="bg-white/10 p-2 rounded-lg mt-1">
                    <Code2 className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-200">{item.name}</h3>
                    <p className="text-sm text-slate-500">{item.time}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PricingPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 text-center">
      <h1 className="text-4xl font-extrabold mb-4">Unlock <span className="text-purple-400">MeetAI Pro</span></h1>
      <p className="text-slate-400 mb-10">Scale your component generation with zero limits.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl text-left">
          <h2 className="text-2xl font-bold mb-2">Starter</h2>
          <div className="text-4xl font-extrabold mb-6">Free</div>
          <ul className="space-y-3 mb-8 text-slate-400">
            <li className="flex items-center gap-2"><Check className="w-5 h-5 text-emerald-400"/> 10 Components/day</li>
            <li className="flex items-center gap-2"><Check className="w-5 h-5 text-emerald-400"/> Standard Support</li>
          </ul>
          <button className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 font-semibold transition">Current Plan</button>
        </div>
        <div className="bg-gradient-to-b from-purple-900/40 to-black/40 backdrop-blur-xl border border-purple-500/50 p-8 rounded-3xl text-left relative shadow-[0_0_30px_rgba(168,85,247,0.2)]">
          <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider">MOST POPULAR</div>
          <h2 className="text-2xl font-bold mb-2">Pro Developer</h2>
          <div className="text-4xl font-extrabold mb-6">₹999<span className="text-lg text-slate-400 font-normal">/mo</span></div>
          <ul className="space-y-3 mb-8 text-slate-300">
            <li className="flex items-center gap-2"><Check className="w-5 h-5 text-purple-400"/> Unlimited Generation</li>
            <li className="flex items-center gap-2"><Check className="w-5 h-5 text-purple-400"/> Export to Next.js</li>
            <li className="flex items-center gap-2"><Check className="w-5 h-5 text-purple-400"/> Priority API Access</li>
          </ul>
          <button className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 font-semibold transition shadow-lg shadow-purple-500/30">Upgrade Now</button>
        </div>
      </div>
    </div>
  );
}