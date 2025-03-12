import React from 'react';
import { FaPlaneDeparture } from 'react-icons/fa';
import { PiBoxArrowDownBold } from 'react-icons/pi';
import { TbCircleCheckFilled } from 'react-icons/tb';
import { Circle } from 'lucide-react';

export function getStatusIcon(status: string) {
  switch (status) {
    case 'pending':
      return <FaPlaneDeparture className="h-10 w-10" />;
    case 'delivered':
      return <PiBoxArrowDownBold className="h-10 w-10" />;
    case 'picked up':
      return <TbCircleCheckFilled className="h-16 w-16" />;
    default:
      return <Circle className="h-10 w-10" />;
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'pending':
      return 'bg-blue-100 text-blue-600';
    case 'delivered':
      return 'bg-yellow-100 text-yellow-600';
    case 'picked up':
      return 'bg-green-100 text-green-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
}

export function getStatusIconTable(status: string) {
  switch (status) {
    case 'pending':
      return <FaPlaneDeparture className="h-4 w-4" />;
    case 'delivered':
      return <PiBoxArrowDownBold className="h-4 w-4" />;
    case 'picked up':
      return <TbCircleCheckFilled className="h-6 w-6" />;
    default:
      return <Circle className="h-4 w-4" />;
  }
}
