
import React from 'react';
import type { Voice } from '../types';
import { VoiceCard } from './VoiceCard';

interface VoiceGalleryProps {
    voices: Voice[];
    selectedVoice: Voice;
    onSelectVoice: (voice: Voice) => void;
}

export const VoiceGallery: React.FC<VoiceGalleryProps> = ({ voices, selectedVoice, onSelectVoice }) => {
    return (
        <section className="py-8">
            <h2 className="text-3xl font-bold text-center mb-8">Choose a Voice</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {voices.map(voice => (
                    <VoiceCard
                        key={voice.id}
                        voice={voice}
                        isSelected={selectedVoice.id === voice.id}
                        onSelect={() => onSelectVoice(voice)}
                    />
                ))}
            </div>
        </section>
    );
};
