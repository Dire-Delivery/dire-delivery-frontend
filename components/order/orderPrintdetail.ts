import { orderDetail } from '@/types/orderType';

export default function handlePrintDetail(order: orderDetail): void {
  if (!order) return;

  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  printWindow.document.write(`
     <html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dire Express - Package Order Receipt</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
        }
        
        .container {
            max-width: 800px;
            margin: 20px auto;
            border: 1px solid #000;
        }
        
        .header {
            background-color: #00008B;
            color: white;
            padding: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            display: flex;
            align-items: center;
        }
        
        .logo-text {
            margin-left: 5px;
        }
        
        .dire {
            font-weight: bold;
        }
        
        .express {
            color: #FF0000;
            font-weight: bold;
        }
        
        .title {
            font-weight: normal;
        }
        
        .section-title {
            background-color: #00008B;
            color: white;
            padding: 5px 10px;
            font-weight: bold;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
        }
        
        th {
            background-color: #00008B;
            color: white;
            padding: 2px;
            text-align: left;
            border: 1px solid #000;
        }
        
        td {
            padding: 2px;
            border: 1px solid #000;
        }
        
        .terms {
            font-size: 8px;
            padding: 10px;
            background-color: #f0f0f0;
        }
        
        .footer {
            background-color: #00008B;
            color: white;
            padding: 10px;
            text-align: center;
        }
        
        .close-icon {
            font-weight: bold;
            margin-right: 5px;
        }
        
        .address {
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="logo">
                <span class="dire">Dire</span><span class="express">Express</span>
            </div>
            <span class="title">Package Order Reciept</span>
        </div>
                <div>
            <div class="section-title">Order</div>
            <table>
                <tr>
                    <th>Description</th>
                    <th>Weight(kg)</th>
                    <th>Quantity</th>
                </tr>
                <tr>
                    <td>${order.item.description}</td>
                    <td>
                        ${order.item.weight}
                    </td>
                    <td>
                        ${order.item.quantity}</td>
                </tr>
            </table>
        </div>
        
        <!-- Order Details -->
        <table>
            <tr>
                <th>Order Date</th>
                <th>Transaction Code</th>
                <th>Payment Method</th>
                <th>TOTAL PRICE(birr)</th>
            </tr>
            <tr>
                <td> ${order.order.createdAT}</td>
                <td>${order.order.transactionCode}</td>
                <td> ${order.order.payment}</td>
                <td>${order.item.totalPrice}</td>
            </tr>
        </table>
        
        <!-- From Section -->
        <div>
            <div class="section-title">From:</div>
            <table>
                <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Location</th>
                </tr>
                <tr>
                    <td>${order.sender.name}</td>
                    <td>${order.sender.email}</td>
                    <td>${order.sender.phone}</td>
                    <td>${order.sender.address}</td>
                </tr>
            </table>
        </div>
        
        <!-- To Section -->
        <div>
            <div class="section-title">To:</div>
            <table>
                <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Location</th>
                </tr>
                <tr>
                    <td>${order.receiver.name}</td>
                    <td>${order.receiver.email}</td>
                    <td>${order.receiver.phone}</td>
                    <td>${order.receiver.address}</td>
                </tr>
            </table>
        </div>
        
        <!-- Terms and Conditions -->
        <div class="terms">
            <strong>DIRE CONDITIONS OF CARRIAGE | IMPORTANT NOTICE</strong><br>
            <p>By utilizing Dire Delivery services, you ("Sender") agree to these terms and conditions on behalf of yourself, the recipient of the shipment ("Recipient"), and any other party with an interest in the shipment:</p>
            <ol>
                <li>"Shipment" refers to all documents or parcels sent under a single waybill. The shipment may be transported by any means selected by Dire Delivery, including air, road, or any other transportation.</li>
                <li>Dire will ship shipment internationally or document subject to the terms and conditions contained in this waybill, including customs clearance if applicable.</li>
                <li>Dire Delivery will only transport shipments that are properly labeled, with complete documentation, and packaged appropriately to ensure safe transportation and handling and operated on a limited liability basis as outlined in these terms. If the Sender requires additional protection, additional insurance coverage may be arranged at an additional charge.</li>
                <li>Customs Clearance: To facilitate the provision of its services, Dire Delivery may, at its discretion, perform the following activities on behalf of the Sender or Recipient:
                    <ul>
                        <li>Complete any documents, amend product or service codes, and pay any duties or taxes required under applicable laws and regulations;</li>
                        <li>Act as the Sender's forwarding agent for customs and export control purposes and as the Recipient or the nominated importer for customs purposes;</li>
                        <li>Redirect the shipment to the Recipient's import broker or other address upon request from any party whom Dire Delivery believes in its reasonable opinion to be authorized.</li>
                    </ul>
                </li>
                <li>Unacceptable Shipment: A shipment will be considered unacceptable if any of the following conditions apply:
                    <ul>
                        <li>It does not comply with the restrictions and conditions outlined in these terms or applicable regulations;</li>
                        <li>Prohibited or illegal items: The shipment contains any of the following:
                            <ul>
                                <li>Live animals;</li>
                                <li>Drugs, narcotics, or gemstones;</li>
                                <li>Explosives, flammable items, or weapons;</li>
                                <li>Human remains;</li>
                                <li>Illegal items, including but not limited to ivory and narcotics;</li>
                                <li>Money, including but not limited to cash, coins, negotiable instruments, or items classified as hazardous, dangerous, prohibited, or restricted by regulatory bodies such as IATA;</li>
                                <li>Pornography or obscene materials;</li>
                                <li>The shipment contains items that Dire Delivery is not authorized to accept or transport under applicable law;</li>
                                <li>The shipment is improperly packed or labeled, or is damaged before collection such that it cannot be transported safely or legally;</li>
                                <li>Unsafe or unlawful items: The shipment contains any item that Dire Delivery determines cannot be transported safely or legally.</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>Inspection: Dire Delivery reserves the right to open and inspect any shipment without notice for reasons related to safety, security, customs compliance, or other regulatory requirements.</li>
                <li>Delivery and Undeliverables:
                    <ul>
                        <li>Shipments are automatically insured for loss or damage up to a value of 1,000 ETB without requiring a declared value.</li>
                        <li>Dire Delivery will make reasonable efforts to deliver the shipment according to its regular delivery schedules and procedures but these are not guaranteed and do not form part of the contract.</li>
                        <li>Dire Delivery may deliver to an alternative address.</li>
                    </ul>
                </li>
                <li>Reporting Damage or Missing Items: Any damage or missing contents must be reported within seven (7) days from the delivery date. To file a claim, customers must contact Dire Delivery with the following information:
                    <ul>
                        <li>Damaged Package Claims: If the shipment is received from Dire Delivery in a damaged condition, follow these steps:
                            <ul>
                                <li>If the item is lost with a valid receipt, 80% of its price will be refunded;</li>
                                <li>If the item is damaged with a valid receipt, 50% of its price will be refunded;</li>
                                <li>If the item is used with a valid receipt, 35% of its price will be refunded;</li>
                                <li>If the item is lost without a valid receipt, 50% of its price will be refunded;</li>
                                <li>Lost Package Claims: If a shipment is lost and not delivered within 30 weeks, Dire Delivery will issue a refund as follows:
                                    <ul>
                                        <li>If the item is lost with a valid receipt, 80% of its price will be refunded;</li>
                                        <li>If the item is lost without a valid receipt, 50% of its price will be refunded;</li>
                                        <li>Dire Delivery will make reasonable efforts to locate any lost shipment;</li>
                                        <li>If the lost item is a document or parcel ID, Dire Delivery will assist in retrieving it;</li>
                                        <li>Undeliverable Shipments will be returned to the sender.</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>Liability for Loss, Damage, or Delay: Dire Delivery's liability is limited to the actual cost of replacing the Dire Delivery waybill at 0912-751-9727 or email at Abdihadiiiman@gmail.com. Dire Delivery is not liable for any consequential losses or damages, even if advised of the risk. The Sender must submit a claim for lost or damaged shipment. Failure to provide these documents will result in ineligibility for a refund.</li>
                <li>Governing Law: These terms and conditions and any contract made pursuant to these terms and conditions shall be governed by the laws of the country of origin of the shipment. For the legal office of Dire Delivery, please contact the legal department at the address provided below.</li>
                <li>The Sender irrevocably agrees to submit to the jurisdiction courts otherwise required by applicable law.</li>
                <li>Severability: If any provision of these terms and conditions is held to be invalid or unenforceable, this provision shall remain in full force and effect.</li>
            </ol>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <div class="logo">
                <span class="dire">Dire</span><span class="express">Express</span>
            </div>
            <div>Support:</div>
            <div>Abdihadiiiman@gmail.com</div>
            <div class="address">Tel: +251-912-751-9727<br>Megenagna, Addis Ababa, Ethiopia</div>
        </div>
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
