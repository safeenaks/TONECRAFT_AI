// src/App.jsx

import { useState } from "react";

import {
  Brain,
  Sparkles,
  Wand2,
  Copy,
  ChevronDown,
} from "lucide-react";

export default function App() {
  const [situation, setSituation] = useState("");
  const [recipient, setRecipient] = useState("Recruiter");
  const [tone, setTone] = useState("Professional");
  const [context, setContext] = useState("");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);


  const generateReply = async () => {
    if (!situation.trim()) return;

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          message: situation,
          recipient,
          tone,
          context,
        }),
      });

      const data = await response.json();

      setGeneratedReply(data.reply);
    } catch (error) {
      console.log(error);

      setGeneratedReply(
        "Something went wrong while generating the reply."
      );
    }

    setLoading(false);
  };

  const copyReply = async () => {
    if (!generatedReply) return;

    await navigator.clipboard.writeText(generatedReply);
  };

  return (
    <div className="relative w-full h-screen min-h-screen overflow-hidden bg-[#e6e2ee] font-['Plus_Jakarta_Sans',_sans-serif] antialiased flex flex-col justify-between p-[54px] box-border">

      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img
          src="/src/assets/holo-bg.png"
          alt=""
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-white/5 backdrop-blur-[0.5px]" />
      </div>

      {/* HEADER */}
      <nav className="relative z-10 w-full max-w-[1340px] mx-auto shrink-0 flex items-center gap-[14px] pl-[12px]">

        <div className="w-[48px] h-[48px] rounded-[15px] bg-gradient-to-br from-[#9c6eff] to-[#d387ff] flex items-center justify-center shadow-[0_8px_24px_rgba(156,110,255,0.25)]">

          <Brain
            size={22}
            className="text-white"
            strokeWidth={2.2}
          />
        </div>

        <div>
          <h1 className="text-[1.62rem] leading-none tracking-[-0.04em] font-[850] text-[#1a1142]">
            TONECRAFT AI
          </h1>

          <p className="mt-[4px] text-[0.8rem] font-[600] text-[#797396] tracking-tight">
            Emotion Aware Communication Assistant
          </p>
        </div>
      </nav>

      {/* MAIN */}
      <main className="relative z-10 w-full max-w-[1340px] mx-auto flex-1 flex items-center justify-between gap-[50px] overflow-hidden">

        {/* LEFT */}
        <div className="w-[46%] flex flex-col items-center justify-center">

          <div className="flex flex-col space-y-[26px] w-full max-w-[460px]">

            <div className="inline-flex items-center gap-[6px] rounded-full bg-white/75 border border-white/50 backdrop-blur-xl px-[16px] py-[7px] shadow-[0_2px_10px_rgba(0,0,0,0.01)] self-start">

              <Sparkles
                size={12}
                className="text-[#9a6cff]"
              />

              <span className="text-[0.74rem] tracking-[0.05em] font-[800] text-[#9a6cff]">
                AI POWERED TONE REWRITING
              </span>
            </div>

            <h2 className="text-[4.6rem] leading-[0.96] tracking-[-0.04em] font-[850] text-[#1c1145]">
              Speak Better.
              <br />
              Reply Smarter.
            </h2>

            <p className="text-[1.04rem] leading-[1.7rem] font-[550] text-[#706a8c] tracking-tight">
              ToneCraft AI transforms awkward, anxious,
              or unclear communication into confident,
              context-aware replies using intelligent
              tone rewriting and emotion-aware AI.
            </p>

            <div className="flex items-center gap-[44px] pt-2">

              <div className="flex flex-col">
                <h3 className="text-[3.1rem] leading-none tracking-[-0.04em] font-[850] text-[#9b6cff]">
                  94%
                </h3>

                <p className="mt-[8px] text-[0.86rem] font-[600] text-[#7b759a] tracking-tight">
                  Confidence Improvement
                </p>
              </div>

              <div className="w-px h-[50px] bg-[#d3cbdc]" />

              <div className="flex flex-col">
                <h3 className="text-[3.1rem] leading-none tracking-[-0.04em] font-[850] text-[#9b6cff]">
                  AI
                </h3>

                <p className="mt-[8px] text-[0.86rem] font-[600] text-[#7b759a] tracking-tight">
                  Emotion Aware Replies
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-[54%] flex flex-col gap-[18px] max-w-[550px] ml-auto box-border">

          {/* HEADER */}
          <div className="flex items-start gap-[14px]">

            <div className="min-w-[44px] h-[44px] rounded-[14px] bg-[#efe8ff] flex items-center justify-center shrink-0">

              <Wand2
                size={18}
                className="text-[#8c5cf6]"
              />
            </div>

            <div>
              <h3 className="text-[1.65rem] leading-none tracking-[-0.04em] font-[850] text-[#910577]">
                Generate Reply
              </h3>

              <p className="mt-[6px] text-[0.84rem] leading-[1.3rem] font-[500] text-[#716b8d] tracking-tight max-w-[360px]">
                Create professional, confident, and emotionally balanced communication instantly.
              </p>
            </div>
          </div>

          {/* TEXTAREA */}
          <div className="flex flex-col gap-[8px]">

            <label className="text-[0.84rem] font-[800] text-[#2c2057] tracking-tight">
              Describe your situation
            </label>

            <div className="relative w-full">

              <textarea
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                maxLength={500}
                placeholder="e.g. My recruiter asked why I missed the interview..."
                className="w-full h-[120px] rounded-[8px] border border-[#e5def2] bg-white/70 px-[18px] py-[14px] pb-[32px] resize-none outline-none text-[0.88rem] leading-[1.5rem] font-[500] text-[#2b2254] placeholder:text-[#9c96ba] tracking-tight focus:border-[#8b5cf6] focus:bg-white/90 transition-all"
              />

              <span className="absolute bottom-[12px] right-[16px] text-[0.76rem] font-[600] text-[#9c96ba]">
                {situation.length}/500
              </span>
            </div>
          </div>

          {/* DROPDOWNS */}
          <div className="grid grid-cols-2 gap-[16px]">

            <div className="flex flex-col gap-[7px]">

              <label className="text-[0.84rem] font-[800] text-[#2c2057] tracking-tight">
                To
              </label>

              <select
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="h-[44px] rounded-[8px] border border-[#e5def2] bg-white/70 px-[16px] outline-none text-[0.88rem] font-[550] text-[#271d4d]"
              >
                <option>Recruiter</option>
                <option>Friend</option>
                <option>Manager</option>
                <option>Professor</option>
                <option>Client</option>
                <option>Custom</option>
              </select>
            </div>

            <div className="flex flex-col gap-[7px]">

              <label className="text-[0.84rem] font-[800] text-[#2c2057] tracking-tight">
                Select Tone
              </label>

              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="h-[44px] rounded-[8px] border border-[#e5def2] bg-white/70 px-[16px] outline-none text-[0.88rem] font-[550] text-[#271d4d]"
              >
                <option>Professional</option>
                <option>Friendly</option>
                <option>Confident</option>
                <option>Apologetic</option>
                <option>Formal</option>
                <option>Casual</option>
              </select>
            </div>
          </div>

          {/* CONTEXT */}
          <div className="flex flex-col gap-[7px]">

            <label className="text-[0.84rem] font-[800] text-[#2c2057] tracking-tight">
              Custom Context (Optional)
            </label>

            <input
              type="text"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="e.g. Startup founder, internship mentor..."
              className="w-full h-[44px] rounded-[8px] border border-[#e5def2] bg-white/70 px-[16px] outline-none text-[0.86rem] font-[500] text-[#2b2254] placeholder:text-[#9c96ba]"
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={generateReply}
            className="w-full h-[52px] mt-[2px] rounded-[15px] bg-gradient-to-r from-[#7046ff] via-[#a652f6] to-[#dd56f0] shadow-[0_12px_30px_rgba(166,82,246,0.3)] transition-all duration-300 hover:opacity-95 active:scale-[0.995]"
          >

            <div className="flex items-center justify-center gap-[8px] text-white text-[1.05rem] font-[800]">

              <Sparkles size={15} />

              {loading ? "Generating..." : "Generate"}
            </div>
          </button>

          {/* OUTPUT */}
          <div className="rounded-[8px] border border-[#ebdff7] bg-white/85 p-[18px] flex flex-col gap-[12px] shadow-[0_2px_12px_rgba(0,0,0,0.01)]">

            <div className="flex items-center justify-between">

              <div className="rounded-full bg-[#def5e7] px-[12px] py-[4.5px] text-[0.76rem] font-[800] text-[#059666] tracking-tight">
                Professional Reply
              </div>

              <div className="text-[0.8rem] font-[800] text-[#8c5cf6] tracking-tight">
                Confidence 94%
              </div>
            </div>

            <p className="text-[0.88rem] leading-[1.7rem] font-[550] text-[#2d2354] tracking-tight whitespace-pre-wrap break-words">
              {generatedReply || "Your generated reply will appear here..."}
            </p>

            <div className="flex justify-end">

              <button
                onClick={copyReply}
                className="w-[34px] h-[34px] rounded-[10px] bg-[#f5f0ff] border border-[#eae2f7] flex items-center justify-center hover:bg-[#eddffd] transition-colors"
              >

                <Copy
                  size={14}
                  className="text-[#6452a3]"
                />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 w-full max-w-[1340px] mx-auto shrink-0 pt-4 border-t border-[#d3cbdc]/40 pl-[12px]">

        <p className="text-[0.82rem] font-[600] text-[#767193] tracking-tight">
          Developed by Safeena K S and Adil Junaid
        </p>
      </footer>
    </div>
  );
}