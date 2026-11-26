import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import libraryBG from '../assets/Library.jpeg'
import { Landmark, Languages, BookOpen, User, Lock, Eye, EyeOff, HelpCircle, ArrowLeft, UserPlus, Shield, Info, X, Mail, Send } from 'lucide-react'
import { MdOutlineLocalLibrary, MdLockReset } from "react-icons/md";
import OtpModal from '../Components/OtpModal'

export default function Login() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loginErrors, setLoginErrors] = useState({ username: '', password: '' })
    const [showForgotModal, setShowForgotModal] = useState(false)
    const [forgotInput, setForgotInput] = useState('')
    const [forgotError, setForgotError] = useState('')
    const [showOtpModal, setShowOtpModal] = useState(false)

    const handleLoginSubmit = (e) => {
        e.preventDefault()
        const errors = {
            username: username.trim() ? '' : 'يرجى إدخال اسم المستخدم أو البريد الإلكتروني',
            password: password.trim() ? '' : 'يرجى إدخال كلمة المرور',
        }
        setLoginErrors(errors)
        if (errors.username || errors.password) return
        setShowOtpModal(true)
    }

    const handleForgotSubmit = (e) => {
        e.preventDefault()
        if (!forgotInput.trim()) {
            setForgotError('يرجى إدخال البريد الإلكتروني أو اسم المستخدم')
            return
        }
        const submittedEmail = forgotInput.trim()
        const updatedAt = new Date().toISOString()
        setForgotError('')
        setForgotInput('')
        setShowForgotModal(false)
        navigate('/password-changed', {
            state: { email: submittedEmail, updatedAt },
        })
    }
    return (


        <div dir="rtl" className="min-h-screen grid grid-cols-1 lg:grid-cols-[45%_1fr]">
            <div className=" relative hidden lg:flex flex-col justify-between p-12 text-white bg-emerald-950  overflow-hidden">
                <img src={libraryBG} alt="Library Background" className="absolute inset-0 w-full h-full object-cover  " />
                <div className="absolute inset-0 bg-[#1a3f3a]/85 backdrop-blur-[2px]" />
                <div className="absolute inset-0 bg-[radial-gradient(#d8e6e1_1px,transparent_1px)] bg-size-[24px_24px] opacity-10"></div>
                <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                            <Landmark className="w-5 h-5" />
                        </div><div>
                            <h2 className="text-sm font-bold">صرح المخطوطات الأكاديمي</h2>
                            <p className="text-xs text-white/70">المكتبة المركزية الوطنية</p>
                        </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs">
                        •البوابة الأكاديمية
                    </span>
                </div>
                {/* النص الرئيسي */}
                <div className="relative z-10 my-auto max-w-md space-y-5">
                    <span className="inline-block px-3 py-1 rounded-md bg-white/20 text-green-200 text-xs font-medium">
                        منظومة التوثيق و الأرشفة الذكية
                    </span>
                    <h1 className="text-4xl font-bold leading-snug">
                        معاََ نحو مكتبة أكثر تنظيماََ وكفاءة
                    </h1>
                    <div className="rounded-full w-24 h-1.5 bg-[#74a39d]/70"></div>
                    <p className="text-sm text-white/80">
                        بيئة رقمية رصينة صُممت لتمكين الباحثين وأمناء المعرفة من فهرسة، استعارة، وصيانة النفائس العلمية وفق أعلى المعايير المؤسسية.
                    </p>
                </div>
                <div className="hidden md:block absolute left-0 inset-y-0 w-12 pointer-events-none z-20">
                    <svg className="h-full w-full fill-white" preserveAspectRatio="none" viewBox="0 0 100 100">
                        <path d="M100 0 C60 20, 20 40, 60 70 C85 90, 95 95, 100 100 Z"></path>
                    </svg>
                </div>
            </div>
            {/* الشريط الفوق */}
            <div className="flex flex-col justify-between bg-white p-6 sm:p-10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#1a3f3a]">
                        <MdOutlineLocalLibrary className="w-5 h-5"></MdOutlineLocalLibrary>
                        <span className="text-sm font-bold">إدارة الفهارس و المقتنيات</span>
                    </div>
                    <button type="button" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 cursor-pointer">
                        <Languages className="w-4 h-4" />
                        <span>English</span>
                    </button>
                </div>
                {/* العنوان */}
                <div className="my-auto mx-auto w-full max-w-md space-y-6">
                    <div>
                        <div className="w-14 h-14 rounded-xl bg-teal-50 text-[#1a3f3a] flex items-center justify-center mb-3 ">
                            <BookOpen className="w-7 h-7"></BookOpen>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">نظام إدارة المكتبات</h2>
                        <p className="text-xs text-slate-500 mt-1">أدخل الى حسابك للمتابعة والوصول للأصول</p>
                    </div>
                    {/* اسم المستخدم */}
                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">اسم المستخدم</label>
                            <div className="relative">
                                <User className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value)
                                        if (loginErrors.username) setLoginErrors((prev) => ({ ...prev, username: '' }))
                                    }}
                                    placeholder="ادخل اسم المستخدم"
                                    className={`w-full pr-10 pl-3 py-2.5 rounded-lg border text-sm focus:outline-none ${
                                        loginErrors.username
                                            ? 'border-red-400 focus:border-red-500'
                                            : 'border-slate-200 focus:border-[#1a3f3a]'
                                    }`}
                                />
                            </div>
                            {loginErrors.username && (
                                <p className="text-xs text-red-500 mt-1">{loginErrors.username}</p>
                            )}
                        </div>
                        {/* Password */}
                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="text-xs font-semibold text-slate-700">كلمة المرور</label>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setForgotError('')
                                        setShowForgotModal(true)
                                    }}
                                    className="flex items-center gap-1 text-xs text-slate-500 hover:text-[#1a3f3a] cursor-pointer">
                                    <HelpCircle className="w-3.5 h-3.5" />
                                    <span>نسيت كلمة المرور؟</span>
                                </button>
                            </div>
                            <div className="relative">
                                <Lock className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                        if (loginErrors.password) setLoginErrors((prev) => ({ ...prev, password: '' }))
                                    }}
                                    placeholder="أدخل كلمة المرور"
                                    className={`w-full pr-10 pl-10 py-2.5 rounded-lg border text-sm focus:outline-none ${
                                        loginErrors.password
                                            ? 'border-red-400 focus:border-red-500'
                                            : 'border-slate-200 focus:border-[#1a3f3a]'
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer">
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {loginErrors.password && (
                                <p className="text-xs text-red-500 mt-1">{loginErrors.password}</p>
                            )}
                        </div>
                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full py-2.5 rounded-lg bg-[#1a3f3a] hover:bg-[#14332f] text-white text-sm font-medium flex items-center justify-center gap-2 cursor-pointer transition">
                            <span>تسجيل الدخول</span>
                            <ArrowLeft className="w-4 h-4" />
                        </button>
                    </form>
                    {/* زرار انشاء حساب جديد */}
                    <div className="relative flex items-center justify-center">
                        <div className="absolute inset-x-0 border-t border-slate-200" />
                        <span className="bg-white px-3 text-xs text-slate-400 whitespace-nowrap relative">
                            إنشاء حساب جديد في النظام
                        </span>
                    </div>
                    {/* زرار حساب مسؤول */}
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => navigate('/register', { state: { role: 'user' } })}
                            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-teal-50/70 hover:bg-teal-50 border border-teal-100 text-xs font-medium text-[#1a3f3a] cursor-pointer transition">
                            <UserPlus className="w-4 h-4" />
                            <span>حساب مستخدم</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/register', { state: { role: 'admin' } })}
                            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-teal-50/70 hover:bg-teal-50 border border-teal-100 text-xs font-medium text-[#1a3f3a] cursor-pointer transition">
                            <Shield className="w-4 h-4" />
                            <span>حساب مسؤول</span>
                        </button>
                    </div>
                    {/* تنبيه */}
                    <div className=" flex items-start gap-2.5 p-3.5 rounded-lg bg-teal-50/50 border border-teal-100/80 text-xs text-slate-600 leading-relaxed">
                        <Info className="w-4 h-4 text-[#1a3f3a] shrink-0 mt-0.5" />
                        <p>
                            للباحثين والزوار الجدد: يتطلب الوصول إلى أرشيف المخطوطات الرقمية تصريحًا مسبقًا من إدارة الفهرسة المركزية.
                        </p>
                    </div>
                </div>
            </div>
                {showForgotModal && (
                    <div
                        onClick={() => setShowForgotModal(false)}
                        className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-5"
                        >
                            <button
                                type="button"
                                onClick={() => setShowForgotModal(false)}
                                className="absolute top-5 left-5 text-slate-400 hover:text-slate-600 cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            <div className="text-center space-y-2">
                                <div className="w-12 h-12 rounded-xl bg-[#e6f1ee] text-[#1a3f3a] flex items-center justify-center mx-auto">
                                    <MdLockReset className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900">استعادة كلمة المرور</h3>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    أدخل بريدك الإلكتروني الأكاديمي أو اسم المستخدم المسجل وسنرسل لك تعليمات إعادة تعيين كلمة المرور.
                                </p>
                            </div>

                            <form onSubmit={handleForgotSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                        البريد الإلكتروني أو اسم المستخدم
                                    </label>
                                    <div className="relative">
                                        <Mail className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                                        <input
                                            type="text"
                                            dir="ltr"
                                            value={forgotInput}
                                            onChange={(e) => {
                                                setForgotInput(e.target.value)
                                                if (forgotError) setForgotError('')
                                            }}
                                            placeholder="example@library.edu.sa"
                                            className={`w-full pr-10 pl-3 py-2.5 rounded-lg border text-sm text-left focus:outline-none ${
                                                forgotError
                                                    ? 'border-red-400 focus:border-red-500'
                                                    : 'border-slate-200 focus:border-[#1a3f3a]'
                                            }`}
                                        />
                                    </div>
                                    {forgotError && (
                                        <p className="text-xs text-red-500 mt-1">{forgotError}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-2.5 rounded-lg bg-[#1a3f3a] hover:bg-[#14332f] text-white text-sm font-medium flex items-center justify-center gap-2 cursor-pointer transition"
                                >
                                    <span>إرسال رابط الاستعادة</span>
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>

                            <button
                                type="button"
                                onClick={() => setShowForgotModal(false)}
                                className="w-full text-center text-xs text-slate-500 hover:text-[#1a3f3a] cursor-pointer"
                            >
                                العودة لتسجيل الدخول
                            </button>
                        </div>
                    </div>
                )}
            <OtpModal
                isOpen={showOtpModal}
                onClose={() => setShowOtpModal(false)}
                email={username.trim()}
            />
        </div>
    )
}
