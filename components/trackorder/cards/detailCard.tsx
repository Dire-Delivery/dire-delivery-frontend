import { FiPackage } from 'react-icons/fi';
import { ReactNode, ComponentType } from 'react';

export const DetailCard = ({
  title,
  icon: Icon = FiPackage,
  children,
}: {
  title: string;
  icon?: ComponentType<{ className?: string }>;
  children: ReactNode;
}) => (
  <div className="w-full lg:max-w-[400px] px-5 py-4 rounded-sm shadow-[1px_1px_6px_0px_rgba(0,0,0,0.25)] border border-[#f2f2f6] flex-col justify-start">
    <div className="flex items-center gap-1 py-3 border-b-2 border-black">
      <Icon className="w-8 h-8" />
      <h1 className="text-xl font-bold">{title}</h1>
    </div>
    <div className="py-2 flex flex-col gap-2">{children}</div>
  </div>
);

export const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="flex w-full justify-between">
    <h3 className="font-bold">{label}</h3>
    <p className="text-[#71717A]">{value}</p>
  </div>
);
