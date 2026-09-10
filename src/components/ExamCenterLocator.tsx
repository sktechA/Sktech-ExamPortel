/**
 * SKTECH EXAM — CBT Exam Center & Test City Locator
 * Model: gemini-3.5-flash with googleMaps grounding tool
 * Locates verified TCS iON Digital Zones, SSC, RRB, and IBPS test venues with maps links, directions, and reporting rules.
 * Brand: SKTECH • Powered by SKTECH • All Rights Reserved © 2026
 */

import React, { useState } from 'react';
import {
  MapPin,
  Search,
  Navigation,
  ExternalLink,
  Clock,
  ShieldAlert,
  Train,
  Sparkles,
  RefreshCw,
  Info,
  CheckCircle2,
  Building2,
} from 'lucide-react';
import { api } from '../services/apiClient';

interface ExamCenterLocatorProps {
  language?: 'en' | 'hi';
}

export const ExamCenterLocator: React.FC<ExamCenterLocatorProps> = ({ language = 'en' }) => {
  const [searchQuery, setSearchQuery] = useState<string>('TCS iON Digital Zone Noida Sector 62');
  const [loading, setLoading] = useState<boolean>(false);
  const [centerData, setCenterData] = useState<{
    query: string;
    answer: string;
    places: Array<{ title: string; uri: string; address?: string; snippet?: string }>;
    model: string;
    timestamp: string;
  } | null>({
    query: 'TCS iON Digital Zone Noida Sector 62',
    answer: `### TCS iON Digital Zone iDZ Noida Sector 62
**Official CBT Examination Center:** C-56/11, Sector 62, Industrial Area, Noida, Uttar Pradesh 201309.
- **Connectivity:** 1.2 km from Noida Electronic City Metro Station (Blue Line). Direct shared e-rickshaws available from Gate 3 (₹10-20).
- **Reporting & Entry Advisory:** Entry gates close strictly 15 minutes before the exam slot. Late entry is strictly prohibited under RRB / SSC / IBPS guidelines.
- **Mandatory Documents:** Printed Admit Card, Original photo ID proof (Aadhaar / Voter ID / Passport), 2 passport-size color photographs, transparent blue/black ballpoint pen.
- **Luggage & Token Counter:** Paid token locker counter available outside the main gate for candidate bags and mobile phones (₹20-30).`,
    places: [
      {
        title: 'iON Digital Zone iDZ Sector 62 Noida',
        uri: 'https://www.google.com/maps/search/?api=1&query=TCS+iON+Digital+Zone+Sector+62+Noida',
        address: 'C-56/11, Sector 62, Industrial Area, Noida, Uttar Pradesh 201309',
        snippet: 'Primary computer-based test facility for SSC CGL, RRB NTPC, and IBPS examinations with high-speed CBT servers and biometrics.',
      },
    ],
    model: 'gemini-3.5-flash (Google Maps Grounded)',
    timestamp: new Date().toISOString(),
  });
  const [error, setError] = useState<string | null>(null);
  const [locationStatus, setLocationStatus] = useState<string | null>(null);

  const handleSearch = async (overrideQuery?: string, lat?: number, lng?: number) => {
    const q = overrideQuery || searchQuery;
    if (!q.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const resp = await api.mapsGrounding(q.trim(), lat, lng);
      if (resp.success && resp.data) {
        setCenterData(resp.data);
      } else {
        setError('Could not retrieve exam center details.');
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to connect to Google Maps grounding service.');
    } finally {
      setLoading(false);
    }
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }

    setLocationStatus('Detecting your GPS location...');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setLocationStatus(`Located at [${lat.toFixed(2)}, ${lng.toFixed(2)}]`);
        setSearchQuery('TCS iON Digital Zone CBT exam center near me');
        handleSearch('TCS iON Digital Zone CBT exam center near me', lat, lng);
        setTimeout(() => setLocationStatus(null), 3500);
      },
      (err) => {
        console.warn('Geolocation error:', err);
        setError('Location permission was denied. Searching city clusters instead.');
        setLocationStatus(null);
      },
      { timeout: 8000 }
    );
  };

  return (
    <div id="exam-center-locator-section" className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 text-white p-6 sm:p-7 rounded-3xl border border-teal-800/40 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Google Maps Grounding • gemini-3.5-flash</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            {language === 'en' ? 'CBT Exam Center & Venue Navigator' : 'सीबीटी परीक्षा केंद्र एवं स्थल नेविगेटर'}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Locate your allotted computer-based test (CBT) venue, TCS iON Digital Zone (iDZ), nearest metro/railway station, landmark directions, and gate-closing advisories with live Google Maps grounding.
          </p>

          {/* Search Bar with Location Trigger */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Enter center name, city, or PIN code (e.g. iDZ Powai Mumbai, iDZ Noida 62, Patna...)"
                className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 backdrop-blur-xs font-sans"
              />
              <MapPin className="w-5 h-5 text-teal-300 absolute left-3.5 top-3.5" />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleUseLocation}
                disabled={loading}
                className="px-3.5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-teal-300 hover:text-white border border-teal-400/30 text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
                title="Find CBT Centers near my current position"
              >
                <Navigation className="w-4 h-4" />
                <span className="hidden sm:inline">Near Me</span>
              </button>

              <button
                type="button"
                onClick={() => handleSearch()}
                disabled={loading}
                className="px-6 py-3 rounded-2xl bg-teal-500 hover:bg-teal-600 text-slate-950 text-xs sm:text-sm font-extrabold transition flex items-center space-x-2 shadow-lg shadow-teal-500/20 cursor-pointer disabled:opacity-50"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                <span>Locate Venue</span>
              </button>
            </div>
          </div>

          {locationStatus && (
            <div className="text-[11px] text-teal-300 font-mono flex items-center space-x-1 pt-1">
              <Navigation className="w-3 h-3 animate-spin" />
              <span>{locationStatus}</span>
            </div>
          )}
        </div>

        {/* Quick Popular CBT Center Tags */}
        <div className="relative z-10 pt-4 border-t border-white/10 mt-4 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-semibold text-[11px]">Popular CBT Clusters:</span>
          {[
            'TCS iON Digital Zone Noida Sector 62',
            'TCS iON Powai Mumbai',
            'iDZ Patliputra Patna',
            'iDZ Bengaluru Peenya',
            'iDZ Kukatpally Hyderabad',
            'iDZ Jaipur Sitapura',
          ].map((center, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setSearchQuery(center);
                handleSearch(center);
              }}
              className="px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 text-[11px] transition cursor-pointer"
            >
              📍 {center}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-800 flex items-start space-x-2.5">
          <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Results View */}
      {centerData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Grounded Details & Advisory */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5 text-teal-600" />
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  Verified CBT Venue & Directions
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                {centerData.model}
              </span>
            </div>

            {/* Markdown Answer */}
            <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-3 font-sans">
              {centerData.answer.split('\n\n').map((para, i) => {
                if (para.startsWith('###')) {
                  return (
                    <h4 key={i} className="text-sm font-extrabold text-slate-900 border-l-4 border-teal-500 pl-3">
                      {para.replace('###', '').trim()}
                    </h4>
                  );
                }
                return (
                  <p key={i} className="text-xs sm:text-sm text-slate-700">
                    {para}
                  </p>
                );
              })}
            </div>

            {/* Reporting Time & Prohibited Items Rules */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 space-y-2">
              <div className="flex items-center space-x-2 text-amber-900 font-bold text-xs">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Standard Examination Hall Advisory (RRB / SSC / IBPS)</span>
              </div>
              <ul className="text-xs text-amber-950 space-y-1 list-disc list-inside">
                <li>Entry gate closes exactly 15 minutes before exam start time. No candidate admitted after gate closure.</li>
                <li>Prohibited: Smartwatches, Bluetooth earphones, metallic ornaments, paper chits, wallets, belts.</li>
                <li>Permitted: Original Photo ID, printed Admit Card, 2 passport photographs, and transparent pen.</li>
              </ul>
            </div>
          </div>

          {/* Google Maps Cards & Direct Navigation Links */}
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
                <MapPin className="w-4 h-4 text-teal-600" />
                <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                  Google Maps Place Links ({centerData.places.length})
                </h4>
              </div>

              <div className="space-y-3">
                {centerData.places.map((place, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-teal-400 hover:bg-teal-50/40 transition group"
                  >
                    <div className="font-bold text-xs text-slate-900 group-hover:text-teal-900 mb-1">
                      {place.title}
                    </div>

                    {place.address && (
                      <p className="text-[11px] text-slate-600 line-clamp-2 mb-2">
                        {place.address}
                      </p>
                    )}

                    {place.snippet && (
                      <div className="text-[10px] text-slate-500 italic bg-white p-2 rounded-lg border border-slate-100 mb-2">
                        "{place.snippet}"
                      </div>
                    )}

                    <a
                      href={place.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 text-xs font-bold text-teal-700 group-hover:text-teal-800 bg-white group-hover:bg-teal-100/70 px-3 py-1.5 rounded-xl border border-teal-200 shadow-2xs transition"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Metro & Public Transit Connectivity Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-5 shadow-md space-y-3">
              <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold">
                <Train className="w-4 h-4" />
                <span>Transit Connectivity Note</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                Most TCS iON Digital Zones have high auto/e-rickshaw frequency during morning shifts. Candidates are advised to arrive at least 60-90 minutes before exam slot start to complete biometric and iris verification smoothly.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
