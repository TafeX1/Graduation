import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import libraryBG from '../assets/Library.jpeg'
import { AlertCircle, ArrowLeft, BookOpen, Check, Clock, Globe, Lock, Mail, Shield, ShieldCheck } from 'lucide-react'

function maskEmail(value) {
    if (!value) return ''
    if (!value.includes('@')) return value
    const [local, domain] = value.split('@')
    const visible = local.slice(0, 2)
    return `${visible}****@${domain}`
}

function formatArabicDateTime(isoString) {
    const date = isoString ? new Date(isoString) : new Date()
    const timeFormatted = new Intl.DateTimeFormat('ar-EG', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    }).format(date)
    const dateFormatted = new Intl.DateTimeFormat('ar-EG', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date)
    return `${dateFormatted}، ${timeFormatted}`
}

export default function PasswordChanged() {
    const navigate = useNavigate()
    const { state } = useLocation()

    const displayEmail = maskEmail(state?.email)
    const displayTime = formatArabicDateTime(state?.updatedAt)

    return (
        <div dir="rtl" className="relative min-h-screen flex flex-col justify-between p-6 sm:p-10 overflow-hidden bg-emerald-950">
            <img
                src={libraryBG}
                alt="Library Background"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#1a3f3a]/85 backdrop-blur-[2px]" />

            {/* الشريط العلوي */}
            <div className="relative z-10 flex items-center justify-start">
                <div className="flex items-center gap-2.5 text-white">
                    <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center">
                        <BookOpen className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold">نظام إدارة المكتبات</span>
                </div>
            </div>

            {/* الكارت الرئيسي في المنتصف */}
            <div className="relative z-10 my-auto mx-auto w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5 overflow-hidden">
                <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-[#e6f1ee]/60 pointer-events-none" />

                <div className="relative text-center space-y-2.5 pt-2">
                    <div className="relative w-16 h-16 rounded-full bg-[#e3efec] text-[#1a3f3a] flex items-center justify-center mx-auto">
                        <ShieldCheck className="w-7 h-7" />
                        <span className="absolute -bottom-0.5 -left-0.5 w-5 h-5 rounded-full bg-[#1a3f3a] text-white flex items-center justify-center ring-2 ring-white">
                            <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                    </div>

                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                        تم تغيير كلمة المرور بنجاح
                    </h1>

                    <p className="text-xs text-slate-500 leading-relaxed">
                        تم تحديث كلمة المرور الخاصة بحسابك الأكاديمي بنجاح. يمكنك الآن استخدام بيانات الدخول الجديدة لتسجيل الدخول بأمان إلى كافة خدمات ومقتنيات المكتبة الرقمية وصرح المخطوطات.
                    </p>
                </div>

                {/* تفاصيل التحديث */}
                <div className="rounded-2xl bg-[#f2f7f5] border border-[#dceae5] p-4 space-y-3 text-xs">
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-slate-500">
                            <Clock className="w-4 h-4 text-[#1a3f3a]" />
                            <span>تاريخ ووقت التحديث:</span>
                        </div>
                        <span className="font-semibold text-slate-800">{displayTime}</span>
                    </div>

                    <div className="border-t border-[#e1ede8]" />

                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-slate-500">
                            <Shield className="w-4 h-4 text-[#1a3f3a]" />
                            <span>مستوى أمان الحساب:</span>
                        </div>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#d5ebe4] text-[#1a3f3a] font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#1a3f3a]" />
                            <span>مرتفع ومشفر بالكامل</span>
                        </span>
                    </div>

                    {displayEmail && (
                        <>
                            <div className="border-t border-[#e1ede8]" />
                            <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2 text-slate-500">
                                    <Mail className="w-4 h-4 text-[#1a3f3a]" />
                                    <span>الإيميل:</span>
                                </div>
                                <span dir="ltr" className="font-mono font-medium text-slate-800">
                                    {displayEmail}
                                </span>
                            </div>
                        </>
                    )}
                </div>

                <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="w-full py-3 rounded-xl bg-[#1a3f3a] hover:bg-[#14332f] text-white text-sm font-medium flex items-center justify-center gap-2 shadow-lg shadow-[#1a3f3a]/20 cursor-pointer transition"
                >
                    <span>الانتقال إلى تسجيل الدخول</span>
                    <ArrowLeft className="w-4 h-4" />
                </button>

                <div className="pt-3 border-t border-slate-100 flex items-start gap-2 text-[11px] text-slate-500 leading-relaxed">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <p>
                        إذا لم تقم بتنفيذ هذا التغيير شخصياً، يرجى{' '}
                        <button type="button" className="text-red-500 underline font-medium cursor-pointer">
                            تجميد الحساب فوراً وإبلاغ أمين المكتبة
                        </button>{' '}
                        أو التواصل مع الدعم التقني لحماية معلوماتك وبحوثك.
                    </p>
                </div>
            </div>

            {/* الفوتر السفلي */}
            <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 text-[11px] text-white/75 pt-4">
                <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    <span>بروتوكول تشفير معتمد ISO/IEC 27001</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5" />
                    <span>جلسة اتصال آمنة موثقة</span>
                </span>
            </div>
        </div>
    )
}
