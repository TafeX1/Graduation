import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
    ArrowLeft,
    BookOpen,
    CalendarCheck,
    Check,
    Headset,
    IdCard,
    Languages,
    Lock,
    Mail,
    ShieldCheck,
} from 'lucide-react'

function formatArabicDate(isoString) {
    const date = isoString ? new Date(isoString) : new Date()
    const formatted = new Intl.DateTimeFormat('ar-EG', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(date)
    return `${formatted} • موثق إلكترونياً`
}

export default function AccountActivated() {
    const navigate = useNavigate()
    const { state } = useLocation()

    const accountLabel = state?.role === 'admin' ? 'مسؤول' : 'مستخدم'
    const verifiedEmail = state?.email || 'academic.user@university.edu.sa'
    const verifiedDate = formatArabicDate(state?.verifiedAt)

    return (
        <div
            dir="rtl"
            className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-[#eef7f5] via-[#f6faf9] to-[#e7f3ef]"
        >
            {/* الشريط العلوي */}
            <header className="bg-white border-b border-slate-100 px-6 sm:px-10 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-[#1a3f3a] text-white flex items-center justify-center">
                        <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                        <h2 className="text-sm font-bold text-slate-900">نظام إدارة المكتبات</h2>
                        <p className="text-[11px] text-slate-400">صرح المخطوطات والبحث الأكاديمي</p>
                    </div>
                </div>

                <nav className="hidden md:flex items-center gap-6 text-xs">
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="text-slate-500 hover:text-[#1a3f3a] cursor-pointer transition"
                    >
                        الرئيسية
                    </button>
                    <span className="text-[#1a3f3a] font-bold border-b-2 border-[#1a3f3a] pb-1">
                        بوابة الباحثين
                    </span>
                </nav>

                <div className="flex items-center gap-2.5">
                    <button
                        type="button"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#eef5f3] border border-[#d6e7e2] text-xs font-medium text-[#1a3f3a] hover:bg-[#e3efec] cursor-pointer transition"
                    >
                        <Languages className="w-3.5 h-3.5" />
                        <span>English</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="px-4 py-1.5 rounded-lg bg-[#1a3f3a] hover:bg-[#14332f] text-white text-xs font-medium cursor-pointer transition"
                    >
                        الدخول للحساب
                    </button>
                </div>
            </header>

            {/* الكارت الرئيسي في المنتصف */}
            <main className="my-auto px-4 py-10">
                <div className="mx-auto w-full max-w-lg bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                    <div className="h-1.5 w-full bg-gradient-to-r from-[#1a3f3a] via-[#4a857d] to-[#d6e7e2]" />

                    <div className="p-7 sm:p-10 space-y-6">
                        <div className="text-center space-y-3">
                            <div className="w-16 h-16 rounded-full bg-[#e6f1ee] flex items-center justify-center mx-auto">
                                <div className="w-11 h-11 rounded-full bg-[#1a3f3a] text-white flex items-center justify-center">
                                    <Check className="w-5 h-5 stroke-[2.5]" />
                                </div>
                            </div>

                            <div>
                                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#d8ede6] text-[#1a3f3a] text-[11px] font-semibold">
                                    <ShieldCheck className="w-3.5 h-3.5" />
                                    <span>اكتمل التحقق الأمني بنجاح</span>
                                </span>
                            </div>

                            <h1 className="text-2xl font-bold text-slate-900">
                                تم تأكيد الرمز وتفعيل الحساب بنجاح
                            </h1>

                            <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto">
                                تمت مطابقة رمز التحقق بنجاح وتوثيق بريدك الإلكتروني الأكاديمي. حسابك الآن مفعّل بالكامل وجاهز للاستفادة من خدمات صرح المخطوطات والبحث العلمي المتقدم.
                            </p>
                        </div>

                        {/* تفاصيل التوثيق */}
                        <div className="rounded-2xl bg-[#f3f8f6] border border-[#dceae5] p-4 sm:p-5 space-y-3.5 text-xs">
                            <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2 text-slate-500">
                                    <IdCard className="w-4 h-4 text-[#1a3f3a]" />
                                    <span>نوع الحساب</span>
                                </div>
                                <span className="px-2.5 py-0.5 rounded-md bg-white border border-slate-200 font-medium text-slate-700">
                                    {accountLabel}
                                </span>
                            </div>

                            <div className="border-t border-[#e1ede8]" />

                            <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2 text-slate-500">
                                    <Mail className="w-4 h-4 text-[#1a3f3a]" />
                                    <span>البريد الإلكتروني الموثق</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Check className="w-3.5 h-3.5 text-[#1a3f3a]" />
                                    <span dir="ltr" className="font-mono font-medium text-slate-800">
                                        {verifiedEmail}
                                    </span>
                                </div>
                            </div>

                            <div className="border-t border-[#e1ede8]" />

                            <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2 text-slate-500">
                                    <CalendarCheck className="w-4 h-4 text-[#1a3f3a]" />
                                    <span>تاريخ التوثيق الرقمي</span>
                                </div>
                                <span className="font-medium text-slate-700">{verifiedDate}</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="w-full py-3 rounded-xl bg-[#1a3f3a] hover:bg-[#14332f] text-white text-sm font-medium flex items-center justify-center gap-2 shadow-lg shadow-[#1a3f3a]/15 cursor-pointer transition"
                        >
                            <span>الدخول للحساب</span>
                            <ArrowLeft className="w-4 h-4" />
                        </button>

                        <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                            <Lock className="w-3.5 h-3.5 text-[#1a3f3a]" />
                            <span>تشفير عالي الأمان (ISO/IEC 27001)</span>
                        </div>
                    </div>
                </div>
            </main>

            {/* الفوتر */}
            <footer className="pb-6 px-4 text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
                <span>تواجه أي صعوبة في تهيئة جلسة العمل البحثية؟ تواصل مع أمين المكتبة التقني</span>
                <Headset className="w-4 h-4 text-[#1a3f3a]" />
            </footer>
        </div>
    )
}
