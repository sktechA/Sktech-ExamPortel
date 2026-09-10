/**
 * SKTECH EXAM — Sub-Admin & Operator Role Generator Modal
 * Authorizes creation of Operator, Content Admin, and Reviewer credentials with custom permission tiers
 * Brand: SKTECH • Powered by SKTECH • All Rights Reserved © 2026
 */

import React, { useState } from 'react';
import { X, ShieldCheck, UserCheck, KeyRound, Mail, User, Layers, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '../services/apiClient';
import { User as UserType, UserRole } from '../types';

interface CreateSubAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newStaff: UserType) => void;
}

export const CreateSubAdminModal: React.FC<CreateSubAdminModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'OPERATOR' | 'SUB_ADMIN' | 'CONTENT_ADMIN' | 'REVIEWER'>('OPERATOR');
  const [targetExam, setTargetExam] = useState('ALL');

  const [permissions, setPermissions] = useState<string[]>([
    'MANAGE_QUESTIONS',
    'STUDENT_PROCTORING',
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const availablePermissions = [
    { key: 'MANAGE_QUESTIONS', label: 'Manage Question Bank & Bulk Import' },
    { key: 'MANAGE_MOCK_TESTS', label: 'Generate & Publish Mock Test Series' },
    { key: 'MANAGE_PRICING_ADS', label: 'Configure Test Access Fees & Pricing' },
    { key: 'STUDENT_PROCTORING', label: 'Monitor Candidate Live Attempts & Anti-Cheat' },
    { key: 'VIEW_ANALYTICS', label: 'Access Executive Dashboard & Revenue Stats' },
    { key: 'VIEW_AUDIT_LOGS', label: 'Audit Log Inspection' },
  ];

  const togglePermission = (key: string) => {
    setPermissions((prev) =>
      prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !email.trim() || !password) {
      setError('Please fill in all mandatory fields.');
      return;
    }
    if (password.length < 6) {
      setError('Temporary password must be at least 6 characters.');
      return;
    }
    if (permissions.length === 0) {
      setError('Select at least one permission tier for this operator.');
      return;
    }

    setLoading(true);
    try {
      const resp = await api.createSubAdmin({
        name: name.trim(),
        email: email.trim(),
        password,
        role,
        permissions,
        targetExam,
      });

      if (resp.success && resp.user) {
        onSuccess(resp.user);
        onClose();
      } else {
        setError(resp.message || 'Failed to create sub-admin account.');
      }
    } catch (err: any) {
      setError(err?.message || 'Error communicating with administration service.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="create-sub-admin-modal"
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 max-h-[92vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/25">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                Generate Operator & Sub-Admin Account
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Assign custom role tiers and granular operational privileges
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Name <span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Operator Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Role Authority Tier <span className="text-rose-600">*</span>
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-1 focus:ring-indigo-500 font-semibold"
              >
                <option value="OPERATOR">Test Center Operator</option>
                <option value="SUB_ADMIN">Sub-Administrator</option>
                <option value="CONTENT_ADMIN">Content Administrator</option>
                <option value="REVIEWER">Subject Matter Reviewer</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Staff Email <span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="staff@sktech.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Temporary Password <span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Min 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                />
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Assigned Permission Tiers
            </label>
            <div className="space-y-1.5 bg-slate-50 p-3 rounded-2xl border border-slate-200">
              {availablePermissions.map((perm) => (
                <label
                  key={perm.key}
                  className="flex items-center space-x-2 text-xs text-slate-700 hover:text-slate-900 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={permissions.includes(perm.key)}
                    onChange={() => togglePermission(perm.key)}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="font-medium">{perm.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition cursor-pointer flex items-center space-x-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{loading ? 'Generating...' : 'Create Staff Credentials'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
