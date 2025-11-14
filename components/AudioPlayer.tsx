
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { decodeAudioData } from '../utils/audioUtils';

interface AudioPlayerProps {
    audioBase64: string;
    onDownload: (format: 'mp3' | 'wav') => void;
}

// Custom icons for player controls
const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
);
const PauseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
);
const VolumeUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
        <path d="M7 4a1 1 0 00-2 0v12a1 1 0 102 0V4zM11 4a1 1 0 10-2 0v12a1 1 0 102 0V4zM4 8a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm12.89 1.11a1 1 0 00-1.78 0l-1.346 2.332a1 1 0 00.89 1.558H16.5a1 1 0 00.89-1.558l-1.346-2.332z" />
    </svg>
);


export const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioBase64, onDownload }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);

    const audioContextRef = useRef<AudioContext | null>(null);
    const audioBufferRef = useRef<AudioBuffer | null>(null);
    const sourceRef = useRef<AudioBufferSourceNode | null>(null);
    const startTimeRef = useRef<number>(0);
    const startOffsetRef = useRef<number>(0);
    const animationFrameRef = useRef<number>(0);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    const updateCurrentTime = useCallback(() => {
        if (audioContextRef.current && isPlaying) {
            const newTime = startOffsetRef.current + audioContextRef.current.currentTime - startTimeRef.current;
            setCurrentTime(Math.min(newTime, duration));
            animationFrameRef.current = requestAnimationFrame(updateCurrentTime);
        }
    }, [isPlaying, duration]);

    useEffect(() => {
        const initAudio = async () => {
            if (audioBase64) {
                // Cleanup previous audio if any
                if (sourceRef.current) {
                    sourceRef.current.stop();
                }
                setIsPlaying(false);
                setCurrentTime(0);
                startOffsetRef.current = 0;

                const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
                audioContextRef.current = audioContext;
                
                const decodedData = atob(audioBase64);
                const byteNumbers = new Array(decodedData.length);
                for (let i = 0; i < decodedData.length; i++) {
                    byteNumbers[i] = decodedData.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);

                const buffer = await decodeAudioData(byteArray, audioContext, 24000, 1);
                audioBufferRef.current = buffer;
                setDuration(buffer.duration);
            }
        };
        initAudio();

        return () => {
            if (sourceRef.current) {
                try { sourceRef.current.stop(); } catch(e) {}
            }
            if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
                audioContextRef.current.close();
            }
             cancelAnimationFrame(animationFrameRef.current);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [audioBase64]);


    const play = useCallback(() => {
        if (!audioContextRef.current || !audioBufferRef.current || isPlaying) return;
    
        if (audioContextRef.current.state === 'suspended') {
            audioContextRef.current.resume();
        }
    
        const source = audioContextRef.current.createBufferSource();
        source.buffer = audioBufferRef.current;
        source.connect(audioContextRef.current.destination);
    
        const offset = startOffsetRef.current;
        source.start(0, offset);
    
        source.onended = () => {
            setIsPlaying(false);
            const contextTime = audioContextRef.current?.currentTime || 0;
            const newOffset = startOffsetRef.current + contextTime - startTimeRef.current;
             if (newOffset >= duration - 0.01) {
                startOffsetRef.current = 0;
                setCurrentTime(0);
            } else {
                startOffsetRef.current = newOffset;
            }
            cancelAnimationFrame(animationFrameRef.current);
        };
    
        sourceRef.current = source;
        startTimeRef.current = audioContextRef.current.currentTime;
        setIsPlaying(true);
        animationFrameRef.current = requestAnimationFrame(updateCurrentTime);
    }, [isPlaying, duration, updateCurrentTime]);


    const pause = useCallback(() => {
        if (!sourceRef.current || !audioContextRef.current || !isPlaying) return;
    
        sourceRef.current.stop();
        sourceRef.current = null;
    
        const elapsed = audioContextRef.current.currentTime - startTimeRef.current;
        startOffsetRef.current += elapsed;
    
        setIsPlaying(false);
        cancelAnimationFrame(animationFrameRef.current);
    }, [isPlaying]);


    const togglePlayPause = () => {
        if (isPlaying) {
            pause();
        } else {
            play();
        }
    };
    
    useEffect(() => {
        if (sourceRef.current && audioContextRef.current) {
           const gainNode = audioContextRef.current.createGain();
           sourceRef.current.connect(gainNode);
           gainNode.connect(audioContextRef.current.destination);
           gainNode.gain.value = volume;
        }
    }, [volume]);
    
    return (
        <div className="mt-8 bg-gray-800 rounded-lg p-6 flex flex-col items-center shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Generated Speech</h3>
            <div className="flex items-center w-full max-w-lg">
                <button onClick={togglePlayPause} className="text-purple-400 hover:text-purple-300 transition-colors">
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>
                <div className="flex-grow mx-4">
                    <div className="relative h-2 bg-gray-700 rounded-full">
                         {/* Waveform Animation Placeholder */}
                        <div className="absolute top-0 left-0 h-full rounded-full bg-purple-500/30" style={{ width: '100%' }}></div>
                        <div className="absolute top-0 left-0 h-full rounded-full bg-purple-500" style={{ width: `${(currentTime / duration) * 100}%` }}></div>
                        <input
                            type="range"
                            min="0"
                            max={duration}
                            value={currentTime}
                            onChange={(e) => {
                                const newTime = parseFloat(e.target.value);
                                setCurrentTime(newTime);
                                startOffsetRef.current = newTime;
                                if(isPlaying) {
                                    pause();
                                    play();
                                }
                            }}
                            className="absolute w-full h-full opacity-0 cursor-pointer"
                        />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>
                <div className="flex items-center">
                    <VolumeUpIcon/>
                    <input 
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="w-24 ml-2"
                    />
                </div>
            </div>
            <div className="mt-6 flex space-x-4">
                <button onClick={() => onDownload('mp3')} className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md font-semibold transition-colors">Download MP3</button>
                <button onClick={() => onDownload('wav')} className="px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-md font-semibold transition-colors">Download WAV</button>
            </div>
        </div>
    );
};
