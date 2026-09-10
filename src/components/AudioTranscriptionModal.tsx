/**
 * SKTECH EXAM — Audio Voice Transcription & Oral Doubt Resolver
 * Model: gemini-3.5-transcribe
 * Supports microphone recording, audio visualizer, file upload, bilingual English/Hindi transcription,
 * and persistent storage into Firebase Firestore.
 * Brand: SKTECH • Powered by SKTECH • All Rights Reserved © 2026
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Mic,
  Square,
  Volume2,
  Sparkles,
  Copy,
  Check,
  Search,
  UploadCloud,
  FileAudio,
  BookmarkPlus,
  RefreshCw,
  X,
  Radio,
  AlertCircle,
  Database,
} from 'lucide-react';
import { api } from '../services/apiClient';
import { saveVoiceNoteToFirestore } from '../lib/firebase';
import { User } from '../types';

interface AudioTranscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: User | null;
  onSearchQuery?: (transcription: string) => void;
  language?: 'en' | 'hi';
}

export const AudioTranscriptionModal: React.FC<AudioTranscriptionModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSearchQuery,
  language = 'en',
}) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordingDuration, setRecordingDuration] = useState<number>(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [transcription, setTranscription] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [savedToFirestore, setSavedToFirestore] = useState<boolean>(false);
  const [dragOver, setDragOver] = useState<boolean>(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Reset states on open/close
  useEffect(() => {
    if (!isOpen) {
      stopRecordingCleanup();
      setError(null);
    }
  }, [isOpen]);

  const stopRecordingCleanup = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  if (!isOpen) return null;

  // Start audio recording with microphone
  const handleStartRecording = async () => {
    setError(null);
    setTranscription('');
    setAudioBlob(null);
    setSavedToFirestore(false);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Microphone access is not supported in this browser. Please use the file upload or sample queries below.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];

      // Prefer audio/webm if supported, fallback to audio/ogg or default
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : MediaRecorder.isTypeSupported('audio/webm')
        ? 'audio/webm'
        : 'audio/ogg';

      const recorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        const finalBlob = new Blob(audioChunksRef.current, { type: recorder.mimeType || 'audio/webm' });
        setAudioBlob(finalBlob);
        stream.getTracks().forEach((track) => track.stop());
        await processAudioTranscription(finalBlob);
      };

      recorder.start(250);
      setIsRecording(true);
      setRecordingDuration(0);

      timerRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } catch (err: any) {
      console.warn('Microphone permission or hardware issue:', err);
      setError(
        err?.message?.includes('Permission')
          ? 'Microphone permission was denied. Please allow microphone access in your browser or test with a sample voice query below.'
          : err?.message || 'Could not initialize microphone.'
      );
      setIsRecording(false);
    }
  };

  // Stop recording and send for transcription
  const handleStopRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRecording(false);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  };

  // Process blob into Base64 and call gemini-3.5-transcribe
  const processAudioTranscription = async (blob: Blob) => {
    setIsProcessing(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        try {
          const resp = await api.transcribeAudio(base64String, blob.type || 'audio/webm');
          if (resp.success && resp.data?.transcription) {
            setTranscription(resp.data.transcription);
            // If candidate is signed in, automatically persist note to Firestore
            if (currentUser?.id) {
              await saveVoiceNoteToFirestore(currentUser.id, {
                id: `vnote_${Date.now()}`,
                transcription: resp.data.transcription,
                audioDurationSeconds: recordingDuration,
                sourceLang: language,
              });
              setSavedToFirestore(true);
            }
          } else {
            setError('Transcription model returned no text.');
          }
        } catch (err: any) {
          setError(err?.message || 'Transcription failed.');
        } finally {
          setIsProcessing(false);
        }
      };
      reader.readAsDataURL(blob);
    } catch (err: any) {
      setError('Error reading audio buffer.');
      setIsProcessing(false);
    }
  };

  // Handle manual audio file upload (drag & drop or file picker)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleAudioFile(file);
    }
  };

  const handleAudioFile = (file: File) => {
    setError(null);
    setAudioBlob(file);
    processAudioTranscription(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      handleAudioFile(file);
    } else {
      setError('Please upload an audio file (e.g. .mp3, .wav, .webm, .m4a)');
    }
  };

  // Sample prompt test triggers
  const handleSamplePrompt = (text: string) => {
    setTranscription(text);
    setError(null);
    if (currentUser?.id) {
      saveVoiceNoteToFirestore(currentUser.id, {
        id: `vnote_sample_${Date.now()}`,
        transcription: text,
        sourceLang: language,
      });
      setSavedToFirestore(true);
    }
  };

  const handleCopy = () => {
    if (transcription) {
      navigator.clipboard.writeText(transcription);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div
      id="audio-transcription-modal"
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
    >
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-rose-500/25">
              <Mic className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-extrabold text-base text-slate-900">
                  {language === 'en' ? 'Voice Question & Doubt Transcriber' : 'आवाज से प्रश्न एवं संदेह ट्रांसक्राइबर'}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                  gemini-3.5-transcribe
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Speak your competitive exam query or doubt in Hindi, English, or Hinglish for instant AI transcription.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span className="flex-1">{error}</span>
          </div>
        )}

        {/* Microphone Recording Console */}
        <div className="bg-slate-900 rounded-2xl p-6 text-center text-white relative overflow-hidden shadow-inner">
          {/* Audio Wave Visualizer Animation */}
          {isRecording ? (
            <div className="flex items-center justify-center space-x-1.5 h-14 mb-4">
              {[40, 75, 50, 90, 60, 100, 45, 80, 65, 95, 30].map((h, i) => (
                <span
                  key={i}
                  className="w-1.5 bg-rose-400 rounded-full animate-pulse"
                  style={{
                    height: `${h}%`,
                    animationDelay: `${i * 100}ms`,
                    animationDuration: '600ms',
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="h-14 flex items-center justify-center mb-4 text-slate-500">
              <Radio className="w-8 h-8 opacity-40" />
            </div>
          )}

          {/* Status & Timer */}
          <div className="mb-4">
            {isRecording ? (
              <div className="space-y-1">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 text-xs font-mono font-bold border border-rose-500/30">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span>RECORDING • {formatTime(recordingDuration)}</span>
                </div>
                <p className="text-xs text-slate-300">Speak clearly into your microphone...</p>
              </div>
            ) : isProcessing ? (
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
                <span>Transcribing via gemini-3.5-transcribe...</span>
              </div>
            ) : (
              <p className="text-xs text-slate-400">
                Tap the microphone button to start dictating your exam question or doubt.
              </p>
            )}
          </div>

          {/* Record / Stop Action Button */}
          <div className="flex items-center justify-center space-x-4">
            {!isRecording ? (
              <button
                type="button"
                onClick={handleStartRecording}
                disabled={isProcessing}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white flex items-center justify-center shadow-lg shadow-rose-500/30 hover:scale-105 transition active:scale-95 cursor-pointer disabled:opacity-50"
                title="Start Recording"
              >
                <Mic className="w-8 h-8" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleStopRecording}
                className="w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center shadow-lg shadow-rose-600/40 hover:scale-105 transition active:scale-95 cursor-pointer animate-pulse"
                title="Stop Recording and Transcribe"
              >
                <Square className="w-7 h-7 fill-current" />
              </button>
            )}
          </div>
        </div>

        {/* Alternative: Drag-and-Drop / File Upload Option */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-3 text-center cursor-pointer transition ${
            dragOver ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <div className="flex items-center justify-center space-x-2 text-xs text-slate-600">
            <UploadCloud className="w-4 h-4 text-indigo-500" />
            <span>
              Or <strong>drag & drop</strong> or <strong>browse</strong> an audio recording (.mp3, .wav, .webm)
            </span>
          </div>
        </div>

        {/* Quick Sample Prompts (Handy for instant testing or iframe permission fallback) */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Quick Oral Prompts (Click to test transcription):
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[
              'What is the negative marking rule in SSC CGL 2026 Tier 1?',
              'Explain Sectional Cut-off strategy for IBPS PO Quantitative Aptitude',
              'What are the Fundamental Rights in Article 19 to 22?',
              'How to calculate Compound Interest with semi-annual compounding?',
            ].map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSamplePrompt(q)}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 transition border border-slate-200 cursor-pointer text-left"
              >
                💬 "{q}"
              </button>
            ))}
          </div>
        </div>

        {/* Transcription Output View */}
        {transcription && (
          <div className="space-y-2 bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Transcribed Text (Bilingual AI)</span>
              </span>
              <div className="flex items-center space-x-2">
                {savedToFirestore && (
                  <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    <Database className="w-3 h-3" />
                    <span>Saved to Firestore</span>
                  </span>
                )}
                <button
                  onClick={handleCopy}
                  className="text-xs font-semibold text-slate-600 hover:text-indigo-600 flex items-center space-x-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <p className="text-sm font-medium text-slate-800 bg-white p-3.5 rounded-xl border border-slate-200 leading-relaxed font-sans">
              {transcription}
            </p>

            {/* Action Bar for Transcribed Text */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {onSearchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    onSearchQuery(transcription);
                    onClose();
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition flex items-center justify-center space-x-1.5 shadow-xs cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search Official Syllabus & Notifications</span>
                </button>
              )}

              {currentUser && !savedToFirestore && (
                <button
                  type="button"
                  onClick={async () => {
                    if (currentUser.id) {
                      await saveVoiceNoteToFirestore(currentUser.id, {
                        id: `vnote_${Date.now()}`,
                        transcription,
                        sourceLang: language,
                      });
                      setSavedToFirestore(true);
                    }
                  }}
                  className="py-2 px-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold transition flex items-center space-x-1.5 cursor-pointer"
                >
                  <BookmarkPlus className="w-3.5 h-3.5 text-slate-600" />
                  <span>Save to My Notes</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
