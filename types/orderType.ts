export type Order = {
  id: string;
  employeeId: string;
  senderId: string;
  receiverId: string;
  itemId: string;
  isPaid: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  orderDetails: {
    sender: {
      name: string;
      phone: string;
      address: string;
      email: string;
    };
    receiver: {
      name: string;
      phone: string;
      address: string;
      email: string;
    };
    status: {
      status: string;
      date: string;
      location: string;
    }[];
    item: {
      description: string;
      weight: number;
      quantity: number;
      totalPrice: number;
    };
    order: {
      payment: number;
      transactionCodes: string[];
      status: string;
    };
    employeeInfo: {
      name: string;
      email: string;
      phone: string | null;
      location: string;
    };
  };
};
