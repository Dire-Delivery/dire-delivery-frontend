export type Order = {
  id: string;
  transactionId: string;
  senderName: string;
  reciverName: string;
  description: string;
  weight: number;
  quantity: number;
  Price?: number; //must be changed based on schema
  senderAddress: string;
  reciverAddress: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
  paymentMethod?: string;
  statuses?: {
    pending?: {
      type: string;
      location: string;
      date: string;
    };
    delivered?: {
      type: string;
      location: string;
      date: string;
    };
    pickedUp?: {
      type: string;
      location: string;
      date: string;
    };
  };
  senderPhoneNumber: string;
  reciverPhoneNumber: string;
  senderEmail: string;
  reciverEmail: string;
  addedBy?: string;
};
