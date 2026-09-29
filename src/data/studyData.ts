import { Subject, UserStats } from '../types';

export const INITIAL_SUBJECTS: Subject[] = [
  {
    id: 'matematica',
    name: 'Matemática',
    slug: 'matematica',
    description: 'Álgebra, geometria, equações, frações e raciocínio lógico.',
    iconName: 'Calculator',
    accentColor: '#3B82F6', // Blue
    bgLight: 'bg-blue-50',
    bgDark: 'dark:bg-blue-950/40',
    borderColor: 'border-blue-200 dark:border-blue-800/60',
    textColor: 'text-blue-600 dark:text-blue-400',
    totalLessons: 12,
    completedLessons: 7,
    topics: [
      {
        id: 'mat-1',
        title: 'Frações e Operações Fundamentais',
        summary: 'Compreenda a representação de partes do todo, soma, subtração, multiplicação e divisão fracionária.',
        durationMinutes: 15,
        completed: true,
        keyPoints: [
          'Denominador indica em quantas partes o todo foi dividido.',
          'Numerador indica quantas partes foram consideradas.',
          'Na soma e subtração com denominadores diferentes, usa-se o MMC.'
        ]
      },
      {
        id: 'mat-2',
        title: 'Teorema de Pitágoras e Triângulos Retângulos',
        summary: 'Relação entre a hipotenusa e os catetos em qualquer triângulo retângulo: a² = b² + c².',
        durationMinutes: 20,
        completed: true,
        keyPoints: [
          'Válido exclusivamente para triângulos que possuem um ângulo reto de 90°.',
          'O quadrado da hipotenusa é igual à soma dos quadrados dos catetos.',
          'Triângulo pitagórico padrão: 3, 4 e 5.'
        ]
      },
      {
        id: 'mat-3',
        title: 'Equações de 1º e 2º Grau (Fórmula de Bhaskara)',
        summary: 'Identificação de incógnitas, isolamento de variáveis e resolução da fórmula resolutiva quadrática.',
        durationMinutes: 25,
        completed: true,
        keyPoints: [
          'Delta (Δ) = b² - 4ac determina a quantidade de raízes reais.',
          'Se Δ > 0, há duas raízes distintas; se Δ = 0, há uma raiz dupla; se Δ < 0, não há raízes reais.',
          'x = (-b ± √Δ) / (2a).'
        ]
      },
      {
        id: 'mat-4',
        title: 'Regra de Três Simples e Composta',
        summary: 'Proporcionalidade direta e inversa aplicada a problemas práticos do cotidiano.',
        durationMinutes: 18,
        completed: false,
        keyPoints: [
          'Grandezas diretamente proporcionais aumentam juntas na mesma proporção.',
          'Grandezas inversamente proporcionais: se uma dobra, a outra cai pela metade.',
          'Identificar o sentido das setas antes de cruzar os valores.'
        ]
      }
    ],
    exercises: [
      {
        id: 'mat-ex-1',
        question: 'Em um triângulo retângulo, os catetos medem 6 cm e 8 cm. Qual é o comprimento da hipotenusa?',
        options: ['9 cm', '10 cm', '12 cm', '14 cm'],
        correctIndex: 1,
        explanation: 'Pelo Teorema de Pitágoras: a² = 6² + 8² = 36 + 64 = 100. Portanto, a = √100 = 10 cm.',
        difficulty: 'Fácil'
      },
      {
        id: 'mat-ex-2',
        question: 'Qual é o valor de x na equação 3x - 12 = 18?',
        options: ['x = 6', 'x = 8', 'x = 10', 'x = 12'],
        correctIndex: 2,
        explanation: 'Somamos 12 aos dois lados: 3x = 18 + 12 = 30. Dividindo por 3: x = 30 / 3 = 10.',
        difficulty: 'Fácil'
      },
      {
        id: 'mat-ex-3',
        question: 'Se 4 pedreiros constroem um muro em 6 dias, em quantos dias 8 pedreiros construiriam o mesmo muro no mesmo ritmo?',
        options: ['2 dias', '3 dias', '4 dias', '12 dias'],
        correctIndex: 1,
        explanation: 'Trata-se de grandeza inversamente proporcional: dobrando o número de operários (4 -> 8), o tempo necessário cai pela metade (6 / 2 = 3 dias).',
        difficulty: 'Médio'
      }
    ]
  },
  {
    id: 'portugues',
    name: 'Português',
    slug: 'portugues',
    description: 'Gramática, concordância, interpretação de texto e redação.',
    iconName: 'BookOpen',
    accentColor: '#10B981', // Emerald
    bgLight: 'bg-emerald-50',
    bgDark: 'dark:bg-emerald-950/40',
    borderColor: 'border-emerald-200 dark:border-emerald-800/60',
    textColor: 'text-emerald-600 dark:text-emerald-400',
    totalLessons: 10,
    completedLessons: 6,
    topics: [
      {
        id: 'port-1',
        title: 'Uso dos Porquês (Por que, por quê, porque, porquê)',
        summary: 'Domine as quatro formas e saiba exatamente quando empregar cada uma na escrita formal.',
        durationMinutes: 12,
        completed: true,
        keyPoints: [
          'Por que: perguntas diretas ou indiretas e equivalência a "pelo qual".',
          'Por quê: em final de frases interrogativas antes de pontuação.',
          'Porque: conjunção explicativa ou causal (respostas).',
          'Porquê: substantivo sinônimo de motivo/razão, precedido de artigo (o porquê).'
        ]
      },
      {
        id: 'port-2',
        title: 'Regência e Crase Descomplicada',
        summary: 'A fusão da preposição "a" com o artigo feminino "a" e suas regras práticas de validação.',
        durationMinutes: 18,
        completed: true,
        keyPoints: [
          'Dica prática: substitua a palavra feminina por masculina; se virar "ao", ocorre crase ("à").',
          'Nunca ocorre crase antes de verbos ou palavras masculinas.',
          'Ocorre em locuções femininas adverbiais: à noite, às vezes, à medida que.'
        ]
      },
      {
        id: 'port-3',
        title: 'Concordância Verbal e Nominal',
        summary: 'Harmonia entre o sujeito e o verbo, substantivos e adjetivos acompanhantes.',
        durationMinutes: 22,
        completed: false,
        keyPoints: [
          'O verbo concorda em número e pessoa com o seu sujeito gramatical.',
          'Sujeito composto anteposto ao verbo leva o verbo para o plural.',
          'Casos particulares: expressões partitivas (a maioria de, grande parte de).'
        ]
      }
    ],
    exercises: [
      {
        id: 'port-ex-1',
        question: 'Assinale a frase em que o uso do porquê está CORRETO:',
        options: [
          'Você não compareceu ontem porque?',
          'Não compreendi o porquê de tanta confusão.',
          'Por quê você não me avisou mais cedo?',
          'Estudo muito por que quero passar no vestibular.'
        ],
        correctIndex: 1,
        explanation: '"O porquê" funciona como substantivo (com artigo "o" anteposto), significando razão ou motivo.',
        difficulty: 'Fácil'
      },
      {
        id: 'port-ex-2',
        question: 'Em qual das alternativas o acento indicativo de crase é OBRIGATÓRIO?',
        options: [
          'Fui a pé até a praça central.',
          'Ele começou a falar com entusiasmo.',
          'Entregamos os relatórios à diretora da escola.',
          'Chegamos a tempo para assistir ao filme.'
        ],
        correctIndex: 2,
        explanation: 'Quem entrega, entrega algo "a" alguém (preposição) + "a" diretora (artigo feminino) = à diretora. Diante de "pé" (masculino) e "falar" (verbo) não há crase.',
        difficulty: 'Médio'
      }
    ]
  },
  {
    id: 'historia',
    name: 'História',
    slug: 'historia',
    description: 'História do Brasil, Idade Média, Era Contemporânea e Guerras.',
    iconName: 'ScrollText',
    accentColor: '#F59E0B', // Amber
    bgLight: 'bg-amber-50',
    bgDark: 'dark:bg-amber-950/40',
    borderColor: 'border-amber-200 dark:border-amber-800/60',
    textColor: 'text-amber-600 dark:text-amber-400',
    totalLessons: 9,
    completedLessons: 4,
    topics: [
      {
        id: 'hist-1',
        title: 'Brasil Colônia e Ciclos Econômicos',
        summary: 'O ciclo do Pau-Brasil, da Cana-de-Açúcar e do Ouro em Minas Gerais.',
        durationMinutes: 16,
        completed: true,
        keyPoints: [
          'Capitanias hereditárias como modelo administrativo inicial descentralizado.',
          'Mão de obra escravizada indígena e africana como base da economia colonial.',
          'Sociedade açucareira patriarcal baseada no latifúndio e na monocultura exportadora.'
        ]
      },
      {
        id: 'hist-2',
        title: 'A Revolução Francesa e a Queda do Antigo Regime',
        summary: 'Ideais iluministas de Liberdade, Igualdade e Fraternidade que transformaram o mundo ocidental.',
        durationMinutes: 24,
        completed: true,
        keyPoints: [
          'Divisão em Três Estados: Clero (1º), Nobreza (2º) e Povo/Burguesia (3º).',
          'Tomada da Bastilha em 14 de julho de 1789 marcou o início da revolução.',
          'Declaração dos Direitos do Homem e do Cidadão.'
        ]
      },
      {
        id: 'hist-3',
        title: 'Era Vargas (1930 - 1945)',
        summary: 'A modernização industrial brasileira, criação das leis trabalhistas (CLT) e o Estado Novo.',
        durationMinutes: 20,
        completed: false,
        keyPoints: [
          'Revolução de 1930 colocou Getúlio Vargas no poder federal.',
          'Investimento estatal em indústrias de base: CSN e Vale do Rio Doce.',
          'Consolidação das Leis do Trabalho (CLT) em 1943.'
        ]
      }
    ],
    exercises: [
      {
        id: 'hist-ex-1',
        question: 'A Tomada da Bastilha em 1789 é considerada o marco inicial de qual evento histórico?',
        options: [
          'Revolução Industrial',
          'Revolução Francesa',
          'Primeira Guerra Mundial',
          'Guerra Fria'
        ],
        correctIndex: 1,
        explanation: 'A queda da fortaleza da Bastilha em Paris no dia 14 de julho de 1789 simbolizou a derrubada do absolutismo do Antigo Regime na França.',
        difficulty: 'Fácil'
      },
      {
        id: 'hist-ex-2',
        question: 'Qual importante conjunto de direitos trabalhistas foi consolidado no Brasil durante a Era Vargas em 1943?',
        options: ['CLT', 'SUS', 'Plano Real', 'Código Civil'],
        correctIndex: 0,
        explanation: 'A Consolidação das Leis do Trabalho (CLT), assinada por Getúlio Vargas em 1º de maio de 1943, unificou a legislação trabalhista brasileira.',
        difficulty: 'Fácil'
      }
    ]
  },
  {
    id: 'geografia',
    name: 'Geografia',
    slug: 'geografia',
    description: 'Cartografia, climas, relevo, geopolítica e meio ambiente.',
    iconName: 'Compass',
    accentColor: '#06B6D4', // Cyan
    bgLight: 'bg-cyan-50',
    bgDark: 'dark:bg-cyan-950/40',
    borderColor: 'border-cyan-200 dark:border-cyan-800/60',
    textColor: 'text-cyan-600 dark:text-cyan-400',
    totalLessons: 8,
    completedLessons: 5,
    topics: [
      {
        id: 'geo-1',
        title: 'Biomas Brasileiros e Biodiversidade',
        summary: 'Características fundamentais da Amazônia, Cerrado, Caatinga, Mata Atlântica, Pantanal e Pampa.',
        durationMinutes: 18,
        completed: true,
        keyPoints: [
          'Amazônia: maior floresta tropical do planeta, rica em umidade e rios voadores.',
          'Cerrado: considerado a "caixa d’água" do Brasil, vegetação arbustiva com raízes profundas.',
          'Caatinga: único bioma exclusivamente brasileiro, adaptado à semiaridez.'
        ]
      },
      {
        id: 'geo-2',
        title: 'Fusos Horários e Coordenadas Geográficas',
        summary: 'Latitude, longitude, linhas imaginárias (Equador, Greenwich) e a rotação terrestre.',
        durationMinutes: 15,
        completed: true,
        keyPoints: [
          'A Terra gira de oeste para leste completando 360° em 24 horas (15° por hora/fuso).',
          'Para leste as horas adiantam (+), para oeste as horas atrasam (-).',
          'O Brasil possui 4 fusos horários oficiais.'
        ]
      },
      {
        id: 'geo-3',
        title: 'Urbanização e Dinâmica Populacional',
        summary: 'Êxodo rural, metropolização, conurbação e desafios da infraestrutura urbana.',
        durationMinutes: 19,
        completed: false,
        keyPoints: [
          'Conurbação: integração física e funcional entre duas ou mais cidades vizinhas.',
          'Gentrificação: valorização imobiliária que modifica o perfil socioeconômico de um bairro.'
        ]
      }
    ],
    exercises: [
      {
        id: 'geo-ex-1',
        question: 'Qual é o bioma exclusivamente brasileiro, com vegetação adaptada à escassez hídrica periódica?',
        options: ['Pantanal', 'Caatinga', 'Pampa', 'Mata Atlântica'],
        correctIndex: 1,
        explanation: 'A Caatinga ocorre apenas no território brasileiro (semiárido nordestino e norte de MG) com plantas xerófitas e folhas modificadas em espinhos.',
        difficulty: 'Fácil'
      },
      {
        id: 'geo-ex-2',
        question: 'Se em Londres (Meridiano de Greenwich, 0°) são 15:00, que horas serão em Brasília (fuso UTC-3)?',
        options: ['12:00', '18:00', '10:00', '16:00'],
        correctIndex: 0,
        explanation: 'Como Brasília está a oeste de Greenwich com UTC-3, subtraem-se 3 horas: 15:00 - 3 horas = 12:00.',
        difficulty: 'Médio'
      }
    ]
  },
  {
    id: 'ciencias',
    name: 'Ciências',
    slug: 'ciencias',
    description: 'Biologia, física, química, ecologia e o corpo humano.',
    iconName: 'Atom',
    accentColor: '#8B5CF6', // Purple
    bgLight: 'bg-purple-50',
    bgDark: 'dark:bg-purple-950/40',
    borderColor: 'border-purple-200 dark:border-purple-800/60',
    textColor: 'text-purple-600 dark:text-purple-400',
    totalLessons: 11,
    completedLessons: 6,
    topics: [
      {
        id: 'cie-1',
        title: 'Célula: Unidade Fundamental da Vida',
        summary: 'Diferença entre células procarióticas e eucarióticas, e principais organelas celulares.',
        durationMinutes: 20,
        completed: true,
        keyPoints: [
          'Mitocôndrias: responsáveis pela respiração celular e produção de ATP.',
          'Ribossomos: locais de síntese proteica.',
          'Cloroplastos: presentes em células vegetais para fotossíntese.'
        ]
      },
      {
        id: 'cie-2',
        title: 'Tabela Periódica e Ligações Químicas',
        summary: 'Classificação dos elementos, número atômico, elétrons de valência e ligações iônicas vs covalentes.',
        durationMinutes: 22,
        completed: true,
        keyPoints: [
          'Ligação iônica: transferência definitiva de elétrons entre metais e ametais.',
          'Ligação covalente: compartilhamento de pares eletrônicos entre ametais.',
          'Regra do octeto: tendência em alcançar estabilidade com 8 elétrons na camada de valência.'
        ]
      },
      {
        id: 'cie-3',
        title: 'Leis de Newton e Dinâmica do Movimento',
        summary: 'Inércia (1ª), Princípio Fundamental da Dinâmica (F = m.a) e Ação e Reação (3ª).',
        durationMinutes: 25,
        completed: false,
        keyPoints: [
          '1ª Lei (Inércia): todo corpo em repouso ou movimento retilíneo uniforme tende a permanecer assim.',
          '2ª Lei: Força resultante é o produto da massa pela aceleração.',
          '3ª Lei: Para toda força de ação, existe uma reação de mesma intensidade e sentidos opostos.'
        ]
      }
    ],
    exercises: [
      {
        id: 'cie-ex-1',
        question: 'Qual organela citoplasmática é a principal responsável pela respiração celular e produção energética (ATP)?',
        options: ['Complexo de Golgi', 'Mitocôndria', 'Lisossomo', 'Retículo Endoplasmático'],
        correctIndex: 1,
        explanation: 'As mitocôndrias realizam o ciclo de Krebs e a fosforilação oxidativa, convertendo glicose e oxigênio em moléculas de energia (ATP).',
        difficulty: 'Fácil'
      },
      {
        id: 'cie-ex-2',
        question: 'De acordo com a 2ª Lei de Newton, se aplicarmos uma força de 30 N sobre um bloco de massa 6 kg, qual será a aceleração?',
        options: ['5 m/s²', '180 m/s²', '24 m/s²', '0.2 m/s²'],
        correctIndex: 0,
        explanation: 'F = m . a  =>  30 = 6 . a  =>  a = 30 / 6 = 5 m/s².',
        difficulty: 'Fácil'
      }
    ]
  },
  {
    id: 'ingles',
    name: 'Inglês',
    slug: 'ingles',
    description: 'Vocabulário essencial, tempos verbais, conversação e leitura.',
    iconName: 'Languages',
    accentColor: '#EC4899', // Pink
    bgLight: 'bg-pink-50',
    bgDark: 'dark:bg-pink-950/40',
    borderColor: 'border-pink-200 dark:border-pink-800/60',
    textColor: 'text-pink-600 dark:text-pink-400',
    totalLessons: 8,
    completedLessons: 4,
    topics: [
      {
        id: 'ing-1',
        title: 'Simple Present vs Present Continuous',
        summary: 'Hábitos e fatos cotidianos versus ações acontecendo exatamente no momento da fala.',
        durationMinutes: 14,
        completed: true,
        keyPoints: [
          'Simple Present: rotinas (e.g. "I study every morning; She likes math").',
          'Present Continuous: "to be" + verbo com -ing (e.g. "I am reading right now").',
          'Atenção à 3ª pessoa do singular (he/she/it) recebendo "-s" no presente simples.'
        ]
      },
      {
        id: 'ing-2',
        title: 'Modal Verbs (Can, Could, Must, Should)',
        summary: 'Verbos auxiliares que expressam habilidade, probabilidade, obrigação e conselho.',
        durationMinutes: 18,
        completed: true,
        keyPoints: [
          'Can: capacidade ou permissão informal ("Can I help you?").',
          'Should: recomendação ou conselho ("You should rest more").',
          'Must: obrigação ou forte necessidade ("Students must turn off phones").'
        ]
      },
      {
        id: 'ing-3',
        title: 'Past Simple & Irregular Verbs',
        summary: 'Como narrar fatos concluídos no passado e os verbos irregulares mais comuns.',
        durationMinutes: 20,
        completed: false,
        keyPoints: [
          'Verbos regulares recebem -ed (play -> played, work -> worked).',
          'Verbos irregulares mudam de forma (go -> went, see -> saw, buy -> bought).',
          'Uso do auxiliar "did" em perguntas e frases negativas ("Did you go?", "I didn\'t see").'
        ]
      }
    ],
    exercises: [
      {
        id: 'ing-ex-1',
        question: 'Complete com o verbo correto: "Look! Lucas __________ a book in the library right now."',
        options: ['reads', 'is reading', 'readed', 'has read'],
        correctIndex: 1,
        explanation: 'A expressão "right now" e "Look!" indicam uma ação em andamento no presente (Present Continuous): verbo to be ("is") + verbo com -ing ("reading").',
        difficulty: 'Fácil'
      },
      {
        id: 'ing-ex-2',
        question: 'Qual é o passado simples correto do verbo irregular "to go"?',
        options: ['goed', 'gone', 'went', 'going'],
        correctIndex: 2,
        explanation: 'O passado simples de "go" é a forma irregular "went" (ex: "Yesterday she went to school").',
        difficulty: 'Fácil'
      }
    ]
  }
];

export const INITIAL_USER_STATS: UserStats = {
  streakDays: 1,
  studyHoursTotal: 0,
  testsCompleted: 0,
  exercisesSolved: 0,
  totalCorrectAnswers: 0,
  accuracyRate: 0,
  dailyGoalMinutes: 30,
  todayMinutesStudied: 0,
  level: 1,
  xp: 0,
  nextLevelXp: 100,
  lastStudyDate: new Date().toISOString().split('T')[0]
};
