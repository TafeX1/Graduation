import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
    ArrowLeft,
    ArrowRight,
    BookOpen,
    Calendar,
    CheckCircle2,
    Clock,
    Eye,
    EyeOff,
    Languages,
    Lock,
    Mail,
    MailCheck,
    Pencil,
    Phone,
    ShieldCheck,
    User,
    UserCheck,
    X,
} from 'lucide-react'
import { MdLockReset, MdOutlineLocalLibrary } from 'react-icons/md'

function maskEmail(value) {
    if (!value || !value.includes('@')) return value
    const [local, domain] = value.split('@')
    return `${local.slice(0, 2)}****@${domain}`
}

export default function Register() {
    const navigate = useNavigate()
    const { state } = useLocation()
    const accountType = state?.role || 'user'

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        age: '',
        phone: '',
        email: '',
        agreed: false,
    })
    const [errors, setErrors] = useState({})

    // Modal 2: Create Password
    const [showPasswordModal, setShowPasswordModal] = useState(false)
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [passwordError, setPasswordError] = useState('')

    // Modal 3: Verify Email OTP
    const [showVerifyModal, setShowVerifyModal] = useState(false)
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const [otpError, setOtpError] = useState('')
    const [otpVerified, setOtpVerified] = useState(false)
    const [secondsLeft, setSecondsLeft] = useState(59)
    const otpRefs = useRef([])

    useEffect(() => {
        if (!showVerifyModal) return
        setSecondsLeft(59)
        setOtp(['', '', '', '', '', ''])
        setOtpError('')
        setOtpVerified(false)
        setTimeout(() => otpRefs.current[0]?.focus(), 50)
    }, [showVerifyModal])

    useEffect(() => {
        if (!showVerifyModal || secondsLeft <= 0) return
        const timer = setInterval(() => {
            setSecondsLeft((prev) => prev - 1)
        }, 1000)
        return () => clearInterval(timer)
    }, [showVerifyModal, secondsLeft])

    const formatTimer = (totalSeconds) => {
        const mins = String(Math.floor(totalSeconds / 60)).padStart(2, '0')
        const secs = String(totalSeconds % 60).padStart(2, '0')
        return `${mins}:${secs}`
    }

    const handleFieldChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: '' }))
        }
    }

    const validateRegisterForm = () => {
        const nextErrors = {}
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (!formData.firstName.trim()) {
            nextErrors.firstName = 'يرجى إدخال الاسم الأول'
        }
        if (!formData.lastName.trim()) {
            nextErrors.lastName = 'يرجى إدخال الاسم الأخير'
        }
        const ageNum = Number(formData.age)
        if (!formData.age.trim() || Number.isNaN(ageNum) || ageNum < 10 || ageNum > 120) {
            nextErrors.age = 'يرجى إدخال عمر صحيح'
        }
        if (!formData.phone.trim() || formData.phone.replace(/\D/g, '').length < 8) {
            nextErrors.phone = 'يرجى إدخال رقم هاتف صحيح'
        }
        if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
            nextErrors.email = 'يرجى إدخال بريد إلكتروني صحيح'
        }
        if (!formData.agreed) {
            nextErrors.agreed = 'يجب الموافقة على الشروط والأحكام للمتابعة'
        }

        setErrors(nextErrors)
        return Object.keys(nextErrors).length === 0
    }

    const handleRegisterSubmit = (e) => {
        e.preventDefault()
        if (!validateRegisterForm()) return
        setPasswordError('')
        setShowPasswordModal(true)
    }

    const passwordRules = {
        minLength: newPassword.length >= 8,
        upperAndLower: /[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword),
        hasNumber: /\d/.test(newPassword),
        hasSpecial: /[^A-Za-z0-9]/.test(newPassword),
    }
    const allPasswordRulesMet = Object.values(passwordRules).every(Boolean)

    const handlePasswordSubmit = (e) => {
        e.preventDefault()
        if (!allPasswordRulesMet) {
            setPasswordError('يرجى استيفاء جميع متطلبات كلمة المرور الموضحة أدناه')
            return
        }
        if (newPassword !== confirmPassword) {
            setPasswordError('كلمتا المرور غير متطابقتين')
            return
        }
        setPasswordError('')
        setShowPasswordModal(false)
        setShowVerifyModal(true)
    }

    const handleOtpChange = (index, value) => {
        const digit = value.replace(/\D/g, '').slice(-1)
        const nextOtp = [...otp]
        nextOtp[index] = digit
        setOtp(nextOtp)
        if (otpError) setOtpError('')
        if (digit && index < 5) {
            otpRefs.current[index + 1]?.focus()
        }
    }

    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus()
        }
    }

    const handleOtpPaste = (e) => {
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
        if (!pasted) return
        e.preventDefault()
        const nextOtp = ['', '', '', '', '', '']
        pasted.split('').forEach((char, idx) => {
            nextOtp[idx] = char
        })
        setOtp(nextOtp)
        if (otpError) setOtpError('')
        otpRefs.current[Math.min(pasted.length, 5)]?.focus()
    }

    const handleVerifyOtpSubmit = (e) => {
        e.preventDefault()
        const firstEmpty = otp.findIndex((d) => !d)
        if (firstEmpty !== -1) {
            setOtpError('يرجى إدخال رمز التحقق المكون من 6 أرقام كاملاً')
            otpRefs.current[firstEmpty]?.focus()
            return
        }
        setOtpError('')
        setShowVerifyModal(false)
        navigate('/account-activated', {
            state: {
                email: formData.email.trim(),
                role: accountType,
                verifiedAt: new Date().toISOString(),
            },
        })
    }

    return (
        <div dir="rtl" className="min-h-screen grid grid-cols-1 lg:grid-cols-[1fr_45%]">
            {/* الجزء اليمين: الفورم الأبيض */}
            <div className="flex flex-col justify-between bg-white p-6 sm:p-10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#1a3f3a]">
                        <span className="w-7 h-7 rounded-md bg-[#e6f1ee] flex items-center justify-center">
                            <MdOutlineLocalLibrary className="w-4 h-4" />
                        </span>
                        <span className="text-sm font-bold">إدارة الفهارس والمقتنيات</span>
                    </div>
                    <button
                        type="button"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#eef5f3] border border-[#d6e7e2] text-xs font-medium text-[#1a3f3a] hover:bg-[#e3efec] cursor-pointer transition"
                    >
                        <Languages className="w-3.5 h-3.5" />
                        <span>English</span>
                    </button>
                </div>

                <div className="my-auto mx-auto w-full max-w-md space-y-6 py-8">
                    <div>
                        <div className="flex items-center gap-3 mb-1.5">
                            <div className="w-10 h-10 rounded-xl bg-[#e6f1ee] text-[#1a3f3a] flex items-center justify-center">
                                <BookOpen className="w-5 h-5" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">
                                {accountType === 'admin' ? 'إنشاء حساب مسؤول جديد' : 'إنشاء حساب جديد'}
                            </h2>
                        </div>
                        <p className="text-xs text-slate-500">انضم إلينا واستكشف محتويات المكتبة بسهولة</p>
                    </div>

                    <form onSubmit={handleRegisterSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            {/* الاسم الأول */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                    الاسم الأول <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <User className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        value={formData.firstName}
                                        onChange={(e) => handleFieldChange('firstName', e.target.value)}
                                        placeholder="أدخل اسمك الأول"
                                        className={`w-full pr-9 pl-3 py-2.5 rounded-lg border text-sm focus:outline-none ${
                                            errors.firstName
                                                ? 'border-red-400 focus:border-red-500'
                                                : 'border-slate-200 focus:border-[#1a3f3a]'
                                        }`}
                                    />
                                </div>
                                {errors.firstName && (
                                    <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
                                )}
                            </div>

                            {/* الاسم الأخير */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                    الاسم الأخير <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <UserCheck className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="text"
                                        value={formData.lastName}
                                        onChange={(e) => handleFieldChange('lastName', e.target.value)}
                                        placeholder="أدخل اسمك الأخير"
                                        className={`w-full pr-9 pl-3 py-2.5 rounded-lg border text-sm focus:outline-none ${
                                            errors.lastName
                                                ? 'border-red-400 focus:border-red-500'
                                                : 'border-slate-200 focus:border-[#1a3f3a]'
                                        }`}
                                    />
                                </div>
                                {errors.lastName && (
                                    <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
                                )}
                            </div>

                            {/* العمر */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                    العمر <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="number"
                                        min="10"
                                        max="120"
                                        value={formData.age}
                                        onChange={(e) => handleFieldChange('age', e.target.value)}
                                        placeholder="أدخل عمرك"
                                        className={`w-full pr-9 pl-3 py-2.5 rounded-lg border text-sm focus:outline-none ${
                                            errors.age
                                                ? 'border-red-400 focus:border-red-500'
                                                : 'border-slate-200 focus:border-[#1a3f3a]'
                                        }`}
                                    />
                                </div>
                                {errors.age && (
                                    <p className="text-xs text-red-500 mt-1">{errors.age}</p>
                                )}
                            </div>

                            {/* رقم الهاتف */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                    رقم الهاتف <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Phone className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => handleFieldChange('phone', e.target.value)}
                                        placeholder="أدخل رقم هاتفك"
                                        className={`w-full pr-9 pl-3 py-2.5 rounded-lg border text-sm focus:outline-none ${
                                            errors.phone
                                                ? 'border-red-400 focus:border-red-500'
                                                : 'border-slate-200 focus:border-[#1a3f3a]'
                                        }`}
                                    />
                                </div>
                                {errors.phone && (
                                    <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                                )}
                            </div>
                        </div>

                        {/* البريد الإلكتروني */}
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                البريد الإلكتروني <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="email"
                                    dir="ltr"
                                    value={formData.email}
                                    onChange={(e) => handleFieldChange('email', e.target.value)}
                                    placeholder="example@gmail.com"
                                    className={`w-full pl-10 pr-3 py-2.5 rounded-lg border text-sm text-left focus:outline-none ${
                                        errors.email
                                            ? 'border-red-400 focus:border-red-500'
                                            : 'border-slate-200 focus:border-[#1a3f3a]'
                                    }`}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* الموافقة على الشروط */}
                        <div>
                            <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.agreed}
                                    onChange={(e) => handleFieldChange('agreed', e.target.checked)}
                                    className="w-4 h-4 rounded border-slate-300 accent-[#1a3f3a] cursor-pointer"
                                />
                                <span>أوافق على الشروط والأحكام و سياسة الخصوصية</span>
                            </label>
                            {errors.agreed && (
                                <p className="text-xs text-red-500 mt-1">{errors.agreed}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2.5 rounded-lg bg-[#1a3f3a] hover:bg-[#14332f] text-white text-sm font-medium flex items-center justify-center gap-2 cursor-pointer transition"
                        >
                            <span>إنشاء الحساب</span>
                            <ArrowLeft className="w-4 h-4" />
                        </button>
                    </form>

                    <div className="text-center text-xs text-slate-500">
                        لديك حساب بالفعل؟{' '}
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="text-[#1a3f3a] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                        >
                            <span>تسجيل الدخول</span>
                            <ArrowLeft className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* الجزء الشمال: اللوحة الخضراء الداكنة */}
            <div className="relative hidden lg:flex flex-col justify-center p-12 text-white bg-[#1a3f3a] overflow-hidden">
                <div className="relative z-10 my-auto max-w-md space-y-5">
                    <div className="w-10 h-1 rounded-full bg-[#74a39d]/80" />
                    <h1 className="text-4xl font-bold leading-snug">
                        معاً نحو مكتبة أكثر تنظيماً وكفاءة
                    </h1>
                    <p className="text-sm text-white/80 leading-relaxed">
                        بيئة رقمية رصينة صُممت لتمكين الباحثين وأمناء المعرفة من فهرسة، استعارة، وصيانة النفائس العلمية وفق أعلى المعايير المؤسسية.
                    </p>
                </div>

                {/* الموجة البيضاء على الحافة اليسرى */}
                <div className="hidden md:block absolute left-0 inset-y-0 w-10 pointer-events-none z-20">
                    <svg className="h-full w-full fill-white" preserveAspectRatio="none" viewBox="0 0 100 100">
                        <path d="M0 0 C40 20, 80 40, 40 70 C15 90, 5 95, 0 100 Z" />
                    </svg>
                </div>
            </div>

            {/* Modal 2: إنشاء كلمة مرور جديدة */}
            {showPasswordModal && (
                <div
                    onClick={() => setShowPasswordModal(false)}
                    className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5"
                    >
                        <button
                            type="button"
                            onClick={() => setShowPasswordModal(false)}
                            className="absolute top-5 left-5 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="text-center space-y-2">
                            <div className="w-14 h-14 rounded-full bg-[#e6f1ee] text-[#1a3f3a] flex items-center justify-center mx-auto">
                                <MdLockReset className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">إنشاء كلمة مرور جديدة</h3>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                أدخل كلمة المرور الجديدة لتتمكن من الوصول إلى حسابك مرة أخرى
                            </p>
                        </div>

                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                    كلمة المرور الجديدة <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Lock className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type={showNewPassword ? 'text' : 'password'}
                                        value={newPassword}
                                        onChange={(e) => {
                                            setNewPassword(e.target.value)
                                            if (passwordError) setPasswordError('')
                                        }}
                                        placeholder="أدخل كلمة المرور الجديدة"
                                        className="w-full pr-10 pl-10 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#1a3f3a]"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword((prev) => !prev)}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                                    >
                                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                                    تأكيد كلمة المرور <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <ShieldCheck className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={(e) => {
                                            setConfirmPassword(e.target.value)
                                            if (passwordError) setPasswordError('')
                                        }}
                                        placeholder="أعد إدخال كلمة المرور الجديدة"
                                        className="w-full pr-10 pl-10 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-[#1a3f3a]"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <div className="rounded-xl bg-slate-50 border border-slate-100 p-3.5 space-y-2 text-xs">
                                <p className="font-bold text-slate-700">متطلبات كلمة المرور:</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    <RequirementItem met={passwordRules.minLength} label="يجب ألا تقل عن 8 أحرف" />
                                    <RequirementItem met={passwordRules.upperAndLower} label="حرف كبير وحرف صغير" />
                                    <RequirementItem met={passwordRules.hasNumber} label="رقم واحد على الأقل" />
                                    <RequirementItem met={passwordRules.hasSpecial} label="رمز خاص واحد على الأقل" />
                                </div>
                            </div>

                            {passwordError && (
                                <p className="text-xs text-red-500 text-center">{passwordError}</p>
                            )}

                            <button
                                type="submit"
                                className="w-full py-2.5 rounded-xl bg-[#1a3f3a] hover:bg-[#14332f] text-white text-sm font-medium flex items-center justify-center gap-2 cursor-pointer transition"
                            >
                                <span>حفظ كلمة المرور الجديدة</span>
                                <ArrowLeft className="w-4 h-4" />
                            </button>
                        </form>

                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="w-full flex items-center justify-center gap-1.5 text-xs text-slate-600 hover:text-[#1a3f3a] cursor-pointer"
                        >
                            <ArrowRight className="w-3.5 h-3.5" />
                            <span>العودة لتسجيل الدخول</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Modal 3: تأكيد البريد الإلكتروني */}
            {showVerifyModal && (
                <div
                    onClick={() => setShowVerifyModal(false)}
                    className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5"
                    >
                        <button
                            type="button"
                            onClick={() => setShowVerifyModal(false)}
                            className="absolute top-5 left-5 text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="text-center space-y-2.5 pt-2">
                            <div className="w-14 h-14 rounded-2xl bg-[#e6f1ee] text-[#1a3f3a] flex items-center justify-center mx-auto">
                                <MailCheck className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">تأكيد البريد الإلكتروني</h3>
                            <p className="text-xs text-slate-500">
                                أرسلنا رمز التحقق المكون من 6 أرقام إلى بريدك الإلكتروني
                            </p>

                            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#eef5f3] border border-[#d6e7e2] text-xs">
                                <Mail className="w-3.5 h-3.5 text-[#1a3f3a]" />
                                <span dir="ltr" className="font-mono text-slate-800">
                                    {maskEmail(formData.email.trim())}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setShowVerifyModal(false)}
                                    className="text-slate-500 hover:text-[#1a3f3a] cursor-pointer"
                                    title="تعديل البريد الإلكتروني"
                                >
                                    <Pencil className="w-3 h-3" />
                                </button>
                            </div>
                        </div>

                        {otpVerified ? (
                            <div className="rounded-2xl bg-[#eef5f3] border border-[#cde0db] p-5 text-center space-y-3">
                                <CheckCircle2 className="w-10 h-10 text-[#1a3f3a] mx-auto" />
                                <p className="text-sm font-bold text-slate-900">تم تأكيد البريد وإنشاء الحساب بنجاح!</p>
                                <p className="text-xs text-slate-500">
                                    مرحباً بك، {formData.firstName} {formData.lastName}
                                </p>
                                <button
                                    type="button"
                                    onClick={() => navigate('/')}
                                    className="px-5 py-2 rounded-xl bg-[#1a3f3a] text-white text-xs font-medium cursor-pointer hover:bg-[#14332f] transition"
                                >
                                    الذهاب لتسجيل الدخول
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleVerifyOtpSubmit} className="space-y-4">
                                <div dir="ltr" className="grid grid-cols-6 gap-2">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            ref={(el) => (otpRefs.current[index] = el)}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                            onPaste={handleOtpPaste}
                                            className={`h-14 w-full rounded-2xl text-center text-lg font-bold text-slate-900 focus:outline-none transition ${
                                                otpError && !digit
                                                    ? 'border border-red-400 focus:border-2 focus:border-red-500'
                                                    : digit
                                                        ? 'border-2 border-[#1a3f3a]'
                                                        : 'border border-slate-200 focus:border-2 focus:border-[#1a3f3a]'
                                            }`}
                                        />
                                    ))}
                                </div>

                                {otpError && (
                                    <p className="text-xs text-red-500 text-center">{otpError}</p>
                                )}

                                <button
                                    type="submit"
                                    className="w-full py-3 rounded-xl bg-[#1a3f3a] hover:bg-[#14332f] text-white text-sm font-medium flex items-center justify-center gap-2 cursor-pointer transition"
                                >
                                    <span>تأكيد الرمز</span>
                                    <ArrowLeft className="w-4 h-4" />
                                </button>

                                <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                                    <span>لم يصلك الرمز؟</span>
                                    <button
                                        type="button"
                                        onClick={() => setSecondsLeft(59)}
                                        className="text-[#1a3f3a] font-medium hover:underline cursor-pointer"
                                    >
                                        إعادة إرسال الرمز
                                    </button>
                                    <span>•</span>
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md border border-slate-200 text-slate-600 font-mono">
                                        <Clock className="w-3 h-3" />
                                        {formatTimer(secondsLeft)}
                                    </span>
                                </div>
                            </form>
                        )}

                        <div className="pt-3 border-t border-slate-100 text-center">
                            <button
                                type="button"
                                onClick={() => setShowVerifyModal(false)}
                                className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-[#1a3f3a] cursor-pointer"
                            >
                                <span>تغيير البريد الإلكتروني</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

function RequirementItem({ met, label }) {
    return (
        <div className={`flex items-center gap-1.5 ${met ? 'text-[#1a3f3a] font-medium' : 'text-slate-500'}`}>
            {met ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1a3f3a] shrink-0" />
            ) : (
                <span className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0" />
            )}
            <span>{label}</span>
        </div>
    )
}
