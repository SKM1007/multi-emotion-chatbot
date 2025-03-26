
// Supported languages
export type SupportedLanguage = 'en' | 'es' | 'ja';

// Language names mapping
export const languageNames = {
  en: 'English',
  es: 'Español',
  ja: '日本語'
};

// Simple language detection patterns
const languagePatterns = {
  en: ['the', 'and', 'is', 'in', 'to', 'a', 'of', 'for', 'that', 'you', 'hello', 'hi', 'how', 'what', 'why', 'when', 'who'],
  es: ['el', 'la', 'los', 'las', 'y', 'es', 'en', 'a', 'de', 'para', 'que', 'hola', 'como', 'qué', 'por qué', 'cuándo', 'quién'],
  ja: ['は', 'が', 'の', 'に', 'を', 'で', 'と', 'も', 'から', 'まで', 'こんにちは', 'こんばんは', 'おはよう', '何', 'なぜ', 'いつ', '誰']
};

// Language detection function
export function detectLanguage(text: string): SupportedLanguage {
  if (!text) return 'en';
  
  const lowerText = text.toLowerCase();
  const scores: Record<SupportedLanguage, number> = { en: 0, es: 0, ja: 0 };
  
  // Japanese detection (presence of Japanese characters)
  if (/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/.test(text)) {
    scores.ja += 10;
  }
  
  // Check for language-specific words
  for (const [lang, patterns] of Object.entries(languagePatterns) as [SupportedLanguage, string[]][]) {
    for (const pattern of patterns) {
      // Use word boundary for Latin scripts
      if (lang === 'en' || lang === 'es') {
        const regex = new RegExp(`\\b${pattern}\\b`, 'i');
        if (regex.test(lowerText)) {
          scores[lang] += 1;
        }
      } 
      // Simple includes for Japanese
      else if (lang === 'ja') {
        if (lowerText.includes(pattern)) {
          scores[lang] += 1;
        }
      }
    }
  }
  
  // Find language with highest score
  let detectedLanguage: SupportedLanguage = 'en';
  let highestScore = 0;
  
  for (const [lang, score] of Object.entries(scores) as [SupportedLanguage, number][]) {
    if (score > highestScore) {
      highestScore = score;
      detectedLanguage = lang;
    }
  }
  
  return detectedLanguage;
}

// Response templates for different emotions and languages
interface ResponseTemplate {
  greeting: string;
  happy: string[];
  sad: string[];
  angry: string[];
  neutral: string[];
  surprised: string[];
}

const responseTemplates: Record<SupportedLanguage, ResponseTemplate> = {
  en: {
    greeting: "Hello! How can I help you today?",
    happy: [
      "I'm glad you're feeling good! How can I make your day even better?",
      "Your happiness is contagious! What else can I help you with?",
      "That's wonderful to hear! Is there anything specific you'd like to talk about?",
      "It's great to see you in such a good mood! How can I add to your happiness?",
      "Your positive energy is refreshing! Tell me more about what's making you happy.",
      "I love your cheerful attitude! Let's keep that positive vibe going!",
      "What a delightful message! Your happiness brightens my day too."
    ],
    sad: [
      "I'm sorry to hear you're feeling down. Would you like to talk about what's bothering you?",
      "It's okay to feel sad sometimes. Is there anything I can do to help?",
      "I hope things get better for you soon. How can I support you right now?",
      "Would sharing what's troubling you help? I'm here to listen.",
      "Sometimes just talking about sad feelings can help. What's on your mind?"
    ],
    angry: [
      "I understand you're frustrated. Let's try to work through this together.",
      "I can see you're upset. Would it help to talk about what's bothering you?",
      "Your feelings are valid. How can I help address what's making you angry?",
      "It sounds like you're having a tough time. Would you like to discuss what happened?",
      "I'm here to help with whatever has upset you. What would make things better?"
    ],
    neutral: [
      "How can I assist you today?",
      "What would you like to talk about?",
      "I'm here to help. What do you need?",
      "Is there something specific on your mind?",
      "How may I be of service to you right now?"
    ],
    surprised: [
      "That is quite surprising! Would you like to talk more about it?",
      "Wow! I wasn't expecting that. Tell me more?",
      "That's unexpected! How can I help with this situation?",
      "I can see why that would be surprising! Would you like to discuss it further?",
      "That's quite a revelation! How are you feeling about it?"
    ]
  },
  es: {
    greeting: "¡Hola! ¿Cómo puedo ayudarte hoy?",
    happy: [
      "¡Me alegra que te sientas bien! ¿Cómo puedo hacer tu día aún mejor?",
      "¡Tu felicidad es contagiosa! ¿En qué más puedo ayudarte?",
      "¡Eso es maravilloso de escuchar! ¿Hay algo específico de lo que te gustaría hablar?",
      "¡Es genial verte de tan buen humor! ¿Cómo puedo contribuir a tu felicidad?",
      "¡Tu energía positiva es refrescante! Cuéntame más sobre lo que te hace feliz.",
      "¡Me encanta tu actitud alegre! ¡Sigamos con ese ambiente positivo!",
      "¡Qué mensaje tan encantador! Tu felicidad también ilumina mi día."
    ],
    sad: [
      "Lamento que te sientas mal. ¿Te gustaría hablar sobre lo que te molesta?",
      "Está bien sentirse triste a veces. ¿Hay algo que pueda hacer para ayudar?",
      "Espero que las cosas mejoren pronto para ti. ¿Cómo puedo apoyarte ahora mismo?",
      "¿Te ayudaría compartir lo que te preocupa? Estoy aquí para escuchar.",
      "A veces, solo hablar de los sentimientos tristes puede ayudar. ¿Qué tienes en mente?"
    ],
    angry: [
      "Entiendo que estés frustrado. Intentemos resolver esto juntos.",
      "Puedo ver que estás molesto. ¿Te ayudaría hablar sobre lo que te molesta?",
      "Tus sentimientos son válidos. ¿Cómo puedo ayudar a abordar lo que te hace enojar?",
      "Parece que estás pasando por un momento difícil. ¿Te gustaría hablar de lo que pasó?",
      "Estoy aquí para ayudarte con lo que te ha molestado. ¿Qué mejoraría las cosas?"
    ],
    neutral: [
      "¿Cómo puedo ayudarte hoy?",
      "¿De qué te gustaría hablar?",
      "Estoy aquí para ayudar. ¿Qué necesitas?",
      "¿Hay algo específico en tu mente?",
      "¿Cómo puedo servirte en este momento?"
    ],
    surprised: [
      "¡Eso es bastante sorprendente! ¿Te gustaría hablar más al respecto?",
      "¡Vaya! No esperaba eso. ¿Me cuentas más?",
      "¡Eso es inesperado! ¿Cómo puedo ayudarte con esta situación?",
      "¡Puedo entender por qué eso sería sorprendente! ¿Te gustaría hablar más sobre ello?",
      "¡Esa es toda una revelación! ¿Cómo te sientes al respecto?"
    ]
  },
  ja: {
    greeting: "こんにちは！今日はどのようにお手伝いできますか？",
    happy: [
      "元気そうで何よりです！さらに良い一日にするために何かお手伝いできることはありますか？",
      "あなたの幸せは伝染しますね！他に何かお手伝いできることはありますか？",
      "それは素晴らしいですね！何か特に話したいことはありますか？",
      "そんなに良い気分でいるあなたを見られて嬉しいです！あなたの幸せにどう貢献できますか？",
      "あなたのポジティブなエネルギーは爽やかですね！何があなたを幸せにしているのか、もっと教えてください。",
      "あなたの明るい態度が大好きです！そのポジティブな雰囲気を続けましょう！",
      "なんて素敵なメッセージでしょう！あなたの幸せは私の日も明るくします。"
    ],
    sad: [
      "気分が落ち込んでいるようで申し訳ありません。何が気になっているのか話してみませんか？",
      "時には悲しい気持ちになることもありますよね。何かお手伝いできることはありますか？",
      "すぐに状況が良くなることを願っています。今、どのようなサポートが必要ですか？",
      "あなたを悩ませていることを共有すると良いかもしれませんね。お聞きします。",
      "時には悲しい気持ちについて話すだけでも助けになります。何か考えていることはありますか？"
    ],
    angry: [
      "フラストレーションを感じているのは理解できます。一緒に解決していきましょう。",
      "動揺されているようですね。何が気になっているのか話すと良いかもしれませんね？",
      "あなたの感情は当然のものです。怒りの原因に対処するためにどうすれば良いでしょうか？",
      "大変な時期を過ごしているようですね。何があったのか話し合いたいですか？",
      "あなたを怒らせたことについてお手伝いします。何があれば状況は良くなりますか？"
    ],
    neutral: [
      "今日はどのようにお手伝いできますか？",
      "何についてお話したいですか？",
      "お手伝いします。何が必要ですか？",
      "何か特に考えていることはありますか？",
      "今、どのようにお役に立てますか？"
    ],
    surprised: [
      "それは驚きですね！もっと詳しく話してみませんか？",
      "わあ！そんなことになるとは思っていませんでした。もっと教えていただけますか？",
      "それは予想外でした！この状況でどのようにお手伝いできますか？",
      "それが驚くべきことだと理解できます！もっと詳しく話し合いたいですか？",
      "それは大きな発見ですね！それについてどう感じていますか？"
    ]
  }
};

// Get appropriate response based on emotion and language
export function getResponse(emotion: string, language: SupportedLanguage): string {
  const templates = responseTemplates[language] || responseTemplates.en;
  const responses = templates[emotion as keyof ResponseTemplate] || templates.neutral;
  
  // Return a random response from the appropriate emotion array
  return responses[Math.floor(Math.random() * responses.length)];
}

// Get greeting message in the appropriate language
export function getGreeting(language: SupportedLanguage): string {
  return responseTemplates[language]?.greeting || responseTemplates.en.greeting;
}
