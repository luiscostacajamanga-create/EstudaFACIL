import { ExerciseQuestion, DifficultyLevel } from '../types';

export const CURATED_EXERCISES: Record<string, Record<DifficultyLevel, ExerciseQuestion[]>> = {
  matematica: {
    'Fácil': [
      {
        id: 'mat-f-1',
        question: 'Qual é o resultado da operação: 15 + 27 - 12?',
        options: ['28', '30', '32', '34'],
        correctIndex: 1,
        explanation: 'Primeiro somamos: 15 + 27 = 42. Depois subtraímos 12: 42 - 12 = 30.',
        difficulty: 'Fácil'
      },
      {
        id: 'mat-f-2',
        question: 'Em um triângulo retângulo, se os catetos medem 3 cm e 4 cm, quanto mede a hipotenusa?',
        options: ['5 cm', '6 cm', '7 cm', '8 cm'],
        correctIndex: 0,
        explanation: 'Pelo Teorema de Pitágoras: a² = 3² + 4² = 9 + 16 = 25. Logo, a = √25 = 5 cm.',
        difficulty: 'Fácil'
      },
      {
        id: 'mat-f-3',
        question: 'Qual é a fração equivalente a 50%?',
        options: ['1/4', '1/2', '3/4', '2/5'],
        correctIndex: 1,
        explanation: '50% é igual a 50/100, que simplificado dividindo por 50 resulta em 1/2.',
        difficulty: 'Fácil'
      },
      {
        id: 'mat-f-4',
        question: 'Se um retângulo tem base de 8 cm e altura de 5 cm, qual é a sua área?',
        options: ['26 cm²', '40 cm²', '35 cm²', '45 cm²'],
        correctIndex: 1,
        explanation: 'A área de um retângulo é dada por base × altura: 8 × 5 = 40 cm².',
        difficulty: 'Fácil'
      },
      {
        id: 'mat-f-5',
        question: 'Qual é o valor de x na equação simples: 2x + 6 = 16?',
        options: ['x = 4', 'x = 5', 'x = 6', 'x = 8'],
        correctIndex: 1,
        explanation: 'Isolamos o 2x: 2x = 16 - 6 = 10. Em seguida dividimos por 2: x = 10 / 2 = 5.',
        difficulty: 'Fácil'
      },
      {
        id: 'mat-f-6',
        question: 'Quantos graus tem a soma dos ângulos internos de qualquer triângulo?',
        options: ['90°', '180°', '270°', '360°'],
        correctIndex: 1,
        explanation: 'A soma dos três ângulos internos de todo triângulo plano é sempre exatamente 180°.',
        difficulty: 'Fácil'
      },
      {
        id: 'mat-f-7',
        question: 'Qual é o quadrado de 12 (12²)?',
        options: ['124', '132', '144', '164'],
        correctIndex: 2,
        explanation: '12 × 12 = 144.',
        difficulty: 'Fácil'
      },
      {
        id: 'mat-f-8',
        question: 'Se você comprar 3 cadernos por R$ 9,00 cada, quanto gastará no total?',
        options: ['R$ 18,00', 'R$ 24,00', 'R$ 27,00', 'R$ 30,00'],
        correctIndex: 2,
        explanation: 'Multiplicação simples: 3 cadernos × R$ 9,00 = R$ 27,00.',
        difficulty: 'Fácil'
      },
      {
        id: 'mat-f-9',
        question: 'Qual é o perímetro de um quadrado cujos lados medem 7 cm?',
        options: ['14 cm', '21 cm', '28 cm', '49 cm'],
        correctIndex: 2,
        explanation: 'O perímetro é a soma dos 4 lados: 4 × 7 = 28 cm.',
        difficulty: 'Fácil'
      },
      {
        id: 'mat-f-10',
        question: 'Qual número é o único número primo e par ao mesmo tempo?',
        options: ['0', '2', '4', '6'],
        correctIndex: 1,
        explanation: 'O número 2 é o único número primo par, pois é divisível apenas por 1 e por ele mesmo.',
        difficulty: 'Fácil'
      }
    ],
    'Médio': [
      {
        id: 'mat-m-1',
        question: 'Quais são as raízes da equação do segundo grau x² - 5x + 6 = 0?',
        options: ['x = 1 e x = 6', 'x = 2 e x = 3', 'x = -2 e x = -3', 'x = 0 e x = 5'],
        correctIndex: 1,
        explanation: 'Por soma e produto: soma = 5 e produto = 6. Os números são 2 e 3 (2 + 3 = 5 e 2 × 3 = 6).',
        difficulty: 'Médio'
      },
      {
        id: 'mat-m-2',
        question: 'Se 6 máquinas produzem 120 peças em 2 horas, quantas peças 10 máquinas produzirão nas mesmas 2 horas?',
        options: ['150', '180', '200', '240'],
        correctIndex: 2,
        explanation: 'Regra de três direta: 6 máquinas -> 120 peças; 10 máquinas -> x. x = (10 × 120) / 6 = 200 peças.',
        difficulty: 'Médio'
      },
      {
        id: 'mat-m-3',
        question: 'Um produto de R$ 200,00 teve um desconto de 15%. Qual é o novo preço?',
        options: ['R$ 165,00', 'R$ 170,00', 'R$ 175,00', 'R$ 185,00'],
        correctIndex: 1,
        explanation: '15% de R$ 200 = 0,15 × 200 = R$ 30. Novo valor: 200 - 30 = R$ 170,00.',
        difficulty: 'Médio'
      },
      {
        id: 'mat-m-4',
        question: 'Qual é o valor de log₁₀(1000)?',
        options: ['2', '3', '10', '100'],
        correctIndex: 1,
        explanation: 'Como 10³ = 1000, o expoente procurado no logaritmo decimal é 3.',
        difficulty: 'Médio'
      },
      {
        id: 'mat-m-5',
        question: 'Qual é o volume de um paralelepípedo com dimensões 4 m, 3 m e 2 m?',
        options: ['18 m³', '20 m³', '24 m³', '32 m³'],
        correctIndex: 2,
        explanation: 'Volume = comprimento × largura × altura = 4 × 3 × 2 = 24 m³.',
        difficulty: 'Médio'
      },
      {
        id: 'mat-m-6',
        question: 'Em uma Progressão Aritmética (PA) com a₁ = 4 e razão r = 3, qual é o 10º termo?',
        options: ['28', '31', '34', '37'],
        correctIndex: 1,
        explanation: 'Fórmula do termo geral: a₁₀ = a₁ + (10 - 1) × r = 4 + 9 × 3 = 4 + 27 = 31.',
        difficulty: 'Médio'
      },
      {
        id: 'mat-m-7',
        question: 'Ao lançar dois dados normais de 6 faces, qual é a probabilidade de a soma ser 7?',
        options: ['1/12', '1/6', '1/4', '5/36'],
        correctIndex: 1,
        explanation: 'Há 36 combinações possíveis. As somas iguais a 7 são: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 casos. 6/36 = 1/6.',
        difficulty: 'Médio'
      },
      {
        id: 'mat-m-8',
        question: 'Qual é a diagonal de um quadrado com lado de 6 cm?',
        options: ['6√2 cm', '12 cm', '6√3 cm', '8 cm'],
        correctIndex: 0,
        explanation: 'A diagonal de um quadrado é dada por d = lado × √2. Portanto, d = 6√2 cm.',
        difficulty: 'Médio'
      },
      {
        id: 'mat-m-9',
        question: 'Se f(x) = 2x² - 3x + 1, qual é o valor de f(3)?',
        options: ['8', '10', '12', '14'],
        correctIndex: 1,
        explanation: 'f(3) = 2(3)² - 3(3) + 1 = 2(9) - 9 + 1 = 18 - 9 + 1 = 10.',
        difficulty: 'Médio'
      },
      {
        id: 'mat-m-10',
        question: 'Qual é a média aritmética simples dos números 14, 18, 22 e 26?',
        options: ['18', '20', '21', '22'],
        correctIndex: 1,
        explanation: 'Soma: 14 + 18 + 22 + 26 = 80. Dividido por 4 elementos: 80 / 4 = 20.',
        difficulty: 'Médio'
      }
    ],
    'Difícil': [
      {
        id: 'mat-d-1',
        question: 'Qual é o valor do limite lim(x->2) (x² - 4)/(x - 2)?',
        options: ['0', '2', '4', 'Infinito'],
        correctIndex: 2,
        explanation: 'Fatorando a diferença de quadrados: (x - 2)(x + 2) / (x - 2) = x + 2. Quando x tende a 2: 2 + 2 = 4.',
        difficulty: 'Difícil'
      },
      {
        id: 'mat-d-2',
        question: 'Quantos anagramas possui a palavra MATEMÁTICA (10 letras, com 3 A, 2 M, 2 T)?',
        options: ['151.200', '302.400', '604.800', '1.209.600'],
        correctIndex: 0,
        explanation: 'Permutação com repetição: 10! / (3! × 2! × 2!) = 3.628.800 / (6 × 2 × 2) = 3.628.800 / 24 = 151.200.',
        difficulty: 'Difícil'
      },
      {
        id: 'mat-d-3',
        question: 'Qual é a derivada da função f(x) = e^(3x) + sen(2x)?',
        options: ['3e^(3x) + 2cos(2x)', 'e^(3x) - cos(2x)', '3e^(3x) - 2cos(2x)', '6e^(3x) + cos(2x)'],
        correctIndex: 0,
        explanation: 'Pela regra da cadeia: d/dx[e^(3x)] = 3e^(3x) e d/dx[sen(2x)] = 2cos(2x).',
        difficulty: 'Difícil'
      },
      {
        id: 'mat-d-4',
        question: 'Qual é o determinante da matriz 2x2: [[4, 2], [3, 5]]?',
        options: ['12', '14', '16', '26'],
        correctIndex: 1,
        explanation: 'det = (4 × 5) - (2 × 3) = 20 - 6 = 14.',
        difficulty: 'Difícil'
      },
      {
        id: 'mat-d-5',
        question: 'Em uma Progressão Geométrica infinita com primeiro termo a₁ = 9 e razão q = 1/3, qual é a soma de todos os termos?',
        options: ['12', '13.5', '15', '18'],
        correctIndex: 1,
        explanation: 'Fórmula da soma da PG infinita: S = a₁ / (1 - q) = 9 / (1 - 1/3) = 9 / (2/3) = 27/2 = 13,5.',
        difficulty: 'Difícil'
      },
      {
        id: 'mat-d-6',
        question: 'Qual é a solução da equação modular |2x - 6| = 8?',
        options: ['x = 7 ou x = -1', 'x = 4 ou x = -2', 'x = 5 ou x = -3', 'x = 8 ou x = 0'],
        correctIndex: 0,
        explanation: 'Caso 1: 2x - 6 = 8 => 2x = 14 => x = 7. Caso 2: 2x - 6 = -8 => 2x = -2 => x = -1.',
        difficulty: 'Difícil'
      },
      {
        id: 'mat-d-7',
        question: 'Qual é o raio da circunferência de equação x² + y² - 6x + 8y = 0?',
        options: ['3', '4', '5', '7'],
        correctIndex: 2,
        explanation: 'Completando quadrados: (x - 3)² + (y + 4)² = 3² + 4² = 9 + 16 = 25. O raio é √25 = 5.',
        difficulty: 'Difícil'
      },
      {
        id: 'mat-d-8',
        question: 'Qual é o valor exato de cos(120°)?',
        options: ['1/2', '-1/2', '√3/2', '-√3/2'],
        correctIndex: 1,
        explanation: '120° está no 2º quadrante: cos(120°) = -cos(180° - 120°) = -cos(60°) = -1/2.',
        difficulty: 'Difícil'
      },
      {
        id: 'mat-d-9',
        question: 'Em quantas maneiras distintas podemos formar uma comissão de 3 pessoas escolhidas entre 8 candidatos?',
        options: ['24', '56', '120', '336'],
        correctIndex: 1,
        explanation: 'Combinação simples: C(8,3) = 8! / (3! × 5!) = (8 × 7 × 6) / (3 × 2 × 1) = 56.',
        difficulty: 'Difícil'
      },
      {
        id: 'mat-d-10',
        question: 'Qual é o módulo do número complexo z = 5 - 12i?',
        options: ['11', '13', '15', '17'],
        correctIndex: 1,
        explanation: '|z| = √(5² + (-12)²) = √(25 + 144) = √169 = 13.',
        difficulty: 'Difícil'
      }
    ]
  },
  portugues: {
    'Fácil': [
      {
        id: 'por-f-1',
        question: 'Assinale a palavra escrita de forma CORRETA segundo o Novo Acordo Ortográfico:',
        options: ['Idéia', 'Ideia', 'Jibóia', 'Jóia'],
        correctIndex: 1,
        explanation: 'Ditongos abertos "ei" e "oi" em palavras paroxítonas (como ideia, jiboia, joia) perderam o acento gráfico.',
        difficulty: 'Fácil'
      },
      {
        id: 'por-f-2',
        question: 'Qual é o antônimo da palavra "efêmero"?',
        options: ['Breve', 'Passageiro', 'Duradouro', 'Rápido'],
        correctIndex: 2,
        explanation: '"Efêmero" significa algo transitório e curto. O oposto é duradouro ou permanente.',
        difficulty: 'Fácil'
      },
      {
        id: 'por-f-3',
        question: 'Em "O garoto correu rapidamente", qual é a classe gramatical da palavra "rapidamente"?',
        options: ['Substantivo', 'Adjetivo', 'Advérbio', 'Pronome'],
        correctIndex: 2,
        explanation: '"Rapidamente" é um advérbio de modo que modifica o verbo correr.',
        difficulty: 'Fácil'
      },
      {
        id: 'por-f-4',
        question: 'Qual das alternativas apresenta um substantivo coletivo para um grupo de peixes?',
        options: ['Alcateia', 'Cardume', 'Rebanho', 'Enxame'],
        correctIndex: 1,
        explanation: 'Cardume é o substantivo coletivo que designa um conjunto de peixes.',
        difficulty: 'Fácil'
      },
      {
        id: 'por-f-5',
        question: 'Identifique o sujeito da frase: "Chegaram os novos livros da biblioteca."',
        options: ['Chegaram', 'Os novos livros da biblioteca', 'Biblioteca', 'Sujeito indeterminado'],
        correctIndex: 1,
        explanation: 'Fazendo a pergunta: "O que chegou?" -> "Os novos livros da biblioteca" (sujeito simples posposto ao verbo).',
        difficulty: 'Fácil'
      },
      {
        id: 'por-f-6',
        question: 'Complete com a forma correta: "Não sei ______ você faltou ontem."',
        options: ['por que', 'por quê', 'porque', 'porquê'],
        correctIndex: 0,
        explanation: 'Usa-se "por que" separado e sem acento em perguntas indiretas (equivalente a "por qual razão").',
        difficulty: 'Fácil'
      },
      {
        id: 'por-f-7',
        question: 'Qual é o plural correto da palavra "cidadão"?',
        options: ['Cidadões', 'Cidadãos', 'Cidadães', 'Cidadonhes'],
        correctIndex: 1,
        explanation: 'O plural oficial da palavra cidadão é cidadãos.',
        difficulty: 'Fácil'
      },
      {
        id: 'por-f-8',
        question: 'Qual figura de linguagem consiste em um exagero intencional?',
        options: ['Metáfora', 'Hipérbole', 'Eufemismo', 'Ironia'],
        correctIndex: 1,
        explanation: 'A hipérbole é a figura de linguagem caracterizada pelo exagero expressivo (ex: "estou morrendo de sede").',
        difficulty: 'Fácil'
      },
      {
        id: 'por-f-9',
        question: 'Qual das seguintes palavras é oxítona acentuada?',
        options: ['Mesa', 'Café', 'Lápis', 'Árvore'],
        correctIndex: 1,
        explanation: 'Oxítonas têm a última sílaba tônica. "Café" termina em "e" e recebe acento agudo.',
        difficulty: 'Fácil'
      },
      {
        id: 'por-f-10',
        question: 'Em "Ele comprou pão e queijo", a palavra "e" é uma:',
        options: ['Preposição', 'Interjeição', 'Conjunção', 'Artigo'],
        correctIndex: 2,
        explanation: 'A palavra "e" é uma conjunção coordenativa aditiva que liga dois termos de mesma função.',
        difficulty: 'Fácil'
      }
    ],
    'Médio': [
      {
        id: 'por-m-1',
        question: 'Assinale a oração em que a regência do verbo "assistir" está de acordo com a norma-padrão no sentido de "ver/presenciar":',
        options: [
          'Assisti o filme ontem à noite.',
          'Assisti ao filme ontem à noite.',
          'Assisti no filme ontem à noite.',
          'Assisti pelo filme ontem à noite.'
        ],
        correctIndex: 1,
        explanation: 'No sentido de ver ou presenciar, o verbo assistir é transitivo indireto e exige a preposição "a" (assistir ao filme).',
        difficulty: 'Médio'
      },
      {
        id: 'por-m-2',
        question: 'Em qual das frases o acento indicativo de crase está EMPREGADO CORRETAMENTE?',
        options: [
          'Eles foram a pé para a escola.',
          'Fizemos referência àquele episódio memorável.',
          'Estou pronto para ir à qualquer lugar.',
          'Ele começou à estudar cedo.'
        ],
        correctIndex: 1,
        explanation: 'Quem faz referência, faz referência "a" + "aquele" = àquele. Diante de palavras masculinas, verbos ou pronomes indefinidos não há crase.',
        difficulty: 'Médio'
      },
      {
        id: 'por-m-3',
        question: 'Classifique a oração destacada: "Embora estivesse cansado, terminou a redação."',
        options: [
          'Oração subordinada adverbial causal',
          'Oração subordinada adverbial concessiva',
          'Oração subordinada adverbial condicional',
          'Oração subordinada substantiva subjetiva'
        ],
        correctIndex: 1,
        explanation: 'A conjunção "embora" introduz uma oposição que não anula a ação principal, caracterizando valor concessivo.',
        difficulty: 'Médio'
      },
      {
        id: 'por-m-4',
        question: 'Qual é o tempo e o modo do verbo na frase: "Se você estudasse mais, passaria no teste"?',
        options: [
          'Pretérito imperfeito do subjuntivo',
          'Futuro do pretérito do indicativo',
          'Pretérito mais-que-perfeito do subjuntivo',
          'Presente do indicativo'
        ],
        correctIndex: 0,
        explanation: '"Estudasse" (terminação -sse) está no pretérito imperfeito do modo subjuntivo, expressando hipótese.',
        difficulty: 'Médio'
      },
      {
        id: 'por-m-5',
        question: 'Assinale a alternativa em que a concordância verbal está CORRETA:',
        options: [
          'Fazem dez anos que não o vejo.',
          'Faz dez anos que não o vejo.',
          'Haviam muitas pessoas na sala.',
          'Devem de haver dúvidas.'
        ],
        correctIndex: 1,
        explanation: 'O verbo fazer indicando tempo transcorrido é impessoal e deve ficar na 3ª pessoa do singular: "Faz dez anos".',
        difficulty: 'Médio'
      },
      {
        id: 'por-m-6',
        question: 'Identifique o processo de formação da palavra "girassol":',
        options: ['Derivação prefixal', 'Composição por aglutinação', 'Composição por justaposição', 'Derivação parassintética'],
        correctIndex: 2,
        explanation: 'Composição por justaposição: união de gira + sol (com acréscimo de "s" para manter o som fonético) sem perda de fonemas.',
        difficulty: 'Médio'
      },
      {
        id: 'por-m-7',
        question: 'Qual função da linguagem tem foco principal no canal de comunicação (testar o contato)?',
        options: ['Função emotiva', 'Função fática', 'Função metalinguística', 'Função conativa'],
        correctIndex: 1,
        explanation: 'A função fática foca no canal ou contato (ex: "Alô?", "Entendeu?", "Veja bem").',
        difficulty: 'Médio'
      },
      {
        id: 'por-m-8',
        question: 'Em "Ele entregou a carta ao carteiro", o termo "ao carteiro" funciona sintaticamente como:',
        options: ['Objeto direto', 'Objeto indireto', 'Agente da passiva', 'Adjunto adnominal'],
        correctIndex: 1,
        explanation: 'Quem entrega, entrega algo (objeto direto: a carta) "a" alguém (objeto indireto: ao carteiro, regido por preposição).',
        difficulty: 'Médio'
      },
      {
        id: 'por-m-9',
        question: 'Qual é a figura de sintaxe presente em: "Comi dois pratos no almoço"?',
        options: ['Metonímia', 'Pleonasmo', 'Zeugma', 'Anáfora'],
        correctIndex: 0,
        explanation: 'Metonímia: troca do continente (o prato) pelo conteúdo (a comida que estava nele).',
        difficulty: 'Médio'
      },
      {
        id: 'por-m-10',
        question: 'Qual palavra deve ser grafada com "X" e não com "CH"?',
        options: ['Fle__a', 'En__ada', 'Boli__a', 'Me__a (de cabelo)'],
        correctIndex: 1,
        explanation: 'Após a sílaba inicial "en-", grafa-se com X: "enxada", "enxame", "enxugar" (com raras exceções como encher).',
        difficulty: 'Médio'
      }
    ],
    'Difícil': [
      {
        id: 'por-d-1',
        question: 'Qual das alternativas apresenta exemplo de anacoluto?',
        options: [
          'Os alunos, parecia que não queriam estudar.',
          'Eu, toda vez que entro em sala, sinto uma emoção indescritível.',
          'Essa juventude de hoje, nada a contenta.',
          'Choveu uma chuva fina e insistente durante a madrugada.'
        ],
        correctIndex: 2,
        explanation: 'No anacoluto há uma quebra proposital da estrutura sintática: "Essa juventude de hoje" fica solta sem função conectada ao restante da oração.',
        difficulty: 'Difícil'
      },
      {
        id: 'por-d-2',
        question: 'Em "Precisa-se de colaboradores experientes", qual é a função da partícula "se"?',
        options: ['Pronome apassivador', 'Índice de indeterminação do sujeito', 'Pronome reflexivo', 'Partícula de realce'],
        correctIndex: 1,
        explanation: 'Com verbo transitivo indireto ("precisar de"), a partícula "se" atua como índice de indeterminação do sujeito.',
        difficulty: 'Difícil'
      },
      {
        id: 'por-d-3',
        question: 'Assinale a alternativa com concordância nominal RIGOROSAMENTE CORRETA:',
        options: [
          'Seguem anexo as faturas solicitadas.',
          'A moça disse: muito obrigado.',
          'Ela estava meia cansada após a maratona.',
          'É necessária prudência na tomada de decisões.'
        ],
        correctIndex: 3,
        explanation: 'Com o sujeito "prudência" sem artigo antecedente, usa-se "prudência é necessária" ou "é necessário prudência"; com adjetivo concordando: "é necessária prudência" é aceito na norma erudita.',
        difficulty: 'Difícil'
      },
      {
        id: 'por-d-4',
        question: 'Qual movimento literário brasileiro teve início com a publicação de "Memórias Póstumas de Brás Cubas" (1881)?',
        options: ['Romantismo', 'Realismo', 'Modernismo', 'Parnasianismo'],
        correctIndex: 1,
        explanation: 'A obra-prima de Machado de Assis em 1881 inaugurou oficialmente a vertente do Realismo no Brasil.',
        difficulty: 'Difícil'
      },
      {
        id: 'por-d-5',
        question: 'Na oração "Não me parece justo que desistas agora", a oração destacada é:',
        options: [
          'Subordinada substantiva subjetiva',
          'Subordinada substantiva completiva nominal',
          'Subordinada substantiva objetiva direta',
          'Subordinada adjetiva explicativa'
        ],
        correctIndex: 0,
        explanation: 'A oração "que desistas agora" exerce a função de sujeito do verbo parecer ("Que desistas agora não me parece justo").',
        difficulty: 'Difícil'
      },
      {
        id: 'por-d-6',
        question: 'Qual dos seguintes versos exemplifica uma sinestesia?',
        options: [
          'Ouvi uma música suave e aveludada.',
          'O vento uivava furioso lá fora.',
          'Morri de rir com aquela comédia.',
          'O céu chorou lágrimas de chuva.'
        ],
        correctIndex: 0,
        explanation: 'Sinestesia é a fusão de diferentes sentidos humanos: "ouvi" (audição) com "aveludada" (tato).',
        difficulty: 'Difícil'
      },
      {
        id: 'por-d-7',
        question: 'Em relação ao valor aspectual do verbo, qual alternativa indica uma ação incoativa (início de ação)?',
        options: [
          'Ele começou a chorar copiosamente.',
          'Ela continuou correndo sem parar.',
          'Eles terminaram o trabalho.',
          'Costumo ler antes de dormir.'
        ],
        correctIndex: 0,
        explanation: 'O aspecto incoativo (ou inceptivo) marca o momento inicial da ação verbal ("começou a chorar").',
        difficulty: 'Difícil'
      },
      {
        id: 'por-d-8',
        question: 'Identifique o caso de colocação pronominal com próclise OBRIGATÓRIA segundo a norma gramatical padrão:',
        options: [
          'Em se tratando de estudos, ele é dedicado.',
          'Ele disse-me que viria amanhã.',
          'Tinha encontrado-o na biblioteca.',
          'Quero ver-te o mais rápido possível.'
        ],
        correctIndex: 0,
        explanation: 'A preposição "em" seguida de verbo no gerúndio atrai obrigatoriamente a próclise: "Em se tratando...".',
        difficulty: 'Difícil'
      },
      {
        id: 'por-d-9',
        question: 'Qual é o plural correto do substantivo composto "guarda-chuva"?',
        options: ['Guardas-chuvas', 'Guarda-chuvas', 'Guardas-chuva', 'Guarda-chuva'],
        correctIndex: 1,
        explanation: 'Verbo ("guarda") é invariável; apenas o substantivo ("chuva") varia para o plural: "guarda-chuvas".',
        difficulty: 'Difícil'
      },
      {
        id: 'por-d-10',
        question: 'O recurso discursivo de introduzir uma citação direta de autoridade em uma dissertação atende primordialmente a qual critério?',
        options: ['Coesão referencial', 'Argumentatividade e legitimidade', 'Intertextualidade paródica', 'Variação diatópica'],
        correctIndex: 1,
        explanation: 'O argumento de autoridade valida e confere legitimidade e força comprobatória à tese do autor.',
        difficulty: 'Difícil'
      }
    ]
  },
  historia: {
    'Fácil': [
      {
        id: 'his-f-1',
        question: 'Em que ano ocorreu a Proclamação da Independência do Brasil por Dom Pedro I?',
        options: ['1500', '1808', '1822', '1889'],
        correctIndex: 2,
        explanation: 'A independência foi proclamada às margens do riacho Ipiranga em 7 de setembro de 1822.',
        difficulty: 'Fácil'
      },
      {
        id: 'his-f-2',
        question: 'Qual princesa imperial assinou a Lei Áurea em 13 de maio de 1888, abolindo a escravidão no Brasil?',
        options: ['Princesa Isabel', 'Rainha Leopoldina', 'Princesa Maria', 'Marquesa de Santos'],
        correctIndex: 0,
        explanation: 'A Princesa Isabel, como regente do Império, assinou a Lei Áurea em 1888.',
        difficulty: 'Fácil'
      },
      {
        id: 'his-f-3',
        question: 'Qual foi o primeiro produto econômico explorado em larga escala pelos portugueses no Brasil colonial?',
        options: ['Café', 'Pau-Brasil', 'Cana-de-açúcar', 'Ouro'],
        correctIndex: 1,
        explanation: 'O Pau-Brasil foi explorado logo nos primeiros anos através de escambo com os povos indígenas.',
        difficulty: 'Fácil'
      },
      {
        id: 'his-f-4',
        question: 'Quem liderou a Proclamação da República no Brasil em 15 de novembro de 1889?',
        options: ['Getúlio Vargas', 'Marechal Deodoro da Fonseca', 'Juscelino Kubitschek', 'Tiradentes'],
        correctIndex: 1,
        explanation: 'O Marechal Deodoro da Fonseca liderou o movimento militar que instituiu a República.',
        difficulty: 'Fácil'
      },
      {
        id: 'his-f-5',
        question: 'Em qual país teve início a Revolução Industrial no século XVIII?',
        options: ['França', 'Inglaterra', 'Alemanha', 'Estados Unidos'],
        correctIndex: 1,
        explanation: 'A Inglaterra foi o berço da Revolução Industrial devido ao acúmulo de capital, carvão mineral e tear mecânico.',
        difficulty: 'Fácil'
      },
      {
        id: 'his-f-6',
        question: 'Qual presidente construiu e inaugurou Brasília em 1960?',
        options: ['Getúlio Vargas', 'Jânio Quadros', 'Juscelino Kubitschek (JK)', 'João Goulart'],
        correctIndex: 2,
        explanation: 'JK cumpriu seu plano de metas ("50 anos em 5") inaugurando a nova capital em 21 de abril de 1960.',
        difficulty: 'Fácil'
      },
      {
        id: 'his-f-7',
        question: 'Qual civilização antiga construiu as famosas Pirâmides de Gizé?',
        options: ['Egípcia', 'Grega', 'Romana', 'Mesopotâmica'],
        correctIndex: 0,
        explanation: 'A civilização do Antigo Egito ergueu as grandes pirâmides como tumbas para seus faraós.',
        difficulty: 'Fácil'
      },
      {
        id: 'his-f-8',
        question: 'Qual foi o marco que desencadeou o início da Primeira Guerra Mundial em 1914?',
        options: ['A queda da Bastilha', 'O assassinato do arquiduque Francisco Ferdinando', 'A invasão da Polônia', 'A crise de 1929'],
        correctIndex: 1,
        explanation: 'O atentado em Sarajevo contra o herdeiro do Império Austro-Húngaro ativou o sistema de alianças militares.',
        difficulty: 'Fácil'
      },
      {
        id: 'his-f-9',
        question: 'Como ficou conhecida a divisão geopolítica do mundo entre EUA e União Soviética após 1945?',
        options: ['Guerra dos Cem Anos', 'Guerra Fria', 'Paz Armada', 'Guerra dos Trinta Anos'],
        correctIndex: 1,
        explanation: 'A Guerra Fria caracterizou-se pela disputa ideológica, armamentista e espacial sem conflito bélico direto entre as superpotências.',
        difficulty: 'Fácil'
      },
      {
        id: 'his-f-10',
        question: 'Tiradentes foi o mártir de qual importante movimento de contestação colonial em Minas Gerais?',
        options: ['Revolta dos Alfaiates', 'Inconfidência Mineira', 'Guerra dos Farrapos', 'Cabanagem'],
        correctIndex: 1,
        explanation: 'Joaquim José da Silva Xavier (Tiradentes) foi membro e símbolo da Inconfidência Mineira (1789).',
        difficulty: 'Fácil'
      }
    ],
    'Médio': [
      {
        id: 'his-m-1',
        question: 'Qual era a principal característica da política do "Café com Leite" na República Velha brasileira?',
        options: [
          'Alternância de poder político entre as oligarquias rurais de São Paulo e Minas Gerais.',
          'Subsídio governamental exclusivo para a produção leiteira do Sul.',
          'Aliança entre operários da indústria e fazendeiros do Nordeste.',
          'Monopólio estatal da exportação de commodities para a Europa.'
        ],
        correctIndex: 0,
        explanation: 'São Paulo (café) e Minas Gerais (leite e café) dominavam as eleições federais com apoio das oligarquias locais.',
        difficulty: 'Médio'
      },
      {
        id: 'his-m-2',
        question: 'O Tratado de Tordesilhas (1494) foi um acordo pioneiro de partilha do Novo Mundo entre quais nações?',
        options: ['Espanha e Inglaterra', 'Portugal e Espanha', 'França e Portugal', 'Holanda e Espanha'],
        correctIndex: 1,
        explanation: 'Portugal e Espanha dividiram as terras descobertas a partir de uma linha imaginária a 370 léguas a oeste de Cabo Verde.',
        difficulty: 'Médio'
      },
      {
        id: 'his-m-3',
        question: 'O que foi a "Noite dos Cristais" (Kristallnacht) em 1938 na Alemanha nazista?',
        options: [
          'Um pacto secreto de não agressão com a União Soviética.',
          'Um ataque orquestrado pelo Estado contra propriedades, sinagogas e cidadãos judeus.',
          'O julgamento dos líderes militares no pós-guerra.',
          'A vitória dos aliados na Batalha de Stalingrado.'
        ],
        correctIndex: 1,
        explanation: 'Foi um massacre antissemita violento em novembro de 1938, marcando a escalada do Holocausto nazista.',
        difficulty: 'Médio'
      },
      {
        id: 'his-m-4',
        question: 'Qual foi o principal objetivo das reformas iluministas conhecidas como "Reformas Pombalinas" no Brasil colonial?',
        options: [
          'Aumentar a arrecadação tributária da Coroa portuguesa e expulsar a Companhia de Jesus (Jesuítas).',
          'Declarar a independência imediata das capitanias do norte.',
          'Substituir a mão de obra escrava por operários assalariados europeus.',
          'Entregar o monopólio do comércio para os ingleses.'
        ],
        correctIndex: 0,
        explanation: 'O Marquês de Pombal modernizou a burocracia, expulsou os jesuítas e ampliou o controle fiscal sobre o ouro colonial.',
        difficulty: 'Médio'
      },
      {
        id: 'his-m-5',
        question: 'O que caracterizou o período da "Guerra da Tríplice Aliança" (Guerra do Paraguai) entre 1864 e 1870?',
        options: [
          'A aliança entre Brasil, Argentina e Uruguai contra o Paraguai de Solano López.',
          'A disputa entre Portugal e Espanha pela foz do Rio da Prata.',
          'A invasão holandesa no litoral de Pernambuco.',
          'O conflito territorial entre Brasil e Bolívia pelo estado do Acre.'
        ],
        correctIndex: 0,
        explanation: 'Brasil, Argentina e Uruguai uniram-se após a invasão paraguaia a territórios vizinhos.',
        difficulty: 'Médio'
      },
      {
        id: 'his-m-6',
        question: 'A Queda do Muro de Berlim em novembro de 1989 simbolizou historicamente:',
        options: [
          'O colapso da influência soviética no Leste Europeu e a reunificação alemã.',
          'O início da Segunda Guerra Mundial.',
          'A criação da OTAN.',
          'O início da corrida armamentista nuclear.'
        ],
        correctIndex: 0,
        explanation: 'A queda do muro marcou o encerramento prático da Guerra Fria e abriu caminho para a reunificação da Alemanha.',
        difficulty: 'Médio'
      },
      {
        id: 'his-m-7',
        question: 'Qual revolta popular do início da República no Rio de Janeiro (1904) foi motivada pela imunização obrigatória contra a varíola?',
        options: ['Revolta da Chibata', 'Revolta da Armada', 'Revolta da Vacina', 'Guerra de Canudos'],
        correctIndex: 2,
        explanation: 'A Revolta da Vacina foi liderada pela insatisfação popular com as reformas urbanas de Pereira Passos e a vacinação imposta por Oswaldo Cruz.',
        difficulty: 'Médio'
      },
      {
        id: 'his-m-8',
        question: 'Qual civilização pré-colombiana habitava a região andina do atual Peru quando os espanhóis chegaram?',
        options: ['Astecas', 'Maias', 'Incas', 'Olmecas'],
        correctIndex: 2,
        explanation: 'O Império Inca dominava a cordilheira dos Andes com centro administrativo na cidade sagrada de Cusco.',
        difficulty: 'Médio'
      },
      {
        id: 'his-m-9',
        question: 'Em 1932, a Revolução Constitucionalista eclodiu em São Paulo com o objetivo de:',
        options: [
          'Exigir a convocação de uma Assembleia Constituinte e o fim do governo provisório de Getúlio Vargas.',
          'Apoiar a volta da Monarquia ao Brasil.',
          'Defender a aliança do Brasil com os países do Eixo.',
          'Transferir a capital federal para Santos.'
        ],
        correctIndex: 0,
        explanation: 'A elite paulista rebelou-se contra a centralização do poder nas mãos de Vargas após a Revolução de 1930.',
        difficulty: 'Médio'
      },
      {
        id: 'his-m-10',
        question: 'Qual filósofo iluminista francês defendeu a divisão dos poderes do Estado em Executivo, Legislativo e Judiciário em "O Espírito das Leis"?',
        options: ['Voltaire', 'Rousseau', 'Montesquieu', 'John Locke'],
        correctIndex: 2,
        explanation: 'Barão de Montesquieu formulou a teoria da tripartição tripartite dos poderes para conter o absolutismo.',
        difficulty: 'Médio'
      }
    ],
    'Difícil': [
      {
        id: 'his-d-1',
        question: 'O Ato Institucional Número Cinco (AI-5), decretado em dezembro de 1968 durante a Ditadura Militar brasileira, determinou:',
        options: [
          'A anistia ampla, geral e irrestrita a todos os presos políticos.',
          'O fechamento do Congresso, suspensão do habeas corpus para crimes políticos e censura prévia generalizada.',
          'A convocação imediata de eleições diretas para presidente.',
          'A instituição do voto impresso e facultativo.'
        ],
        correctIndex: 1,
        explanation: 'O AI-5 marcou o início dos chamados "anos de chumbo", conferindo poderes quase ilimitados ao Executivo federal.',
        difficulty: 'Difícil'
      },
      {
        id: 'his-d-2',
        question: 'Qual tratado diplomático encerrou formalmente a Guerra dos Trinta Anos em 1648, estabelecendo a base da soberania estatal europeia?',
        options: ['Paz de Vestfália', 'Tratado de Versalhes', 'Tratado de Utrecht', 'Congresso de Viena'],
        correctIndex: 0,
        explanation: 'A Paz de Vestfália (1648) inaugurou o princípio da soberania nacional e não intervenção em assuntos territoriais internos.',
        difficulty: 'Difícil'
      },
      {
        id: 'his-d-3',
        question: 'A "Revolta dos Malês", ocorrida em Salvador em 1835, foi singular por ser protagonizada por:',
        options: [
          'Soldados descontentes com o atraso no pagamento do soldo.',
          'Africanos escravizados e libertos de religião islâmica letrados em árabe.',
          'Cafeicultores que exigiam isenção de impostos alfandegários.',
          'Imigrantes italianos descontentes com o trabalho nos cafezais.'
        ],
        correctIndex: 1,
        explanation: 'Os malês eram negros de fé muçulmana (iorubás e hauçás) que usavam a escrita árabe para organizar levantes pela liberdade.',
        difficulty: 'Difícil'
      },
      {
        id: 'his-d-4',
        question: 'Durante o processo de descolonização afro-asiática, qual conferência internacional realizada em 1955 consolidou o Movimento dos Países Não Alinhados?',
        options: ['Conferência de Bandung', 'Conferência de Yalta', 'Conferência de Potsdam', 'Conferência de Berlim'],
        correctIndex: 0,
        explanation: 'A Conferência de Bandung (Indonésia, 1955) uniu nações do Terceiro Mundo contra o colonialismo e fora da órbita exclusiva de EUA ou URSS.',
        difficulty: 'Difícil'
      },
      {
        id: 'his-d-5',
        question: 'A política econômica do "Encilhamento", promovida por Rui Barbosa nos primeiros anos da República, resultou em:',
        options: [
          'Estabilidade monetária sem precedentes e superávit comercial.',
          'Crise inflacionária severa e especulação na Bolsa de Valores devido à emissão desordenada de crédito e papel-moeda.',
          'Adoção do padrão-ouro rigoroso.',
          'Nacionalização total de todos os bancos estrangeiros.'
        ],
        correctIndex: 1,
        explanation: 'A emissão descontrolada de moeda criou empresas fantasmas, bolhas financeiras e desvalorização cambial aguda.',
        difficulty: 'Difícil'
      },
      {
        id: 'his-d-6',
        question: 'O Tratado de Methuen (1703), celebrado entre Portugal e Inglaterra, também era conhecido como:',
        options: ['Tratado de Madri', 'Tratado dos Panos e Vinhos', 'Tratado de Badajós', 'Tratado de Santo Ildefonso'],
        correctIndex: 1,
        explanation: 'A Inglaterra comprava vinhos portugueses com tarifas reduzidas em troca da importação monopolista de tecidos ingleses, drenando ouro colonial para Londres.',
        difficulty: 'Difícil'
      },
      {
        id: 'his-d-7',
        question: 'Na Revolução Russa de 1917, qual era a principal divergência entre mencheviques e bolcheviques?',
        options: [
          'Os mencheviques defendiam uma transição democrático-burguesa gradual; os bolcheviques exigiam revolução armada imediata e ditadura do proletariado.',
          'Os mencheviques apoiavam o czar Nicolau II; os bolcheviques queriam a aliança com a nobreza.',
          'Os bolcheviques queriam manter a Rússia na Primeira Guerra Mundial.',
          'Os mencheviques eram anarquistas puros.'
        ],
        correctIndex: 0,
        explanation: 'Liderados por Lênin, os bolcheviques pregavam "Pão, Paz e Terra" através da tomada revolucionária dos sovietes.',
        difficulty: 'Difícil'
      },
      {
        id: 'his-d-8',
        question: 'O "Compromisso de Washington" e a construção da Companhia Siderúrgica Nacional (CSN) durante a Era Vargas foram viabilizados por meio de:',
        options: [
          'Apoio financeiro e tecnológico dos Estados Unidos em troca da participação militar do Brasil ao lado dos Aliados na 2ª Guerra Mundial.',
          'Empréstimos concedidos exclusivamente pelo governo italiano fascista.',
          'Arrecadação de tributos sobre as fazendas de borracha na Amazônia.',
          'Venda das colônias portuguesas no continente africano.'
        ],
        correctIndex: 0,
        explanation: 'Vargas negociou habilmente com Roosevelt a base militar de Natal e o envio da FEB em troca do financiamento da CSN em Volta Redonda.',
        difficulty: 'Difícil'
      },
      {
        id: 'his-d-9',
        question: 'Qual foi o principal fator catalisador da Crise dos Mísseis de Cuba em outubro de 1962?',
        options: [
          'A instalação clandestina de mísseis nucleares soviéticos em solo cubano a poucos quilômetros dos EUA.',
          'A invasão da Baía de Guanabara por frotas inglesas.',
          'A eleição de Fidel Castro como presidente da OEA.',
          'O bombardeio de Hiroshima pelos norte-americanos.'
        ],
        correctIndex: 0,
        explanation: 'O confronto quase deflagrou a 3ª Guerra Mundial nuclear entre John F. Kennedy e Nikita Kruschev.',
        difficulty: 'Difícil'
      },
      {
        id: 'his-d-10',
        question: 'A "Guerra das Barricadas" na França de maio de 1968 começou como um movimento essencialmente:',
        options: [
          'Estudantil e universitário de contestação aos costumes conservadores e à burocracia estatal.',
          'Militar de extrema-direita para restaurar a monarquia dos Bourbons.',
          'Campesino que exigia a coletivização forçada das vinícolas.',
          'Religioso liderado pelo Papa em Roma.'
        ],
        correctIndex: 0,
        explanation: 'Estudantes da Universidade de Nanterre e Paris paralisaram o país com apoio de sindicatos sob lemas como "É proibido proibir".',
        difficulty: 'Difícil'
      }
    ]
  },
  geografia: {
    'Fácil': [
      {
        id: 'geo-f-1',
        question: 'Qual é o maior país em extensão territorial da América do Sul?',
        options: ['Argentina', 'Brasil', 'Colômbia', 'Peru'],
        correctIndex: 1,
        explanation: 'O Brasil é o maior país da América do Sul, com mais de 8,5 milhões de km².',
        difficulty: 'Fácil'
      },
      {
        id: 'geo-f-2',
        question: 'Qual linha imaginária divide a Terra nos Hemisférios Norte e Sul?',
        options: ['Meridiano de Greenwich', 'Trópico de Câncer', 'Linha do Equador', 'Trópico de Capricórnio'],
        correctIndex: 2,
        explanation: 'A Linha do Equador (latitude 0°) divide o globo em Hemisfério Setentrional (Norte) e Meridional (Sul).',
        difficulty: 'Fácil'
      },
      {
        id: 'geo-f-3',
        question: 'Qual é o maior oceano do planeta Terra?',
        options: ['Atlântico', 'Índico', 'Pacífico', 'Ártico'],
        correctIndex: 2,
        explanation: 'O Oceano Pacífico é o maior e mais profundo corpo de água da Terra.',
        difficulty: 'Fácil'
      },
      {
        id: 'geo-f-4',
        question: 'Em qual região brasileira fica localizado o Pantanal?',
        options: ['Sul', 'Nordeste', 'Centro-Oeste', 'Sudeste'],
        correctIndex: 2,
        explanation: 'O Pantanal está localizado nos estados do Mato Grosso e Mato Grosso do Sul (Centro-Oeste).',
        difficulty: 'Fácil'
      },
      {
        id: 'geo-f-5',
        question: 'Qual movimento da Terra é responsável pela sucessão dos dias e das noites?',
        options: ['Translação', 'Rotação', 'Nutação', 'Precessão'],
        correctIndex: 1,
        explanation: 'A rotação é o giro da Terra em torno de seu próprio eixo, durando aproximadamente 24 horas.',
        difficulty: 'Fácil'
      },
      {
        id: 'geo-f-6',
        question: 'Qual é a capital federal do Brasil?',
        options: ['Rio de Janeiro', 'São Paulo', 'Brasília', 'Salvador'],
        correctIndex: 2,
        explanation: 'Brasília é a capital federal do Brasil desde sua inauguração em 1960.',
        difficulty: 'Fácil'
      },
      {
        id: 'geo-f-7',
        question: 'O deslocamento de pessoas da zona rural para a zona urbana é chamado de:',
        options: ['Êxodo rural', 'Transumância', 'Nomadismo', 'Migração pendular'],
        correctIndex: 0,
        explanation: 'Êxodo rural é a migração definitiva de trabalhadores do campo para os centros urbanos.',
        difficulty: 'Fácil'
      },
      {
        id: 'geo-f-8',
        question: 'Qual é o bioma caracterizado por árvores de casca grossa e galhos retorcidos, conhecido como a "savana brasileira"?',
        options: ['Pampa', 'Mata Atlântica', 'Cerrado', 'Caatinga'],
        correctIndex: 2,
        explanation: 'O Cerrado é a savana mais biodiversa do mundo, com vegetação adaptada a solos ácidos e períodos secos.',
        difficulty: 'Fácil'
      },
      {
        id: 'geo-f-9',
        question: 'Quantos estados compõem a República Federativa do Brasil (além do Distrito Federal)?',
        options: ['24', '25', '26', '27'],
        correctIndex: 2,
        explanation: 'O Brasil é formado por 26 estados e 1 Distrito Federal (totalizando 27 unidades federativas).',
        difficulty: 'Fácil'
      },
      {
        id: 'geo-f-10',
        question: 'Qual instrumento clássico de orientação utiliza uma agulha imantada apontando para o Norte Magnético?',
        options: ['Barômetro', 'Bússola', 'Termômetro', 'Pluviômetro'],
        correctIndex: 1,
        explanation: 'A bússola possui agulha magnética que se alinha com as linhas do campo magnético terrestre.',
        difficulty: 'Fácil'
      }
    ],
    'Médio': [
      {
        id: 'geo-m-1',
        question: 'O fenômeno climático de aquecimento anormal das águas superficiais do Oceano Pacífico Equatorial é denominado:',
        options: ['La Niña', 'El Niño', 'Monções', 'Ciclone extratropical'],
        correctIndex: 1,
        explanation: 'El Niño altera os padrões de vento e chuvas no planeta inteiro, provocando secas e chuvas intensas conforme a região.',
        difficulty: 'Médio'
      },
      {
        id: 'geo-m-2',
        question: 'Qual é a escala cartográfica que representa maior riqueza de detalhes em uma representação gráfica?',
        options: ['1:10.000', '1:100.000', '1:1.000.000', '1:5.000.000'],
        correctIndex: 0,
        explanation: 'Quanto menor o denominador da fração (ex: 1:10.000), maior é a escala e mais detalhes podem ser representados.',
        difficulty: 'Médio'
      },
      {
        id: 'geo-m-3',
        question: 'A união física e funcional de duas ou mais cidades vizinhas devido ao seu crescimento urbano desordenado chama-se:',
        options: ['Gentrificação', 'Conurbação', 'Metropolização reversa', 'Segregação socioespacial'],
        correctIndex: 1,
        explanation: 'Conurbação ocorre quando os limites de municípios confluem gerando uma única malha urbana contínua.',
        difficulty: 'Médio'
      },
      {
        id: 'geo-m-4',
        question: 'Qual camada da atmosfera concentra a maior parte do gás ozônio que filtra a radiação ultravioleta prejudicial?',
        options: ['Troposfera', 'Estratopausa', 'Estratosfera', 'Termosfera'],
        correctIndex: 2,
        explanation: 'A camada de ozônio fica situada na Estratosfera (entre 15 km e 35 km de altitude).',
        difficulty: 'Médio'
      },
      {
        id: 'geo-m-5',
        question: 'Qual é o tipo de relevo predominante no território brasileiro, segundo a classificação clássica de Jurandyr Ross?',
        options: ['Montanhas de dobramentos modernos', 'Planaltos, depressões e planícies', 'Vulcões ativos', 'Cânions glaciais'],
        correctIndex: 1,
        explanation: 'O Brasil não possui dobramentos modernos ativos, predominando estruturas desgastadas: planaltos, depressões e planícies.',
        difficulty: 'Médio'
      },
      {
        id: 'geo-m-6',
        question: 'A transição demográfica em que a taxa de mortalidade cai rapidamente seguida pela queda gradual da taxa de natalidade gera:',
        options: [
          'Encolhimento imediato da população jovem.',
          'Bônus demográfico com aumento temporário da População Economicamente Ativa (PEA).',
          'Aumento repentino da taxa de fecundidade.',
          'Desaparecimento do êxodo urbano.'
        ],
        correctIndex: 1,
        explanation: 'A fase de bônus ou janela demográfica ocorre quando há maior proporção de adultos em idade de trabalhar.',
        difficulty: 'Médio'
      },
      {
        id: 'geo-m-7',
        question: 'Qual país lidera o bloco econômico do Mercosul juntamente com o Brasil?',
        options: ['Chile', 'Argentina', 'Peru', 'México'],
        correctIndex: 1,
        explanation: 'Brasil e Argentina foram os fundadores e maiores economias integrantes do Mercado Comum do Sul.',
        difficulty: 'Médio'
      },
      {
        id: 'geo-m-8',
        question: 'O conceito de "Pegada Ecológica" avalia:',
        options: [
          'A quantidade de recursos naturais necessária para sustentar o estilo de vida e consumo de uma população.',
          'O número de sapatos produzidos por habitante ao ano.',
          'A profundidade das crateras lunares.',
          'O mapeamento de florestas artificiais de eucalipto.'
        ],
        correctIndex: 0,
        explanation: 'Mede o impacto do consumo humano sobre a capacidade de regeneração da biosfera terrestre.',
        difficulty: 'Médio'
      },
      {
        id: 'geo-m-9',
        question: 'Qual o principal fator gerador de terremotos e tsunamis no Círculo de Fogo do Pacífico?',
        options: [
          'O movimento e choque das placas tectônicas nas zonas de subducção.',
          'A atração gravitacional da Lua durante o eclipse.',
          'As correntes marítimas frias que cruzam os polos.',
          'A erosão eólica no topo das cordilheiras.'
        ],
        correctIndex: 0,
        explanation: 'O encontro convergente de placas tectônicas libera tensão acumulada em forma de sismos de grande magnitude.',
        difficulty: 'Médio'
      },
      {
        id: 'geo-m-10',
        question: 'O Aquífero Guarani é um gigantesco reservatório subterrâneo de água doce localizado primordialmente sob a bacia do:',
        options: ['Rio Amazonas', 'Rio São Francisco', 'Rio Paraná / Prata', 'Rio Tocantins'],
        correctIndex: 2,
        explanation: 'O Aquífero Guarani estende-se por Brasil, Argentina, Paraguai e Uruguai na bacia sedimentar do Paraná.',
        difficulty: 'Médio'
      }
    ],
    'Difícil': [
      {
        id: 'geo-d-1',
        question: 'Qual projeção cartográfica cilíndrica preserva as formas exatas dos continentes, mas distorce fortemente as áreas nas altas latitudes (eurocêntrica)?',
        options: ['Projeção de Peters', 'Projeção de Mercator', 'Projeção de Robinson', 'Projeção Cônica de Lambert'],
        correctIndex: 1,
        explanation: 'Mercator (conforme) preserva os ângulos de navegação, ampliando desproporcionalmente a Groenlândia e a Europa.',
        difficulty: 'Difícil'
      },
      {
        id: 'geo-d-2',
        question: 'A teoria do "Espaço Vital" (Lebensraum), formulada por Friedrich Ratzel, serviu de base ideológica para qual projeto geopolítico expansionista?',
        options: ['Imperialismo britânico na Índia', 'Expansionismo territorial e militar nazista', 'Doutrina Monroe nos EUA', 'Pacto de Varsóvia'],
        correctIndex: 1,
        explanation: 'A geopolítica alemã deturpou o conceito ecológico de Ratzel para justificar a invasão e anexação de terras vizinhas.',
        difficulty: 'Difícil'
      },
      {
        id: 'geo-d-3',
        question: 'O processo de lixiviação e laterização nos solos de climas tropicais quentes e úmidos consiste em:',
        options: [
          'Lavagem de nutrientes solúveis pela água da chuva, acumulando óxidos de ferro e alumínio que formam crostas duras.',
          'Congelamento permanente da camada orgânica superficial.',
          'Depósito de areia branca sem oxigênio.',
          'Acúmulo de matéria orgânica não decomposta por baixas temperaturas.'
        ],
        correctIndex: 0,
        explanation: 'A percolação intensa da chuva remove sais minerais, deixando o solo enriquecido em ferro (laterita avermelhada).',
        difficulty: 'Difícil'
      },
      {
        id: 'geo-d-4',
        question: 'Qual é a principal característica da Zona de Convergência Intertropical (ZCIT)?',
        options: [
          'Encontro dos ventos alísios de nordeste e sudeste, gerando baixa pressão e fortes chuvas equatoriais.',
          'Faixa de alta pressão polar com ventos secos descendentes.',
          'Corrente marítima subterrânea do oceano Índico.',
          'Área de calmaria subtropical onde ocorrem os grandes desertos.'
        ],
        correctIndex: 0,
        explanation: 'A ZCIT oscila sazonalmente e comanda os regimes de chuvas no norte e semiárido do Nordeste brasileiro.',
        difficulty: 'Difícil'
      },
      {
        id: 'geo-d-5',
        question: 'O modelo de agronegócio da "Fronteira Agrícola" brasileira (Matopiba) abrange áreas de Cerrado localizadas nos estados de:',
        options: [
          'Maranhão, Tocantins, Piauí e Bahia',
          'Mato Grosso, Paraná, Rio Grande do Sul e Santa Catarina',
          'Minas Gerais, Acre, Tocantins e Pará',
          'Mato Grosso do Sul, Rondônia, Amazonas e Amapá'
        ],
        correctIndex: 0,
        explanation: 'Matopiba é o acrônimo para Maranhão, Tocantins, Piauí e Bahia, grande polo de grãos e mecanização.',
        difficulty: 'Difícil'
      },
      {
        id: 'geo-d-6',
        question: 'A curva de transição demográfica de 5º estágio, já vivenciada por países como Japão e Itália, é caracterizada por:',
        options: [
          'Taxa de mortalidade superior à taxa de natalidade, resultando em crescimento vegetativo negativo e envelhecimento populacional acentuado.',
          'Explosão demográfica juvenil descontrolada.',
          'Equilíbrio entre famílias com mais de 5 filhos.',
          'Duplicação da taxa de fecundidade a cada década.'
        ],
        correctIndex: 0,
        explanation: 'No 5º estágio a fecundidade fica muito abaixo da taxa de reposição (2,1 filhos por mulher), reduzindo o contingente populacional.',
        difficulty: 'Difícil'
      },
      {
        id: 'geo-d-7',
        question: 'O "Efeito Coriolis", decorrente do movimento de rotação terrestre, provoca o desvio aparente das massas de ar e água:',
        options: [
          'Para a direita no Hemisfério Norte e para a esquerda no Hemisfério Sul.',
          'Para o oeste em ambos os hemisférios igualmente.',
          'Exclusivamente em direção ao centro da Terra.',
          'Para cima na Linha do Equador.'
        ],
        correctIndex: 0,
        explanation: 'A aceleração de Coriolis desvia ventos e correntes marítimas no sentido horário no norte e anti-horário no sul.',
        difficulty: 'Difícil'
      },
      {
        id: 'geo-d-8',
        question: 'O estreito de Malaca e o estreito de Ormuz são considerados "chokepoints" geopolíticos globais estratégicos porque:',
        options: [
          'Canalizam rotas vitais do comércio marítimo global de petróleo e manufaturados.',
          'São as únicas áreas com proibição de tráfego de submarinos.',
          'Não possuem profundidade suficiente para navios cargueiros.',
          'Ficam sob controle militar exclusivo da ONU.'
        ],
        correctIndex: 0,
        explanation: 'Pontos de estrangulamento geográfico vulneráveis a bloqueios que transportam grande fatia da energia e mercadorias do mundo.',
        difficulty: 'Difícil'
      },
      {
        id: 'geo-d-9',
        question: 'O processo geológico de obducção ocorre quando:',
        options: [
          'Uma fatia da crosta oceânica é empurrada por cima da crosta continental em uma colisão orogenética.',
          'Duas placas se afastam formando uma dorsal submarina.',
          'Um bloco continental afunda verticalmente no manto sem atrito.',
          'Geleiras se desprendem e desgastam o litoral.'
        ],
        correctIndex: 0,
        explanation: 'Diferente da subducção (onde a placa mergulha), na obducção a crosta oceânica e ofiolitos são cavalgados sobre a placa continental.',
        difficulty: 'Difícil'
      },
      {
        id: 'geo-d-10',
        question: 'O Índice de Desenvolvimento Humano (IDH) foi concebido em 1990 pelos economistas Mahbub ul Haq e Amartya Sen com base em quais 3 dimensões fundamentais?',
        options: [
          'Longevidade (saúde), Educação (escolaridade) e Renda per capita (PIB/PPC).',
          'Inflação, Taxa de desemprego e Balança comercial.',
          'Acesso à internet, Número de smartphones e Consumo de energia elétrica.',
          'Gasto militar, Tamanho do exército e Número de indústrias de base.'
        ],
        correctIndex: 0,
        explanation: 'O IDH mede a qualidade de vida a partir da expectativa de vida ao nascer, escolaridade média e renda nacional bruta per capita.',
        difficulty: 'Difícil'
      }
    ]
  },
  ciencias: {
    'Fácil': [
      {
        id: 'cie-f-1',
        question: 'Qual é o gás que os seres humanos e outros animais absorvem do ar para a respiração celular?',
        options: ['Nitrogênio', 'Oxigênio', 'Gás carbônico', 'Hélio'],
        correctIndex: 1,
        explanation: 'O oxigênio (O₂) é fundamental para as células realizarem a respiração celular e gerarem energia (ATP).',
        difficulty: 'Fácil'
      },
      {
        id: 'cie-f-2',
        question: 'Qual é a fórmula química da água?',
        options: ['CO₂', 'H₂O', 'NaCl', 'O₂'],
        correctIndex: 1,
        explanation: 'A molécula de água é composta por dois átomos de hidrogênio e um de oxigênio: H₂O.',
        difficulty: 'Fácil'
      },
      {
        id: 'cie-f-3',
        question: 'Qual órgão do corpo humano é responsável por bombear o sangue para todos os tecidos?',
        options: ['Pulmão', 'Coração', 'Fígado', 'Estômago'],
        correctIndex: 1,
        explanation: 'O coração é o músculo oco que atua como bomba propulsora do sistema cardiovascular.',
        difficulty: 'Fácil'
      },
      {
        id: 'cie-f-4',
        question: 'Qual estado físico da matéria tem forma e volume bem definidos?',
        options: ['Líquido', 'Gasoso', 'Sólido', 'Plasma'],
        correctIndex: 2,
        explanation: 'No estado sólido, as partículas estão fortemente ligadas em arranjo compacto, garantindo forma e volume próprios.',
        difficulty: 'Fácil'
      },
      {
        id: 'cie-f-5',
        question: 'Qual estrela é o centro do nosso Sistema Solar?',
        options: ['Lua', 'Sol', 'Júpiter', 'Alfa Centauri'],
        correctIndex: 1,
        explanation: 'O Sol é a estrela central em torno da qual orbitam a Terra e os demais corpos do sistema solar.',
        difficulty: 'Fácil'
      },
      {
        id: 'cie-f-6',
        question: 'Animais que se alimentam exclusivamente de vegetais e plantas são chamados de:',
        options: ['Carnívoros', 'Herbívoros', 'Onívoros', 'Detritívoros'],
        correctIndex: 1,
        explanation: 'Herbívoros alimentam-se unicamente de produtores vegetais (folhas, frutos, sementes).',
        difficulty: 'Fácil'
      },
      {
        id: 'cie-f-7',
        question: 'Qual é a unidade de medida padrão da temperatura no Brasil e no cotidiano?',
        options: ['Kelvin', 'Graus Fahrenheit', 'Graus Celsius', 'Joule'],
        correctIndex: 2,
        explanation: 'No Brasil e no Sistema Internacional prático cotidiano, a escala Celsius (°C) é a mais comum.',
        difficulty: 'Fácil'
      },
      {
        id: 'cie-f-8',
        question: 'Como se chama o esqueleto de sustentação do corpo humano formado por ossos?',
        options: ['Sistema nervoso', 'Sistema esquelético', 'Sistema digestório', 'Sistema linfático'],
        correctIndex: 1,
        explanation: 'O sistema esquelético humano é composto por 206 ossos que fornecem sustentação e proteção aos órgãos vitais.',
        difficulty: 'Fácil'
      },
      {
        id: 'cie-f-9',
        question: 'Qual elemento químico tem o símbolo "Fe" na Tabela Periódica?',
        options: ['Fósforo', 'Ferro', 'Flúor', 'Frâncio'],
        correctIndex: 1,
        explanation: '"Fe" vem do latim "Ferrum", representando o elemento metálico Ferro.',
        difficulty: 'Fácil'
      },
      {
        id: 'cie-f-10',
        question: 'A passagem da água do estado líquido para o estado gasoso pelo calor é chamada de:',
        options: ['Solidificação', 'Fusão', 'Evaporação / Vaporização', 'Condensação'],
        correctIndex: 2,
        explanation: 'Vaporização ou evaporação é a transformação de líquido para gás com o aumento de energia térmica.',
        difficulty: 'Fácil'
      }
    ],
    'Médio': [
      {
        id: 'cie-m-1',
        question: 'De acordo com a Primeira Lei de Newton (Lei da Inércia):',
        options: [
          'Um corpo em repouso ou em movimento retilíneo uniforme permanece nesse estado a menos que uma força resultante atue sobre ele.',
          'A toda ação corresponde uma reação de mesma direção e sentido oposto.',
          'A força é inversamente proporcional à massa de um corpo.',
          'Dois corpos nunca se atraem gravitações.'
        ],
        correctIndex: 0,
        explanation: 'A inércia é a tendência dos corpos de resistir a mudanças em seu estado de movimento.',
        difficulty: 'Médio'
      },
      {
        id: 'cie-m-2',
        question: 'Qual é o valor do pH de uma solução considerada neutra a 25°C?',
        options: ['0', '7', '10', '14'],
        correctIndex: 1,
        explanation: 'A 25°C, pH = 7 é neutro (como água pura); pH < 7 é ácido e pH > 7 é básico.',
        difficulty: 'Médio'
      },
      {
        id: 'cie-m-3',
        question: 'Qual molécula é a principal transportadora e armazenadora de energia química imediata nas células vivas?',
        options: ['DNA', 'ATP (Trifosfato de Adenosina)', 'Hemoglobina', 'Glicogênio'],
        correctIndex: 1,
        explanation: 'O ATP armazena energia nas suas ligações fosfato de alta energia, fornecendo combustível para as reações celulares.',
        difficulty: 'Médio'
      },
      {
        id: 'cie-m-4',
        question: 'Qual é a velocidade da luz no vácuo em valor aproximado?',
        options: ['300.000 m/s', '300.000 km/s', '3.000 km/s', '30.000 km/h'],
        correctIndex: 1,
        explanation: 'A velocidade da luz no vácuo (c) é aproximadamente 300.000 km/s (3 × 10⁸ m/s).',
        difficulty: 'Médio'
      },
      {
        id: 'cie-m-5',
        question: 'Em um circuito elétrico simples, se a tensão for 12 V e a resistência for 3 Ω, qual será a corrente elétrica (Lei de Ohm: V = R × I)?',
        options: ['2 A', '4 A', '9 A', '36 A'],
        correctIndex: 1,
        explanation: 'Pela 1ª Lei de Ohm: I = V / R = 12 / 3 = 4 Amperes.',
        difficulty: 'Médio'
      },
      {
        id: 'cie-m-6',
        question: 'Qual organela celular é responsável pela síntese de proteínas nas células eucarióticas e procarióticas?',
        options: ['Lisossomo', 'Ribossomo', 'Centríolo', 'Vacúolo'],
        correctIndex: 1,
        explanation: 'Os ribossomos traduzem o código do RNA mensageiro em cadeias de aminoácidos para formar proteínas.',
        difficulty: 'Médio'
      },
      {
        id: 'cie-m-7',
        question: 'Qual é a função das hemácias (glóbulos vermelhos) no sangue?',
        options: [
          'Combater vírus e bactérias por fagocitose.',
          'Transportar oxigênio dos pulmões para os tecidos através da hemoglobina.',
          'Promover a coagulação em caso de ferimentos.',
          'Produzir anticorpos específicos.'
        ],
        correctIndex: 1,
        explanation: 'As hemácias contêm hemoglobina rica em ferro, essencial para carregar o oxigênio até as células.',
        difficulty: 'Médio'
      },
      {
        id: 'cie-m-8',
        question: 'Qual tipo de ligação química ocorre entre íons com transferência definitiva de elétrons (ex: NaCl)?',
        options: ['Ligação covalente apolar', 'Ligação iônica', 'Ligação metálica', 'Ponte de hidrogênio'],
        correctIndex: 1,
        explanation: 'A ligação iônica decorre da atração eletrostática entre cátions (metais) e ânions (não metais) após doação/recebimento de elétrons.',
        difficulty: 'Médio'
      },
      {
        id: 'cie-m-9',
        question: 'O fenômeno ondulatório no qual a onda desvia sua trajetória ao contornar um obstáculo ou fenda é chamado de:',
        options: ['Refração', 'Difração', 'Polarização', 'Ressonância'],
        correctIndex: 1,
        explanation: 'A difração é a capacidade da onda de se espalhar ao contornar bordas ou passar por fendas de tamanho comparável ao seu comprimento de onda.',
        difficulty: 'Médio'
      },
      {
        id: 'cie-m-10',
        question: 'O cruzamento entre dois indivíduos heterozigotos para uma característica com dominância completa (Aa × Aa) gera qual proporção fenotípica esperada?',
        options: ['1:1', '3 dominantes para 1 recessivo', '1:2:1', '9:3:3:1'],
        correctIndex: 1,
        explanation: '1ª Lei de Mendel: o genótipo é 1 AA : 2 Aa : 1 aa, o que resulta no fenótipo de 3 dominantes (AA e Aa) para 1 recessivo (aa).',
        difficulty: 'Médio'
      }
    ],
    'Difícil': [
      {
        id: 'cie-d-1',
        question: 'Durante a respiração celular aeróbica, em qual etapa ocorre a maior produção de moléculas de ATP?',
        options: ['Glicólise no citoplasma', 'Ciclo de Krebs na matriz mitocondrial', 'Fosforilação oxidativa na crista mitocondrial', 'Fermentação lática'],
        correctIndex: 2,
        explanation: 'A cadeia transportadora de elétrons e a ATP sintase na membrana interna/crista produzem a maior parte do rendimento energético (cerca de 28-32 ATPs).',
        difficulty: 'Difícil'
      },
      {
        id: 'cie-d-2',
        question: 'O Princípio da Incerteza de Heisenberg estabelece que é impossível determinar simultaneamente com precisão absoluta:',
        options: [
          'A posição e o momento linear (quantidade de movimento) de uma partícula subatômica.',
          'A massa e a carga de um elétron.',
          'O raio da órbita e o número de prótons.',
          'A energia térmica e a gravidade de um fóton.'
        ],
        correctIndex: 0,
        explanation: 'Δx · Δp ≥ h / 4π. Quanto mais precisa a medição da posição (x), mais indeterminada fica a velocidade/momento (p).',
        difficulty: 'Difícil'
      },
      {
        id: 'cie-d-3',
        question: 'Qual das seguintes propriedades periódicas dos elementos químicos AUMENTA de cima para baixo em uma mesma família na Tabela Periódica?',
        options: ['Eletronegatividade', 'Energia de ionização', 'Raio atômico', 'Afinidade eletrônica'],
        correctIndex: 2,
        explanation: 'Ao descer no grupo, novos níveis/camadas eletrônicas são adicionados, aumentando o raio do átomo.',
        difficulty: 'Difícil'
      },
      {
        id: 'cie-d-4',
        question: 'No processo de duplicação do DNA, qual enzima sintetiza os novos filamentos de DNA na direção 5\' para 3\'?',
        options: ['DNA Helcase', 'DNA Polimerase', 'DNA Ligase', 'RNA Primase'],
        correctIndex: 1,
        explanation: 'A DNA Polimerase adiciona nucleotídeos à extremidade 3\'-OH livre na direção 5\' -> 3\'.',
        difficulty: 'Difícil'
      },
      {
        id: 'cie-d-5',
        question: 'Qual é o rendimento teórico máximo de uma máquina térmica operando entre duas temperaturas, conforme o Teorema de Carnot?',
        options: ['η = 1 - (T_fria / T_quente)', 'η = T_quente / T_fria', 'η = 100%', 'η = Q_quente / W'],
        correctIndex: 0,
        explanation: 'O ciclo de Carnot estabelece o rendimento máximo ideal em temperaturas absolutas em Kelvin: η = 1 - (T_fria / T_quente).',
        difficulty: 'Difícil'
      },
      {
        id: 'cie-d-6',
        question: 'A Lei de Le Chatelier para equilíbrios químicos prevê que, ao aumentarmos a pressão sobre um sistema gasoso em equilíbrio:',
        options: [
          'O equilíbrio se deslocará no sentido do menor número de mols de gás.',
          'O equilíbrio se deslocará no sentido endotérmico.',
          'A constante Kc aumentará dez vezes.',
          'Todas as moléculas pararão de reagir.'
        ],
        correctIndex: 0,
        explanation: 'O aumento de pressão força o sistema a ocupar menor volume, deslocando para o lado com menos mols gasosos.',
        difficulty: 'Difícil'
      },
      {
        id: 'cie-d-7',
        question: 'O efeito fotoelétrico, cuja explicação teórica rendeu o Prêmio Nobel a Albert Einstein em 1921, comprovou que:',
        options: [
          'A luz possui comportamento corpuscular (fótons com energia quantizada E = h·f).',
          'A gravidade não atua sobre a eletricidade.',
          'Os elétrons são indivisíveis e estacionários.',
          'A velocidade da luz depende da cor do metal.'
        ],
        correctIndex: 0,
        explanation: 'Einstein demonstrou que a emissão de elétrons depende da frequência do fóton incidente, provando a quantização da luz.',
        difficulty: 'Difícil'
      },
      {
        id: 'cie-d-8',
        question: 'Qual hormônio produzido pelo pâncreas é liberado quando a glicemia sanguínea está baixa para estimular a quebra de glicogênio no fígado?',
        options: ['Insulina', 'Glucagon', 'Adrenalina', 'Tiroxina'],
        correctIndex: 1,
        explanation: 'O glucagon (células alfa pancreáticas) atua antagonicamente à insulina, elevando a glicose sanguínea por glicogenólise.',
        difficulty: 'Difícil'
      },
      {
        id: 'cie-d-9',
        question: 'Qual é a hibridização do átomo de carbono que realiza uma ligação dupla e duas ligações simples (ex: eteno, H₂C=CH₂)?',
        options: ['sp', 'sp²', 'sp³', 'sp³d'],
        correctIndex: 1,
        explanation: 'Três regiões de densidade eletrônica (uma ligação dupla e duas simples) correspondem à geometria trigonal plana com hibridização sp².',
        difficulty: 'Difícil'
      },
      {
        id: 'cie-d-10',
        question: 'Qual das seguintes leis da termodinâmica introduz formalmente o conceito de entropia (S) e afirma que a entropia de um sistema isolado tende a aumentar?',
        options: ['Lei Zero', 'Primeira Lei', 'Segunda Lei', 'Terceira Lei'],
        correctIndex: 2,
        explanation: 'A Segunda Lei da Termodinâmica dita a irreversibilidade dos processos naturais e o aumento espontâneo da entropia.',
        difficulty: 'Difícil'
      }
    ]
  },
  ingles: {
    'Fácil': [
      {
        id: 'ing-f-1',
        question: 'Como se diz "livro" e "escola" em inglês?',
        options: ['Notebook and class', 'Book and school', 'Door and desk', 'Pencil and library'],
        correctIndex: 1,
        explanation: '"Livro" traduz-se como book e "escola" como school.',
        difficulty: 'Fácil'
      },
      {
        id: 'ing-f-2',
        question: 'Complete com a forma correta do verbo to be: "She ______ a dedicated student."',
        options: ['am', 'is', 'are', 'be'],
        correctIndex: 1,
        explanation: 'Para a terceira pessoa do singular (he, she, it) no presente simples do verbo to be usa-se "is".',
        difficulty: 'Fácil'
      },
      {
        id: 'ing-f-3',
        question: 'Qual é o plural correto da palavra "child"?',
        options: ['Childs', 'Children', 'Childrens', 'Childes'],
        correctIndex: 1,
        explanation: '"Child" tem o plural irregular "children" (crianças/filhos).',
        difficulty: 'Fácil'
      },
      {
        id: 'ing-f-4',
        question: 'Qual é a tradução mais adequada para o cumprimento "Good afternoon"?',
        options: ['Bom dia', 'Boa tarde', 'Boa noite (ao chegar)', 'Até logo'],
        correctIndex: 1,
        explanation: '"Good afternoon" significa "Boa tarde".',
        difficulty: 'Fácil'
      },
      {
        id: 'ing-f-5',
        question: 'Complete: "They ______ soccer every Saturday."',
        options: ['play', 'plays', 'playing', 'is play'],
        correctIndex: 0,
        explanation: 'No Present Simple, com o pronome "they", o verbo permanece na forma básica: "play".',
        difficulty: 'Fácil'
      },
      {
        id: 'ing-f-6',
        question: 'Qual das opções é um dia da semana (day of the week)?',
        options: ['January', 'Wednesday', 'Spring', 'Summer'],
        correctIndex: 1,
        explanation: '"Wednesday" é quarta-feira. January é mês, e Spring/Summer são estações do ano.',
        difficulty: 'Fácil'
      },
      {
        id: 'ing-f-7',
        question: 'Qual é a cor resultante da mistura de "blue" e "yellow"?',
        options: ['Red', 'Green', 'Purple', 'Orange'],
        correctIndex: 1,
        explanation: 'Azul (blue) + amarelo (yellow) = verde (green).',
        difficulty: 'Fácil'
      },
      {
        id: 'ing-f-8',
        question: 'Como se diz "Quantos anos você tem?" em inglês?',
        options: ['How much years you have?', 'How old are you?', 'What is your age have?', 'How many age are you?'],
        correctIndex: 1,
        explanation: 'A estrutura padrão em inglês para perguntar a idade é "How old are you?".',
        difficulty: 'Fácil'
      },
      {
        id: 'ing-f-9',
        question: 'Complete a frase com o pronome correto: "This is Lucas and this is ______ sister."',
        options: ['her', 'his', 'its', 'their'],
        correctIndex: 1,
        explanation: 'Lucas é masculino singular; o pronome possessivo correspondente a ele é "his" (a irmã dele).',
        difficulty: 'Fácil'
      },
      {
        id: 'ing-f-10',
        question: 'Qual é o oposto (antônimo) de "hot"?',
        options: ['Warm', 'Cold', 'Tall', 'Fast'],
        correctIndex: 1,
        explanation: '"Hot" significa quente; o oposto é "cold" (frio).',
        difficulty: 'Fácil'
      }
    ],
    'Médio': [
      {
        id: 'ing-m-1',
        question: 'Choose the correct sentence in the Present Perfect tense:',
        options: [
          'She lived here since 2018.',
          'She has lived here since 2018.',
          'She was living here since 2018.',
          'She is living here since 2018.'
        ],
        correctIndex: 1,
        explanation: 'Com "since" indicando uma ação que iniciou no passado e continua no presente, usa-se o Present Perfect: has + particípio (has lived).',
        difficulty: 'Médio'
      },
      {
        id: 'ing-m-2',
        question: 'Complete with the appropriate preposition: "We arrived ______ London ______ 8 p.m."',
        options: ['at / in', 'in / at', 'to / on', 'on / at'],
        correctIndex: 1,
        explanation: 'Usa-se "arrive in" para cidades e países (in London), e "at" para horários específicos (at 8 p.m.).',
        difficulty: 'Médio'
      },
      {
        id: 'ing-m-3',
        question: 'What is the meaning of the phrasal verb "give up"?',
        options: ['Desistir', 'Presentear', 'Aumentar o volume', 'Continuar tentando'],
        correctIndex: 0,
        explanation: '"To give up" significa desistir ou cessar um hábito.',
        difficulty: 'Médio'
      },
      {
        id: 'ing-m-4',
        question: 'Complete the First Conditional: "If it ______ tomorrow, we ______ the picnic."',
        options: [
          'rains / will cancel',
          'will rain / cancel',
          'rained / would cancel',
          'raining / cancel'
        ],
        correctIndex: 0,
        explanation: 'Na 1ª condicional: If + Simple Present (it rains), Will + Verbo base (we will cancel).',
        difficulty: 'Médio'
      },
      {
        id: 'ing-m-5',
        question: 'Which of the following modal verbs expresses polite recommendation or advice?',
        options: ['Must', 'Should', 'Might', 'Can'],
        correctIndex: 1,
        explanation: '"Should" é o modal por excelência para conselhos e recomendações ("You should study").',
        difficulty: 'Médio'
      },
      {
        id: 'ing-m-6',
        question: 'What is the comparative form of the adjective "good"?',
        options: ['Gooder', 'More good', 'Better', 'Best'],
        correctIndex: 2,
        explanation: '"Good" tem comparativo irregular "better" (melhor) e superlativo "the best".',
        difficulty: 'Médio'
      },
      {
        id: 'ing-m-7',
        question: 'Select the correct question tag: "You haven’t seen my keys, ______?"',
        options: ['did you', 'have you', 'haven\'t you', 'do you'],
        correctIndex: 1,
        explanation: 'Frase principal negativa no present perfect ("haven\'t seen") exige tag afirmativa: "have you?".',
        difficulty: 'Médio'
      },
      {
        id: 'ing-m-8',
        question: 'What does the idiom "piece of cake" mean in casual conversation?',
        options: ['Algo muito saboroso', 'Algo extremamente fácil de fazer', 'Uma comemoração de aniversário', 'Uma dívida financeira'],
        correctIndex: 1,
        explanation: '"A piece of cake" é uma expressão idiomática comum para "muito fácil" (o famoso "moleza").',
        difficulty: 'Médio'
      },
      {
        id: 'ing-m-9',
        question: 'Complete the sentence with the correct conjunction: "I wanted to go out, ______ it was raining heavily."',
        options: ['so', 'because', 'but', 'although'],
        correctIndex: 2,
        explanation: '"But" expressa contraste ou oposição entre o desejo de sair e a chuva intensa.',
        difficulty: 'Médio'
      },
      {
        id: 'ing-m-10',
        question: 'Choose the correct passive voice: "Leonardo da Vinci painted the Mona Lisa."',
        options: [
          'The Mona Lisa was painted by Leonardo da Vinci.',
          'The Mona Lisa is painted by Leonardo da Vinci.',
          'The Mona Lisa painted Leonardo da Vinci.',
          'The Mona Lisa had painted by Leonardo da Vinci.'
        ],
        correctIndex: 0,
        explanation: 'Voz passiva no passado simples: objeto + was/were + particípio passado do verbo + agente da passiva.',
        difficulty: 'Médio'
      }
    ],
    'Difícil': [
      {
        id: 'ing-d-1',
        question: 'Complete the Third Conditional: "If she ______ about the deadline, she ______ the report on time."',
        options: [
          'had known / would have submitted',
          'knew / would submit',
          'has known / will submit',
          'would know / had submitted'
        ],
        correctIndex: 0,
        explanation: '3ª condicional (hipótese irreal no passado): If + Past Perfect (had known), would have + particípio (would have submitted).',
        difficulty: 'Difícil'
      },
      {
        id: 'ing-d-2',
        question: 'What does the formal word "ubiquitous" mean?',
        options: ['Very rare or scarce', 'Present or found everywhere', 'Extremely dangerous', 'Ancient or outdated'],
        correctIndex: 1,
        explanation: '"Ubiquitous" significa onipresente, que está em toda parte simultaneamente.',
        difficulty: 'Difícil'
      },
      {
        id: 'ing-d-3',
        question: 'Choose the sentence that correctly employs the subjunctive mood in formal English:',
        options: [
          'The doctor recommended that he rested for a week.',
          'The doctor recommended that he rest for a week.',
          'The doctor recommended that he rests for a week.',
          'The doctor recommended him resting for a week.'
        ],
        correctIndex: 1,
        explanation: 'No subjuntivo mandativo após verbos como recommend, insist, suggest, usa-se a forma básica do verbo (he rest, sem o "-s").',
        difficulty: 'Difícil'
      },
      {
        id: 'ing-d-4',
        question: 'Identify the sentence with an inversion after a negative adverbial clause:',
        options: [
          'Hardly had I arrived when the phone rang.',
          'I had hardly arrived when the phone rang.',
          'When the phone rang, I arrived hardly.',
          'Hardly I arrived when the phone rang.'
        ],
        correctIndex: 0,
        explanation: 'Adversativos negativos no início da frase (Hardly, Seldom, Scarcely) exigem inversão do verbo auxiliar com o sujeito: "Hardly had I...".',
        difficulty: 'Difícil'
      },
      {
        id: 'ing-d-5',
        question: 'Which word is a false cognate (falso amigo) that means "preconceito" or "viés", not "prejuízo"?',
        options: ['Damage', 'Harm', 'Prejudice / Bias', 'Injury'],
        correctIndex: 2,
        explanation: '"Prejudice" significa preconceito (não prejuízo financeiro, que seria "loss" ou "damage").',
        difficulty: 'Difícil'
      },
      {
        id: 'ing-d-6',
        question: 'What is the meaning of the idiomatic phrase "to bite the bullet"?',
        options: [
          'Cometer um erro infantil.',
          'Enfrentar uma situação dolorosa ou inevitável com coragem e resignação.',
          'Atirar contra um inimigo em combate.',
          'Recusar uma oferta tentadora de emprego.'
        ],
        correctIndex: 1,
        explanation: '"Bite the bullet" refere-se a suportar ou aceitar com bravura uma adversidade inescapável.',
        difficulty: 'Difícil'
      },
      {
        id: 'ing-d-7',
        question: 'Complete: "Neither the manager nor the employees ______ satisfied with the new policy."',
        options: ['was', 'were', 'is', 'has been'],
        correctIndex: 1,
        explanation: 'Com a correlação "neither... nor...", o verbo concorda com o sujeito mais próximo ("the employees", plural: were).',
        difficulty: 'Difícil'
      },
      {
        id: 'ing-d-8',
        question: 'Which suffix converts the noun "hazard" into an adjective meaning "dangerous"?',
        options: ['-ous (Hazardous)', '-ful (Hazardful)', '-able (Hazardable)', '-ic (Hazardic)'],
        correctIndex: 0,
        explanation: '"Hazardous" é o adjetivo derivado que significa perigoso ou arriscado.',
        difficulty: 'Difícil'
      },
      {
        id: 'ing-d-9',
        question: 'What rhetorical device is used in the phrase "Deafening silence filled the auditorium"?',
        options: ['Oxymoron', 'Hyperbole', 'Litotes', 'Metonymy'],
        correctIndex: 0,
        explanation: 'Oxymoron (oxímoro) consiste na aproximação direta de palavras com significados opostos ou inconciliáveis ("deafening silence" - silêncio ensurdecedor).',
        difficulty: 'Difícil'
      },
      {
        id: 'ing-d-10',
        question: 'Select the correct sentence with a cleft sentence used for emphatic contrast:',
        options: [
          'It was Sarah who solved the complex mathematical problem.',
          'Sarah was that who solved the complex mathematical problem.',
          'Which solved the problem was Sarah.',
          'Who solved was Sarah the problem.'
        ],
        correctIndex: 0,
        explanation: 'A cleft sentence padrão com "It was... who/that..." destaca enfaticamente o sujeito ou foco do enunciado.',
        difficulty: 'Difícil'
      }
    ]
  }
};
