import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ArrowRight, Star,
  ChevronRight, Mail, MapPin, ArrowUpRight,
  Code, Palette, ShoppingBag
} from 'lucide-react';

const FontStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Inter:wght@400;500;600;700&family=Oswald:wght@500;700&family=Permanent+Marker&family=Plus+Jakarta+Sans:ital,wght@0,400;0,600;0,800;1,400;1,800&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,900;1,9..144,300&display=swap');
    
    body { margin: 0; padding: 0; overflow-x: hidden; background-color: #F4E9D0; -webkit-tap-highlight-color: transparent; }
    
    .font-jakarta { font-family: 'Plus Jakarta Sans', sans-serif; }
    .font-marker { font-family: 'Permanent Marker', cursive; }
    .font-oswald { font-family: 'Oswald', sans-serif; }
    .font-inter { font-family: 'Inter', sans-serif; }
    .font-caveat { font-family: 'Caveat', cursive; }
    .font-fraunces { font-family: 'Fraunces', serif; }

    .brush-underline-orange { position: relative; display: inline-block; }
    .brush-underline-orange::after {
      content: ''; position: absolute; bottom: -2px; left: 0; width: 100%; height: 6px;
      background-color: #FF5A1F; transform: skew(-20deg); z-index: -1;
    }
    @media (min-width: 768px) {
      .brush-underline-orange::after { bottom: -5px; height: 10px; }
    }
    
    .brush-underline-lime { position: relative; display: inline-block; }
    .brush-underline-lime::after {
      content: ''; position: absolute; bottom: 2px; left: 0; width: 100%; height: 8px;
      background-color: #C8F51A; transform: skew(-10deg) rotate(-2deg); z-index: -1; opacity: 0.8;
    }
    @media (min-width: 768px) {
      .brush-underline-lime::after { bottom: 5px; height: 12px; }
    }

    .torn-edge-top {
      clip-path: polygon(0% 10px, 5% 0px, 10% 15px, 15% 2px, 20% 12px, 25% 0px, 30% 18px, 35% 5px, 40% 15px, 45% 0px, 50% 12px, 55% 2px, 60% 15px, 65% 0px, 70% 12px, 75% 5px, 80% 18px, 85% 0px, 90% 15px, 95% 5px, 100% 10px, 100% 100%, 0% 100%);
      margin-top: -10px; padding-top: 15px;
    }

    @media (min-width: 768px) {
      .book-page-left { border-radius: 40px 10px 10px 60px; transform: rotateY(4deg); box-shadow: inset -20px 0 30px -20px rgba(0,0,0,0.1); transform-origin: right center; }
      .book-page-right { border-radius: 10px 40px 60px 10px; transform: rotateY(-4deg); box-shadow: inset 20px 0 30px -20px rgba(0,0,0,0.1), drop-shadow(0 18px 18px rgba(58,44,92,0.35)); transform-origin: left center; }
      .book-spine { width: 4%; max-width: 40px; background: linear-gradient(to right, #e5d5b5, #d6c4a0, #e5d5b5); border-top: 2px solid #3A2C5C; border-bottom: 2px solid #3A2C5C; z-index: 0; box-shadow: inset 0 0 10px rgba(0,0,0,0.1); }
    }
    @media (max-width: 767px) {
      .book-page-left { border-radius: 40px 40px 0 0; border-bottom: none; }
      .book-page-right { border-radius: 0 0 40px 40px; border-top: none; box-shadow: drop-shadow(0 18px 18px rgba(58,44,92,0.35)); }
      .book-spine { height: 24px; width: 100%; background: linear-gradient(to bottom, #e5d5b5, #d6c4a0, #e5d5b5); border-left: 2px solid #3A2C5C; border-right: 2px solid #3A2C5C; z-index: 0; box-shadow: inset 0 0 10px rgba(0,0,0,0.1); }
    }

    .blob-bg { position: absolute; border-radius: 50%; filter: blur(60px); z-index: 0; opacity: 0.5; }
    @media (min-width: 768px) { .blob-bg { filter: blur(80px); } }
  `}</style>
);

const productsData = [
  { id: 1, name: "SCENE", category: "Jackets", price: 89.99, rating: 4.8, reviews: 124, tag: "LIMITED" },
  { id: 2, name: "Graffiti Print Tee", category: "Graphic Tees", price: 34.99, rating: 4.5, reviews: 98, tag: "LIMITED" },
  { id: 3, name: "Utility Cargo Pants", category: "Cargo Pants", price: 69.99, rating: 4.9, reviews: 76, tag: "LIMITED" },
  { id: 4, name: "Neon Stride Sneakers", category: "Sneakers", price: 129.99, rating: 4.7, reviews: 210, tag: "HOT" },
];

const projectsData = [
  { id: 1, title: "Photographer Portfolio", category: "AI Portfolio", color: "#6B2CF5" },
  { id: 2, title: "Fintech Startup", category: "AI Website", color: "#C8F51A" },
  { id: 3, title: "E-Commerce Store", category: "AI Website", color: "#FF5A36" },
  { id: 4, title: "Creative Resume", category: "AI Portfolio", color: "#2E8BFF" },
];

const Logo = ({ className = "h-8", theme = "dark" }: { className?: string, theme?: string }) => (
  <img
    src={theme === 'dark' || theme === 'storybook' ? './Company/DEX_Logo.png' : './Company/DS.png'}
    alt="DEXOSA Logo"
    className={`h-8 sm:h-10 object-contain ${className}`}
    style={{
      mixBlendMode: theme === 'storybook' ? 'multiply' : 'normal',
      filter: theme === 'storybook' ? 'brightness(0) saturate(100%) invert(18%) sepia(26%) saturate(2284%) hue-rotate(223deg) brightness(93%) contrast(92%) drop-shadow(0px 0px 0px #3A2C5C)' : 'none'
    }}
  />
);

const pageTransition: any = {
  initial: { opacity: 0, y: 15, scale: 0.99 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -15, scale: 0.99 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const Navbar = ({ currentPage, setPage, theme }: { currentPage: string, setPage: (p: string) => void, theme: 'lavender' | 'street' | 'playful' | 'storybook' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getNavStyle = () => {
    switch (theme) {
      case 'street': return 'bg-transparent text-white font-oswald uppercase text-base';
      case 'playful': return 'bg-transparent text-white font-inter text-sm sm:text-base';
      case 'storybook': return 'bg-transparent text-[#3A2C5C] font-inter text-sm sm:text-base font-semibold';
      default: return 'bg-transparent text-gray-800 font-jakarta text-sm sm:text-base';
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'portfolio', label: 'AI Studio' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className={`w-full z-50 p-4 sm:p-6 ${getNavStyle()} absolute top-0 left-0 right-0`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <button onClick={() => setPage('home')} className="z-50 relative">
          <Logo theme={theme === 'street' || theme === 'playful' ? 'light' : 'dark'} />
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => setPage(link.id)}
              className={`hover:opacity-70 transition-opacity ${currentPage === link.id ? 'font-bold' : ''} 
                ${theme === 'playful' && currentPage === link.id ? 'text-[#C8F51A]' : ''}
                ${theme === 'storybook' && currentPage === link.id ? 'border-b-2 border-[#3A2C5C]' : ''}`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Action Button Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {theme === 'lavender' && currentPage !== 'contact' && (
            <button onClick={() => setPage('contact')} className="bg-black text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition">
              Enquire Now
            </button>
          )}
          {theme === 'storybook' && currentPage !== 'contact' && (
            <button onClick={() => setPage('contact')} className="bg-[#C23D3D] text-[#F4E9D0] border-2 border-[#3A2C5C] px-6 py-2.5 font-inter font-bold hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_#3A2C5C] shadow-[4px_4px_0px_#3A2C5C] transition-all" style={{ borderRadius: '30px 26px 28px 24px' }}>
              Enquire Now
            </button>
          )}
        </div>

        {/* Mobile Toggle (Hamburger) */}
        <button className="md:hidden z-50 relative p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} className={(theme === 'lavender' || theme === 'storybook') ? 'text-black' : 'text-white'} /> : <Menu size={24} className={(theme === 'lavender' || theme === 'storybook') ? 'text-black' : 'text-white'} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed inset-0 h-[100dvh] w-full z-40 flex flex-col items-center justify-center gap-8 text-2xl
              ${(theme === 'street' || theme === 'playful') ? 'bg-[#0B0B14] text-white' : 'bg-[#F4E9D0] text-[#3A2C5C]'}`}
          >
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => { setPage(link.id); setIsOpen(false); }}
                className="hover:scale-110 transition-transform font-bold"
              >
                {link.label}
              </button>
            ))}
            {theme === 'lavender' && currentPage !== 'contact' && (
              <button onClick={() => { setPage('contact'); setIsOpen(false); }} className="mt-4 bg-black text-white px-8 py-3 rounded-full text-lg font-semibold">
                Enquire Now
              </button>
            )}
            {theme === 'storybook' && currentPage !== 'contact' && (
              <button onClick={() => { setPage('contact'); setIsOpen(false); }} className="mt-4 bg-[#C23D3D] text-[#F4E9D0] border-2 border-[#3A2C5C] px-8 py-3 font-inter font-bold hover:shadow-[4px_4px_0px_#3A2C5C] transition-all" style={{ borderRadius: '30px 26px 28px 24px' }}>
                Enquire Now
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const HomePage = ({ setPage }: { setPage: (p: string) => void }) => {
  return (
    <motion.div
      {...pageTransition}
      className="bg-[#F4E9D0] min-h-screen font-inter relative pb-20"
      style={{
        backgroundImage: 'radial-gradient(#3A2C5C 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        backgroundPosition: '0 0, 12px 12px',
        backgroundColor: '#F4E9D0'
      }}
    >
      <Navbar currentPage="home" setPage={setPage} theme="storybook" />

      {/* Main Hero Area - Book Spread */}
      <div className="max-w-[1280px] mx-auto pt-24 sm:pt-32 px-4 sm:px-8">

        <div className="flex flex-col md:flex-row items-stretch justify-center md:[perspective:1400px]">
          {/* Left Page */}
          <div className="w-full md:w-[48%] bg-[#F4E9D0] border-2 border-[#3A2C5C] p-6 sm:p-12 xl:p-16 relative z-10 book-page-left">
            {/* Torn edge decoration top */}
            <div className="absolute top-0 left-8 right-8 h-4 border-b-2 border-dashed border-[#3A2C5C] opacity-30"></div>

            <div className="flex flex-col h-full justify-between">
              <div>
                <span className="font-inter font-semibold text-[#A8D6B8] uppercase tracking-[0.25em] text-[11px] bg-[#3A2C5C] px-3 py-1 rounded-full mb-6 inline-block border-2 border-[#3A2C5C] shadow-[2px_2px_0_#3A2C5C]">01 • Welcome</span>

                <h1 className="font-fraunces text-5xl sm:text-7xl xl:text-[92px] leading-[0.88] text-[#3A2C5C] font-black mt-4 mb-4">
                  Build <br />
                  <span className="italic font-light text-[#E08244]">Your</span><br />
                  BRAND.
                </h1>

                <h1 className="font-fraunces text-5xl sm:text-7xl xl:text-[92px] leading-[0.88] text-[#3A2C5C] font-black mt-8">
                  Own <br />
                  <span className="italic font-light text-[#C23D3D]">Your</span><br />
                  FUTURE.
                </h1>
              </div>

              <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
                <button onClick={() => setPage('portfolio')} className="bg-[#C23D3D] text-[#F4E9D0] border-2 border-[#3A2C5C] px-7 py-4 font-inter font-bold text-sm sm:text-base flex items-center gap-2 hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_#3A2C5C] shadow-[4px_4px_0px_#3A2C5C] transition-all w-full sm:w-auto justify-center" style={{ borderRadius: '30px 26px 28px 24px' }}>
                  Our Works <ArrowRight size={18} />
                </button>
                <button onClick={() => setPage('products')} className="bg-[#E08244] text-[#3A2C5C] border-2 border-[#3A2C5C] px-7 py-4 font-inter font-bold text-sm sm:text-base flex items-center gap-2 hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_#3A2C5C] shadow-[4px_4px_0px_#3A2C5C] transition-all w-full sm:w-auto justify-center" style={{ borderRadius: '24px 30px 22px 28px' }}>
                  Products <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Spine center */}
          <div className="book-spine"></div>

          {/* Right Page */}
          <div className="w-full md:w-[48%] bg-[#A8D6B8] border-2 border-[#3A2C5C] p-6 sm:p-12 xl:p-16 relative z-10 book-page-right">
            {/* Washi tape */}
            <div className="absolute -top-3 right-12 w-24 h-8 bg-[#EFE0BE]/80 rotate-[3deg] border-2 border-dashed border-[#3A2C5C]/30 shadow-sm z-20"></div>

            <div className="flex flex-col h-full items-center justify-center relative">

              <div className="relative mb-8 w-full max-w-[342px] sm:max-w-[300px] flex items-center justify-center">

                {/* Merged Spen-Pic with Dha.png Background */}
                <div className="bg-[#F4E9D0] border-[3px] border-[#3A2C5C] p-4 shadow-[0_30px_40px_-10px_rgba(58,44,92,0.35)] relative rotate-[-2deg] w-full z-10"
                  style={{ clipPath: 'polygon(2% 0, 100% 4%, 96% 100%, 0 98%)' }}>

                  <div className="relative w-full aspect-square border-2 border-[#3A2C5C] overflow-hidden">
                    {/* Background Image (Adjusted to hide the cut top edge) */}
                    <img
                      src="./Company/Dha.png"
                      alt="Background Model"
                      className="absolute inset-0 w-full h-full object-cover z-0 translate-x-[60px] translate-y-[20px] scale-[1.15]"
                    />

                    {/* Foreground Transparent Model (Adjusted to hide the cut side edge) */}
                    <img
                      src="./Company/San.png"
                      alt="Model"
                      className="absolute inset-0 w-full h-full object-cover z-10 translate-x-[-50px] translate-y-[20px] scale-[0.85]"
                    />
                  </div>

                  {/* Floating Star */}
                  <Star className="absolute -top-6 -right-6 text-[#E08244] fill-[#E08244] w-12 h-12 rotate-[15deg] drop-shadow-[2px_2px_0_#3A2C5C]" strokeWidth={1.5} color="#3A2C5C" />
                </div>

                {/* Spline Robot (Floating in the gap) */}
                <div className="absolute top-[-540px] right-[-70px] sm:top-[-80px] sm:right-[450px] w-[270px] h-[258px] sm:w-[320px] sm:h-[350px] z-30 pointer-events-none drop-shadow-2xl">
                  {/* Nested wrapper expands the internal canvas to prevent hand clipping and hides watermark */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[170%] h-[140%] overflow-hidden">
                    <iframe
                      src="https://my.spline.design/genkubgreetingrobot-hxzMy88o7IpYzzco3fPe7tu0/"
                      frameBorder="0"
                      className="pointer-events-auto absolute"
                      style={{
                        background: 'transparent',
                        width: '120%',
                        height: 'calc(100% + 140px)',
                        top: '-70px',
                        left: 0
                      }}
                      title="Greeting Robot"
                    ></iframe>
                  </div>
                </div>
              </div>

              <div className="font-inter font-semibold text-[#3A2C5C] text-xs bg-[#F4E9D0] px-3 py-1 rounded-full mb-6 inline-flex items-center gap-2 border-2 border-[#3A2C5C] shadow-[2px_2px_0_#3A2C5C] rotate-[1deg] relative z-20">
                <Star size={12} className="fill-[#3A2C5C]" /> FOUNDERS <Star size={12} className="fill-[#3A2C5C]" />
              </div>

              {/* Badges/Icons Row */}
              <div className="flex flex-row justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-fraunces italic text-[#3A2C5C] mb-8 font-bold">
                <div className="flex flex-col items-center gap-1.5 bg-[#F4E9D0] px-3 sm:px-4 py-2 border-2 border-[#3A2C5C] rounded-full shadow-[2px_2px_0_#3A2C5C] rotate-[2deg]">
                  <ShoppingBag size={18} /> <span>Deals</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 bg-[#F4E9D0] px-3 sm:px-4 py-2 border-2 border-[#3A2C5C] rounded-full shadow-[2px_2px_0_#3A2C5C] rotate-[-3deg]">
                  <Code size={18} /> <span>Websites</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 bg-[#F4E9D0] px-3 sm:px-4 py-2 border-2 border-[#3A2C5C] rounded-full shadow-[2px_2px_0_#3A2C5C] rotate-[1deg]">
                  <Palette size={18} /> <span>Portfolios</span>
                </div>
              </div>

              {/* Featured Card */}
              <div className="bg-[#EFE0BE] border-2 border-[#3A2C5C] p-4 flex items-center gap-4 shadow-[6px_6px_0_#3A2C5C] rotate-[1deg] w-full max-w-[340px]" style={{ borderRadius: '24px 36px 26px 32px' }}>
                <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=200" alt="AI Custom Portfolio" className="w-20 h-24 object-cover border-2 border-[#3A2C5C] rounded-[12px]" />
                <div className="flex-1">
                  <span className="font-inter font-bold text-[#C23D3D] text-[10px] uppercase tracking-widest block mb-1">Featured Service</span>
                  <h3 className="font-fraunces text-xl font-bold text-[#3A2C5C] leading-tight mb-3">Custom AI Portfolio</h3>
                  <button onClick={() => setPage('contact')} className="bg-[#3A2C5C] text-[#F4E9D0] px-4 py-1.5 font-inter text-xs font-semibold flex items-center justify-center gap-1 border-2 border-[#3A2C5C] rounded-full hover:bg-[#F4E9D0] hover:text-[#3A2C5C] transition-colors shadow-[2px_2px_0_#3A2C5C]">
                    Get Started <ChevronRight size={14} />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

const ProductsPage = ({ setPage }: { setPage: (p: string) => void }) => {
  return (
    <motion.div
      {...pageTransition}
      className="bg-[#0D0D0D] min-h-screen font-inter"
    >
      <Navbar currentPage="products" setPage={setPage} theme="street" />

      {/* Hero Section */}
      <div className="relative h-[65vh] sm:h-[90vh] bg-[#111] overflow-hidden flex items-center justify-center pt-16 px-4">
        <div className="absolute inset-0 opacity-50 bg-[url('https://images.unsplash.com/photo-1552346154-21d32810baa3?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center" />

        <div className="relative z-10 text-center flex flex-col items-center w-full max-w-4xl">
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-3 sm:mb-6">
            <span className="bg-[#FF5A1F] text-white font-oswald text-xs sm:text-xl px-4 sm:px-6 py-1.5 sm:py-2 -skew-x-12 inline-block font-bold tracking-widest shadow-lg uppercase">
              LIMITED EDITION
            </span>
          </motion.div>

          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}
            className="font-marker text-white text-[44px] sm:text-7xl md:text-8xl lg:text-9xl leading-[1.0] sm:leading-none italic uppercase mb-2 break-words w-full"
          >
            DEXOSA<br />
            <span className="brush-underline-orange inline-block mt-1">STREET PICKS</span>
          </motion.h1>

          <p className="font-oswald text-white/90 text-[11px] sm:text-xl md:text-2xl tracking-[0.15em] mt-5 sm:mt-6 mb-6 sm:mb-8">
            WEAR THE CITY. OWN THE STREETS.
          </p>

          <button className="bg-[#FF5A1F] text-white font-oswald text-sm sm:text-xl px-6 sm:px-8 py-3 sm:py-4 -skew-x-12 font-bold hover:bg-white hover:text-[#FF5A1F] transition-colors flex items-center gap-2 shadow-xl uppercase">
            SHOP LIMITED DROPS <ChevronRight size={18} className="skew-x-12" />
          </button>
        </div>

        {/* Torn paper divider edge exactly at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-8 sm:h-12 bg-[#F4F0E8] torn-edge-top" style={{ transform: 'translateY(1px)' }}></div>
      </div>

      {/* Grid Content Area */}
      <div className="bg-[#F4F0E8] pb-16 sm:pb-24 text-[#0D0D0D] relative z-20">

        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-20">
          <div className="flex flex-row justify-between items-end mb-6 sm:mb-12 gap-2">
            <div>
              <h2 className="font-marker text-[32px] sm:text-5xl italic leading-[1.0] uppercase">
                <span className="brush-underline-orange">PRODUCT</span> <br />DROPS
              </h2>
            </div>
            <button className="font-oswald font-bold text-[#FF5A1F] hover:text-black flex flex-col sm:flex-row items-end sm:items-center gap-1 uppercase tracking-widest text-[11px] sm:text-base leading-tight text-right pb-1">
              <span>VIEW<br className="sm:hidden" /> ALL</span> <ArrowRight size={14} className="mb-0.5 sm:mb-0" />
            </button>
          </div>

          {/* CRITICAL: grid-cols-2 on mobile */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
            {productsData.map((product, index) => {
              const isBlurred = index !== 0;
              return (
                <div key={product.id} className="bg-white rounded-[20px] sm:rounded-3xl p-2.5 sm:p-4 shadow-sm border border-black/5 flex flex-col relative overflow-hidden">

                  {/* Content Wrapper - Blurred for all except the first card */}
                  <div className={`flex flex-col h-full ${isBlurred ? 'blur-[4px] sm:blur-[6px] opacity-70 select-none pointer-events-none' : ''}`}>
                    <div className="bg-transparent rounded-[16px] sm:rounded-2xl aspect-[4/5] relative flex items-center justify-center group [perspective:1000px]">
                      {product.tag && (
                        <span className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-[#FF5A1F] text-white font-oswald text-[9px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 font-bold tracking-wider z-20 shadow-md uppercase">
                          {product.tag}
                        </span>
                      )}

                      {/* Flipcard Inner */}
                      <div className="w-full h-full relative transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] rounded-[16px] sm:rounded-2xl shadow-sm border border-black/5">
                        {/* Front of the card */}
                        <div className="absolute inset-0 w-full h-full bg-[#1c1c1c] [backface-visibility:hidden] flex items-center justify-center rounded-[16px] sm:rounded-2xl overflow-hidden">
                          {!isBlurred && product.name === "SCENE" ? (
                            <img src="./Product/SCENE.jpeg" alt="SCENE" className="w-full h-full object-cover" />
                          ) : (
                            !isBlurred && (
                              <span className="text-white font-medium text-xs sm:text-base drop-shadow-md text-center px-2">
                                {product.name.split(' ')[0]} <br className="sm:hidden" /> {product.name.split(' ').slice(1).join(' ')}
                              </span>
                            )
                          )}
                        </div>
                        {/* Back of the card */}
                        <div className="absolute inset-0 w-full h-full bg-[#111] [transform:rotateY(180deg)] [backface-visibility:hidden] flex items-center justify-center rounded-[16px] sm:rounded-2xl overflow-hidden">
                          {!isBlurred && product.name === "SCENE" ? (
                            <>
                              <img src="./Product/SCENE.jpeg" alt="SCENE Flip" className="w-full h-full object-cover opacity-50 scale-110" />
                              <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                                <span className="text-white font-oswald text-xl sm:text-2xl tracking-widest font-bold mb-4">SCENE</span>
                                <button
                                  onClick={() => window.location.href = "https://scen-e.vercel.app/"}
                                  className="bg-[#FF5A1F] text-white font-oswald uppercase px-4 py-2 rounded-full font-bold hover:bg-white hover:text-black transition-colors text-xs sm:text-sm shadow-md">
                                  View Details
                                </button>
                              </div>
                            </>
                          ) : (
                            !isBlurred && (
                              <span className="text-white font-medium text-xs sm:text-base drop-shadow-md text-center px-2">
                                {product.name}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="px-1 flex-1 flex flex-col mt-3">
                      <h3 className="font-bold text-[13px] sm:text-xl mb-1 truncate">{product.name}</h3>

                      {/* Price and Ratings completely removed */}
                      <div className="mt-auto flex flex-row items-center justify-end pt-2 sm:pt-4">
                        <button
                          onClick={() => product.name === "SCENE" ? window.location.href = "https://scen-e.vercel.app/" : null}
                          className="bg-[#FF5A1F] text-white font-oswald uppercase px-3 sm:px-6 py-1.5 sm:py-2 rounded-full font-bold hover:bg-black transition-colors text-[10px] sm:text-sm shadow-md flex items-center gap-1 sm:gap-2">
                          Visit <ArrowRight size={14} className="hidden sm:block" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Coming Soon Overlay */}
                  {isBlurred && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center rounded-[20px] sm:rounded-3xl pointer-events-none">
                      <span className="bg-[#111] text-white font-oswald text-[11px] sm:text-sm px-4 sm:px-6 py-2 uppercase font-bold tracking-widest -skew-x-12 shadow-xl border border-white/10 pointer-events-auto">
                        Coming Soon
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const PortfolioPage = ({ setPage }: { setPage: (p: string) => void }) => {
  return (
    <motion.div
      {...pageTransition}
      className="bg-[#0B0B14] min-h-screen text-white font-inter relative overflow-hidden selection:bg-[#C8F51A] selection:text-black"
    >
      {/* Abstract background blobs */}
      <div className="blob-bg w-[300px] h-[300px] bg-[#6B2CF5] top-[-10%] left-[-20%]" />
      <div className="blob-bg w-[250px] h-[250px] bg-[#2E8BFF] bottom-[5%] right-[-10%] opacity-30" />

      <Navbar currentPage="portfolio" setPage={setPage} theme="playful" />

      {/* Container for content and lock overlay, preserving Navbar interactivity */}
      <div className="relative min-h-[90vh]">
        <div className="max-w-7xl mx-auto px-4 pt-24 pb-12 relative z-10 pointer-events-none">

          {/* Hero Section */}
          <div className="flex flex-col lg:flex-row items-center justify-between mb-16 sm:mb-24 gap-12 lg:gap-0">
            <div className="w-full lg:w-1/2 relative z-20 flex flex-col items-center lg:items-start text-center lg:text-left pt-4">

              <div className="relative inline-block mb-2">
                <span className="font-caveat text-3xl sm:text-4xl text-gray-300 rotate-[-10deg] inline-block">Hey,</span>
                <svg className="absolute w-8 h-8 -right-8 top-3 rotate-[90deg] text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </div>

              <h1 className="font-marker text-[56px] sm:text-7xl lg:text-[100px] leading-[1.0] mb-6 uppercase">
                We're <br className="hidden sm:block" />
                <span className="brush-underline-lime inline-block mt-2 sm:mt-0">DEXOSA</span>
              </h1>

              <ul className="space-y-3 font-medium text-sm sm:text-lg mb-8 text-gray-200">
                <li className="flex items-center justify-center lg:justify-start gap-2"><span className="text-[#C8F51A]">•</span> AI Websites</li>
                <li className="flex items-center justify-center lg:justify-start gap-2"><span className="text-[#C8F51A]">•</span> AI Portfolios</li>
                <li className="flex items-center justify-center lg:justify-start gap-2"><span className="text-[#C8F51A]">•</span> Brand Presence</li>
              </ul>

              <button className="border border-[#6B2CF5] text-white font-medium px-6 py-2.5 sm:px-8 sm:py-4 rounded-full flex items-center gap-2 hover:bg-[#6B2CF5] transition-colors text-sm sm:text-base">
                View Projects <ArrowUpRight size={18} />
              </button>
            </div>

            <div className="w-full lg:w-1/2 relative flex justify-center z-10 px-4 mt-6 lg:mt-0">
              <div className="relative w-full max-w-[280px] sm:max-w-[360px]">
                {/* Speech Bubble slanted */}
                <div className="absolute -top-6 -left-6 sm:-top-8 sm:-left-10 bg-[#2E8BFF] text-white font-caveat text-sm sm:text-xl px-4 py-2 sm:py-3 rounded-2xl rounded-br-none rotate-[-5deg] z-20 shadow-lg">
                  Let's create something awesome!
                </div>

                {/* Mascot square container */}
                <div className="w-full aspect-square bg-[#6B2CF5] rounded-[24px] sm:rounded-3xl shadow-2xl relative z-10 border-4 border-[#14141F] flex items-end justify-center pb-6 sm:pb-10">
                  <span className="text-white font-medium text-lg sm:text-xl drop-shadow-md">Creative Mascot</span>
                </div>

                {/* Decor Star */}
                <Star className="absolute top-1/2 -right-4 sm:-right-6 text-[#FF5A36] fill-[#FF5A36] w-8 h-8 sm:w-10 sm:h-10 rotate-[20deg] z-20" />
              </div>
            </div>
          </div>

          {/* Featured Projects - grid-cols-2 strictly for mobile */}
          <div className="mb-20 sm:mb-32">
            <div className="flex flex-row justify-between items-end mb-6 gap-2">
              <h2 className="font-marker text-[32px] sm:text-5xl leading-[1.0] uppercase">FEATURED<br className="sm:hidden" /> PROJECTS</h2>
              <button className="text-[#C8F51A] font-medium flex flex-col sm:flex-row items-end sm:items-center gap-1 hover:underline text-xs sm:text-base text-right leading-tight pb-1">
                <span>View All <br className="sm:hidden" />Projects</span> <ArrowRight size={14} className="text-[#C8F51A] mb-0.5 sm:mb-0" />
              </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {projectsData.map(project => (
                <div key={project.id} className="bg-[#14141F] rounded-[16px] p-2.5 sm:p-4 border border-white/5 group flex flex-col">
                  <div className="rounded-xl overflow-hidden mb-2.5 sm:mb-4 relative aspect-[4/3] flex items-center justify-center" style={{ backgroundColor: project.color }}>
                    <span className="text-black/60 font-semibold text-sm sm:text-lg px-2 text-center drop-shadow-sm mix-blend-color-burn">
                      {project.title.split(' ')[0]} <br className="sm:hidden" />{project.title.split(' ')[1]}
                    </span>
                  </div>
                  <div className="flex justify-between items-start flex-1 mt-1">
                    <div>
                      <h3 className="font-bold text-[12px] sm:text-lg leading-tight mb-0.5 truncate max-w-[110px] sm:max-w-none">{project.title}</h3>
                      <p className="text-[10px] sm:text-sm text-gray-400">{project.category}</p>
                    </div>
                    <ArrowUpRight className="text-gray-500 group-hover:text-white transition-colors shrink-0 w-3.5 h-3.5 sm:w-5 sm:h-5 mt-0.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer CTA */}
          <div className="bg-[#14141F] rounded-[32px] sm:rounded-[40px] p-8 sm:p-12 text-center relative overflow-hidden flex flex-col items-center">
            <h2 className="font-marker text-[40px] sm:text-6xl mb-4 leading-[1.1] uppercase">
              LET'S MAKE <br />
              SOMETHING <br className="sm:hidden" />
              <span className="border-2 border-[#C8F51A] rounded-full px-3 py-0.5 rotate-[-5deg] inline-block mt-2">DOPE!</span>
            </h2>
            <p className="text-gray-400 mb-8 text-xs sm:text-base max-w-sm px-2">Ready to build your next big idea with the power of AI? Get in touch today.</p>
            <button onClick={() => setPage('contact')} className="bg-[#6B2CF5] text-white font-bold px-8 py-3.5 rounded-full text-sm sm:text-lg hover:bg-white hover:text-black transition-colors w-full sm:w-auto shadow-lg shadow-[#6B2CF5]/30">
              Start a Project
            </button>
          </div>
        </div>

        {/* Full Page "Coming Soon" Lock Overlay */}
        <div className="absolute inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center mt-[-4rem]">
          <div className="bg-[#14141F] border-2 border-[#C8F51A] px-8 py-6 sm:px-12 sm:py-8 rounded-3xl transform rotate-[-5deg] shadow-2xl flex flex-col items-center">
            <span className="font-marker text-5xl sm:text-7xl text-white uppercase tracking-wider mb-1 sm:mb-2 text-center leading-none">Coming<br />Soon</span>
            <button onClick={() => setPage('home')} className="bg-[#C8F51A] text-black font-bold px-6 py-2.5 rounded-full uppercase tracking-wider text-xs sm:text-sm hover:bg-white transition-colors shadow-lg shadow-[#C8F51A]/20">
              Go Back Home
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ContactPage = ({ setPage }: { setPage: (p: string) => void }) => {
  return (
    <motion.div
      {...pageTransition}
      className="bg-[#F4E9D0] min-h-screen font-inter relative pb-20"
      style={{
        backgroundImage: 'radial-gradient(#3A2C5C 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        backgroundPosition: '0 0, 12px 12px',
        backgroundColor: '#F4E9D0'
      }}
    >
      <Navbar currentPage="contact" setPage={setPage} theme="storybook" />

      {/* Main Hero Area - Book Spread */}
      <div className="max-w-[1280px] mx-auto pt-24 sm:pt-32 px-4 sm:px-8">

        <div className="flex flex-col md:flex-row items-stretch justify-center md:[perspective:1400px]">
          {/* Left Page (Contact Info) */}
          <div className="w-full md:w-[48%] bg-[#EFE0BE] border-2 border-[#3A2C5C] p-6 sm:p-12 relative z-10 book-page-left">

            {/* Washi tape */}
            <div className="absolute -top-3 left-16 w-32 h-8 bg-[#A8D6B8]/80 rotate-[-2deg] border-2 border-dashed border-[#3A2C5C]/30 shadow-sm z-20"></div>

            <span className="font-inter font-semibold text-[#F4E9D0] uppercase tracking-[0.25em] text-[11px] bg-[#3A2C5C] px-3 py-1 rounded-full mb-6 inline-block border-2 border-[#3A2C5C] shadow-[2px_2px_0_#3A2C5C]">02 • Connect</span>

            <h1 className="font-fraunces text-5xl sm:text-6xl xl:text-7xl leading-[0.88] text-[#3A2C5C] font-black mt-4 mb-4">
              Let's <br />
              <span className="italic font-light text-[#E08244]">CONNECT.</span>
            </h1>

            <h1 className="font-fraunces text-5xl sm:text-6xl xl:text-7xl leading-[0.88] text-[#3A2C5C] font-black mt-8 mb-12">
              Get In <br />
              <span className="italic font-light text-[#C23D3D]">TOUCH.</span>
            </h1>

            {/* Speech Bubble */}
            <div className="bg-[#F4E9D0] border-2 border-[#3A2C5C] p-4 sm:p-6 shadow-[4px_4px_0_#3A2C5C] rotate-[-1deg] relative mb-12 max-w-sm" style={{ borderRadius: '22px 28px 24px 26px' }}>
              <div className="absolute -bottom-4 left-8 w-6 h-6 bg-[#F4E9D0] border-b-2 border-r-2 border-[#3A2C5C] rotate-45"></div>
              <div className="space-y-4">
                <div className="flex flex-row items-center gap-3 sm:gap-4 text-[#3A2C5C] font-fraunces italic text-base sm:text-lg">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#E08244] border-2 border-[#3A2C5C] rounded-full flex items-center justify-center shrink-0 shadow-[2px_2px_0_#3A2C5C]">
                    <Mail size={16} strokeWidth={2} />
                  </div>
                  <span className="truncate">dexosa.official@gmail.com</span>
                </div>
                <div className="flex flex-row items-center gap-3 sm:gap-4 text-[#3A2C5C] font-fraunces italic text-base sm:text-lg">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#A8D6B8] border-2 border-[#3A2C5C] rounded-full flex items-center justify-center shrink-0 shadow-[2px_2px_0_#3A2C5C]">
                    <MapPin size={16} strokeWidth={2} />
                  </div>
                  <span>Global Digital Agency</span>
                </div>
                <a href="https://www.instagram.com/dexo.sa/" target="_blank" rel="noopener noreferrer" className="flex flex-row items-center gap-3 sm:gap-4 text-[#3A2C5C] font-fraunces italic text-base sm:text-lg hover:text-[#C23D3D] transition-colors">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#C23D3D] text-[#F4E9D0] border-2 border-[#3A2C5C] rounded-full flex items-center justify-center shrink-0 shadow-[2px_2px_0_#3A2C5C]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                  </div>
                  <span>@dexo.sa</span>
                </a>
                <a href="https://in.pinterest.com/dexosaofficial/" target="_blank" rel="noopener noreferrer" className="flex flex-row items-center gap-3 sm:gap-4 text-[#3A2C5C] font-fraunces italic text-base sm:text-lg hover:text-[#E08244] transition-colors">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#3A2C5C] text-[#F4E9D0] border-2 border-[#3A2C5C] rounded-full flex items-center justify-center shrink-0 shadow-[2px_2px_0_#3A2C5C]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.168 0 7.41 2.967 7.41 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.624 0 12.017 0z" />
                    </svg>
                  </div>
                  <span>dexosaofficial</span>
                </a>
              </div>
            </div>

          </div>

          {/* Spine center */}
          <div className="book-spine"></div>

          {/* Right Page (Form) */}
          <div className="w-full md:w-[48%] bg-[#F4E9D0] border-2 border-[#3A2C5C] p-6 sm:p-12 relative z-10 flex flex-col items-center justify-center book-page-right">
            <div className="w-full max-w-md bg-[#3A2C5C] border-2 border-[#3A2C5C] p-6 shadow-[6px_6px_0_#C23D3D] rotate-[1deg]" style={{ borderRadius: '24px 36px 26px 32px' }}>
              <h3 className="font-fraunces text-2xl sm:text-3xl text-[#F4E9D0] mb-6 font-black italic">Send us a message</h3>

              <form className="space-y-4 w-full" action="https://formsubmit.co/dexosa.official@gmail.com" method="POST">
                <input type="hidden" name="_subject" value="New Contact Submission from DEXOSA Website!" />

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <label className="block text-xs font-inter font-semibold text-[#A8D6B8] mb-1">Full Name *</label>
                    <input type="text" name="name" required className="w-full px-4 py-3 border-2 border-[#3A2C5C] focus:outline-none focus:ring-0 bg-[#F4E9D0] text-[#3A2C5C] font-inter text-xs sm:text-sm shadow-[2px_2px_0_#F4E9D0]" placeholder="John Doe" style={{ borderRadius: '9999px' }} />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-xs font-inter font-semibold text-[#A8D6B8] mb-1">Email ID *</label>
                    <input type="email" name="email" required className="w-full px-4 py-3 border-2 border-[#3A2C5C] focus:outline-none focus:ring-0 bg-[#F4E9D0] text-[#3A2C5C] font-inter text-xs sm:text-sm shadow-[2px_2px_0_#F4E9D0]" placeholder="john@example.com" style={{ borderRadius: '9999px' }} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-1">
                    <label className="block text-xs font-inter font-semibold text-[#A8D6B8] mb-1">Location</label>
                    <input type="text" name="location" className="w-full px-4 py-3 border-2 border-[#3A2C5C] focus:outline-none focus:ring-0 bg-[#F4E9D0] text-[#3A2C5C] font-inter text-xs sm:text-sm shadow-[2px_2px_0_#F4E9D0]" placeholder="City, Country" style={{ borderRadius: '9999px' }} />
                  </div>
                  <div className="col-span-1">
                    <label className="block text-xs font-inter font-semibold text-[#A8D6B8] mb-1">Phone Number</label>
                    <input type="tel" name="phone" className="w-full px-4 py-3 border-2 border-[#3A2C5C] focus:outline-none focus:ring-0 bg-[#F4E9D0] text-[#3A2C5C] font-inter text-xs sm:text-sm shadow-[2px_2px_0_#F4E9D0]" placeholder="+1234567890" style={{ borderRadius: '9999px' }} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-inter font-semibold text-[#A8D6B8] mb-1">Service Interested In</label>
                  <select name="service" className="w-full px-4 py-3 border-2 border-[#3A2C5C] focus:outline-none focus:ring-0 bg-[#F4E9D0] text-[#3A2C5C] appearance-none font-inter text-xs sm:text-sm shadow-[2px_2px_0_#F4E9D0]" style={{ borderRadius: '9999px' }}>
                    <option>AI Website Creation</option>
                    <option>AI Portfolio Creation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-inter font-semibold text-[#A8D6B8] mb-1">How can we help? *</label>
                  <textarea name="message" required rows={3} className="w-full px-4 py-3 border-2 border-[#3A2C5C] focus:outline-none focus:ring-0 bg-[#F4E9D0] text-[#3A2C5C] resize-none font-inter text-xs sm:text-sm shadow-[2px_2px_0_#F4E9D0]" placeholder="Tell us about your project..." style={{ borderRadius: '24px 30px 22px 28px' }}></textarea>
                </div>

                <button type="submit" className="w-full bg-[#E08244] text-[#3A2C5C] font-inter font-bold text-base py-4 border-2 border-[#3A2C5C] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_#F4E9D0] shadow-[4px_4px_0_#F4E9D0] transition-all mt-4" style={{ borderRadius: '30px 26px 28px 24px' }}>
                  Send Message
                </button>
              </form>
            </div>

            {/* Floating Decoration */}
            <Star className="absolute bottom-8 right-8 text-[#C23D3D] fill-[#C23D3D] w-8 h-8 rotate-[-10deg] drop-shadow-[2px_2px_0_#3A2C5C]" strokeWidth={1.5} color="#3A2C5C" />
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage]);

  return (
    <div className="w-full min-h-screen relative overflow-x-hidden">
      <FontStyles />
      <AnimatePresence mode="wait">
        {currentPage === 'home' && <HomePage key="home" setPage={setCurrentPage} />}
        {currentPage === 'products' && <ProductsPage key="products" setPage={setCurrentPage} />}
        {currentPage === 'portfolio' && <PortfolioPage key="portfolio" setPage={setCurrentPage} />}
        {currentPage === 'contact' && <ContactPage key="contact" setPage={setCurrentPage} />}
      </AnimatePresence>
    </div>
  );
}