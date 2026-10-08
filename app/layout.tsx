import type { Metadata } from 'next';
import './globals.css';
import { LearningProvider } from '@/lib/state/learning-context';

export const metadata: Metadata = {
  title: 'Mentora | Yapay Zekâ Destekli Kişiselleştirilmiş LGS Öğrenme Platformu',
  description:
    'Daha çok soru değil. Daha doğru öğrenme. Yapay zekâ neyi bilmediğini bulur, sana özel LGS öğrenme haritanı çıkarır.',
  keywords: [
    'Mentora',
    'LGS',
    'Matematik',
    'Yapay Zeka',
    'Sokratesçi Eğitmen',
    'Kazanım',
    'Kişiselleştirilmiş Öğrenme',
    'Hata Analizi',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="dark">
      <body className="min-h-screen bg-[#0B0F17] text-slate-100 antialiased selection:bg-blue-600/30 selection:text-blue-200">
        <LearningProvider>{children}</LearningProvider>
      </body>
    </html>
  );
}
