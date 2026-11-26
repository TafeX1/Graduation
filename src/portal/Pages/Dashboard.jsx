import React, { useState } from 'react'
import {
    Activity, ArrowLeft, ArrowLeftRight, Bell, Bookmark, BookOpen, BookPlus, Calendar, CheckCircle2, ChevronDown, Clock, Compass, History, Landmark, LayoutGrid, LogOut, PlusCircle,
    RotateCw, Search, Settings, Star, ThumbsUp, TrendingUp, UserCheck} from 'lucide-react'

const INITIAL_BOOKS = [
    {
        id: 1,
        title: 'قوة العزيمة',
        author: 'د. مصطفى محمود',
        category: 'الفلسفة والحكمة',
        coverTag: 'سلسلة الفكر',
        coverSub: 'د. مصطفى',
        coverBg: 'bg-gradient-to-b from-[#1a4a44] to-[#0f2c28]',
        rating: '4.9',
        reviews: '١٤٢',
        available: true,
        bookmarked: false,
    },
    {
        id: 2,
        title: 'تاريخ الحضارات',
        author: 'د. محمد الجبالي',
        category: 'التاريخ القديم',
        coverTag: 'دراسات تاريخية',
        coverSub: 'د. الجبالي',
        coverBg: 'bg-gradient-to-b from-[#543c1e] to-[#2e200f]',
        rating: '4.8',
        reviews: '٩٨',
        available: true,
        bookmarked: false,
    },
    {
        id: 3,
        title: 'الذكاء الاصطناعي',
        author: 'د. سامي العلي',
        category: 'هندسة وتقنية',
        coverTag: 'علوم الحاسوب',
        coverSub: 'د. سامي العلي',
        coverBg: 'bg-gradient-to-b from-[#1b3a4b] to-[#0f222d]',
        rating: '5.0',
        reviews: '٢١٠',
        available: true,
        bookmarked: false,
    },
    {
        id: 4,
        title: 'الأرض المحرمة',
        author: 'أحمد خالد توفيق',
        category: 'الأدب والرواية',
        coverTag: 'سرد أدبي',
        coverSub: 'أحمد توفيق',
        coverBg: 'bg-gradient-to-b from-[#4a2038] to-[#29101f]',
        rating: '4.7',
        reviews: '٨٧',
        available: true,
        bookmarked: false,
    },
]

const INITIAL_ACTIVITIES = [
    {
        id: 1,
        title: 'تم استعارة كتاب الذكاء الاصطناعي',
        sub: 'الرقم التعريفي: BK-88214',
        time: 'منذ ساعة',
        icon: BookOpen,
    },
    {
        id: 2,
        title: 'تم إرجاع كتاب تاريخ الحضارات',
        sub: 'حالة النسخة: ممتازة',
        time: 'منذ ساعتين',
        icon: ArrowLeftRight,
    },
    {
        id: 3,
        title: 'تم طلب كتاب علم النفس',
        badge: 'قيد المراجعة',
        time: 'منذ 3 ساعات',
        icon: PlusCircle,
    },
    {
        id: 4,
        title: 'تم تحديث بيانات حسابك',
        sub: 'تأكيد البريد الجامعي',
        time: 'منذ يوم أمس',
        icon: UserCheck,
    },
]

const NAV_ITEMS = [
    { id: 'home', label: 'الرئيسية', icon: LayoutGrid },
    { id: 'browse', label: 'تصفح الكتب', icon: BookOpen },
    { id: 'borrows', label: 'عمليات الاستعارة', icon: ArrowLeftRight },
    { id: 'request', label: 'طلب كتاب', icon: PlusCircle },
    { id: 'history', label: 'سجل الاستعارات', icon: History },
    { id: 'settings', label: 'الإعدادات', icon: Settings },
]

function getStoredUser() {
    try {
        const raw = sessionStorage.getItem('library_user')
        if (!raw) return { name: 'عمر وليد', role: 'user' }
        return JSON.parse(raw)
    } catch {
        return { name: 'عمر وليد', role: 'user' }
    }
}

export default function Dashboard() {
    const user = getStoredUser()
    const userName = user.name || 'عمر وليد'
    const initials = userName
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0])
        .join('')

    const [activeNav, setActiveNav] = useState('home')
    const [searchQuery, setSearchQuery] = useState('')
    const [books, setBooks] = useState(INITIAL_BOOKS)
    const [activities, setActivities] = useState(INITIAL_ACTIVITIES)
    const [borrowedCount, setBorrowedCount] = useState(1)

    const filteredBooks = books.filter(
        (b) =>
            b.title.includes(searchQuery.trim()) ||
            b.author.includes(searchQuery.trim()) ||
            b.category.includes(searchQuery.trim())
    )

    const handleToggleBookmark = (id) => {
        setBooks((prev) =>
            prev.map((book) =>
                book.id === id ? { ...book, bookmarked: !book.bookmarked } : book
            )
        )
    }

    const handleBorrowBook = (book) => {
        setBorrowedCount((prev) => prev + 1)
        setActivities((prev) => [
            {
                id: Date.now(),
                title: `تم استعارة كتاب ${book.title}`,
                sub: `الرقم التعريفي: BK-${Math.floor(10000 + Math.random() * 90000)}`,
                time: 'الآن',
                icon: BookOpen,
            },
            ...prev.slice(0, 3),
        ])
    }

    const handleLogout = () => {
        sessionStorage.removeItem('library_user')
        window.location.href = '/'
    }

    return (
        <div dir="rtl" className="min-h-screen flex bg-[#f7faf9] text-slate-800">
            {/* القائمة الجانبية اليمين */}
            <aside className="hidden lg:flex w-64 bg-[#1a3f3a] text-white flex-col justify-between p-5 shrink-0">
                <div className="space-y-8">
                    <div className="flex items-center gap-3 px-1">
                        <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                            <BookOpen className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-sm font-bold leading-tight">نظام إدارة المكتبات</h2>
                            <p className="text-[11px] text-white/65 mt-0.5">المكتبة الأكاديمية المركزية</p>
                        </div>
                    </div>

                    <nav className="space-y-1.5">
                        {NAV_ITEMS.map((item) => {
                            const Icon = item.icon
                            const isActive = activeNav === item.id
                            return (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => setActiveNav(item.id)}
                                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium cursor-pointer transition ${isActive
                                            ? 'bg-[#2c5751] text-white shadow-sm'
                                            : 'text-white/75 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    <Icon className="w-4 h-4 shrink-0" />
                                    <span>{item.label}</span>
                                </button>
                            )
                        })}
                    </nav>
                </div>

                <div className="space-y-4">
                    <div className="rounded-2xl bg-[#143430] border border-white/10 p-4 space-y-2.5 text-center">
                        <p className="text-[11px] text-white/75">هل تبحث عن مرجع غير متوفر؟</p>
                        <button
                            type="button"
                            onClick={() => setActiveNav('request')}
                            className="w-full py-2 px-3 rounded-xl bg-[#27514b] hover:bg-[#31635c] text-white text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer transition"
                        >
                            <BookPlus className="w-3.5 h-3.5" />
                            <span>طلب كتاب جديد</span>
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-white/75 hover:text-white cursor-pointer transition"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>تسجيل الخروج</span>
                    </button>
                </div>
            </aside>

            {/* المحتوى الرئيسي */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="bg-white border-b border-slate-100 px-5 sm:px-8 py-3.5 flex items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="ابحث عن كتاب، مؤلف أو موضوع..."
                            className="w-full bg-[#f5f8f7] border border-slate-200/80 rounded-xl py-2 pr-10 pl-12 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#1a3f3a]"
                        />
                        <span
                            dir="ltr"
                            className="absolute left-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-mono text-slate-400"
                        >
                            ⌘K
                        </span>
                    </div>

                    <div className="flex items-center gap-2.5 sm:gap-3.5">
                        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#eef5f3] border border-[#dceae5] text-[11px] font-medium text-[#1a3f3a]">
                            <Compass className="w-3.5 h-3.5" />
                            <span>بوابة الباحثين</span>
                        </span>

                        <button
                            type="button"
                            className="w-9 h-9 rounded-xl hover:bg-slate-100 text-slate-500 flex items-center justify-center cursor-pointer transition"
                        >
                            <Bookmark className="w-4 h-4" />
                        </button>

                        <button
                            type="button"
                            className="relative w-9 h-9 rounded-xl hover:bg-slate-100 text-slate-500 flex items-center justify-center cursor-pointer transition"
                        >
                            <Bell className="w-4 h-4" />
                            <span className="w-2 h-2 rounded-full bg-red-500 absolute top-2 right-2.5" />
                        </button>

                        <div className="flex items-center gap-2.5 pr-1">
                            <div className="w-9 h-9 rounded-full bg-[#d8ede6] text-[#1a3f3a] font-bold text-xs flex items-center justify-center">
                                {initials}
                            </div>
                            <div className="hidden sm:block text-right">
                                <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                                    <span>{userName}</span>
                                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                                </div>
                                <p className="text-[10px] text-slate-400">مستخدم عادي</p>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 p-5 sm:p-8 space-y-6">
                    <section className="relative bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden">
                        <div className="relative z-10 space-y-3 max-w-xl">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eef5f3] text-[#1a3f3a] text-[11px] font-medium">
                                <Landmark className="w-3.5 h-3.5" />
                                <span>الصرح الأكاديمي للتوثيق والمخطوطات</span>
                            </span>
                            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                                مرحباً بك في مكتبتنا
                            </h1>
                            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                                اكتشف عالم المعرفة بين يديك واستفد من أكثر من مائة ألف مرجع ومخطوطة رقمية موثقة.
                            </p>
                            <div className="flex flex-wrap items-center gap-3 pt-1">
                                <button
                                    type="button"
                                    onClick={() => setActiveNav('browse')}
                                    className="px-5 py-2.5 rounded-xl bg-[#1a3f3a] hover:bg-[#14332f] text-white text-xs font-medium flex items-center gap-2 cursor-pointer transition"
                                >
                                    <BookOpen className="w-4 h-4" />
                                    <span>استكشف الفهارس الآن</span>
                                </button>
                                <button
                                    type="button"
                                    className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium cursor-pointer transition"
                                >
                                    دليل المستخدم
                                </button>
                            </div>
                        </div>

                        <div className="hidden md:block w-52 h-24 self-end -mb-8 shrink-0">
                            <svg viewBox="0 0 200 100" className="w-full h-full fill-[#dde2e1]" preserveAspectRatio="none">
                                <path d="M0 30 Q50 75 100 45 T200 50 L200 100 L0 100 Z" />
                            </svg>
                        </div>
                    </section>

                    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                        <StatCard
                            label="إجمالي الكتب"
                            value="25"
                            sub="+3 كتب هذا الشهر"
                            subIcon={TrendingUp}
                            icon={BookOpen}
                        />
                        <StatCard
                            label="عدد الكتب المتاحة"
                            value="12"
                            sub="جاهزة للاستلام الفوري"
                            icon={CheckCircle2}
                        />
                        <StatCard
                            label="الاستعارات الحالية"
                            value={String(borrowedCount)}
                            sub="موعد الإرجاع بعد 5 أيام"
                            subIcon={Clock}
                            icon={History}
                        />
                        <StatCard
                            label="الكتب المحجوزة"
                            value={String(books.filter((b) => b.bookmarked).length + 2)}
                            sub="قيد المعالجة المكتبية"
                            icon={Bookmark}
                        />
                    </section>

                    <section className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6 items-start">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-slate-900">
                                    <ThumbsUp className="w-4 h-4 text-[#1a3f3a]" />
                                    <h2 className="text-base font-bold">كتب مقترحة لك</h2>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setActiveNav('browse')}
                                    className="text-xs font-medium text-[#1a3f3a] hover:underline flex items-center gap-1 cursor-pointer"
                                >
                                    <span>عرض المزيد</span>
                                    <ArrowLeft className="w-3.5 h-3.5" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {filteredBooks.map((book) => (
                                    <div
                                        key={book.id}
                                        className="bg-white rounded-2xl border border-slate-100 p-4 flex gap-4 hover:shadow-sm transition"
                                    >
                                        <div
                                            className={`w-24 h-36 rounded-xl ${book.coverBg} text-white p-2.5 flex flex-col justify-between shrink-0 shadow-sm`}
                                        >
                                            <span className="text-[9px] text-white/70 bg-white/10 px-1.5 py-0.5 rounded self-start">
                                                {book.coverTag}
                                            </span>
                                            <p className="text-xs font-bold leading-snug text-center">
                                                {book.title}
                                            </p>
                                            <span className="text-[9px] text-white/65 text-center border-t border-white/15 pt-1">
                                                {book.coverSub}
                                            </span>
                                        </div>

                                        <div className="flex-1 flex flex-col justify-between min-w-0">
                                            <div className="space-y-1.5">
                                                <div className="flex items-center justify-between gap-2">
                                                    <span className="px-2 py-0.5 rounded-md bg-[#e9f4f0] text-[#1a3f3a] text-[10px] font-medium">
                                                        متاح للاستعارة
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleToggleBookmark(book.id)}
                                                        className={`cursor-pointer transition ${book.bookmarked
                                                                ? 'text-[#1a3f3a]'
                                                                : 'text-slate-300 hover:text-slate-500'
                                                            }`}
                                                    >
                                                        <Bookmark
                                                            className="w-4 h-4"
                                                            fill={book.bookmarked ? 'currentColor' : 'none'}
                                                        />
                                                    </button>
                                                </div>

                                                <h3 className="text-sm font-bold text-slate-900 truncate">
                                                    {book.title}
                                                </h3>
                                                <p className="text-xs text-slate-400">{book.author}</p>

                                                <div className="flex items-center gap-1 text-[11px]">
                                                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                                    <span className="font-bold text-slate-700">{book.rating}</span>
                                                    <span className="text-slate-400">({book.reviews} تقييم)</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100 mt-2">
                                                <span className="text-[10px] text-slate-400 truncate">
                                                    القسم: {book.category}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleBorrowBook(book)}
                                                    className="px-3 py-1.5 rounded-lg bg-[#1a3f3a] hover:bg-[#14332f] text-white text-[11px] font-medium flex items-center gap-1 shrink-0 cursor-pointer transition"
                                                >
                                                    <span>استعارة الآن</span>
                                                    <ArrowLeft className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-slate-900">
                                    <Activity className="w-4 h-4 text-[#1a3f3a]" />
                                    <h2 className="text-base font-bold">أحدث الأنشطة</h2>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setActivities(INITIAL_ACTIVITIES)}
                                    className="text-slate-400 hover:text-[#1a3f3a] cursor-pointer transition"
                                >
                                    <RotateCw className="w-3.5 h-3.5" />
                                </button>
                            </div>

                            <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-100">
                                {activities.map((item) => {
                                    const Icon = item.icon
                                    return (
                                        <div key={item.id} className="p-3.5 flex items-center justify-between gap-3">
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className="w-9 h-9 rounded-full bg-[#eef5f3] text-[#1a3f3a] flex items-center justify-center shrink-0">
                                                    <Icon className="w-4 h-4" />
                                                </div>
                                                <div className="min-w-0 space-y-0.5">
                                                    <p className="text-xs font-semibold text-slate-800 truncate">
                                                        {item.title}
                                                    </p>
                                                    {item.badge ? (
                                                        <span className="inline-block px-2 py-0.5 rounded bg-amber-50 text-amber-700 text-[10px] font-medium">
                                                            {item.badge}
                                                        </span>
                                                    ) : (
                                                        <p className="text-[11px] text-slate-400 truncate">
                                                            {item.sub}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <span className="text-[10px] text-slate-400 shrink-0">
                                                {item.time}
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>

                            <div className="rounded-2xl bg-[#eef5f3] border border-[#dceae5] p-4 space-y-1.5">
                                <div className="flex items-center gap-2 text-xs font-bold text-[#1a3f3a]">
                                    <Calendar className="w-4 h-4" />
                                    <span>تنبيه أوقات العمل الرمضانية</span>
                                </div>
                                <p className="text-[11px] text-slate-600 leading-relaxed">
                                    تفتح قاعات المخطوطات والاطلاع أبوابها للباحثين يومياً من الساعة ٩:٠٠ صباحاً حتى ٤:٠٠ عصراً.
                                </p>
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="border-t border-slate-200/70 bg-white/60 px-6 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400">
                    <span>
                        © 2025 نظام إدارة المكتبات - الصرح الأكاديمي للوثائق والمخطوطات. جميع الحقوق محفوظة.
                    </span>
                    <div className="flex items-center gap-4">
                        <button type="button" className="hover:text-[#1a3f3a] cursor-pointer">
                            سياسة الإدارة الأكاديمية
                        </button>
                        <button type="button" className="hover:text-[#1a3f3a] cursor-pointer">
                            فهرس الدوريات
                        </button>
                        <button type="button" className="hover:text-[#1a3f3a] cursor-pointer">
                            الدعم التقني
                        </button>
                    </div>
                </footer>
            </div>
        </div>
    )
}

function StatCard({ label, value, sub, subIcon: SubIcon, icon: Icon }) {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 p-4 flex items-center justify-between gap-3">
            <div className="space-y-1">
                <p className="text-xs text-slate-500">{label}</p>
                <p className="text-2xl font-bold text-slate-900">{value}</p>
                <p className="text-[11px] text-slate-400 flex items-center gap-1">
                    {SubIcon && <SubIcon className="w-3 h-3 text-[#1a3f3a]" />}
                    <span>{sub}</span>
                </p>
            </div>
            <div className="w-11 h-11 rounded-xl bg-[#e9f2ef] text-[#1a3f3a] flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
            </div>
        </div>
    )
}
