const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const text = body.text;

    console.log("Incoming text:", text);

    const prompt = `Analyze this journal entry and respond in the SAME LANGUAGE as the journal entry.

Journal: "${text}"

Stress scoring rules:
- "overwhelmed", "falling apart", "can't cope", "can't sleep" = stress 75-95
- "sad", "anxious", "worried", "stressed" = stress 50-70
- "okay", "fine", "neutral" = stress 30-50
- "happy", "great", "excited", "good" = stress 0-25
- Apply same rules for other languages (e.g. Hindi: "pareshan", "udaas", "khush")

IMPORTANT: 
- Detect the language of the journal entry
- Write the "suggestion" field in that SAME language
- Write "moodSubtitle" in that SAME language
- Keep "mood" in English always

Return ONLY this JSON with no extra text:
{"mood":"Happy","moodEmoji":"😊","moodSubtitle":"Feeling great today","stress":15,"suggestion":"You seem to be in a wonderful place emotionally. Keep nurturing this positivity!","language":"en"}`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Deno.env.get("GROQ_API_KEY")}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 400,
        temperature: 0.1,
        messages: [
          {
            role: "system",
            content: "You are an emotional wellness AI. Always respond with ONLY a valid JSON object. Detect the language of the input and respond in that same language. Never use markdown or backticks."
          },
          {
            role: "user",
            content: prompt
          }
        ],
      }),
    });

    const aiData = await response.json();
    console.log("Groq response:", JSON.stringify(aiData));

    if (aiData.error) throw new Error(aiData.error.message);

    const raw = aiData.choices[0].message.content.trim();
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error:", error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});