export default function Page() {
  return (
    <div className="flex-1 flex flex-col p-3 gap-3 border-4 border-red-500">
      <div className="flex flex-col gap-2 py-3 px-1.5">
        <div className="text-[#060A87] text-2xl font-extrabold">Welcome Back, Owner!</div>
        <div className="text-[#495D86] text-xs font-extrabold">Here’s What’s happening with deliveries today</div>
      </div>
      <div className="px-1.5 grid grid-cols-4 grid-rows-2 gap-2.5">
        <div className="h-[128px] bg-blue-500">1</div>
        <div className="h-[128px] bg-blue-500">2</div>
        <div className="h-[128px] bg-blue-500">3</div>
        <div className="h-[128px] bg-blue-500">4</div>
        <div className="h-[128px] bg-blue-500">5</div>
        <div className="h-[128px] bg-blue-500">6</div>
        <div className="h-[128px] bg-blue-500">7</div>
        <div className="h-[128px] bg-blue-500">8</div>
      </div>
      <div>

      </div>
    </div>
  )
}
