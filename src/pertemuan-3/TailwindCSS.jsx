export default function TaiwindCSS() {
    return (
        <div>
             <FlexboxGrid/>
            <h1 class="border m-4">Belajar Tailwind CSS 4</h1>
            <button className="bg-blue-400 text-white px-4 py-2 mx-4 rounded shadow-lg">Click Me</button>
            <Spacing title="Judul Card" content="Ini merupakan isi dari card Spacing" />
            <Typography/>
            <BorderRadius/>
            <BackgroundColors/>
            <ShadowEffects/>
            <TailwindRamai/>
        </div>
    )
}

function Spacing(props){
    return (
        <div className="bg-blue-400 shadow-lg p-6 m-4 rounded-lg">
            <h2 className="text-lg font-extrabold">Card Title</h2>
            <p className="mt-2 text-white">{props.content}</p>
        </div>
    )
}

function Typography(){
    return (
        <div>
            <h1 className="text-3xl font-bold text-blue-500">Tailwind Typography</h1>
            <p className="text-blue-300 text-sm mt-2">Belajar Tailwind sangat menyenangkan dan cepat!</p>
        </div>
    )
}

function BorderRadius(){
    return (
        <button className="m-4 border-2 border-blue-500 text-blue-500 px-4 py-2 rounded-lg"> Klik Saya </button>
    )
}

function BackgroundColors(){
    return(
        <div className="bg-blue-500 text-white p-6 rounded-lg hover:bg-blue-600">
            <h3 className="text-xl font-bold">Tailwind Colors</h3>
            <p className="mt-2">Belajar Tailwind itu seru dan fleksibel!</p>
        </div>
    )
}
function FlexboxGrid(){
    return (
        <nav className="flex justify-between bg-gray-800 p-4 text-white">
            <h1 className="text-lg font-bold">MyWebsite</h1>
            <ul className="flex space-x-4">
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
        </nav>
    )
}

function ShadowEffects(){
    return (
        <div className="bg-white shadow-lg p-6 rounded-lg hover:shadow-2xl transition">
            <h3 className="text-xl font-semibold">Hover me!</h3>
            <p className="text-gray-600 mt-2">Lihat efek bayangan saat hover.</p>
        </div>
    )
}

function TailwindRamai() {
    return (
        <div className="min-h-screen bg-slate-100 font-sans">
            {/* 1. NAVBAR (FLEXBOX & BACKGROUND) */}
            <FlexboxGrid />

            {/* MAIN CONTENT */}
            <main className="p-4 md:p-10 space-y-10">
                
                {/* 2. HERO SECTION (TYPOGRAPHY & SPACING) */}
                <section className="text-center py-10 bg-white rounded-3xl shadow-sm border border-slate-200">
                    <h1 className="text-5xl font-black text-slate-800 tracking-tighter">
                        Eksplorasi <span className="text-blue-600 italic">Tailwind v4</span>
                    </h1>
                    <p className="mt-4 text-slate-500 text-lg max-w-xl mx-auto px-4">
                        Belajar Tailwind sangat menyenangkan dan cepat! Gabungan antara utility class membuat UI jadi lebih hidup.
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <button className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95">
                            Mulai Belajar
                        </button>
                        <BorderRadius />
                    </div>
                </section>

                {/* 3. GRID SECTION (RAMAI DENGAN KARTU) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Pakai Komponen Spacing kamu */}
                    <Spacing title="Desain Modern" content="Menggunakan sistem spacing yang konsisten membuat layout terlihat profesional dan rapi." />
                    
                    {/* Pakai Komponen Background kamu */}
                    <BackgroundColors />

                    {/* Pakai Komponen Shadow kamu */}
                    <ShadowEffects />

                    {/* Kartu Tambahan biar makin ramai */}
                    <div className="bg-indigo-600 p-8 rounded-2xl text-white shadow-xl flex flex-col justify-between hover:rotate-1 transition-transform">
                        <h3 className="text-2xl font-bold italic">"Fast as Lightning"</h3>
                        <p className="mt-4 opacity-80">Tailwind v4 menggunakan engine Oxide yang sangat cepat untuk memproses CSS kamu.</p>
                        <div className="mt-6 font-mono text-xs bg-indigo-800 p-2 rounded">
                            npm install @tailwindcss/vite
                        </div>
                    </div>

                    <div className="md:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group overflow-hidden relative">
                        <div className="relative z-10">
                            <Typography />
                            <button className="mt-6 bg-slate-900 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                                Baca Dokumentasi →
                            </button>
                        </div>
                        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-100 rounded-full group-hover:scale-150 transition-transform duration-700 opacity-50"></div>
                    </div>
                </div>

                {/* 4. STATS BAR (FLEXBOX LAGI) */}
                <div className="flex flex-wrap justify-around bg-white p-8 rounded-2xl shadow-inner border border-slate-100 gap-8">
                    <div className="text-center">
                        <div className="text-3xl font-black text-blue-600">100%</div>
                        <div className="text-gray-500 text-sm font-bold">UTILITY FIRST</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-black text-blue-600">v4.0</div>
                        <div className="text-gray-500 text-sm font-bold">LATEST VERSION</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-black text-blue-600">∞</div>
                        <div className="text-gray-500 text-sm font-bold">POSSIBILITIES</div>
                    </div>
                </div>
            </main>

            <footer className="text-center pb-10 text-slate-400 text-sm font-medium">
                Dibuat dengan ❤️ oleh Nailay Developer
            </footer>
        </div>
    )
}