import React from 'react';

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F3F4FF] font-sans p-6">
      {/* Card Utama - Persegi Panjang Lebar */}
      <div className="bg-white rounded-[40px] shadow-sm max-w-5xl w-full overflow-hidden flex flex-col md:flex-row items-stretch min-h-[480px]">
        
        {/* Bagian Kiri: Visual Fokus pada Angka 404 */}
        <div className="bg-[#00B074] w-full md:w-2/5 flex items-center justify-center p-12 text-white relative overflow-hidden">
          {/* Ornamen bulat halus di background agar tidak terlalu flat */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
          
          <h1 className="text-[140px] font-black leading-none tracking-tighter z-10">
            404
          </h1>
        </div>

        {/* Bagian Kanan: Konten Teks */}
        <div className="w-full md:w-3/5 p-12 md:p-20 flex flex-col justify-center">
          <div className="mb-2 flex items-center gap-2">
            <div className="h-1 w-12 bg-[#00B074] rounded-full"></div>
            <span className="text-[#00B074] font-bold tracking-widest uppercase text-xs">Halaman Tidak Ditemukan</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-[#2D2D2D] mb-6 leading-tight">
            Sepertinya meja ini <br />
            <span className="text-[#00B074]">belum disiapkan.</span>
          </h2>
          
          <p className="text-[#A3A3A3] text-lg mb-10 max-w-sm">
            Maaf, halaman yang kamu akses tidak tersedia. Silakan kembali ke menu utama dashboard.
          </p>

          <div>
            <a 
              href="/" 
              className="inline-flex items-center gap-3 bg-[#00B074] hover:bg-[#009663] text-white font-bold py-4 px-10 rounded-2xl transition-all duration-300 shadow-lg shadow-[#00B07430] group"
            >
              <svg 
                className="w-5 h-5 transition-transform group-hover:-translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Kembali ke Dashboard
            </a>
          </div>

          {/* Footer Card */}
          <div className="mt-16 pt-8 border-t border-gray-100 flex items-center gap-2">
            <span className="font-bold text-[#2D2D2D]">Sedap.</span>
            <span className="text-[#A3A3A3] text-sm">Modern Admin Dashboard © 2026</span>
          </div>
        </div>

      </div>
    </div>
  );
}