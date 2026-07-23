import { useState, useEffect } from 'react';
import { PageTab, TrustModalType } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TrustModal } from './components/TrustModal';
import { HomeView } from './views/HomeView';
import { MouseGlow } from './components/MouseGlow';
import { subscribeAppConfig, findStorageLogoUrl } from './lib/firebaseService';

export default function App() {
  const [activeTab, setActiveTab] = useState<PageTab>('home');
  const [trustModal, setTrustModal] = useState<TrustModalType>(null);
  const [logoUrl, setLogoUrl] = useState<string | undefined>();

  useEffect(() => {
    // 1. Listen for real-time config updates from Firestore
    const unsubscribe = subscribeAppConfig((config) => {
      if (config.logoUrl) {
        setLogoUrl(config.logoUrl);
      }
    });

    // 2. Proactively run the Storage folder scan to retrieve and apply the latest logo URL immediately
    findStorageLogoUrl().then((url) => {
      if (url) {
        setLogoUrl(url);
      }
    }).catch((err) => {
      console.warn('Proactive background storage scan failed:', err);
    });

    return () => unsubscribe();
  }, []);

  const handleTabChange = (tab: PageTab) => {
    setActiveTab(tab);
    if (tab === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(tab);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#07060a] text-[#ece7de] flex flex-col font-sans relative">
      {/* Subtle mouse glow tracking cursor */}
      <MouseGlow />
      
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenTrustModal={(type) => setTrustModal(type)}
        logoUrl={logoUrl}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        <HomeView setActiveTab={handleTabChange} logoUrl={logoUrl} />
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={handleTabChange}
        onOpenTrustModal={(type) => setTrustModal(type)}
        logoUrl={logoUrl}
      />

      {/* Trust & Legal Modals */}
      <TrustModal
        type={trustModal}
        onClose={() => setTrustModal(null)}
      />

    </div>
  );
}
