import { GoogleGenAI, Type } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({
  apiKey: apiKey || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

export default async (req: Request) => {
  try {
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Método não permitido.' }),
        {
          status: 405,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const {
      subject = 'Matemática',
      difficulty = 'Médio',
      count = 10,
    } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return new Response(
        JSON.stringify({
          error: 'Chave GEMINI_API_KEY não configurada no servidor.',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const prompt = `Gere exatamente ${count} questões de múltipla escolha totalmente inéditas, sem repetições, para estudantes brasileiros na matéria de ${subject}, com nível de dificuldade "${difficulty}".

Instruções cruciais e obrigatórias:
1. Respeite rigorosamente a matéria ${subject} e o nível ${difficulty}.
2. Não repita nenhuma pergunta dentro deste teste. Varie os subtemas curriculares.
3. Para MATEMÁTICA: valide rigorosamente todos os cálculos, operações e equações antes de escrever a questão. Apenas uma das 4 opções deve ser a resposta matematicamente exata e comprovada. A explicação deve demonstrar o cálculo passo a passo.
4. Cada questão DEVE ter exatamente 4 alternativas (A, B, C, D) plausíveis, sem opções vazias ou duplicadas.
5. O campo correctIndex deve ser estritamente o número inteiro (0, 1, 2 ou 3) correspondente à única alternativa correta.
6. A explicação deve ser clara, didática e acessível ao estudante, explicando o porquê do acerto.`;

    const modelsToTry = [
      'gemini-3.8-flash',
      'gemini-3.1-flash-lite',
    ];

    let generatedQuestions: any[] = [];
    let lastError: any = null;

    for (const modelName of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            systemInstruction:
              'Você é um professor especialista sênior em elaboração de avaliações educacionais para o EstudaFácil. Você preza pela precisão matemática absoluta, correção gramatical impecável, ausência de ambiguidade nas alternativas e explicações passo a passo enriquecedoras em português do Brasil.',

            responseMimeType: 'application/json',

            responseSchema: {
              type: Type.ARRAY,
              description: 'Lista de questões de múltipla escolha',

              items: {
                type: Type.OBJECT,

                properties: {
                  question: {
                    type: Type.STRING,
                    description: 'Enunciado detalhado e claro da questão',
                  },

                  options: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.STRING,
                    },
                    description:
                      'Exatamente 4 opções de resposta distintas',
                  },

                  correctIndex: {
                    type: Type.INTEGER,
                    description:
                      'Índice de 0 a 3 da alternativa correta',
                  },

                  explanation: {
                    type: Type.STRING,
                    description:
                      'Explicação didática da resposta com resolução passo a passo',
                  },
                },

                required: [
                  'question',
                  'options',
                  'correctIndex',
                  'explanation',
                ],
              },
            },

            temperature: 0.7,
          },
        });

        if (response.text) {
          const parsed = JSON.parse(response.text);

          if (Array.isArray(parsed) && parsed.length > 0) {
            const seenQuestions = new Set<string>();
            const validQuestions: any[] = [];

            for (const q of parsed) {
              const qText = (q.question || '').trim();

              if (
                qText &&
                !seenQuestions.has(qText.toLowerCase()) &&
                Array.isArray(q.options) &&
                q.options.length === 4 &&
                q.options.every(
                  (opt: any) =>
                    typeof opt === 'string' &&
                    opt.trim().length > 0
                ) &&
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
        console.warn(
          `Tentativa com ${modelName} falhou:`,
          err.message || err
        );
      }
    }

    if (generatedQuestions.length === 0 && lastError) {
      throw lastError;
    }

    return new Response(
      JSON.stringify({
        questions: generatedQuestions,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error: any) {
    console.error(
      'Erro na função generate-exercises:',
      error
    );

    return new Response(
      JSON.stringify({
        error:
          error.message ||
          'Erro ao gerar questões com a IA.',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};

export const config = {
  path: '/api/generate-exercises',
};
