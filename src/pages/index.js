// pages/bfree/[phone].js
import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { SocialIcon } from 'react-social-icons';
import { useRouter } from 'next/router';

const ScratchCard = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [scratchedPercentage, setScratchedPercentage] = useState(0);
  const [isScratched, setIsScratched] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const [giftInfo, setGiftInfo] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const { phone } = router.query;
    if (phone) {
      fetchGiftInfo(phone);
    }
  }, [router.query]);

  const fetchGiftInfo = async (phoneNumber) => {
    try {
      const response = await fetch(`https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec?phone=${phoneNumber}`);
      const data = await response.json();
      if (data.error) {
        console.error(data.error);
      } else {
        setGiftInfo(data);
      }
    } catch (error) {
      console.error('Error fetching gift info:', error);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      ctx.fillStyle = '#E9C23C';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  }, []);

  const startDrawing = (e) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    calculateScratchedPercentage();
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches[0]?.clientY) - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fill();
  };

  const calculateScratchedPercentage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const totalPixels = imageData.data.length / 4;
    let scratchedPixels = 0;

    for (let i = 0; i < imageData.data.length; i += 4) {
      if (imageData.data[i + 3] === 0) {
        scratchedPixels++;
      }
    }

    const percentage = (scratchedPixels / totalPixels) * 100;
    setScratchedPercentage(percentage);

    if (percentage >= 70) {
      setIsScratched(true);
      setIsBlurred(true);
      triggerConfetti();
      clearCanvas();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const followOnFacebook = () => {
    window.open(`https://www.facebook.com/bfree.netivot?mibextid=ZbWKwL`, '_blank');
  };

  const followOnInstagram = () => {
    window.open(`https://www.instagram.com/bfree_netivot`, '_blank');
  };

  const followOnTikTok = () => {
    window.open(`https://www.tiktok.combfree_bezeq_netivot`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-400 flex flex-col items-center justify-center text-white text-center p-4">
      <div className={`transition-all duration-500 ${isBlurred ? 'blur-sm' : ''}`}>
        <img src="/bfree-logo-removebg-preview.png" alt="Bfree Logo" className="w-36 mb-5 mx-auto" />
        <h1 className="text-5xl font-bold mb-2 shadow-text">כרטיס גירוד</h1>
        <h1 className="text-6xl font-bold mb-4 digital-text">דיגיטלי</h1>
        <div className="text-lg max-w-xs font-bold mb-2">כל כרטיס זוכה</div>
      </div>
      <div className={`relative w-80 h-32 bg-white rounded-lg shadow-md overflow-hidden mb-5 ${isScratched ? 'animate-card' : ''} hover:bg-gold`}>
        <div className={`absolute inset-0 flex items-center justify-center text-3xl font-bold text-blue-600 ${!isScratched ? 'blur-sm' : ''}`}>
          {giftInfo ? giftInfo.giftName : 'Loading...'}
        </div>
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="absolute inset-0 w-full h-full"
        />
      </div>
      {isScratched && (
        <div className="flex justify-center space-x-4 mb-5 mt-4">
          <button onClick={followOnFacebook} className="mx-2">
            <SocialIcon url="https://www.facebook.com" target="_blank" />
          </button>
          <button onClick={followOnInstagram} className="mx-2">
            <SocialIcon url="https://www.instagram.com" target="_blank" />
          </button>
          <button onClick={followOnTikTok} className="mx-2">
            <SocialIcon url="https://www.tiktok.com" target="_blank" />
          </button>
        </div>
      )}
      <div className={`transition-all duration-500 ${isBlurred ? 'blur-sm' : ''}`}>
        <div className="flex justify-center items-center">
          <a href="https://wa.me/0533459020" target="_blank" rel="noopener noreferrer">
            <div className="bg-white text-blue-600 px-4 py-2 rounded-full text-xl flex items-center mb-5">
              <img src="/whatsapp.png" alt="WhatsApp Icon" className="mr-2" style={{ width: 24, height: 24 }} />
              053-3459020
            </div>
          </a>
        </div>
        <div className="text-lg max-w-xs font-bold">
          רוכשים ב-200₪ ומעלה בחנות הווצאפ שלנו ומקבלים כרטיס גירוד
        </div>
      </div>
      <style jsx>{`
        .digital-text {
          background: linear-gradient(to bottom, #ffffff 0%, #d1d1d1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0px 2px 3px rgba(255,255,255,0.3);
          position: relative;
          font-size: 7rem;
        }
        .digital-text::after {
          content: 'דיגיטלי';
          position: absolute;
          left: 0;
          top: 0;
          background: linear-gradient(45deg, transparent 45%, #ffffff 55%, transparent 65%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 4s ease-in-out infinite;
        }
        @keyframes shine {
          0% {background-position: -100% 0;}
          100% {background-position: 100% 0;}
        }
        .shadow-text {
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }
        .animate-card {
          animation: rotateAndEnlarge 2s forwards;
        }
        @keyframes rotateAndEnlarge {
          0% {
            transform: rotate(0deg) scale(1);
          }
          100% {
            transform: rotate(360deg) scale(1.2);
          }
        }
        .blur-sm {
          filter: blur(5px);
        }
        .hover\\:bg-gold:hover {
          background-color: gold;
        }
        @media (max-width: 640px) {
          .animate-card {
            max-width: 90vw;
            max-height: 90vw;
            margin: 5vw auto;
          }
        }
      `}</style>
    </div>
  );
};

export default ScratchCard;