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
      transactionCode: string;
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

export type orderTable = {
  totalPage: number;
  currentPage: number;
  orders: {
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
        transactionCodes: string;
        status: string;
      };
      employeeInfo: {
        name: string;
        email: string;
        phone: string | null;
        location: string;
      };
    };
  }[];
};
export type TransformedOrder = {
  id: string;
  transactionId: string;
  senderName: string;
  reciverName: string;
  description: string;
  weight: number;
  quantity: number;
  Price: number;
  senderAddress: string;
  reciverAddress: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  paymentMethod: string;
  statuses: {
    pending?: {
      type: string;
      date: string;
      location: string;
    };
    delivered?: {
      type: string;
      date: string;
      location: string;
    };
    pickedUp?: {
      type: string;
      date: string;
      location: string;
    };
  };
  senderPhoneNumber: string;
  reciverPhoneNumber: string;
  senderEmail: string;
  reciverEmail: string;
};
