import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({
  apiKey: apiKey || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// API Route to Generate Exercises using Gemini
app.post('/api/generate-exercises', async (req, res) => {
  try {
    const { subject = 'Matemática', difficulty = 'Médio', count = 10 } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: 'Chave GEMINI_API_KEY não configurada no servidor.',
      });
    }

    const prompt = `Gere exatamente ${count} questões de múltipla escolha totalmente inéditas, sem repetições, para estudantes brasileiros na matéria de ${subject}, com nível de dificuldade "${difficulty}".

Instruções cruciais e obrigatórias:
1. Respeite rigorosamente a matéria ${subject} e o nível ${difficulty}.
2. Não repita nenhuma pergunta dentro deste teste. Varie os subtemas curriculares.
3. Para MATEMÁTICA: Você deve validar rigorosamente todos os cálculos, operações e equações antes de escrever a questão. Apenas uma das 4 opções deve ser a resposta matematicamente exata e comprovada. A explicação deve demonstrar o cálculo passo a passo.
4. Cada questão DEVE ter exatamente 4 alternativas (A, B, C, D) plausíveis, sem opções vazias ou duplicadas.
5. O campo correctIndex deve ser estritamente o número inteiro (0, 1, 2 ou 3) correspondente à única alternativa correta.
6. A explicação deve ser clara, didática e acessível ao estudante, explicando o porquê do acerto.`;

    const modelsToTry = ['gemini-3.8-flash', 'gemini-3.1-flash-lite'];
    let generatedQuestions: any[] = [];
    let lastError: any = null;

    for (const modelName of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            systemInstruction: `Você é um professor especialista sênior em elaboração de avaliações educacionais para o EstudaFácil. Você preza pela precisão matemática absoluta, correção gramatical impecável, ausência de ambiguidade nas alternativas e explicações passo a passo enriquecedoras em português do Brasil.`,
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.ARRAY,
              description: 'Lista de 10 questões de múltipla escolha',
              items: {
                type: Type.OBJECT,
                properties: {
                  question: {
                    type: Type.STRING,
                    description: 'Enunciado detalhado e claro da questão',
                  },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: 'Exatamente 4 opções de resposta distintas',
                  },
                  correctIndex: {
                    type: Type.INTEGER,
                    description: 'Índice de 0 a 3 da alternativa correta',
                  },
                  explanation: {
                    type: Type.STRING,
                    description: 'Explicação didática da resposta com resolução passo a passo',
                  },
                },
                required: ['question', 'options', 'correctIndex', 'explanation'],
              },
            },
            temperature: 0.7,
          },
        });

        if (response.text) {
          const parsed = JSON.parse(response.text);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const seenQuestions = new Set<string>();
            const validQuestions = [];

            for (const q of parsed) {
              const qText = (q.question || '').trim();
              if (
                qText &&
                !seenQuestions.has(qText.toLowerCase()) &&
                Array.isArray(q.options) &&
                q.options.length === 4 &&
                q.options.every((opt: any) => typeof opt === 'string' && opt.trim().length > 0) &&
                typeof q.correctIndex === 'number' &&
                q.correctIndex >= 0 &&
                q.correctIndex <= 3 &&
                q.explanation
              ) {
                seenQuestions.add(qText.toLowerCase());
                validQuestions.push({
                  id: `gen-${Date.now()}-${validQuestions.length}`,
                  question: qText,
                  options: q.options.map((o: string) => o.trim()),
                  correctIndex: q.correctIndex,
                  explanation: q.explanation.trim(),
                  difficulty: difficulty,
                });
              }
            }

            if (validQuestions.length >= 5) {
              generatedQuestions = validQuestions.slice(0, count);
              break;
            }
          }
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`Tentativa de gerar questões com ${modelName} falhou:`, err.message || err);
      }
    }

    if (generatedQuestions.length === 0 && lastError) {
      throw lastError;
    }

    return res.json({ questions: generatedQuestions });
  } catch (error: any) {
    console.error('Erro na rota /api/generate-exercises:', error);
    return res.status(500).json({
      error: error.message || 'Erro ao gerar questões com a IA.',
    });
  }
});

// API Route for Tutor IA
app.post('/api/tutor', async (req, res) => {
  try {
    const { messages, userMessage } = req.body;

    if (!userMessage || typeof userMessage !== 'string' || !userMessage.trim()) {
      return res.status(400).json({ error: 'Mensagem inválida ou vazia.' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: 'Chave GEMINI_API_KEY não configurada no servidor. Verifique as configurações de segredos.',
      });
    }

    // Build contents array for context
    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(messages) && messages.length > 0) {
      // Send up to 8 recent exchanges for relevant conversational context
      const recentMessages = messages.slice(-8);
      for (const m of recentMessages) {
        if (m.sender === 'user' && m.text) {
          contents.push({ role: 'user', parts: [{ text: m.text }] });
        } else if (m.sender === 'tutor' && m.text && m.id !== 'welcome') {
          contents.push({ role: 'model', parts: [{ text: m.text }] });
        }
      }
    }

    // Ensure the current user message is appended
    const lastContent = contents[contents.length - 1];
    if (!lastContent || lastContent.role !== 'user' || lastContent.parts[0]?.text !== userMessage) {
      contents.push({ role: 'user', parts: [{ text: userMessage.trim() }] });
    }

    // Attempt generation with primary model gemini-3.8-flash, falling back to gemini-3.1-flash-lite if temporary 503
    let responseText = '';
    const modelsToTry = ['gemini-3.8-flash', 'gemini-3.1-flash-lite'];
    let lastError: any = null;

    for (const modelName of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: contents,
          config: {
            systemInstruction: `Você é o Tutor IA oficial do aplicativo educacional EstudaFácil.
Seu objetivo é ajudar estudantes do Brasil a aprender de forma simples, didática e inteligente.

Instruções fundamentais:
1. Idioma: Responda SEMPRE em português do Brasil.
2. Tom: Seja caloroso, paciente, encorajador e muito didático.
3. Explicação passo a passo: Ensine dividindo temas difíceis em etapas lógicas e fáceis de assimilar.
4. Exemplos: Sempre traga exemplos práticos e claros quando forem úteis para fixar o conceito.
5. Matemática e Ciências Exatas: Mostre TODO o raciocínio e os cálculos passo a passo, explicitando cada fórmula e etapa da resolução.
6. Adaptação de nível: Explique conceitos de modo acessível, sem complicar com termos desnecessários.
7. Foco em Estudos: Se a pergunta NÃO tiver relação com matérias escolares (Matemática, Português, História, Geografia, Ciências, Biologia, Física, Química, Inglês, Redação, etc.) ou métodos de estudo, responda com muita gentileza orientando o usuário a fazer perguntas relacionadas aos estudos e ao aprendizado.
8. Formatação: Use markdown bem estruturado (negrito, tópicos com marcadores, quebras de parágrafo) para que a resposta seja muito agradável de ler em telas de celular e desktop.`,
            temperature: 0.7,
          },
        });

        if (response.text) {
          responseText = response.text;
          break;
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`Tentativa com ${modelName} falhou, tentando fallback...`, err.message || err);
      }
    }

    if (!responseText && lastError) {
      throw lastError;
    }

    const replyText =
      responseText ||
      'Desculpe, não consegui formular a explicação no momento. Por favor, tente perguntar novamente!';

    return res.json({ reply: replyText });
  } catch (error: any) {
    console.error('Erro na chamada Gemini do Tutor IA:', error);
    return res.status(500).json({
      error: error.message || 'Erro ao processar a resposta do Tutor IA.',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`EstudaFácil server running at http://localhost:${port}`);
  });
}

startServer();
