export default function TrackHero() {
  return (
    <section className="w-full h-[320px] md:h-[720px] px-6  lg:px-[120px] py-[183px] bg-[linear-gradient(to_right,_rgba(0,0,0,0.7),rgba(0,0,0,0)),url('/images/track-order-banner.jpg')] flex-col justify-center items-start gap-4 inline-flex overflow-hidden bg-cover bg-center bg-no-repeat md:bg-cover">
      <div className="w-64 md:w-[646px] text-white text-2xl md:text-[64px] font-extrabold font-['Manrope'] md:leading-tight">
        Fast. Reliable. Delivered with Care.
      </div>
      <div className="md:w-[590px]">
        <span className="text-white text-wrap text-lg md:text-[28px] font-light font-['Manrope']">
          Trust Dire Delivery to bring your packages home—on time, every time
        </span>
      </div>
    </section>
  );
}
