
export interface Voice {
    id: number;
    name: string;
    gender: 'Male' | 'Female';
    type: 'Calm' | 'Heavy/Deep';
    description: string;
    age: string;
    photoUrl: string;
    geminiVoiceName: 'Kore' | 'Puck' | 'Charon' | 'Fenrir' | 'Zephyr';
}

export type Emotion = 'Calm' | 'Sad' | 'Angry' | 'Happy' | 'Excited' | 'Storytelling' | 'Whisper';

export type Accent = 'American' | 'British' | 'Australian' | 'Arabic' | 'Urdu' | 'Hindi' | 'Spanish' | 'French' | 'Chinese' | 'Turkish' | 'Italian' | 'Korean' | 'Japanese';

export interface Language {
    code: string;
    name: string;
}
