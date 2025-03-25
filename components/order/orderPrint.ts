import { Order } from '@/types/orderType';

export default function handlePrint(order: Order): void {
  if (!order) return;

  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  printWindow.document.write(`
      <html>
        <head>
          <title>Order Ticket - ${order.orderDetails.order.transactionCode}</title>
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
            <h2>Order Ticket - ${order.orderDetails.order.transactionCode}</h2>
          </div>
          <div class="details">
            <div class="detail-row"><strong>Date:</strong> ${order.orderDetails.order.createdAT}</div>
            <div class="detail-row"><strong>From:</strong> ${order.orderDetails.sender.name}</div>
            <div class="detail-row"><strong>Address:</strong> ${order.orderDetails.sender.address}</div>
            <div class="detail-row"><strong>To:</strong> ${order.orderDetails.receiver.name}</div>
            <div class="detail-row"><strong>Address:</strong> ${order.orderDetails.receiver.address}</div>
            <div class="detail-row"><strong>Description:</strong> ${order.orderDetails.item.description}</div>
            <div class="detail-row"><strong>Weight:</strong> ${order.orderDetails.item.weight}kg</div>
            <div class="detail-row"><strong>Quantity:</strong> ${order.orderDetails.item.quantity}</div>
            <div class="detail-row"><strong>Total Price:</strong> $${order.orderDetails.item.totalPrice}</div>
            <div class="detail-row"><strong>Payment Method:</strong> ${order.orderDetails.order.payment}</div>
            <div class="detail-row"><strong>Status:</strong> ${order.orderDetails.order.status}</div>
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
