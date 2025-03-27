export type orderStatus = {
  status: string;
  date: string;
  location: string;
};

export type OrderType = {
  orderDetails: {
    sender: Person;
    receiver: Person;
    status: Status[];
    item: Item;
    order: OrderInfo;
    employeeInfo: Employee;
  };
};

type Person = {
  name: string;
  phone: string;
  address: string;
  email: string;
};

type Status = {
  status: string;
  date: string;
  location: string;
};

type Item = {
  description: string;
  weight: number;
  quantity: number;
  totalPrice: number;
};

type OrderInfo = {
  payment: number;
  transactionCode: string;
  status: string;
  createdAT: string;
};

type Employee = {
  name: string;
  email: string;
  phone: string;
  location: string;
};
