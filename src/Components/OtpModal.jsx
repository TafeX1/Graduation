import React, { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Lock, Mail, MailCheck, ShieldCheck, X } from 'lucide-react'

export default function OtpModal({ isOpen, onClose, email }) {
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const [otpError, setOtpError] = useState('')
    const [isVerified, setIsVerified] = useState(false)
    const [secondsLeft, setSecondsLeft] = useState(105)
    const inputRefs = useRef([])

    useEffect(() => {
        if (!isOpen) return
        setSecondsLeft(105)
        setOtp(['', '', '', '', '', ''])
        setOtpError('')
        setIsVerified(false)
        setTimeout(() => inputRefs.current[0]?.focus(), 50)
    }, [isOpen])

    useEffect(() => {
        if (!isOpen || secondsLeft <= 0) return
        const timer = setInterval(() => {
            setSecondsLeft((prev) => prev - 1)
        }, 1000)
        return () => clearInterval(timer)
    }, [isOpen, secondsLeft])

    if (!isOpen) return null

    const formatTime = (totalSeconds) => {
        const mins = String(Math.floor(totalSeconds / 60)).padStart(2, '0')
        const secs = String(totalSeconds % 60).padStart(2, '0')
        return `${mins}:${secs}`
    }

    const handleChange = (index, value) => {
        const digit = value.replace(/\D/g, '').slice(-1)
        const nextOtp = [...otp]
        nextOtp[index] = digit
        setOtp(nextOtp)
        if (otpError) setOtpError('')

        if (digit && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handlePaste = (e) => {
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
        if (!pasted) return
        e.preventDefault()
        const nextOtp = ['', '', '', '', '', '']
        pasted.split('').forEach((char, idx) => {
            nextOtp[idx] = char
        })
        setOtp(nextOtp)
        if (otpError) setOtpError('')
        const focusIndex = Math.min(pasted.length, 5)
        inputRefs.current[focusIndex]?.focus()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const firstEmpty = otp.findIndex((d) => !d)
        if (firstEmpty !== -1) {
            setOtpError('يرجى إدخال رمز التحقق المكون من 6 أرقام كاملاً')
            inputRefs.current[firstEmpty]?.focus()
            return
        }
        setOtpError('')
        const displayName = email?.includes('@') ? email.split('@')[0] : email
        sessionStorage.setItem(
            'library_user',
            JSON.stringify({ email, name: displayName || 'عمر وليد', role: 'user' })
        )
        onClose()
        window.location.href = '/portal.html'
    }

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4"
        >
            <div
                dir="rtl"
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-lg bg-gradient-to-b from-[#f1f7f5] via-white to-white rounded-3xl shadow-2xl border border-slate-100 px-6 pt-8 pb-6 sm:px-9 sm:pt-9 sm:pb-7 space-y-6"
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-5 left-5 w-9 h-9 rounded-full bg-[#e4f0ec] hover:bg-[#d5e7e1] text-[#1a3f3a] flex items-center justify-center cursor-pointer transition"
                >
                    <X className="w-4 h-4" />
                </button>

                <div className="text-center space-y-3">
                    <div className="relative w-16 h-16 rounded-2xl bg-[#e3efec] border border-[#cde0db] text-[#1a3f3a] flex items-center justify-center mx-auto">
                        <MailCheck className="w-7 h-7 stroke-[1.75]" />
                        <span className="absolute -bottom-1.5 -left-1.5 w-6 h-6 rounded-full bg-[#1a3f3a] text-white flex items-center justify-center ring-2 ring-white">
                            <ShieldCheck className="w-3.5 h-3.5" />
                        </span>
                    </div>

                    <div>
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#e3f1ed] text-[#1a3f3a] text-xs font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1a3f3a]" />
                            <span>التحقق من الهوية • تأكيد تسجيل الدخول</span>
                        </span>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900">تأكيد رمز التحقق عبر Gmail</h3>

                    <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                        تم إرسال رمز تحقق مؤقت مكون من 6 أرقام إلى بريدك الإلكتروني المعتمد عبر Google:
                    </p>

                    <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#eef5f3] border border-[#d6e7e2] text-xs">
                        <Mail className="w-4 h-4 text-[#1a3f3a]" />
                        <span dir="ltr" className="font-mono text-sm text-slate-800">{email}</span>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-[#1a3f3a] font-bold hover:underline cursor-pointer"
                        >
                            تعديل
                        </button>
                    </div>
                </div>

                {isVerified ? (
                    <div className="rounded-2xl bg-[#eef5f3] border border-[#cde0db] p-5 text-center space-y-3">
                        <CheckCircle2 className="w-10 h-10 text-[#1a3f3a] mx-auto" />
                        <p className="text-sm font-bold text-slate-900">تم تأكيد رمز التحقق بنجاح</p>
                        <p className="text-xs text-slate-500">جاري نقلك إلى حسابك...</p>
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 rounded-xl bg-[#1a3f3a] text-white text-xs font-medium cursor-pointer hover:bg-[#14332f] transition"
                        >
                            إغلاق
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-xs">
                                <span className="font-bold text-slate-800 text-sm">أدخل رمز التحقق (OTP)</span>
                                <span className="text-slate-400">صالح لمدة ١٠ دقائق</span>
                            </div>

                            <div dir="ltr" className="grid grid-cols-6 gap-2.5 sm:gap-3">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => (inputRefs.current[index] = el)}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        placeholder="-"
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        onPaste={handlePaste}
                                        className={`h-14 w-full rounded-2xl text-center text-lg font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none transition ${
                                            otpError && !digit
                                                ? 'border border-red-400 bg-white focus:border-2 focus:border-red-500'
                                                : digit
                                                    ? 'border-2 border-[#1a3f3a] bg-white'
                                                    : 'border border-slate-200 bg-white focus:border-2 focus:border-[#1a3f3a]'
                                        }`}
                                    />
                                ))}
                            </div>

                            {otpError && (
                                <p className="text-xs text-red-500 text-center">{otpError}</p>
                            )}

                            <div className="flex items-center justify-between text-xs pt-1">
                                <div className="flex items-center gap-1.5 text-slate-500">
                                    <Clock className="w-4 h-4 text-slate-400" />
                                    <span>إعادة الإرسال خلال:</span>
                                    <span dir="ltr" className="font-bold text-[#1a3f3a]">
                                        {formatTime(secondsLeft)}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setSecondsLeft(105)}
                                    className="text-[#1a3f3a] font-semibold hover:underline cursor-pointer transition"
                                >
                                    لم يصلك الرمز؟ إعادة الإرسال
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3.5 rounded-2xl bg-[#1a3f3a] hover:bg-[#14332f] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#1a3f3a]/20 cursor-pointer transition"
                        >
                            <span>تأكيد الرمز والمتابعة</span>
                            <ArrowLeft className="w-4 h-4" />
                        </button>
                    </form>
                )}

                <button
                    type="button"
                    onClick={onClose}
                    className="w-full flex items-center justify-center gap-1.5 text-xs font-medium text-slate-600 hover:text-[#1a3f3a] cursor-pointer"
                >
                    <ArrowRight className="w-4 h-4" />
                    <span>إلغاء والعودة لتسجيل الدخول</span>
                </button>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                    <Lock className="w-3.5 h-3.5 text-[#1a3f3a]" />
                    <span>جلسة تحقق مشفرة وآمنة بنظام النفاذ الأكاديمي الرقمي (SSL/TLS 256-bit)</span>
                </div>
            </div>
        </div>
    )
}
