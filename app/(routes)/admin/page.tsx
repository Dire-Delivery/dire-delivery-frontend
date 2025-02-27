import { dashboardCards } from "@/data/admin"
import Image from "next/image"

export default function Page() {
  return (
    <div className="flex-1 flex flex-col p-3 gap-3 bg-[#F3F4F6]">
      <div className="flex flex-col gap-2 py-3 px-1.5">
        <div className="text-[#060A87] text-2xl font-extrabold">Welcome Back, Owner!</div>
        <div className="text-[#495D86] text-xs font-extrabold">Here’s What’s happening with deliveries today</div>
      </div>
      <div className="px-1.5 grid grid-cols-4 grid-rows-2 gap-2.5">
        {dashboardCards.map((card) => (
          <div className="flex flex-col gap-2 py-4 px-3.5 items-center justify-center rounded-[8px] shadow-[0px_2px_4px_-2px_rgba(0,0,0,0.1),0px_4px_6px_-1px_rgba(0,0,0,0.1)]">
            <Image src={card.icon} alt={`${card.title} icon`} width={36} height={36}></Image>
            <div className="text-xs font-medium text-[#6B7280] text-center">{card.title}</div>
            <div className="text-lg font-semibold mt-[-4px]">0</div>
          </div>
        ))}
      </div>
      <div>

      </div>
    </div>
  )
}
