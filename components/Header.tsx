import React from 'react';

interface HeaderProps {
    installPrompt: any;
    onInstallClick: () => void;
}

const InstallIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 1H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h6v2H8v2h8v-2h-2v-2h6c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 13H4V3h16v11z"/>
        <path d="M12 10l-3 3h2v3h2v-3h2z"/>
    </svg>
);


export const Header: React.FC<HeaderProps> = ({ installPrompt, onInstallClick }) => {
    return (
        <header className="relative text-center py-6 border-b border-gray-700">
            <div className="flex flex-col items-center">
                 <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500">
                    Imran TTS
                </h1>
                <p className="text-lg text-gray-400 mt-2">
                    Ultra Human Realistic AI Voice Generator
                </p>
            </div>
           
            {installPrompt && (
                 <button 
                    onClick={onInstallClick} 
                    title="Install App"
                    className="absolute top-1/2 -translate-y-1/2 right-4 md:right-6 flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md rounded-lg transform hover:scale-105 transition-all duration-200 text-sm font-medium"
                >
                    <InstallIcon />
                    <span className="hidden md:inline">Install App</span>
                </button>
            )}
        </header>
    );
};
