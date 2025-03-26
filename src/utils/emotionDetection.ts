
// Emotion types
export type Emotion = 'happy' | 'sad' | 'angry' | 'neutral' | 'surprised';

// Simple emotion detection patterns in different languages
const emotionPatterns = {
  en: {
    happy: [
      'happy', 'joy', 'excited', 'great', 'good', 'wonderful', 'love', 'like', 'awesome',
      'amazing', 'excellent', 'fantastic', 'thrilled', 'delighted', 'pleased', 'cheerful',
      'ecstatic', 'content', 'glad', 'jubilant', 'smile', 'laugh', 'enjoy', 'celebrate',
      'make me happy', 'feeling good', 'feeling great', 'feeling better', 'bright', 'sunshine',
      '😊', '😄', '😃', '❤️', '👍', '🥳', '😁', '😍'
    ],
    sad: [
      'sad', 'unhappy', 'depressed', 'bad', 'terrible', 'worst', 'cry', 'disappointed',
      'sorry', 'regret', 'miserable', 'heartbroken', 'down', 'gloomy', 'upset', 'distressed',
      'lonely', 'grief', 'mourn', 'tears', 'sobbing', 'depressing', 'hurt', 'pain',
      'awful', 'worst day', 'horrible', 'not good', 'feel bad', 'feeling down',
      '😢', '😭', '😔', '💔', '👎', '😿', '🥺', '😞'
    ],
    angry: [
      'angry', 'mad', 'furious', 'hate', 'annoyed', 'frustrated', 'upset', 'irritated',
      'rage', 'outraged', 'fuming', 'livid', 'infuriated', 'provoked', 'enraged', 'hostile',
      'bitter', 'resentful', 'furious', 'cross', 'pissed', 'irate', 'seething',
      'sick of', 'tired of', 'fed up', 'enough', 'stupid', 'ridiculous', 'unfair',
      '😠', '😡', '🤬', '💢', '👿', '😤', '💥'
    ],
    surprised: [
      'surprised', 'wow', 'unexpected', 'shock', 'amazed', 'astonished', 'speechless',
      'startled', 'stunned', 'dumbfounded', 'bewildered', 'flabbergasted', 'astounded',
      'awestruck', 'taken aback', 'caught off guard', 'shocking', 'incredible', 'unbelievable',
      'no way', 'really', 'seriously', 'omg', 'oh my god', 'what', 'what the',
      '😲', '😮', '😯', '😳', '🤯', '😱', '🙀', '😵'
    ]
  },
  es: {
    happy: [
      'feliz', 'alegre', 'contento', 'genial', 'bueno', 'maravilloso', 'amor', 'gustar', 
      'excelente', 'fantástico', 'encantado', 'dichoso', 'alegría', 'entusiasmado', 'radiante',
      'jubiloso', 'animado', 'satisfecho', 'complacido', 'divertido', 'sonrisa', 'reír', 'disfrutar',
      'hacerme feliz', 'sentirse bien', 'sentirse genial', 'sentirse mejor', 'brillante', 'sol',
      '😊', '😄', '😃', '❤️', '👍', '🥳', '😁', '😍'
    ],
    sad: [
      'triste', 'infeliz', 'deprimido', 'malo', 'terrible', 'peor', 'llorar', 'decepcionado',
      'lo siento', 'arrepentido', 'miserable', 'desconsolado', 'abatido', 'sombrío', 'afligido',
      'angustiado', 'solitario', 'duelo', 'luto', 'lágrimas', 'sollozando', 'deprimente', 'herido',
      'horrible', 'peor día', 'terrible', 'no bueno', 'sentirse mal', 'sentirse deprimido',
      '😢', '😭', '😔', '💔', '👎', '😿', '🥺', '😞'
    ],
    angry: [
      'enojado', 'enfadado', 'furioso', 'odio', 'molesto', 'frustrado', 'irritado',
      'rabia', 'indignado', 'furibundo', 'lívido', 'cabreado', 'provocado', 'enfurecido',
      'hostil', 'amargo', 'resentido', 'iracundo', 'colérico', 'rabioso', 'airado',
      'harto de', 'cansado de', 'estúpido', 'ridículo', 'injusto', 'bastante',
      '😠', '😡', '🤬', '💢', '👿', '😤', '💥'
    ],
    surprised: [
      'sorprendido', 'vaya', 'inesperado', 'choque', 'asombrado', 'atónito', 'sin palabras',
      'sobresaltado', 'estupefacto', 'perplejo', 'desconcertado', 'pasmado', 'maravillado',
      'impresionado', 'desprevenido', 'chocante', 'increíble', 'inaudito',
      'no puede ser', 'en serio', 'qué', 'qué demonios', 'dios mío', 'madre mía',
      '😲', '😮', '😯', '😳', '🤯', '😱', '🙀', '😵'
    ]
  },
  ja: {
    happy: [
      '嬉しい', '楽しい', '幸せ', '良い', 'いい', '素晴らしい', '大好き', '好き', '最高',
      '素敵', '喜び', '幸福', '嬉し', '愉快', '上機嫌', '快活', '欣喜', '喜んで', '歓喜',
      '満足', '楽', '朗らか', '晴れやか', '微笑む', '笑顔', '楽しむ', '祝う',
      '幸せにして', '気分が良い', '気分が最高', '気分が良くなる', '明るい', '太陽',
      '😊', '😄', '😃', '❤️', '👍', '🥳', '😁', '😍'
    ],
    sad: [
      '悲しい', '寂しい', '落ち込んでいる', '悪い', '酷い', '最悪', '泣く', 'がっかり',
      'ごめん', '後悔', '悲嘆', '憂鬱', '気落ち', '暗い', '心配', '悲痛', '孤独',
      '悲しむ', '慟哭', '涙', '号泣', '鬱', '傷心', '痛み', '悲しみ', '悲哀',
      '最悪だ', '最悪の日', 'ひどい', '良くない', '気分が悪い', '落ち込んでいる',
      '😢', '😭', '😔', '💔', '👎', '😿', '🥺', '😞'
    ],
    angry: [
      '怒る', '怒り', '激怒', '嫌い', '苛立つ', 'イライラ', '腹立たしい',
      '憤り', '激怒', '烈火', '憤激', '激昂', '挑発', '敵意', '苦い',
      '恨み', '憤る', '立腹', '逆上', '腹が立つ', '頭に来る',
      'うんざり', '飽きた', 'バカ', '馬鹿げている', '不公平', '十分',
      '😠', '😡', '🤬', '💢', '👿', '😤', '💥'
    ],
    surprised: [
      '驚いた', 'わあ', '予想外', 'ショック', '驚愕', '言葉を失う',
      '驚き', '愕然', '困惑', '当惑', '唖然', '度肝を抜かれる', '呆然',
      '面食らう', '不意打ち', '信じられない', '信じ難い', '衝撃的',
      'まさか', '本当に', 'マジで', '何それ', 'えっ', 'うそ', 'なんてこと',
      '😲', '😮', '😯', '😳', '🤯', '😱', '🙀', '😵'
    ]
  },
  fr: {
    happy: [
      'heureux', 'heureuse', 'joie', 'content', 'contente', 'génial', 'bon', 'bonne', 'merveilleux', 
      'merveilleuse', 'aimer', 'excellent', 'fantastique', 'enchanté', 'enchantée', 'ravi', 'ravie', 
      'joyeux', 'joyeuse', 'enthousiaste', 'radieux', 'radieuse', 'jubilant', 'jubilante', 'satisfait', 
      'satisfaite', 'sourire', 'rire', 'profiter', 'célébrer', 'me rendre heureux', 'me sentir bien',
      '😊', '😄', '😃', '❤️', '👍', '🥳', '😁', '😍'
    ],
    sad: [
      'triste', 'malheureux', 'malheureuse', 'déprimé', 'déprimée', 'mauvais', 'mauvaise', 'terrible', 
      'pire', 'pleurer', 'déçu', 'déçue', 'désolé', 'désolée', 'regret', 'misérable', 'chagriné', 
      'chagrinée', 'abattu', 'abattue', 'sombre', 'bouleversé', 'bouleversée', 'angoissé', 'angoissée', 
      'solitaire', 'larmes', 'sanglotant', 'déprimant', 'blessé', 'blessée', 'douleur', 'journée horrible',
      '😢', '😭', '😔', '💔', '👎', '😿', '🥺', '😞'
    ],
    angry: [
      'en colère', 'fâché', 'fâchée', 'furieux', 'furieuse', 'déteste', 'détester', 'agacé', 'agacée', 
      'frustré', 'frustrée', 'contrarié', 'contrariée', 'irrité', 'irritée', 'rage', 'indigné', 'indignée', 
      'fulminant', 'fulminante', 'livide', 'provocant', 'provocante', 'hostile', 'amer', 'amère', 
      'rancunier', 'rancunière', 'en avoir marre', 'fatigué de', 'fatiguée de', 'stupide', 'ridicule', 'injuste',
      '😠', '😡', '🤬', '💢', '👿', '😤', '💥'
    ],
    surprised: [
      'surpris', 'surprise', 'wow', 'inattendu', 'inattendue', 'choc', 'étonné', 'étonnée', 'stupéfait', 
      'stupéfaite', 'sans voix', 'sursauté', 'sursautée', 'abasourdi', 'abasourdie', 'perplexe', 'déconcerté', 
      'déconcertée', 'incroyable', 'invraisemblable', 'pas possible', 'vraiment', 'sérieusement', 
      'mon dieu', 'quoi', 'comment', 'qu\'est-ce que',
      '😲', '😮', '😯', '😳', '🤯', '😱', '🙀', '😵'
    ]
  }
};

// Function to detect emotion from text
export function detectEmotion(text: string, language: 'en' | 'es' | 'ja' | 'fr' = 'en'): Emotion {
  // Convert text to lowercase for pattern matching
  const lowerText = text.toLowerCase();
  
  // Check for each emotion pattern in the specified language
  const patterns = emotionPatterns[language] || emotionPatterns.en;
  
  // Define scoring system for emotions
  const scores: Record<Emotion, number> = {
    happy: 0,
    sad: 0,
    angry: 0,
    surprised: 0,
    neutral: 0
  };
  
  // Score each emotion based on keyword matches
  for (const [emotion, keywords] of Object.entries(patterns)) {
    for (const keyword of keywords) {
      if (lowerText.includes(keyword.toLowerCase())) {
        scores[emotion as Emotion] += 1;
      }
    }
  }
  
  // Find emotion with the highest score
  let detectedEmotion: Emotion = 'neutral';
  let highestScore = 0;
  
  for (const [emotion, score] of Object.entries(scores) as [Emotion, number][]) {
    if (score > highestScore) {
      highestScore = score;
      detectedEmotion = emotion;
    }
  }
  
  // If no emotion is detected strongly (score threshold), default to neutral
  if (highestScore < 1) {
    return 'neutral';
  }
  
  return detectedEmotion;
}
