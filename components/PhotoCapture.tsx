'use client'
import React, { useState, useRef, useCallback } from 'react';
import { Camera, Upload, X, Check, AlertCircle } from 'lucide-react';

interface PhotoCaptureProps {
    onPhotoCapture: (photoDataUrl: string) => void;
    onClose: () => void;
}

const PhotoCapture: React.FC<PhotoCaptureProps> = ({ onPhotoCapture, onClose }) => {
    const [isStreaming, setIsStreaming] = useState(false);
    const [photoTaken, setPhotoTaken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const startCamera = useCallback(async () => {
        try {
            setError(null);
            const constraints = {
                video: {
                    facingMode: facingMode,
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            };

            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                streamRef.current = stream;
                setIsStreaming(true);
            }
        } catch (err) {
            setError('Unable to access camera. Please ensure you have granted camera permissions.');
            console.error('Camera access error:', err);
        }
    }, [facingMode]);

    const stopCamera = useCallback(() => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        setIsStreaming(false);
    }, []);

    const capturePhoto = useCallback(() => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            if (context) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                
                const photoDataUrl = canvas.toDataURL('image/jpeg', 0.9);
                setPhotoTaken(photoDataUrl);
                stopCamera();
            }
        }
    }, [stopCamera]);

    const retakePhoto = () => {
        setPhotoTaken(null);
        startCamera();
    };

    const confirmPhoto = () => {
        if (photoTaken) {
            onPhotoCapture(photoTaken);
            stopCamera();
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const photoDataUrl = event.target?.result as string;
                setPhotoTaken(photoDataUrl);
                stopCamera();
            };
            reader.readAsDataURL(file);
        }
    };

    const toggleCamera = () => {
        stopCamera();
        setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
        setTimeout(() => startCamera(), 100);
    };

    React.useEffect(() => {
        startCamera();
        return () => {
            stopCamera();
        };
    }, [startCamera, stopCamera]);

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-darkgreen">Capture Your Photo</h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-darkgreen/10 rounded-full transition-all"
                        >
                            <X className="w-5 h-5 text-darkgreen" />
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-600 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            {error}
                        </div>
                    )}

                    {/* Camera/Photo Display */}
                    <div className="relative mb-6">
                        {photoTaken ? (
                            <div className="relative">
                                <img 
                                    src={photoTaken} 
                                    alt="Captured photo" 
                                    className="w-full h-auto rounded-xl"
                                />
                            </div>
                        ) : (
                            <div className="relative bg-black rounded-xl overflow-hidden">
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    playsInline
                                    muted
                                    className="w-full h-auto"
                                    style={{ transform: facingMode === 'user' ? 'scaleX(-1)' : 'none' }}
                                />
                                <canvas ref={canvasRef} className="hidden" />
                                
                                {/* Camera controls overlay */}
                                {isStreaming && (
                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
                                        <button
                                            onClick={toggleCamera}
                                            className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all"
                                            title="Switch camera"
                                        >
                                            <Camera className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={capturePhoto}
                                            className="p-4 bg-darkgreen rounded-full text-white hover:bg-darkgreen/90 transition-all transform hover:scale-105"
                                        >
                                            <div className="w-8 h-8 bg-white rounded-full" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        {!photoTaken && !isStreaming && (
                            <>
                                <button
                                    onClick={startCamera}
                                    className="flex-1 flex items-center justify-center gap-2 bg-darkgreen text-white px-4 py-3 rounded-xl hover:bg-darkgreen/90 transition-all"
                                >
                                    <Camera className="w-4 h-4" />
                                    Start Camera
                                </button>
                                <label className="flex-1 flex items-center justify-center gap-2 bg-gray-600 text-white px-4 py-3 rounded-xl hover:bg-gray-700 transition-all cursor-pointer">
                                    <Upload className="w-4 h-4" />
                                    Upload Photo
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileUpload}
                                        className="hidden"
                                    />
                                </label>
                            </>
                        )}

                        {photoTaken && (
                            <>
                                <button
                                    onClick={retakePhoto}
                                    className="flex-1 flex items-center justify-center gap-2 bg-gray-600 text-white px-4 py-3 rounded-xl hover:bg-gray-700 transition-all"
                                >
                                    <Camera className="w-4 h-4" />
                                    Retake
                                </button>
                                <button
                                    onClick={confirmPhoto}
                                    className="flex-1 flex items-center justify-center gap-2 bg-darkgreen text-white px-4 py-3 rounded-xl hover:bg-darkgreen/90 transition-all"
                                >
                                    <Check className="w-4 h-4" />
                                    Use This Photo
                                </button>
                            </>
                        )}
                    </div>

                    {/* Instructions */}
                    {!photoTaken && (
                        <div className="mt-4 p-4 bg-darkgreen/10 rounded-xl">
                            <p className="text-sm text-darkgreen/70">
                                <strong>Photo Guidelines:</strong><br />
                                • Ensure your face is clearly visible<br />
                                • Use good lighting<br />
                                • Look directly at the camera<br />
                                • Avoid wearing hats or sunglasses
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PhotoCapture;
