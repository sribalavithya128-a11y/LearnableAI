import { NextResponse } from "next/server";
import { isDemoMode } from "../../../lib/llm";

export const dynamic = "force-dynamic";

export async function GET() {
  const demoMode = isDemoMode();
  const apiKey = (process.env.ANTHROPIC_API_KEY || "").trim();
  const aiConfigured = apiKey.length > 10;
  const llmModel = (process.env.LLM_MODEL || "claude-sonnet-5-5").trim();

  return NextResponse.json({
    status: "healthy",
    demo_mode: demoMode,
    ai_configured: aiConfigured,
    llm_model: llmModel,
    ocr_available: true,
    supported_languages: ["English", "Tamil"],
    translation_engine: "Active Neural & Pure Tamil Translation Engine",
    max_upload_size_mb: 15,
  });
}
