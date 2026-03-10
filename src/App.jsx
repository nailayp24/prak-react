import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const advantages = [
    {
      id: 1,
      icon: "🌐",
      title: "Akreditasi Internasional",
      desc: "Kurikulum kami telah diakui secara global, mempersiapkan mahasiswa untuk bersaing di kancah dunia."
    },
    {
      id: 2,
      icon: "💡",
      title: "Inovasi Berkelanjutan",
      desc: "Pusat riset dan inkubasi bisnis yang mendukung mahasiswa melahirkan ide-ide disruptif."
    },
    {
      id: 3,
      icon: "🚀",
      title: "Koneksi Industri",
      desc: "Bekerja sama dengan lebih dari 100+ perusahaan top untuk program magang dan penempatan kerja."
    }
  ];

  return (
    <div className="campus-container">
      {/* Hero Section */}
      <header className="hero-section">
        <h1>Excellent University</h1>
        <p>Membentuk Pemimpin Masa Depan dengan Integritas dan Inovasi.</p>
      </header>

      {/* Advantages Section */}
      <section className="advantages-wrapper">
        {advantages.map((item) => (
          <div key={item.id} className="advantage-card">
            <span className="advantage-icon">{item.icon}</span>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </section>
      
      <footer style={{ textAlign: 'center', padding: '40px', color: '#b2bec3' }}>
        <p>&copy; 2024 Excellent University. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App
