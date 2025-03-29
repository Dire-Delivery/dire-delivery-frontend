import { orderDetail } from '@/types/orderType';

export default function handlePrintDetail(order: orderDetail): void {
  if (!order) return;

  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  printWindow.document.write(`
    <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
        background-color: #00008b;
        color: white;
        padding: 24px 64px;

        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
      }
      .section {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .table-container {
        display: flex;
        flex-direction: column;
        gap: 12px;

        width: 98%;
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
        color: #ff0000;
        font-weight: bold;
      }

      .title {
        font-weight: normal;
      }

      .section-title {
        color: 00008b;
        padding: 5px 10px;
        font-weight: bold;
      }

      table {
        width: 100%;
        border-collapse: collapse;
      }

      th {
        background-color: #00008b;
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
        font-size: 6px;
        padding: 24px;
        background-color: #f0f0f0;
      }

      .footer {
        background-color: #00008b;
        color: white;
        padding: 12px 72px;
        text-align: center;
        display: flex;
        justify-content: space-between;
      }

      .close-icon {
        font-weight: bold;
        margin-right: 5px;
      }

      .address {
        font-size: 12px;
      }

      .employee-signature {
        margin-top: 20px;
        padding: 4px 16px;
        border: 1px solid #00008b;
        display: flex;
        justify-content: start;
        gap: 12px;
        color: #00008b;
      }

      .employee-signature .section-title {
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 10px;
        color: #00008b;
      }

      .signature-row {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        width: 320px;
        border: 1px solid balck;
      }

      .signature-row label {
        font-weight: bold;
        margin-right: 2px;
      }

      .signature-row span {
        flex: 1;
        height: 20px;
        width: 120px;
        border-bottom: 1px solid #000;
        padding: 5px 5px;
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
      <div class="section">
        <div class="table-container">
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
                <td>${order.item.weight}</td>
                <td>${order.item.quantity}</td>
              </tr>
            </table>
          </div>

          <!-- Order Details -->
          <table class="">
            <tr>
              <th>Order Date</th>
              <th>Transaction Code</th>
              <th>Payment Method</th>
              <th>TOTAL PRICE(birr)</th>
            </tr>
            <tr>
              <td>${order.order.createdAT}</td>
              <td>${order.order.transactionCode}</td>
              <td>${order.order.payment === 0 ? 'On Delivery' : 'Now'}</td>
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
        </div>
      </div>
      <div class="section employee-signature">
        <div class="signature-row">
          <label for="employee-name">Employee Name:</label>
          <span id="employee-name"></span>
        </div>
        <div class="signature-row">
          <label for="employee-signature">Signature:</label>
          <span id="employee-signature"></span>
        </div>
      </div>
      <!-- Terms and Conditions -->
      <div class="terms">
        <strong>DIRE CONDITIONS OF CARRIAGE | IMPORTANT NOTICE</strong><br />
        <p>
          By utilizing Dire Delivery services, you ("Sender") agree to these
          terms and conditions on behalf of yourself, the recipient of the
          shipment ("Recipient"), and any other party with an interest in the
          shipment: "Shipment" refers to all documents or parcels sent under a
          single waybill. The shipment may be transported by any means selected
          by Dire Delivery, including air, road, or any other
          transportation.Dire will ship shipments internationally or
          domestically subject to the terms and conditions contained in this
          waybill, including customs clearance if applicable.Dire Delivery will
          only transport shipments that are properly labeled, with complete
          documentation, and packaged appropriately to ensure safe
          transportation and handling, operated on a limited liability basis as
          outlined in these terms. Additional insurance coverage may be arranged
          at an extra charge
        </p>
        <ol>
          <li>
            Customs Clearance: To facilitate the provision of its services, Dire
            Delivery may, at its discretion, perform the following activities on
            behalf of the Sender or Receiver:
            <ol>
              <li>
                <strong>Customs and Documentation:</strong> Complete necessary
                documents, modify product or service codes, and pay any duties,
                taxes, or penalties required under applicable laws and
                regulations ("Custom Duties").
              </li>
              <li>
                Customs Representation:
                <ul>
                  <li>
                    Act as the Sender’s forwarding agent for customs and export
                    control purposes.
                  </li>
                  <li>
                    Act as the Receiver for the limited purpose of appointing a
                    customs broker to handle customs clearance and entry
                  </li>
                </ul>
              </li>
              <li>
                <strong>Shipment Redirection</strong>: Redirect the shipment to
                the Recipient's import broker or another address upon request.
              </li>
            </ol>
          </li>
          <li>
            <strong>Unacceptable Shipments:</strong>A shipment will be
            considered unacceptable if any of the following conditions apply:
            <ol>
              <li>
                <strong>Missing Customs Declaration</strong>:Required customs
                declarations are not provided in accordance with applicable
                regulations
              </li>
              <li>
                <strong>Prohibited or Illegal Items</strong>:The shipment
                contains any of the following:
                <ul>
                  <li>
                    Counterfeit goods, Live animals, Bullion, currency, or
                    gemstones, Weapons, explosives, or ammunition, Human
                    remains, Illegal items, including but not limited to ivory
                    and narcotics
                  </li>
                </ul>
              </li>
              <li>
                <strong>Hazardous or Restricted Goods:</strong>The shipment
                includes materials classified as hazardous, dangerous,
                prohibited, or restricted by regulatory bodies such asIATA,
                ICAO, ADR, or any other relevant organization ("Dangerous
                Goods")
              </li>
              <li>
                <strong>Improper Addressing or Packaging:</strong>The shipment
                has an incorrect or incomplete address, is not properly labeled,
                or is inadequately packaged, making it unsuitable for safe
                transport under standard handling procedures.
              </li>
              <li>
                <strong>Unsafe or Unlawful Items:</strong>The shipment contains
                any item that Dire Delivery determines cannot be transported
                safely or legally
              </li>
            </ol>
          </li>
          <li>
            <strong>Inspection:</strong> Dire Delivery reserves the right to
            open and inspect any shipment without notice for safety, security,
            customs, or regulatory requirements.
          </li>
          <li>
            <strong>Shipment INsurance:</strong>
            <ol>
              <li>
                Shipments are automatically insured for loss or damage up to a
                value of 3,000 ETB without requiring a declared value
              </li>
              <li>
                If the item's value exceeds 3,000 ETB, the Sender must declare
                the correct value and purchase additional insurance
              </li>
              <li>
                If no additional insurance is purchased, Dire Delivery's maximum
                liability for loss or damage remains 3,000 ETB.
              </li>
            </ol>
          </li>
          <li>
            <strong>Claims:</strong>
            <ol>
              <li>
                <strong>Reporting Damaged or Missing Items</strong>Any damage or
                missing contents must be reported within seven (7) days from the
                delivery date. To file a claim, customers must call 0973983018
                or visit the nearest Dire Delivery office.
              </li>
              <li>
                <strong>Damaged Package Claims</strong>If the damaged item is
                repairable, Dire Delivery will fully repair it within a maximum
                of 15 days. If the item is not repairable, the company will
                issue a refund based on the following conditions:
                <ul>
                  <li>
                    If the item is new with a valid receipt, 50% of its price
                    will be refunded.
                  </li>
                  <li>
                    If the item is new but without a valid receipt, 25% of its
                    price will be refunded.
                  </li>
                  <li>
                    If the item is used with a valid receipt, 25% of its price
                    will be refunded.
                  </li>
                  <li>
                    If the item is used and without a valid receipt, 15% of its
                    price will be refunded
                  </li>
                </ul>
              </li>
              <li>
                <strong>Lost Package Claims: </strong>If a shipment is lost and
                not recovered within five (5) weeks, Dire Delivery will issue a
                refund as follows:
                <ul>
                  <li>
                    If the item is new with a valid receipt, 50% of its price
                    will be refunded.
                  </li>
                  <li>
                    If the item is new but without a valid receipt, 25% of its
                    price will be refunded
                  </li>
                  <li>
                    If the item is used with a valid receipt, 25% of its price
                    will be refunded.
                  </li>
                  <li>
                    If the item is used and without a valid receipt, 15% of its
                    price will be refunded.
                  </li>
                </ul>
                If the lost item is a document or personal ID, Dire Delivery
                will assist in obtaining a replacement by providing an official
                letter.
              </li>
              <li>
                <strong>Refund Requests</strong>: Customers may request a refund
                or credit due to a service failure by contacting Dire Delivery
                via phone at 0915797270 or email at direexpress1@gmail.com.
                Refund requests must include the Dire Delivery tracking number.
                Customers must also provide a valid receipt and an image of the
                item when claiming a refund for a lost or damaged shipment.
                Failure to provide these documents will result in ineligibility
                for a refund.
              </li>
            </ol>
          </li>

          <li>
            <strong> Governing Law</strong>:
            <ul>
              <li>
                Any dispute arising from or related to these terms and
                conditions shall be governed by the laws of the country of
                origin of the shipment. For the benefit of Dire Delivery, such
                disputes shall be subject to the nonexclusive jurisdiction of
                the courts in that country.
              </li>
              <li>
                The Sender irrevocably agrees to submit to this jurisdiction
                unless otherwise required by applicable law
              </li>
            </ul>
          </li>
          <li>
            <strong>Severability</strong>
            <br />If any provision of these terms and conditions is found to be
            invalid or unenforceable, the remaining provisions shall remain in
            full force and effect.If any provision of these terms and conditions
            is found to be invalid or unenforceable, the remaining provisions
            shall remain in full force and effect.
          </li>
        </ol>
      </div>
      <!-- Employee Signature Section -->

      <!-- Footer -->
     <div class="footer">
        <div class="logo">
          <span class="dire">Dire</span><span class="express">Express</span>
        </div>
        <div>
          <div>Support:</div>
          <div>Direexpress1@gmail.com</div>
          <div class="address">
            Tel: +251915797270<br />Bole Michael, Addis Ababa, Ethiopia
          </div>
        </div>
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
