import { Order } from '@/types/orderType';

export default function handlePrint(order: Order): void {
  if (!order) return;

  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  printWindow.document.write(`
      <html>
        <head>
          <title>Order Ticket - ${order.transactionId}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 20px; }
            .details { margin-bottom: 20px; }
            .detail-row { margin: 10px 0; }
            .footer { margin-top: 40px; text-align: center; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Dire Delivery</h1>
            <h2>Order Ticket - ${order.transactionId}</h2>
          </div>
          <div class="details">
            <div class="detail-row"><strong>Date:</strong> ${order.createdAt}</div>
            <div class="detail-row"><strong>From:</strong> ${order.senderName}</div>
            <div class="detail-row"><strong>Address:</strong> ${order.senderAddress}</div>
            <div class="detail-row"><strong>To:</strong> ${order.reciverName}</div>
            <div class="detail-row"><strong>Address:</strong> ${order.reciverAddress}</div>
            <div class="detail-row"><strong>Description:</strong> ${order.description}</div>
            <div class="detail-row"><strong>Weight:</strong> ${order.weight}kg</div>
            <div class="detail-row"><strong>Quantity:</strong> ${order.quantity}</div>
            <div class="detail-row"><strong>Total Price:</strong> $${order.Price}</div>
            <div class="detail-row"><strong>Payment Method:</strong> ${order.paymentMethod}</div>
            <div class="detail-row"><strong>Status:</strong> ${order.status}</div>
          </div>
          <div class="footer">
            <p>Thank you for choosing Dire Delivery!</p>
          </div>
        </body>
      </html>
    `);

  printWindow.document.close();

  // Ensure the content loads before printing
  printWindow.onload = () => {
    printWindow.print();
  };
}
