/**
 * SKTECH EXAM — Micro-Transaction Payment & Mock Test Unlock Modal
 * Brand: SKTECH • Powered by SKTECH • All Rights Reserved © 2026
 */

import React, { useState } from 'react';
import { X, Lock, CheckCircle2, ShieldCheck, CreditCard, Smartphone, Building2, Sparkles, Receipt } from 'lucide-react';
import { MockTest } from '../types';
import { api } from '../services/apiClient';

interface UnlockMockModalProps {
  isOpen: boolean;
  test: MockTest | null;
  onClose: () => void;
  onUnlocked: (testId: string) => void;
}

export const UnlockMockModal: React.FC<UnlockMockModalProps> = ({
  isOpen,
  test,
  onClose,
  onUnlocked,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'NETBANKING'>('UPI');
  const [upiId, setUpiId] = useState<string>('candidate@oksbi');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [receiptInfo, setReceiptInfo] = useState<{ receiptId: string; amount: number } | null>(null);

  if (!isOpen || !test) return null;

  const price = test.priceInr || 49;

  const handlePayAndUnlock = async () => {
    setIsProcessing(true);
    try {
      const resp = await api.unlockMockTest(test.id);
      if (resp.success) {
        setReceiptInfo({
          receiptId: resp.receiptId || `SKT_TXN_${Date.now()}`,
          amount: price,
        });
        setTimeout(() => {
          onUnlocked(test.id);
        }, 1200);
      }
    } catch (err) {
      console.error('Payment processing failed:', err);
      alert('Transaction failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      id="unlock-mock-modal"
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
    >
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white shadow-md">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Premium Test Series
              </span>
              <h2 className="text-lg font-black text-slate-900 mt-0.5">
                Unlock Access Fee
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {receiptInfo ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Payment Successful!</h3>
            <p className="text-xs text-slate-500">
              Your test has been permanently unlocked. Redirecting to examination...
            </p>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono text-slate-700 inline-block">
              Receipt ID: <span className="font-bold text-slate-900">{receiptInfo.receiptId}</span>
            </div>
          </div>
        ) : (
          <>
            {/* Test Summary Card */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="text-xs text-slate-500 font-semibold">{test.category}</div>
              <h3 className="font-bold text-slate-900 text-sm">{test.title}</h3>
              <div className="flex items-center justify-between text-xs text-slate-600 pt-1 border-t border-slate-200">
                <span>{test.totalQuestions} Questions • {test.durationMinutes} Mins</span>
                <span className="font-mono font-bold text-indigo-700">₹{price} One-Time</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700">Select Payment Method</label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('UPI')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center justify-center space-y-1 transition ${
                    paymentMethod === 'UPI'
                      ? 'border-indigo-600 bg-indigo-50/60 text-indigo-950 font-bold ring-1 ring-indigo-600'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <Smartphone className="w-4 h-4 text-indigo-600" />
                  <span>UPI / GPay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('CARD')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center justify-center space-y-1 transition ${
                    paymentMethod === 'CARD'
                      ? 'border-indigo-600 bg-indigo-50/60 text-indigo-950 font-bold ring-1 ring-indigo-600'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-indigo-600" />
                  <span>Card / Debit</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('NETBANKING')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center justify-center space-y-1 transition ${
                    paymentMethod === 'NETBANKING'
                      ? 'border-indigo-600 bg-indigo-50/60 text-indigo-950 font-bold ring-1 ring-indigo-600'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-indigo-600" />
                  <span>Net Banking</span>
                </button>
              </div>

              {paymentMethod === 'UPI' && (
                <div className="pt-2">
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="Enter UPI ID (e.g. mobile@upi)"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>
              )}
            </div>

            {/* Pay Button */}
            <button
              id="pay-and-unlock-btn"
              disabled={isProcessing}
              onClick={handlePayAndUnlock}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition cursor-pointer flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Authorizing Payment...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Pay ₹{price} & Unlock Immediately</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>256-Bit Encrypted Micro-Transaction • Instant Receipt</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
