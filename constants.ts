
import type { Voice, Emotion, Accent, Language } from './types';

export const VOICES: Voice[] = [
    // 5 Calm Female Voices
    { id: 1, name: 'Eleonora', gender: 'Female', type: 'Calm', description: 'A soothing and wise voice, perfect for meditation and storytelling.', age: '50-60', photoUrl: 'https://picsum.photos/seed/eleonora/200/200', geminiVoiceName: 'Kore' },
    { id: 2, name: 'Seraphina', gender: 'Female', type: 'Calm', description: 'Gentle, clear, and reassuring. Ideal for educational content.', age: '50-60', photoUrl: 'https://picsum.photos/seed/seraphina/200/200', geminiVoiceName: 'Kore' },
    { id: 3, name: 'Isabelle', gender: 'Female', type: 'Calm', description: 'A warm and friendly voice with a touch of sophistication.', age: '50-60', photoUrl: 'https://picsum.photos/seed/isabelle/200/200', geminiVoiceName: 'Kore' },
    { id: 4, name: 'Clara', gender: 'Female', type: 'Calm', description: 'Patient and articulate, with a comforting presence.', age: '50-60', photoUrl: 'https://picsum.photos/seed/clara/200/200', geminiVoiceName: 'Kore' },
    { id: 5, name: 'Beatrice', gender: 'Female', type: 'Calm', description: 'Elegant and mature, conveying authority and grace.', age: '50-60', photoUrl: 'https://picsum.photos/seed/beatrice/200/200', geminiVoiceName: 'Kore' },
    // 5 Calm Male Voices
    { id: 6, name: 'Arthur', gender: 'Male', type: 'Calm', description: 'A calm and thoughtful voice, conveying wisdom and experience.', age: '50-60', photoUrl: 'https://picsum.photos/seed/arthur/200/200', geminiVoiceName: 'Puck' },
    { id: 7, name: 'Winston', gender: 'Male', type: 'Calm', description: 'Steady and reliable, perfect for audiobooks and narrations.', age: '50-60', photoUrl: 'https://picsum.photos/seed/winston/200/200', geminiVoiceName: 'Puck' },
    { id: 8, name: 'Julian', gender: 'Male', type: 'Calm', description: 'A smooth and cultured voice that is easy to listen to.', age: '50-60', photoUrl: 'https://picsum.photos/seed/julian/200/200', geminiVoiceName: 'Puck' },
    { id: 9, name: 'Samuel', gender: 'Male', type: 'Calm', description: 'A friendly and trustworthy narrator with a calm demeanor.', age: '50-60', photoUrl: 'https://picsum.photos/seed/samuel/200/200', geminiVoiceName: 'Puck' },
    { id: 10, name: 'Leonard', gender: 'Male', type: 'Calm', description: 'A soft-spoken and introspective voice for deep topics.', age: '50-60', photoUrl: 'https://picsum.photos/seed/leonard/200/200', geminiVoiceName: 'Puck' },
    // 5 Heavy/Deep Female Voices
    { id: 11, name: 'Diana', gender: 'Female', type: 'Heavy/Deep', description: 'A commanding and resonant voice, full of depth and character.', age: '50-60', photoUrl: 'https://picsum.photos/seed/diana/200/200', geminiVoiceName: 'Charon' },
    { id: 12, name: 'Victoria', gender: 'Female', type: 'Heavy/Deep', description: 'Rich and powerful, ideal for dramatic readings and announcements.', age: '50-60', photoUrl: 'https://picsum.photos/seed/victoria/200/200', geminiVoiceName: 'Charon' },
    { id: 13, name: 'Morganna', gender: 'Female', type: 'Heavy/Deep', description: 'A mysterious and husky voice that captivates listeners.', age: '50-60', photoUrl: 'https://picsum.photos/seed/morganna/200/200', geminiVoiceName: 'Charon' },
    { id: 14, name: 'Helen', gender: 'Female', type: 'Heavy/Deep', description: 'A mature and authoritative voice with a heavy, confident tone.', age: '50-60', photoUrl: 'https://picsum.photos/seed/helen/200/200', geminiVoiceName: 'Charon' },
    { id: 15, name: 'Genevieve', gender: 'Female', type: 'Heavy/Deep', description: 'A deep, velvety voice that is both strong and soothing.', age: '50-60', photoUrl: 'https://picsum.photos/seed/genevieve/200/200', geminiVoiceName: 'Charon' },
    // 5 Heavy/Deep Male Voices
    { id: 16, name: 'Gideon', gender: 'Male', type: 'Heavy/Deep', description: 'A deep, booming voice that commands attention. Perfect for trailers.', age: '50-60', photoUrl: 'https://picsum.photos/seed/gideon/200/200', geminiVoiceName: 'Fenrir' },
    { id: 17, name: 'Maximus', gender: 'Male', type: 'Heavy/Deep', description: 'A gravelly and powerful voice, filled with gravitas and strength.', age: '50-60', photoUrl: 'https://picsum.photos/seed/maximus/200/200', geminiVoiceName: 'Fenrir' },
    { id: 18, name: 'Orson', gender: 'Male', type: 'Heavy/Deep', description: 'A resonant and impactful voice for epic storytelling.', age: '50-60', photoUrl: 'https://picsum.photos/seed/orson/200/200', geminiVoiceName: 'Zephyr' },
    { id: 19, name: 'Silas', gender: 'Male', type: 'Heavy/Deep', description: 'A heavy, thoughtful voice with a hint of mystery.', age: '50-60', photoUrl: 'https://picsum.photos/seed/silas/200/200', geminiVoiceName: 'Zephyr' },
    { id: 20, name: 'Victor', gender: 'Male', type: 'Heavy/Deep', description: 'A strong and decisive voice, conveying leadership and confidence.', age: '50-60', photoUrl: 'https://picsum.photos/seed/victor/200/200', geminiVoiceName: 'Zephyr' },
];

export const EMOTIONS: Emotion[] = ['Calm', 'Happy', 'Sad', 'Angry', 'Excited', 'Storytelling', 'Whisper'];

export const ACCENTS: Accent[] = ['American', 'British', 'Australian', 'Arabic', 'Urdu', 'Hindi', 'Spanish', 'French', 'Chinese', 'Turkish', 'Italian', 'Korean', 'Japanese'];

export const LANGUAGES: Language[] = [
    { code: 'en-US', name: 'English' },
    { code: 'es-ES', name: 'Spanish' },
    { code: 'fr-FR', name: 'French' },
    { code: 'zh-CN', name: 'Chinese' },
    { code: 'ja-JP', name: 'Japanese' },
    { code: 'ko-KR', name: 'Korean' },
    { code: 'it-IT', name: 'Italian' },
    { code: 'tr-TR', name: 'Turkish' },
    { code: 'ar-SA', name: 'Arabic' },
    { code: 'hi-IN', name: 'Hindi' },
    { code: 'ur-PK', name: 'Urdu' },
];
