
// Supported languages
export type SupportedLanguage = 'en' | 'es' | 'ja' | 'fr';

// Language names mapping
export const languageNames = {
  en: 'English',
  es: 'Español',
  ja: '日本語',
  fr: 'Français'
};

// Simple language detection patterns
const languagePatterns = {
  en: ['the', 'and', 'is', 'in', 'to', 'a', 'of', 'for', 'that', 'you', 'hello', 'hi', 'how', 'what', 'why', 'when', 'who'],
  es: ['el', 'la', 'los', 'las', 'y', 'es', 'en', 'a', 'de', 'para', 'que', 'hola', 'como', 'qué', 'por qué', 'cuándo', 'quién'],
  ja: ['は', 'が', 'の', 'に', 'を', 'で', 'と', 'も', 'から', 'まで', 'こんにちは', 'こんばんは', 'おはよう', '何', 'なぜ', 'いつ', '誰'],
  fr: ['le', 'la', 'les', 'un', 'une', 'des', 'et', 'est', 'dans', 'pour', 'que', 'qui', 'bonjour', 'salut', 'comment', 'pourquoi', 'quand', 'où']
};

// Language detection function
export function detectLanguage(text: string): SupportedLanguage {
  if (!text) return 'en';
  
  const lowerText = text.toLowerCase();
  const scores: Record<SupportedLanguage, number> = { en: 0, es: 0, ja: 0, fr: 0 };
  
  // Japanese detection (presence of Japanese characters)
  if (/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/.test(text)) {
    scores.ja += 10;
  }
  
  // French-specific characters
  if (/[àâäæçéèêëîïôœùûüÿÀÂÄÆÇÉÈÊËÎÏÔŒÙÛÜŸ]/.test(text)) {
    scores.fr += 5;
  }
  
  // Spanish-specific characters
  if (/[áéíóúüñ¿¡ÁÉÍÓÚÜÑ]/.test(text)) {
    scores.es += 5;
  }
  
  // Check for language-specific words
  for (const [lang, patterns] of Object.entries(languagePatterns) as [SupportedLanguage, string[]][]) {
    for (const pattern of patterns) {
      // Use word boundary for Latin scripts
      if (lang === 'en' || lang === 'es' || lang === 'fr') {
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
      "What a delightful message! Your happiness brightens my day too.",
      "I'm thrilled to hear you're happy! Would you like to talk about what's bringing you joy?",
      "Happiness is such a beautiful emotion! What's making you feel this way?",
      "Your happiness makes me happy too! Let's chat about something fun!"
    ],
    sad: [
      "I'm sorry to hear you're feeling down. Would you like to talk about what's bothering you?",
      "It's okay to feel sad sometimes. Is there anything I can do to help?",
      "I hope things get better for you soon. How can I support you right now?",
      "Would sharing what's troubling you help? I'm here to listen.",
      "Sometimes just talking about sad feelings can help. What's on your mind?",
      "I understand feeling sad can be difficult. What would cheer you up right now?",
      "I wish I could give you a hug. What's making you feel sad today?",
      "Your feelings are valid. Would talking about something positive help lift your spirits?",
      "I'm here for you during this difficult time. What can I do to make you feel better?",
      "Sadness is temporary. Let's find something that might make you smile again."
    ],
    angry: [
      "I understand you're frustrated. Let's try to work through this together.",
      "I can see you're upset. Would it help to talk about what's bothering you?",
      "Your feelings are valid. How can I help address what's making you angry?",
      "It sounds like you're having a tough time. Would you like to discuss what happened?",
      "I'm here to help with whatever has upset you. What would make things better?",
      "When we're angry, it helps to take deep breaths. What's causing your frustration?",
      "I can tell this is important to you. Tell me more about why you're feeling this way.",
      "It's natural to feel angry sometimes. How can we channel that energy positively?",
      "Your anger is understandable. Would you like to explore solutions together?",
      "I appreciate you sharing your feelings. What would help calm the situation?"
    ],
    neutral: [
      "How can I assist you today?",
      "What would you like to talk about?",
      "I'm here to help. What do you need?",
      "Is there something specific on your mind?",
      "How may I be of service to you right now?",
      "I'm listening! What's on your agenda today?",
      "I'm ready to chat about whatever interests you.",
      "Feel free to share your thoughts or questions with me.",
      "I'm all ears! What would you like to discuss?",
      "I'm excited to chat with you! What shall we talk about?"
    ],
    surprised: [
      "That is quite surprising! Would you like to talk more about it?",
      "Wow! I wasn't expecting that. Tell me more?",
      "That's unexpected! How can I help with this situation?",
      "I can see why that would be surprising! Would you like to discuss it further?",
      "That's quite a revelation! How are you feeling about it?",
      "Oh! That caught me off guard too. How are you processing this surprise?",
      "What an interesting turn of events! How are you handling this surprise?",
      "I can understand why you'd be surprised! What are your thoughts about it?",
      "That's definitely unexpected! Would you like to explore what this means?",
      "Surprises can be both good and challenging. How is this one affecting you?"
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
      "¡Qué mensaje tan encantador! Tu felicidad también ilumina mi día.",
      "¡Estoy encantado de que estés feliz! ¿Te gustaría hablar sobre lo que te trae alegría?",
      "¡La felicidad es una emoción tan hermosa! ¿Qué te hace sentir así?",
      "¡Tu felicidad me hace feliz también! ¡Hablemos de algo divertido!"
    ],
    sad: [
      "Lamento que te sientas mal. ¿Te gustaría hablar sobre lo que te molesta?",
      "Está bien sentirse triste a veces. ¿Hay algo que pueda hacer para ayudar?",
      "Espero que las cosas mejoren pronto para ti. ¿Cómo puedo apoyarte ahora mismo?",
      "¿Te ayudaría compartir lo que te preocupa? Estoy aquí para escuchar.",
      "A veces, solo hablar de los sentimientos tristes puede ayudar. ¿Qué tienes en mente?",
      "Entiendo que sentirse triste puede ser difícil. ¿Qué te animaría ahora mismo?",
      "Desearía poder darte un abrazo. ¿Qué te está haciendo sentir triste hoy?",
      "Tus sentimientos son válidos. ¿Te ayudaría hablar de algo positivo para levantar tu ánimo?",
      "Estoy aquí para ti durante este momento difícil. ¿Qué puedo hacer para que te sientas mejor?",
      "La tristeza es temporal. Encontremos algo que pueda hacerte sonreír de nuevo."
    ],
    angry: [
      "Entiendo que estés frustrado. Intentemos resolver esto juntos.",
      "Puedo ver que estás molesto. ¿Te ayudaría hablar sobre lo que te molesta?",
      "Tus sentimientos son válidos. ¿Cómo puedo ayudar a abordar lo que te hace enojar?",
      "Parece que estás pasando por un momento difícil. ¿Te gustaría hablar de lo que pasó?",
      "Estoy aquí para ayudarte con lo que te ha molestado. ¿Qué mejoraría las cosas?",
      "Cuando estamos enojados, ayuda respirar profundamente. ¿Qué está causando tu frustración?",
      "Puedo notar que esto es importante para ti. Cuéntame más sobre por qué te sientes así.",
      "Es natural sentirse enojado a veces. ¿Cómo podemos canalizar esa energía positivamente?",
      "Tu enojo es comprensible. ¿Te gustaría explorar soluciones juntos?",
      "Agradezco que compartas tus sentimientos. ¿Qué ayudaría a calmar la situación?"
    ],
    neutral: [
      "¿Cómo puedo ayudarte hoy?",
      "¿De qué te gustaría hablar?",
      "Estoy aquí para ayudar. ¿Qué necesitas?",
      "¿Hay algo específico en tu mente?",
      "¿Cómo puedo servirte en este momento?",
      "¡Te escucho! ¿Qué hay en tu agenda hoy?",
      "Estoy listo para charlar sobre lo que te interese.",
      "Siéntete libre de compartir tus pensamientos o preguntas conmigo.",
      "¡Soy todo oídos! ¿De qué te gustaría hablar?",
      "¡Estoy emocionado de charlar contigo! ¿De qué hablamos?"
    ],
    surprised: [
      "¡Eso es bastante sorprendente! ¿Te gustaría hablar más al respecto?",
      "¡Vaya! No esperaba eso. ¿Me cuentas más?",
      "¡Eso es inesperado! ¿Cómo puedo ayudarte con esta situación?",
      "¡Puedo entender por qué eso sería sorprendente! ¿Te gustaría hablar más sobre ello?",
      "¡Esa es toda una revelación! ¿Cómo te sientes al respecto?",
      "¡Oh! Eso me ha tomado por sorpresa también. ¿Cómo estás procesando esta sorpresa?",
      "¡Qué giro de eventos tan interesante! ¿Cómo estás manejando esta sorpresa?",
      "¡Puedo entender por qué estarías sorprendido! ¿Cuáles son tus pensamientos al respecto?",
      "¡Eso es definitivamente inesperado! ¿Te gustaría explorar lo que esto significa?",
      "Las sorpresas pueden ser buenas y desafiantes. ¿Cómo te está afectando esta?"
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
      "なんて素敵なメッセージでしょう！あなたの幸せは私の日も明るくします。",
      "あなたが幸せで嬉しいです！何があなたに喜びをもたらしているのか教えていただけますか？",
      "幸せはとても美しい感情ですね！何があなたをこのような気持ちにさせているのですか？",
      "あなたの幸せは私も幸せにします！楽しいことについて話しましょう！"
    ],
    sad: [
      "気分が落ち込んでいるようで申し訳ありません。何が気になっているのか話してみませんか？",
      "時には悲しい気持ちになることもありますよね。何かお手伝いできることはありますか？",
      "すぐに状況が良くなることを願っています。今、どのようなサポートが必要ですか？",
      "あなたを悩ませていることを共有すると良いかもしれませんね。お聞きします。",
      "時には悲しい気持ちについて話すだけでも助けになります。何か考えていることはありますか？",
      "悲しい気持ちは大変ですよね。今、何があなたを元気づけるでしょうか？",
      "ハグできたらいいのにと思います。今日は何があなたを悲しくさせているのですか？",
      "あなたの感情は当然のものです。何か前向きな話題が気分を上げるのに役立ちますか？",
      "この困難な時期、あなたのそばにいます。気分を良くするために何ができるでしょうか？",
      "悲しみは一時的なものです。また笑顔になれることを見つけましょう。"
    ],
    angry: [
      "フラストレーションを感じているのは理解できます。一緒に解決していきましょう。",
      "動揺されているようですね。何が気になっているのか話すと良いかもしれませんね？",
      "あなたの感情は当然のものです。怒りの原因に対処するためにどうすれば良いでしょうか？",
      "大変な時期を過ごしているようですね。何があったのか話し合いたいですか？",
      "あなたを怒らせたことについてお手伝いします。何があれば状況は良くなりますか？",
      "怒っているときは、深呼吸すると良いですよ。何があなたのフラストレーションの原因ですか？",
      "これがあなたにとって重要なことだと分かります。なぜそのように感じているのかもっと教えてください。",
      "時には怒りを感じるのは自然なことです。その感情をどのようにポジティブに変えられるでしょうか？",
      "あなたの怒りは理解できます。一緒に解決策を探りませんか？",
      "感情を共有してくれてありがとう。状況を落ち着かせるには何が役立ちますか？"
    ],
    neutral: [
      "今日はどのようにお手伝いできますか？",
      "何についてお話したいですか？",
      "お手伝いします。何が必要ですか？",
      "何か特に考えていることはありますか？",
      "今、どのようにお役に立てますか？",
      "お聞きしています！今日の予定は何ですか？",
      "あなたの興味のあることについてお話する準備ができています。",
      "考えや質問を自由に共有してください。",
      "聞いていますよ！何について話し合いたいですか？",
      "あなたとおしゃべりできて嬉しいです！何について話しましょうか？"
    ],
    surprised: [
      "それは驚きですね！もっと詳しく話してみませんか？",
      "わあ！そんなことになるとは思っていませんでした。もっと教えていただけますか？",
      "それは予想外でした！この状況でどのようにお手伝いできますか？",
      "それが驚くべきことだと理解できます！もっと詳しく話し合いたいですか？",
      "それは大きな発見ですね！それについてどう感じていますか？",
      "あら！私も驚きました。この驚きをどのように処理していますか？",
      "なんて興味深い展開でしょう！この驚きにどう対処していますか？",
      "驚いていることが理解できます！それについてどう思いますか？",
      "それは本当に予想外ですね！これが何を意味するのか一緒に考えてみますか？",
      "驚きは良いことも難しいこともあります。この驚きはあなたにどのような影響を与えていますか？"
    ]
  },
  fr: {
    greeting: "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
    happy: [
      "Je suis ravi que vous vous sentiez bien ! Comment puis-je rendre votre journée encore meilleure ?",
      "Votre bonheur est contagieux ! Que puis-je faire d'autre pour vous aider ?",
      "C'est merveilleux à entendre ! Y a-t-il quelque chose de spécifique dont vous aimeriez parler ?",
      "C'est génial de vous voir de si bonne humeur ! Comment puis-je contribuer à votre bonheur ?",
      "Votre énergie positive est rafraîchissante ! Dites-moi ce qui vous rend heureux.",
      "J'adore votre attitude joyeuse ! Continuons avec cette ambiance positive !",
      "Quel message charmant ! Votre bonheur illumine aussi ma journée.",
      "Je suis ravi que vous soyez heureux ! Voulez-vous parler de ce qui vous apporte de la joie ?",
      "Le bonheur est une émotion si belle ! Qu'est-ce qui vous fait sentir ainsi ?",
      "Votre bonheur me rend heureux aussi ! Parlons de quelque chose d'amusant !"
    ],
    sad: [
      "Je suis désolé de vous voir triste. Voulez-vous parler de ce qui vous préoccupe ?",
      "C'est normal de se sentir triste parfois. Y a-t-il quelque chose que je puisse faire pour aider ?",
      "J'espère que les choses s'amélioreront bientôt pour vous. Comment puis-je vous soutenir maintenant ?",
      "Partager ce qui vous trouble pourrait-il aider ? Je suis là pour écouter.",
      "Parfois, parler de sentiments tristes peut aider. Qu'avez-vous à l'esprit ?",
      "Je comprends que se sentir triste peut être difficile. Qu'est-ce qui pourrait vous remonter le moral ?",
      "J'aimerais pouvoir vous faire un câlin. Qu'est-ce qui vous rend triste aujourd'hui ?",
      "Vos sentiments sont valides. Parler de quelque chose de positif aiderait-il à remonter votre moral ?",
      "Je suis là pour vous pendant cette période difficile. Que puis-je faire pour vous faire sentir mieux ?",
      "La tristesse est temporaire. Trouvons quelque chose qui pourrait vous faire sourire à nouveau."
    ],
    angry: [
      "Je comprends que vous soyez frustré. Essayons de résoudre cela ensemble.",
      "Je vois que vous êtes contrarié. Parler de ce qui vous dérange aiderait-il ?",
      "Vos sentiments sont valides. Comment puis-je aider à résoudre ce qui vous met en colère ?",
      "Il semble que vous passiez un moment difficile. Souhaitez-vous discuter de ce qui s'est passé ?",
      "Je suis là pour vous aider avec ce qui vous a contrarié. Qu'est-ce qui améliorerait les choses ?",
      "Quand on est en colère, respirer profondément aide. Qu'est-ce qui cause votre frustration ?",
      "Je peux voir que c'est important pour vous. Dites-moi pourquoi vous vous sentez ainsi.",
      "Il est naturel de se sentir en colère parfois. Comment pouvons-nous canaliser cette énergie positivement ?",
      "Votre colère est compréhensible. Souhaitez-vous explorer des solutions ensemble ?",
      "J'apprécie que vous partagiez vos sentiments. Qu'est-ce qui aiderait à calmer la situation ?"
    ],
    neutral: [
      "Comment puis-je vous aider aujourd'hui ?",
      "De quoi aimeriez-vous parler ?",
      "Je suis là pour aider. De quoi avez-vous besoin ?",
      "Y a-t-il quelque chose de spécifique à l'esprit ?",
      "Comment puis-je vous être utile en ce moment ?",
      "Je vous écoute ! Quel est votre programme aujourd'hui ?",
      "Je suis prêt à discuter de tout ce qui vous intéresse.",
      "N'hésitez pas à partager vos pensées ou questions avec moi.",
      "Je suis tout ouïe ! De quoi aimeriez-vous discuter ?",
      "Je suis ravi de discuter avec vous ! De quoi allons-nous parler ?"
    ],
    surprised: [
      "C'est assez surprenant ! Voulez-vous en parler davantage ?",
      "Wow ! Je ne m'attendais pas à cela. Pouvez-vous m'en dire plus ?",
      "C'est inattendu ! Comment puis-je vous aider dans cette situation ?",
      "Je comprends pourquoi cela serait surprenant ! Voulez-vous en discuter davantage ?",
      "Quelle révélation ! Comment vous sentez-vous à ce sujet ?",
      "Oh ! Cela m'a aussi pris au dépourvu. Comment gérez-vous cette surprise ?",
      "Quel tournant intéressant ! Comment gérez-vous cette surprise ?",
      "Je comprends pourquoi vous seriez surpris ! Quelles sont vos pensées à ce sujet ?",
      "C'est définitivement inattendu ! Voulez-vous explorer ce que cela signifie ?",
      "Les surprises peuvent être bonnes et difficiles. Comment celle-ci vous affecte-t-elle ?"
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
