import Image from 'next/image';
import Confused from '@/public/images/confused.webp';

export const NotFoundCard = () => (
  <section className="flex flex-col justify-center items-center gap-2 md:gap-8 border-t-2 border-[#060a87] py-6 md:py-12 px-2 lg:px-3 w-full">
    <h1 className="w-full text-center font-bold text-xl md:text-2xl lg:text-3xl">
      Order was Not Found!
    </h1>
    <div className="w-full flex justify-center mt-4">
      <Image
        src={Confused}
        alt="Order not Found"
        className="w-[280px] md:w-[360px] lg:w-[400px]"
        priority
      />
    </div>
  </section>
);
