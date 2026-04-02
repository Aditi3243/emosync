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

    const prompt = `Analyze this journal entry and return ONLY a JSON object, nothing else.

Journal: "${text}"

Stress scoring rules:
- "overwhelmed", "falling apart", "can't cope", "can't sleep", "everything is wrong" = stress 75-95
- "sad", "anxious", "worried", "stressed" = stress 50-70
- "okay", "fine", "neutral" = stress 30-50
- "happy", "great", "excited", "good" = stress 0-25

Return this exact JSON structure with no extra text:
{"mood":"Overwhelmed","moodEmoji":"😰","moodSubtitle":"Feeling under pressure","stress":80,"suggestion":"Your feelings are completely valid. Try taking short breaks and breathing deeply."}`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Deno.env.get("GROQ_API_KEY")}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 300,
        temperature: 0.1,
        messages: [
          {
            role: "system",
            content: "You are an emotional wellness AI. You ONLY respond with valid JSON objects. Never use markdown, backticks, or any other formatting. Just pure JSON."
          },
          {
            role: "user",
            content: prompt
          }
        ],
      }),
    });

    const aiData = await response.json();
    console.log("Groq full response:", JSON.stringify(aiData));

    if (aiData.error) {
      throw new Error(aiData.error.message);
    }

    const raw = aiData.choices[0].message.content.trim();
    console.log("Raw content:", raw);
    
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