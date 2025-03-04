'use client';

import { useState, useEffect } from 'react';
import { TrackOrder } from '@/actions/order';
import { Order } from '@/types/orderType';
import SearchBar from '@/components/trackorder/serachBar';
import { orderStatus } from '@/types/orderStatus';
import Tracking from '@/components/trackorder/tracking';
import TrackHero from '@/components/trackorder/trackHero';
import TrackFooter from '@/components/trackorder/trackFooter';
import TrackNav from '@/components/trackorder/tracknav';

export default function Page() {
  const [orderId, setOrderId] = useState('');
  const [transactionid, setTransactionid] = useState<string>('');
  const [anOrder, setanOrder] = useState<Order | null>(null);
  const [found, setFound] = useState<boolean>(true);
  const [statuses, setStatuses] = useState<orderStatus[]>([]);
  const [loading, setloading] = useState<boolean>(true);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!orderId.trim()) {
      return;
    }
    setTransactionid('');
    setTransactionid(orderId); // Update state
    setOrderId(''); // Clear the input field
  };

  useEffect(() => {
    if (transactionid) {
      setloading(true);
      setTimeout(() => {
        setloading(false);
      }, 3000);
      const fetchtrackData = async () => {
        try {
          const response = await TrackOrder({ id: transactionid });
          if (response.length > 0) {
            setanOrder(response[0]);
            setStatuses(Object.values(response[0].statuses));
            setFound(true);
          } else {
            setFound(false);
          }
        } catch (error) {
          console.error('Error fetching track data:', error);
          setFound(false);
        }
      };
      fetchtrackData();
    }
  }, [transactionid]);
  return (
    <>
      {/* Navbar */}

      <TrackNav />

      {/* Hero Section */}
      <TrackHero />
      {/* Track Your Package */}
      <section className=" bg-[#060a87] text-white py-4 md:py-8 flex justify-center items-center ">
        <h2 className="text-xl md:text-3xl font-bold">Track Your Package</h2>
      </section>
      {/* middle section */}
      <section className="py-8 px-4 md:px-10 lg:px-16 flex flex-col gap-8 md:gap-16">
        {/* Tracking Section */}
        <SearchBar
          handleSubmit={handleSubmit}
          orderId={orderId}
          setOrderId={setOrderId}
        />
        <Tracking
          transactionid={transactionid}
          loading={loading}
          found={found}
          anOrder={anOrder}
          statuses={statuses}
        />
        {/* Order info page */}
      </section>
      {/* Footer */}
      <TrackFooter />
    </>
  );
}
