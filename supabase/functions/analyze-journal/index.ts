import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { text } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `You are an emotion analysis AI. Analyze the user's journal entry and return a JSON response with:
- mood: one of "Calm", "Happy", "Content", "Melancholy", "Frustrated", "Grateful", "Anxious", "Excited"
- moodEmoji: matching emoji for the mood
- moodSubtitle: a short 2-4 word description
- stress: a number 0-100 (0=no stress, 100=extreme stress). Happy/calm/grateful entries should have LOW stress (5-25). Sad/frustrated/anxious entries should have HIGH stress (60-90).
- suggestion: a helpful, actionable wellness suggestion (1-2 sentences) based on the detected mood

Return ONLY valid JSON, no markdown.`,
          },
          { role: "user", content: text },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "analyze_emotion",
              description: "Analyze emotional content of a journal entry",
              parameters: {
                type: "object",
                properties: {
                  mood: { type: "string" },
                  moodEmoji: { type: "string" },
                  moodSubtitle: { type: "string" },
                  stress: { type: "number" },
                  suggestion: { type: "string" },
                },
                required: ["mood", "moodEmoji", "moodSubtitle", "stress", "suggestion"],
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "analyze_emotion" } },
      }),
    });

    if (!response.ok) {
      const t = await response.text();
      console.error("AI error:", response.status, t);
      return new Response(JSON.stringify({ error: "Analysis failed" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (toolCall) {
      const result = JSON.parse(toolCall.function.arguments);
      return new Response(JSON.stringify(result), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "No analysis returned" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
