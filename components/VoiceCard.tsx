
import React from 'react';
import type { Voice } from '../types';

interface VoiceCardProps {
    voice: Voice;
    isSelected: boolean;
    onSelect: () => void;
}

const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
);


export const VoiceCard: React.FC<VoiceCardProps> = ({ voice, isSelected, onSelect }) => {
    const cardClasses = `
        bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 cursor-pointer
        hover:scale-105 hover:shadow-purple-500/30
        ${isSelected ? 'ring-2 ring-purple-500 scale-105' : 'ring-1 ring-gray-700'}
    `;

    const handlePlaySample = (e: React.MouseEvent) => {
        e.stopPropagation();
        // In a real app, this would play a pre-recorded sample.
        alert(`Playing sample for ${voice.name}. This is a placeholder.`);
    };

    return (
        <div className={cardClasses} onClick={onSelect}>
            <img className="w-full h-40 object-cover" src={voice.photoUrl} alt={voice.name} />
            <div className="p-4 text-center">
                <h3 className="font-bold text-lg">{voice.name}</h3>
                <p className="text-sm text-gray-400">{voice.age} yrs</p>
                <p className="text-xs text-gray-500 mt-1">{voice.type} {voice.gender}</p>
                 <button 
                    onClick={handlePlaySample}
                    className="mt-3 text-xs inline-flex items-center justify-center px-3 py-1.5 bg-gray-700 hover:bg-purple-600 rounded-full transition-colors duration-200">
                    <PlayIcon />
                    Play Sample
                </button>
            </div>
        </div>
    );
};
