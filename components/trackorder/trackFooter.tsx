import Image from 'next/image';

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

        <div className="mt-6 md:mt-0  w-full flex justify-center">
          <div>
            <h3 className="text-xl font-bold">Contact Us</h3>
            <p className="mt-2">Direexpress1@gmail.com</p>
            <p>Tel: +251915797270</p>
            <p>Bole Michael, Addis Ababa, Ethiopia</p>
          </div>
        </div>
      </footer>
      <div className="w-full py-4 bg-[#060a87] text-center text-white text-sm">
        © 2025 Dire Delivery. All rights reserved | Terms | Privacy
      </div>
    </>
  );
}
