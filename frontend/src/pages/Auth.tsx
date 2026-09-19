import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { Smartphone, Lock, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

export const Auth: React.FC = () => {
  const { setScreen } = useApp();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("9876543210");
  const [otp, setOtp] = useState(["1", "2", "3", "4", "5", "6"]);
  const [timer, setTimer] = useState(28);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let interval: any;
    if (step === "otp" && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleSendOtp = () => {
    if (phone.length < 10) {
      setError("????? 10 ????? ?????? ??????? ????? ?????? / Please enter a valid 10-digit number.");
      return;
    }
    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setStep("otp");
      setTimer(28);
    }, 800);
  };

  const handleVerifyOtp = () => {
    const code = otp.join("");
    if (code.length < 6) {
      setError("6 ????? ????? ???? ????? ?????? / Enter complete 6-digit OTP.");
      return;
    }
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setScreen("profile_setup");
    }, 800);
  };

  const handleOtpChange = (val: string, index: number) => {
    if (val.length > 1) val = val.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FA] via-emerald-50/50 to-emerald-100/60 p-6 flex flex-col justify-between max-w-md mx-auto">
      <div className="pt-8">
        <div className="flex items-center space-x-2 text-[#1E5128] mb-2">
          <ShieldCheck className="w-6 h-6 text-amber-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Secure Farmer Login</span>
        </div>

        <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
          {step === "phone" ? "Welcome to Sanjeevani" : "Enter Verification Code"}
        </h2>

        <p className="text-sm text-gray-600 mb-8">
          {step === "phone"
            ? "???????? ???? ??? ????? ?? ?????? ????? ????? ?????? (Enter your mobile number to get started)."
            : `We sent a 6-digit OTP code to +91 ${phone}.`}
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
            {error}
          </div>
        )}

        {step === "phone" ? (
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">Mobile Number / ?????? ?????</label>
            <div className="flex items-center border-2 border-emerald-600/40 rounded-2xl bg-white shadow-sm overflow-hidden focus-within:border-[#1E5128]">
              <div className="px-4 py-3.5 bg-emerald-50 border-r border-gray-200 text-gray-700 text-sm font-bold flex items-center space-x-1">
                <span>????</span>
                <span>+91</span>
              </div>

              <input
                type="tel"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                placeholder="98765 43210"
                className="w-full px-4 py-3.5 text-base font-bold text-gray-900 outline-none"
              />
            </div>

            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center space-x-2">
              <span className="font-bold">Demo Hint:</span>
              <span>Default testing number pre-filled. Tap Send OTP.</span>
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-3">Enter 6-digit Code (????? ????):</label>
            
            <div className="flex justify-between space-x-2 mb-6">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-input-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, idx)}
                  className="w-12 h-14 text-center text-xl font-extrabold text-[#1E5128] bg-white border-2 border-emerald-600/40 rounded-xl shadow-sm outline-none focus:border-[#1E5128] focus:ring-2 focus:ring-emerald-200"
                />
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-gray-600">
              <button
                disabled={timer > 0}
                onClick={() => setTimer(28)}
                className={`font-bold ${timer > 0 ? "text-gray-400 cursor-not-allowed" : "text-[#1E5128] underline"}`}
              >
                Resend OTP / ????? ??????
              </button>

              {timer > 0 && <span className="font-semibold text-amber-700">Resend in {timer}s</span>}
            </div>

            <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
              <span className="font-bold">Testing OTP Code:</span> 1 2 3 4 5 6 (Pre-filled for instant validation)
            </div>
          </div>
        )}
      </div>

      <div className="pb-6">
        {step === "phone" ? (
          <button
            onClick={handleSendOtp}
            disabled={loading}
            className="w-full py-4 bg-[#1E5128] hover:bg-[#16421F] text-white font-extrabold text-base rounded-2xl shadow-xl flex items-center justify-center space-x-2 transition"
          >
            <span>{loading ? "Sending..." : "Send OTP / ????? ??????"}</span>
            <ArrowRight className="w-5 h-5 text-amber-300" />
          </button>
        ) : (
          <div className="space-y-2">
            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="w-full py-4 bg-[#1E5128] hover:bg-[#16421F] text-white font-extrabold text-base rounded-2xl shadow-xl flex items-center justify-center space-x-2 transition"
            >
              <span>{loading ? "Verifying..." : "Verify OTP & Login"}</span>
              <CheckCircle2 className="w-5 h-5 text-amber-300" />
            </button>

            <button
              onClick={() => setStep("phone")}
              className="w-full py-2.5 text-xs text-gray-500 font-bold hover:text-gray-800"
            >
              Change Mobile Number
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
