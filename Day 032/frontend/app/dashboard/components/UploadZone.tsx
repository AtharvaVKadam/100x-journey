'use client';

import { useState, useRef } from 'react';

export default function UploadZone() {
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            validateAndSetFile(file);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            validateAndSetFile(file);
        }
    };

    const validateAndSetFile = (file: File) => {
        if (file.type.startsWith('audio/') || file.type.startsWith('video/')) {
            setSelectedFile(file);
        } else {
            alert('Please upload an audio or video file (MP3, MP4, WAV).');
        }
    };

    return (
        <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Upload New Meeting</h2>
            
            <div 
                className={`border-2 border-dashed rounded-xl p-10 text-center transition-colors duration-200 ease-in-out cursor-pointer
                    ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    className="hidden" 
                    accept="audio/*,video/*"
                />
                
                {selectedFile ? (
                    <div className="space-y-2">
                        <div className="text-4xl">📄</div>
                        <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                        <p className="text-xs text-gray-500">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                        <button 
                            onClick={(e) => {
                                e.stopPropagation(); 
                                setSelectedFile(null);
                            }}
                            className="mt-4 px-4 py-2 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                        >
                            Remove File
                        </button>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <div className="text-4xl">☁️</div>
                        <p className="text-sm font-medium text-gray-900">
                            Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                            MP3, WAV, or MP4 (Max 50MB)
                        </p>
                    </div>
                )}
            </div>

            {selectedFile && (
                <button className="mt-6 w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg shadow-sm transition-colors">
                    Process with AI 🚀
                </button>
            )}
        </div>
    );
}