import { streamText } from "ai";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const result = streamText({
    model: "openai/gpt-5-mini",
    system:
      "You are CapitalIssues IQ AI, a concise financial intelligence assistant. " +
      "Answer questions about markets, macroeconomics, MENA finance, energy, sentiment, risk, and portfolio analytics. " +
      "Be direct, factual, and avoid hype. If a question requires live data you cannot access, " +
      "explain how the relevant CapitalIssues module (CI Exclusive News, Market Sentiment, PORT Analytics, MARS Risk, " +
      "CIQ Intelligence, CIQ Economics, CIQ NEF, or Publications) would address it. Keep responses under 200 words.",
    prompt,
  });

  return result.toUIMessageStreamResponse();
}
