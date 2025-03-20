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

export function convertToEmployeesFormat(users  : User[]) {
  return users.map((user: User) => {
    const EmployeeFormat: Person = {
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phone ? user.phone : '-',
      location: user.location ? user.location: '-',
      imgUrl: user.image
    }
    return EmployeeFormat
  })
}