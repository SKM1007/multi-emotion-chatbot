
// Emotion types
export type Emotion = 'happy' | 'sad' | 'angry' | 'neutral' | 'surprised';

// Simple emotion detection patterns in different languages
const emotionPatterns = {
  en: {
    happy: [
      'happy', 'joy', 'excited', 'great', 'good', 'wonderful', 'love', 'like', 'awesome',
      'amazing', 'excellent', 'fantastic', 'thrilled', 'delighted', 'pleased', 'cheerful',
      'ecstatic', 'content', 'glad', 'jubilant', 'smile', 'laugh', 'enjoy', 'celebrate',
      '😊', '😄', '😃', '❤️', '👍', '🥳', '😁', '😍'
    ],
    sad: [
      'sad', 'unhappy', 'depressed', 'bad', 'terrible', 'worst', 'cry', 'disappointed',
      'sorry', 'regret', 'miserable', 'heartbroken', 'down', 'gloomy', 'upset', 'distressed',
      'lonely', 'grief', 'mourn', 'tears', 'sobbing', 'depressing', 'hurt', 'pain',
      '😢', '😭', '😔', '💔', '👎', '😿', '🥺', '😞'
    ],
    angry: [
      'angry', 'mad', 'furious', 'hate', 'annoyed', 'frustrated', 'upset', 'irritated',
      'rage', 'outraged', 'fuming', 'livid', 'infuriated', 'provoked', 'enraged', 'hostile',
      'bitter', 'resentful', 'furious', 'cross', 'pissed', 'irate', 'seething',
      '😠', '😡', '🤬', '💢', '👿', '😤', '💥'
    ],
    surprised: [
      'surprised', 'wow', 'unexpected', 'shock', 'amazed', 'astonished', 'speechless',
      'startled', 'stunned', 'dumbfounded', 'bewildered', 'flabbergasted', 'astounded',
      'awestruck', 'taken aback', 'caught off guard', 'shocking', 'incredible', 'unbelievable',
      '😲', '😮', '😯', '😳', '🤯', '😱', '🙀', '😵'
    ]
  },
  es: {
    happy: [
      'feliz', 'alegre', 'contento', 'genial', 'bueno', 'maravilloso', 'amor', 'gustar', 
      'excelente', 'fantástico', 'encantado', 'dichoso', 'alegría', 'entusiasmado', 'radiante',
      'jubiloso', 'animado', 'satisfecho', 'complacido', 'divertido', 'sonrisa', 'reír', 'disfrutar',
      '😊', '😄', '😃', '❤️', '👍', '🥳', '😁', '😍'
    ],
    sad: [
      'triste', 'infeliz', 'deprimido', 'malo', 'terrible', 'peor', 'llorar', 'decepcionado',
      'lo siento', 'arrepentido', 'miserable', 'desconsolado', 'abatido', 'sombrío', 'afligido',
      'angustiado', 'solitario', 'duelo', 'luto', 'lágrimas', 'sollozando', 'deprimente', 'herido',
      '😢', '😭', '😔', '💔', '👎', '😿', '🥺', '😞'
    ],
    angry: [
      'enojado', 'enfadado', 'furioso', 'odio', 'molesto', 'frustrado', 'irritado',
      'rabia', 'indignado', 'furibundo', 'lívido', 'cabreado', 'provocado', 'enfurecido',
      'hostil', 'amargo', 'resentido', 'iracundo', 'colérico', 'rabioso', 'airado',
      '😠', '😡', '🤬', '💢', '👿', '😤', '💥'
    ],
    surprised: [
      'sorprendido', 'vaya', 'inesperado', 'choque', 'asombrado', 'atónito', 'sin palabras',
      'sobresaltado', 'estupefacto', 'perplejo', 'desconcertado', 'pasmado', 'maravillado',
      'impresionado', 'estupefacto', 'desprevenido', 'chocante', 'increíble', 'inaudito',
      '😲', '😮', '😯', '😳', '🤯', '😱', '🙀', '😵'
    ]
  },
  ja: {
    happy: [
      '嬉しい', '楽しい', '幸せ', '良い', 'いい', '素晴らしい', '大好き', '好き', '最高',
      '素敵', '喜び', '幸福', '嬉し', '愉快', '上機嫌', '快活', '欣喜', '喜んで', '歓喜',
      '満足', '楽', '朗らか', '晴れやか', '微笑む', '笑顔', '楽しむ', '祝う',
      '😊', '😄', '😃', '❤️', '👍', '🥳', '😁', '😍'
    ],
    sad: [
      '悲しい', '寂しい', '落ち込んでいる', '悪い', '酷い', '最悪', '泣く', 'がっかり',
      'ごめん', '後悔', '悲嘆', '憂鬱', '気落ち', '暗い', '心配', '悲痛', '孤独',
      '悲しむ', '慟哭', '涙', '号泣', '鬱', '傷心', '痛み', '悲しみ', '悲哀',
      '😢', '😭', '😔', '💔', '👎', '😿', '🥺', '😞'
    ],
    angry: [
      '怒る', '怒り', '激怒', '嫌い', '苛立つ', 'イライラ', '腹立たしい',
      '憤り', '激怒', '烈火', '憤激', '激昂', '挑発', '敵意', '苦い',
      '恨み', '憤る', '立腹', '逆上', '腹が立つ', '頭に来る',
      '😠', '😡', '🤬', '💢', '👿', '😤', '💥'
    ],
    surprised: [
      '驚いた', 'わあ', '予想外', 'ショック', '驚愕', '言葉を失う',
      '驚き', '愕然', '困惑', '当惑', '唖然', '度肝を抜かれる', '呆然',
      '面食らう', '不意打ち', '信じられない', '信じ難い', '衝撃的',
      '😲', '😮', '😯', '😳', '🤯', '😱', '🙀', '😵'
    ]
  }
};

// Function to detect emotion from text
export function detectEmotion(text: string, language: 'en' | 'es' | 'ja' = 'en'): Emotion {
  // Convert text to lowercase for pattern matching
  const lowerText = text.toLowerCase();
  
  // Check for each emotion pattern in the specified language
  const patterns = emotionPatterns[language] || emotionPatterns.en;
  
  for (const [emotion, keywords] of Object.entries(patterns)) {
    for (const keyword of keywords) {
      if (lowerText.includes(keyword.toLowerCase())) {
        return emotion as Emotion;
      }
    }
  }
  
  // Default to neutral if no emotion is detected
  return 'neutral';
}
