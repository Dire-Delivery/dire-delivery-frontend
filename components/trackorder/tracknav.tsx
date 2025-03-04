import Image from 'next/image';
import plane from '@/public/Icons/plane.svg';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { LuMapPin } from 'react-icons/lu';
import Link from 'next/link';

export default function TrackNav() {
  return (
    <nav className="w-full h-[100px] px-2 md:px-12 py-5 bg-[#060a87] backdrop-blur-sm flex justify-between items-center relative">
      <div className="flex items-center gap-2">
        <Image src={plane} alt="Dire Express" width={40} height={40} />
        <div className="text-white text-3xl font-extrabold font-['Manrope']">
          Dire <span className="text-[#e30613]">Express</span>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className=" hidden md:hidden lg:flex items-center gap-2">
          <LuMapPin className="text-white w-6 h-6" />
          <span className="text-white text-lg">
            Megenaga, Addis Ababa, Ethiopia
          </span>
        </div>
        <div className="hidden md:flex gap-4">
          <FaFacebookF className="text-white w-6 h-6" />
          <FaLinkedinIn className="text-white w-6 h-6" />
          <FaInstagram className="text-white w-6 h-6" />
        </div>
        <Link href="#TrackPackage">
          <button className="px-4 py-2 bg-[#e30613] rounded-lg text-white font-bold">
            Track Order
          </button>
        </Link>
      </div>
    </nav>
  );
}
