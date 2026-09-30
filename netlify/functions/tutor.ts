import { GoogleGenAI } from '@google/genai';

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Método não permitido.' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { messages, userMessage } = await req.json();

    if (!userMessage || typeof userMessage !== 'string' || !userMessage.trim()) {
      return new Response(
        JSON.stringify({ error: 'Mensagem inválida ou vazia.' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: 'GEMINI_API_KEY não configurada no Netlify.',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const contents: Array<{
      role: string;
      parts: Array<{ text: string }>;
    }> = [];

    if (Array.isArray(messages)) {
      const recentMessages = messages.slice(-8);

      for (const m of recentMessages) {
        if (m.sender === 'user' && m.text) {
          contents.push({
            role: 'user',
            parts: [{ text: m.text }],
          });
        } else if (m.sender === 'tutor' && m.text && m.id !== 'welcome') {
          contents.push({
            role: 'model',
            parts: [{ text: m.text }],
          });
        }
      }
    }

    const lastContent = contents[contents.length - 1];

    if (
      !lastContent ||
      lastContent.role !== 'user' ||
      lastContent.parts[0]?.text !== userMessage
    ) {
      contents.push({
        role: 'user',
        parts: [{ text: userMessage.trim() }],
      });
    }

    const modelsToTry = [
      'gemini-3.8-flash',
      'gemini-3.1-flash-lite',
    ];

    let responseText = '';
    let lastError: any = null;

    for (const modelName of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents,
          config: {
            systemInstruction: `Você é o Tutor IA oficial do aplicativo educacional EstudaFácil.

Seu objetivo é ajudar estudantes do Brasil a aprender de forma simples, didática e inteligente.

Instruções fundamentais:
1. Responda sempre em português do Brasil.
2. Seja caloroso, paciente, encorajador e didático.
3. Explique passo a passo.
4. Use exemplos práticos quando forem úteis.
5. Em Matemática e Ciências Exatas, mostre os cálculos passo a passo.
6. Adapte a explicação ao nível do estudante.
7. Mantenha o foco em estudos e aprendizado.
8. Use markdown bem estruturado.`,
            temperature: 0.7,
          },
        });

        if (response.text) {
          responseText = response.text;
          break;
        }
      } catch (err: any) {
        lastError = err;
      }
    }

    if (!responseText && lastError) {
      throw lastError;
    }

    return new Response(
      JSON.stringify({
        reply:
          responseText ||
          'Desculpe, não consegui formular a explicação no momento. Tente novamente!',
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: error.message || 'Erro ao processar a resposta do Tutor IA.',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

export const config = {
  path: '/api/tutor',
};
