import { Person, User } from '@/types/employeeType';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export function generateTransactionId() {
  const randomNumbers = Math.floor(10000 + Math.random() * 90000);
  return `DTE${randomNumbers}`;
}

export function convertToUsersFormat(users: User[], role: string) {
  return users
    .filter((user) => user.role === role)
    .map((user: User) => {
      const EmployeeFormat: Person = {
        id: user.id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phone ? user.phone : '-',
        location: user.location ? user.location : '-',
        imgUrl: user.image,
      };
      return EmployeeFormat;
    });
}
export function formatNewDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function splitName(name: string): {
  firstName: string;
  lastName: string;
} {
  const nameParts = name.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';
  return { firstName, lastName };
}

export function priceCalculator(weight: number, basePrice: number): number {
  if (weight <= 1 && weight > 0) {
    return basePrice!;
  } else {
    return basePrice! * weight;
  }
}

export function formatTrackDate(date: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };
  const parsedDate = new Date(date);
  return parsedDate.toLocaleDateString('en-US', options).replace(',', '');
}
