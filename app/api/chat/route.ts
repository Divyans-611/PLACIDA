// // import { type NextRequest, NextResponse } from "next/server";

// // export async function POST(req: NextRequest) {
// //   try {
// //     const body = await req.json().catch(() => ({}));
// //     const { message, messages } = body as {
// //       message?: string;
// //       messages?: Array<{ role: "user" | "assistant" | "system"; content: string }>;
// //     };

// //     // 🧩 Input validation
// //     if ((!message || !message.trim()) && (!messages || messages.length === 0)) {
// //       return NextResponse.json({ error: "Message required" }, { status: 400 });
// //     }

// //     // 🔐 Get Gemini API key
// //     const apiKey = process.env.GEMINI_API_KEY;
// //     if (!apiKey) {
// //       return NextResponse.json(
// //         { error: "Missing GEMINI_API_KEY in environment" },
// //         { status: 500 }
// //       );
// //     }

// //     // 🧠 System prompt (same as before)
// //     // const systemPrompt =
// //     //   "You are Placida, a warm, compassionate mental well-being companion. " +
// //     //   "Offer brief, empathetic reflections and gentle, practical suggestions. " +
// //     //   "Avoid medical diagnoses. Encourage seeking professional help if needed.";
// //     const systemPrompt =
// //   "You are Placida — a deeply empathetic, understanding, and emotionally grounded companion. " +
// //   "You listen closely, respond with warmth, and make people feel genuinely heard and safe. " +
// //   "Speak in a natural, human tone — honest, calm, and comforting. " +
// //   "When you respond, reflect what the person is feeling, validate their emotions, and gently explore what might help them feel a little better. " +
// //   "Keep your words real and emotionally raw, not scripted or polished. " +
// //   "Encourage open and honest conversation — even about personal, sensitive, or vulnerable topics — while always staying respectful and caring. " +
// //   "After responding, help the person open up more by asking thoughtful, compassionate questions that move the conversation forward naturally. " +
// //   "Never judge, lecture, or sound clinical. " +
// //   "Do not offer medical or therapeutic diagnoses, but you can gently suggest healthy ways to cope or find comfort. " +
// //   "If someone seems deeply distressed, softly remind them that talking to a trusted person or mental health professional can really help. " +
// //   "Above all, your presence should feel deeply human — kind, safe, and steady — like someone who truly understands and cares.";


// //     // 📜 Build message history
// //     const history: Array<{ role: string; content: string }> = [
// //       { role: "system", content: systemPrompt },
// //     ];

// //     if (Array.isArray(messages) && messages.length > 0) {
// //       for (const m of messages) {
// //         if (!m?.content || typeof m.content !== "string") continue;
// //         const role = ["assistant", "system"].includes(m.role)
// //           ? m.role
// //           : "user";
// //         history.push({ role, content: m.content });
// //       }
// //     } else if (message) {
// //       history.push({ role: "user", content: message });
// //     }

// //     // 🗣️ Convert messages to plain text for Gemini
// //     const conversationText = history
// //       .map((m) => `${m.role}: ${m.content}`)
// //       .join("\n");

// //     // 🚀 Send request to Gemini API
// //     const response = await fetch(
// //       `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
// //       {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           contents: [
// //             {
// //               parts: [{ text: conversationText }],
// //             },
// //           ],
// //           generationConfig: {
// //             temperature: 0.7,
// //             maxOutputTokens: 800,
// //           },
// //         }),
// //       }
// //     );

// //     // 🧾 Parse response
// //     const data = await response.json();

// //     if (!response.ok) {
// //       console.error("Gemini API error:", data);
// //       return NextResponse.json(
// //         {
// //           error:
// //             data.error?.message ||
// //             `Gemini API error (${response.status}): ${response.statusText}`,
// //         },
// //         { status: response.status }
// //       );
// //     }

// //     const reply =
// //       data?.candidates?.[0]?.content?.parts?.[0]?.text ||
// //       "No response. Please try again.";

// //     return NextResponse.json({ reply });
// //   } catch (err: any) {
// //     console.error("Error in /api/chat:", err);
// //     return NextResponse.json(
// //       { error: `Server error: ${err.message || "Unknown error"}` },
// //       { status: 500 }
// //     );
// //   }
// // }
// import { type NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json().catch(() => ({}));
//     const { message, messages, language } = body as {
//       message?: string;
//       messages?: Array<{ role: "user" | "assistant" | "system"; content: string }>;
//       language?: string; // optional: user can send language preference
//     };

//     if ((!message || !message.trim()) && (!messages || messages.length === 0)) {
//       return NextResponse.json({ error: "Message required" }, { status: 400 });
//     }

//     const apiKey = process.env.GEMINI_API_KEY;
//     if (!apiKey) {
//       return NextResponse.json(
//         { error: "Missing GEMINI_API_KEY in environment" },
//         { status: 500 }
//       );
//     }

//     // 🌍 Multilingual, empathetic system prompt
//     const systemPrompt =
//       `You are Placida — a deeply empathetic, multilingual mental well-being companion. ` +
//       `You naturally understand and respond in the same language the user speaks — whether it's English, Hindi, Spanish, French, Bengali, or others. ` +
//       `Use the user’s language for all replies. If you’re unsure, politely ask which language they prefer. ` +
//       `Your tone should always be warm, human, and emotionally grounded. ` +
//       `Reflect their emotions, validate what they feel, and respond with understanding and care. ` +
//       `You can gently ask thoughtful questions to help them express themselves. ` +
//       `Avoid medical or diagnostic language, but you may suggest small, kind coping ideas. ` +
//       `If someone seems very distressed, softly encourage them to reach out to a trusted person or mental health professional.` +
//       (language ? ` Please respond in ${language}.` : "");

//     // 🧠 Build message history
//     const history: Array<{ role: string; content: string }> = [
//       { role: "system", content: systemPrompt },
//     ];

//     if (Array.isArray(messages) && messages.length > 0) {
//       for (const m of messages) {
//         if (!m?.content || typeof m.content !== "string") continue;
//         const role = ["assistant", "system"].includes(m.role)
//           ? m.role
//           : "user";
//         history.push({ role, content: m.content });
//       }
//     } else if (message) {
//       history.push({ role: "user", content: message });
//     }

//     const conversationText = history.map((m) => `${m.role}: ${m.content}`).join("\n");

//     // 🌐 Call Gemini multilingual model
//     const response = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           contents: [{ parts: [{ text: conversationText }] }],
//           generationConfig: {
//             temperature: 0.75,
//             maxOutputTokens: 800,
//           },
//         }),
//       }
//     );

//     const data = await response.json();

//     if (!response.ok) {
//       console.error("Gemini API error:", data);
//       return NextResponse.json(
//         {
//           error:
//             data.error?.message ||
//             `Gemini API error (${response.status}): ${response.statusText}`,
//         },
//         { status: response.status }
//       );
//     }

//     const reply =
//       data?.candidates?.[0]?.content?.parts?.[0]?.text ||
//       "No response. Please try again.";

//     return NextResponse.json({ reply });
//   } catch (err: any) {
//     console.error("Error in /api/chat:", err);
//     return NextResponse.json(
//       { error: `Server error: ${err.message || "Unknown error"}` },
//       { status: 500 }
//     );
//   }
// }

import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const { message, messages, language } = body as {
      message?: string
      messages?: Array<{ role: "user" | "assistant" | "system"; content: string }>
      language?: string
    }

    if ((!message || !message.trim()) && (!messages || messages.length === 0)) {
      return NextResponse.json({ error: "Message required" }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "Missing GEMINI_API_KEY" }, { status: 500 })
    }

    // 💛 Updated system prompt
    const systemPrompt =
      `You are **Placida**, a deeply empathetic and emotionally intelligent mental well-being companion. ` +
      `You are multilingual — you understand and respond in the user’s preferred or detected language (English, Hindi, Bengali, Spanish, French, etc.). ` +
      (language ? `For this conversation, please respond in ${language}. ` : ``) +
      `Your mission is to make people feel heard, understood, and emotionally safe. ` +
      `You respond with warmth, compassion, and a very human tone — never robotic or clinical. ` +
      `You validate feelings, reflect emotions naturally, and ask gentle, open-ended questions to help users open up at their own pace. ` +
      `Your words should feel like a calm friend — someone trustworthy, steady, and real. ` +
      `You never give medical advice or diagnoses. ` +
      `If the user expresses distress, hopelessness, or thoughts of self-harm, respond with deep care: ` +
      `1. Acknowledge and validate their pain. ` +
      `2. Encourage them to reach out to someone they trust — a friend, family member, or a trained mental health professional or helpline. ` +
      `3. Offer emotional grounding — for example, gently shift the topic toward something comforting, hopeful, or soothing (like hobbies, music, nature, memories, or what used to make them feel safe). ` +
      `4. Always speak as if you truly care and want them to stay safe. ` +
      `If they keep returning to dark thoughts, continue offering gentle care and grounding without judgment. ` +
      `Avoid generic statements like “everything will be fine” — instead, use soft realism and warmth. ` +
      `Your ultimate goal is to help them feel safe enough to keep talking. `

    // 🧱 Build chat history
    const history: Array<{ role: string; content: string }> = [
      { role: "system", content: systemPrompt },
    ]

    if (Array.isArray(messages) && messages.length > 0) {
      for (const m of messages) {
        if (!m?.content || typeof m.content !== "string") continue
        const role = ["assistant", "system"].includes(m.role) ? m.role : "user"
        history.push({ role, content: m.content })
      }
    } else if (message) {
      history.push({ role: "user", content: message })
    }

    const conversationText = history.map((m) => `${m.role}: ${m.content}`).join("\n")

    // 🌍 Gemini API request
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: conversationText }] }],
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 900,
          },
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      console.error("Gemini API error:", data)
      return NextResponse.json(
        { error: data.error?.message || `Gemini API error (${response.status})` },
        { status: response.status }
      )
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm here for you. Would you like to tell me a bit more about what’s going on?"

    return NextResponse.json({ reply })
  } catch (err: any) {
    console.error("Error in /api/chat:", err)
    return NextResponse.json(
      { error: `Server error: ${err.message || "Unknown error"}` },
      { status: 500 }
    )
  }
}
