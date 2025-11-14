
import React from 'react';
import { LANGUAGES, EMOTIONS, ACCENTS } from '../constants';
import type { Language, Emotion, Accent } from '../types';

interface TextInputSectionProps {
    text: string;
    setText: (text: string) => void;
    language: Language;
    setLanguage: (language: Language) => void;
    emotion: Emotion;
    setEmotion: (emotion: Emotion) => void;
    accent: Accent;
    setAccent: (accent: Accent) => void;
    onGenerate: () => void;
    isLoading: boolean;
}

export const TextInputSection: React.FC<TextInputSectionProps> = ({
    text,
    setText,
    language,
    setLanguage,
    emotion,
    setEmotion,
    accent,
    setAccent,
    onGenerate,
    isLoading
}) => {
    return (
        <section className="py-8 mt-8 bg-gray-800/50 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex flex-col">
                    <label htmlFor="language-select" className="text-sm font-medium text-gray-400 mb-1">Language</label>
                    <select
                        id="language-select"
                        value={language.code}
                        onChange={(e) => setLanguage(LANGUAGES.find(l => l.code === e.target.value) || LANGUAGES[0])}
                        className="bg-gray-700 border border-gray-600 rounded-md p-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                        {LANGUAGES.map(lang => <option key={lang.code} value={lang.code}>{lang.name}</option>)}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="emotion-select" className="text-sm font-medium text-gray-400 mb-1">Emotion</label>
                    <select
                        id="emotion-select"
                        value={emotion}
                        onChange={(e) => setEmotion(e.target.value as Emotion)}
                        className="bg-gray-700 border border-gray-600 rounded-md p-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                        {EMOTIONS.map(emo => <option key={emo} value={emo}>{emo}</option>)}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="accent-select" className="text-sm font-medium text-gray-400 mb-1">Accent</label>
                    <select
                        id="accent-select"
                        value={accent}
                        onChange={(e) => setAccent(e.target.value as Accent)}
                        className="bg-gray-700 border border-gray-600 rounded-md p-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                        {ACCENTS.map(acc => <option key={acc} value={acc}>{acc}</option>)}
                    </select>
                </div>
            </div>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your text here... Unlimited characters allowed."
                className="w-full h-48 p-4 bg-gray-900 border border-gray-700 rounded-lg resize-y focus:ring-2 focus:ring-purple-500 focus:outline-none transition-shadow"
            />
            <div className="mt-6 flex justify-center">
                <button
                    onClick={onGenerate}
                    disabled={isLoading}
                    className="text-lg font-bold px-12 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                >
                    {isLoading ? 'Generating...' : 'Generate Voice'}
                </button>
            </div>
        </section>
    );
};
