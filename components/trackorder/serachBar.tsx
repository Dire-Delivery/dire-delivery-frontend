type NewType = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  orderId: string;
  setOrderId: React.Dispatch<React.SetStateAction<string>>;
};

type props = NewType;

export default function SearchBar({
  handleSubmit,
  orderId,
  setOrderId,
}: props) {
  return (
    <section
      className="w-full h-auto bg-white px-1 md:px-3 lg:px-6 "
      id="TrackPackage"
    >
      <form onSubmit={handleSubmit} className="flex items-end md:max-[680px]">
        <div className="mt-6 flex flex-col md:flex-col gap-4  items-start w-full max-w-lg">
          <label className="text-lg md:text-xl lg:text-2xl font-bold">
            Tracking Number
          </label>
          <input
            type="text"
            placeholder="(Eg. TRX-0001)"
            className="w-[95%] md:w-[95%] h-12 md:h-16 md:text-lg lg:text-xl px-4 py-2 rounded-lg border border-gray-300 text-black"
            onChange={(e) => setOrderId(e.target.value)}
            value={orderId}
            required
          />
        </div>
        <button
          type="submit"
          className="text-sm md:w-auto md:h-16 md:text-lg lg:text-xl px-2 py-3 md:px-6 md:py-3 bg-[#e30613] hover:bg-[#c20410] rounded-lg text-white font-bold text-nowrap"
        >
          Track Order
        </button>
      </form>
    </section>
  );
}
