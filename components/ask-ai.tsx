"use client";

import { useState } from "react";
import { Sparkles, Send, Loader2, X } from "lucide-react";

const SUGGESTIONS = [
  "What's driving MENA sovereign yields this quarter?",
  "Summarize Lebanon's banking restructuring timeline",
  "How does GCC oil revenue affect regional liquidity?",
  "Which sectors lead the GCC equity rally?",
];

async function* parseSSEStream(response: Response) {
  if (!response.body) throw new Error("No response body");
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("data:")) {
        const data = trimmed.slice(5).trim();
        if (data === "[DONE]") return;
        try {
          yield JSON.parse(data);
        } catch {
          /* skip */
        }
      }
    }
  }
}

export function AskAi() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState<"idle" | "streaming" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function ask(question: string) {
    if (!question.trim() || status === "streaming") return;
    setStatus("streaming");
    setResponse("");
    setErrorMsg("");

    try {
      const res = await fetch("/api/ask-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: question }),
      });

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }

      let acc = "";
      for await (const chunk of parseSSEStream(res)) {
        if (chunk.type === "text-delta" && chunk.delta) {
          acc += chunk.delta;
          setResponse(acc);
        }
      }
      setStatus("idle");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    ask(prompt);
  };

  const reset = () => {
    setPrompt("");
    setResponse("");
    setStatus("idle");
    setErrorMsg("");
  };

  const isStreaming = status === "streaming";

  return (
    <div className="mb-8 border border-border bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-4 py-2">
        <div className="flex items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span className="text-[11px] font-semibold uppercase tracking-widest text-primary">
            Ask AI
          </span>
          <span className="text-[10px] text-muted-foreground">
            / NATURAL LANGUAGE QUERY
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isStreaming
                ? "animate-pulse bg-[#3fb950]"
                : status === "error"
                ? "bg-[#f85149]"
                : "bg-muted-foreground"
            }`}
          />
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {isStreaming ? "Streaming" : status === "error" ? "Error" : "Ready"}
          </span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-primary">
              {">"}
            </span>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask about markets, sectors, sentiment, risk, MENA finance..."
              className="w-full border border-border bg-background py-3 pl-9 pr-3 font-mono text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
              disabled={isStreaming}
              aria-label="Ask AI"
            />
          </div>
          <button
            type="submit"
            disabled={isStreaming || !prompt.trim()}
            className="inline-flex items-center justify-center gap-2 border border-primary bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isStreaming ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Thinking
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Submit
              </>
            )}
          </button>
        </div>

        {/* Suggestions */}
        {!response && status !== "streaming" && (
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Try:
            </span>
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setPrompt(s);
                  ask(s);
                }}
                className="border border-border px-3 py-1.5 text-[11px] text-muted-foreground transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Response */}
        {(response || status === "error") && (
          <div className="mt-5 border-t border-border pt-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                {">"} RESPONSE
              </span>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
              >
                <X className="h-3 w-3" />
                Clear
              </button>
            </div>
            {status === "error" ? (
              <p className="font-mono text-sm leading-relaxed text-[#f85149]">
                Error: {errorMsg}
              </p>
            ) : (
              <p className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">
                {response}
                {isStreaming && (
                  <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-primary align-middle" />
                )}
              </p>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
