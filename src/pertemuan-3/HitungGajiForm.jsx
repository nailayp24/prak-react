import { useState } from "react";

export default function HitungGajiForm() {
    // Inisialisasi dengan string kosong agar placeholder input muncul
    const [gaji, setGaji] = useState("");

    const pajak = 0.11;
    
    // Pastikan gaji dikonversi ke Number sebelum dihitung
    const nominalGaji = Number(gaji);
    const totalGaji = nominalGaji - (nominalGaji * pajak);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Hitung Gaji Bersih</h2>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Gaji Pokok
                    </label>
                    <input
                        type="number"
                        value={gaji}
                        placeholder="Masukkan jumlah gaji"
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                        onChange={(e) => setGaji(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-medium">
                        Pajak: <span className="text-red-500 font-bold">11%</span>
                    </label>
                </div>

              
                {!gaji ? (
                    <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 animate-pulse">
                        <p className="text-sm font-semibold">
                            Silahkan masukkan gaji yang valid (tidak boleh kosong atau negatif).
                        </p>
                    </div>
                ) : (
                    <div className="p-4 bg-blue-50 border-l-4 border-blue-500 text-blue-800 rounded-r-md">
                        <p className="text-sm font-medium">
                            Total Take Home Pay (THP):Rp {totalGaji.toLocaleString()}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}