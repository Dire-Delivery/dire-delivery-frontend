import Image from 'next/image';

import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import plane from '@/public/Icons/plane.svg';

export default function TrackFooter() {
  return (
    <>
      <footer className="w-full h-full px-6 md:px-16 py-8 bg-[#060a87] text-white flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2">
            <Image src={plane} alt="Dire Express" width={40} height={40} />
            <div className="text-2xl font-extrabold">
              Dire <span className="text-[#e30613]">Express</span>
            </div>
          </div>
          <p className="max-w-xs mt-2">
            Your trusted partner for fast and reliable delivery services.
          </p>
        </div>
        <div className="mt-6 md:mt-0">
          <h3 className="text-xl font-bold">Contact Us</h3>
          <p className="mt-2">Abdihadiiiman@gmail.com</p>
          <p>Tel: +251916272791</p>
          <p>Megenagna, Addis Ababa, Ethiopia</p>
        </div>
        <div className="mt-6 md:mt-0 flex gap-4">
          <FaFacebookF className="w-8 h-8" />
          <FaLinkedinIn className="w-8 h-8" />
          <FaInstagram className="w-8 h-8" />
        </div>
      </footer>
      <div className="w-full py-4 bg-[#060a87] text-center text-white text-sm">
        © 2025 Dire Delivery. All rights reserved | Terms | Privacy
      </div>
    </>
  );
}
