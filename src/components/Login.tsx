/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Lock, 
  Smartphone, 
  Mail, 
  CheckCircle, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface LoginProps {
  onLoginSuccess: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [useOtp, setUseOtp] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '']);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) {
      setErrorMsg('Please enter your registered Email or Mobile number.');
      return;
    }
    setErrorMsg('');
    setLoading(true);

    // Simulate OTP delivery in 1.2s
    setTimeout(() => {
      setLoading(false);
      setUseOtp(true);
    }, 1200);
  };

  const handleOtpInput = (index: number, val: string) => {
    if (isNaN(Number(val)) && val !== '') return;
    const newOtp = [...otpCode];
    newOtp[index] = val.substring(val.length - 1);
    setOtpCode(newOtp);

    // Auto-focus next input
    if (val && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleFillMockOtp = () => {
    setOtpCode(['4', '0', '2', '1']);
  };

  const handleVerifyAndLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    // Simulate login verification
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess();
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F7F2] px-4 py-12 text-stone-600">
      
      {/* Dynamic pasture vector glowing background decorations */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#A3B18A]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#DAD7CD]/30 rounded-full blur-3xl pointer-events-none" />

      {/* Main card */}
      <div className="w-full max-w-md bg-white border border-stone-200 p-8 rounded-3xl shadow-xl space-y-6 relative overflow-hidden">
        
        {/* Top green glowing bar */}
        <div className="absolute top-0 inset-x-0 h-[4px] bg-[#3A5A40]" />

        {/* Branding header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-[#F5F7F2] text-[#3A5A40] rounded-2xl mb-2 border border-stone-100">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">TerraTrack Portal</h1>
          <p className="text-stone-500 text-xs px-4">Secure multi-node cloud portal for progressive dairy & livestock perimeters</p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 p-3 rounded-xl flex items-center gap-2 text-xs text-red-700 animate-pulse font-medium">
            <AlertCircle className="w-4.5 h-4.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* STEP 1: Enter Username Form */}
        {!useOtp ? (
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-1">Mobile or Email Login</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-400">
                  <Mail className="w-4.5 h-4.5" />
                </span>
                <input 
                  id="input-login-username"
                  type="text"
                  placeholder="e.g. miller@greenmeadows.com"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-10 pr-4 py-3 text-xs text-stone-900 focus:border-[#3A5A40] focus:bg-white outline-none font-medium transition-all"
                  required
                />
              </div>
            </div>

            {/* Remember and Forgot link */}
            <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
              <label className="flex items-center gap-1.5 cursor-pointer select-none">
                <input 
                  id="checkbox-remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="w-3.5 h-3.5 accent-[#3A5A40] rounded bg-stone-50 border-stone-200"
                />
                <span>Remember device</span>
              </label>
              <button 
                id="btn-forgot"
                type="button" 
                onClick={() => alert('OTP reset link dispatched to registered farm mobile network.')}
                className="hover:text-[#3A5A40] transition-colors font-medium"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit */}
            <button 
              id="btn-login-request-otp"
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#3A5A40] hover:bg-[#3A5A40]/90 text-white font-bold text-xs rounded-xl shadow-md shadow-[#3A5A40]/10 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Request OTP Access Code</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        ) : (
          /* STEP 2: Verification code form */
          <form onSubmit={handleVerifyAndLogin} className="space-y-5">
            <div className="space-y-2 text-center">
              <span className="text-[10px] bg-[#E1EAD8] text-[#3A5A40] border border-[#A3B18A]/30 px-2.5 py-0.5 rounded-full font-bold">
                Access Code Transmitted
              </span>
              <p className="text-stone-500 text-xs">
                We sent a 4-digit verification code to <span className="text-stone-800 font-semibold">{username}</span>
              </p>
            </div>

            {/* Input fields */}
            <div className="flex justify-center gap-3">
              {otpCode.map((char, idx) => (
                <input 
                  key={idx}
                  id={`otp-input-${idx}`}
                  type="text"
                  maxLength={1}
                  value={char}
                  onChange={(e) => handleOtpInput(idx, e.target.value)}
                  className="w-12 h-12 bg-stone-50 border border-stone-200 rounded-xl text-center text-lg text-stone-900 font-bold font-mono focus:border-[#3A5A40] outline-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && !otpCode[idx] && idx > 0) {
                      const prevInput = document.getElementById(`otp-input-${idx - 1}`);
                      if (prevInput) prevInput.focus();
                    }
                  }}
                />
              ))}
            </div>

            {/* Mock Helper */}
            <div className="text-center">
              <button 
                id="btn-fill-mock-otp"
                type="button"
                onClick={handleFillMockOtp}
                className="text-[10px] text-[#3A5A40] hover:underline font-bold"
              >
                💡 Insert Simulation OTP Code (4021)
              </button>
            </div>

            {/* Buttons */}
            <div className="space-y-2">
              <button 
                id="btn-login-verify"
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#3A5A40] hover:bg-[#3A5A40]/90 text-white font-bold text-xs rounded-xl shadow-lg shadow-[#3A5A40]/10 transition-all"
              >
                {loading ? 'Authenticating Secure Key...' : 'Verify & Open Dashboard'}
              </button>

              <button 
                id="btn-back-otp"
                type="button"
                onClick={() => setUseOtp(false)}
                className="w-full py-2.5 bg-transparent border border-stone-200 text-stone-500 hover:text-stone-800 rounded-xl text-xs font-semibold hover:bg-stone-50 transition-all"
              >
                Back to Mobile Entry
              </button>
            </div>
          </form>
        )}

        {/* Secure policy banner */}
        <div className="pt-4 border-t border-stone-100 text-center text-[10px] text-stone-400 flex items-center justify-center gap-1">
          <Smartphone className="w-3.5 h-3.5 text-stone-400" />
          <span>Secured with double-envelope LPP encryption standards</span>
        </div>

      </div>
    </div>
  );
};
