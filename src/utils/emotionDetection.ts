
// Emotion types
export type Emotion = 'happy' | 'sad' | 'angry' | 'neutral' | 'surprised';

// Simple emotion detection patterns in different languages
const emotionPatterns = {
  en: {
    happy: [
      'happy', 'joy', 'excited', 'great', 'good', 'wonderful', 'love', 'like', 'awesome',
      'amazing', 'excellent', '😊', '😄', '😃', '❤️', '👍'
    ],
    sad: [
      'sad', 'unhappy', 'depressed', 'bad', 'terrible', 'worst', 'cry', 'disappointed',
      'sorry', 'regret', '😢', '😭', '😔', '💔', '👎'
    ],
    angry: [
      'angry', 'mad', 'furious', 'hate', 'annoyed', 'frustrated', 'upset', 'irritated',
      '😠', '😡', '🤬', '💢'
    ],
    surprised: [
      'surprised', 'wow', 'unexpected', 'shock', 'amazed', 'astonished', 'speechless',
      '😲', '😮', '😯', '😳', '🤯'
    ]
  },
  es: {
    happy: [
      'feliz', 'alegre', 'contento', 'genial', 'bueno', 'maravilloso', 'amor', 'gustar', 
      'excelente', 'fantástico', '😊', '😄', '😃', '❤️', '👍'
    ],
    sad: [
      'triste', 'infeliz', 'deprimido', 'malo', 'terrible', 'peor', 'llorar', 'decepcionado',
      'lo siento', 'arrepentido', '😢', '😭', '😔', '💔', '👎'
    ],
    angry: [
      'enojado', 'enfadado', 'furioso', 'odio', 'molesto', 'frustrado', 'irritado',
      '😠', '😡', '🤬', '💢'
    ],
    surprised: [
      'sorprendido', 'vaya', 'inesperado', 'choque', 'asombrado', 'atónito', 'sin palabras',
      '😲', '😮', '😯', '😳', '🤯'
    ]
  },
  ja: {
    happy: [
      '嬉しい', '楽しい', '幸せ', '良い', 'いい', '素晴らしい', '大好き', '好き', '最高',
      '素敵', '😊', '😄', '😃', '❤️', '👍'
    ],
    sad: [
      '悲しい', '寂しい', '落ち込んでいる', '悪い', '酷い', '最悪', '泣く', 'がっかり',
      'ごめん', '後悔', '😢', '😭', '😔', '💔', '👎'
    ],
    angry: [
      '怒る', '怒り', '激怒', '嫌い', '苛立つ', 'イライラ', '腹立たしい',
      '😠', '😡', '🤬', '💢'
    ],
    surprised: [
      '驚いた', 'わあ', '予想外', 'ショック', '驚愕', '言葉を失う',
      '😲', '😮', '😯', '😳', '🤯'
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
