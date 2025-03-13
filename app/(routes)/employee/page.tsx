'use client';

import {
  Users,
  Shield,
  Truck,
  Clock,
  Package,
  DollarSign,
  Building,
} from 'lucide-react';
import { Card } from '@/components/ui/card';

import { JSX, useEffect, useState } from 'react';
import { Order } from '@/types/orderType';
import { FetchOrders } from '@/actions/order';
import { formatDate } from '@/lib/utils';

import { columns } from '@/components/order/owner/column';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '@/components/order/owner/orderTable';

export default function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [pending, setPending] = useState<Order[]>([]);
  const [delivered, setDelivered] = useState<Order[]>([]);
  const [pickedUp, setpickedUp] = useState<Order[]>([]);

  const today = formatDate(new Date().toDateString());
  console.log('today:', today);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await FetchOrders();
        // find other ways to handle it
        setOrders([]);
        setPending([]);
        setDelivered([]);
        setpickedUp([]);
        response.map((response: Order) => {
          console.log(response);
          if (response.createdAt === today) {
            console.log('yes');
            setOrders((prevOrders) => [...prevOrders, response]);
            switch (response.status) {
              case 'Pending':
                setPending((prevOrders) => [...prevOrders, response]);
                break;
              case 'delivered':
                setDelivered((prevOrders) => [...prevOrders, response]);
                break;
              case 'pickedUp':
                setpickedUp((prevOrders) => [...prevOrders, response]);
                break;
              default:
                break;
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, []);

  // handling Delete is elft
  const handleDelete = async (id: string) => {
    console.log('about to delete:', id);
  };

  console.log('fetchorders:', orders);
  console.log('fetchPending:', pending);

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-indigo-900">
            Welcome Back, owner!
          </h1>
          <p className="text-slate-600">
            Here&apos;s What&apos;s happening with your deliveries today
          </p>
        </div>

        {/* Stats Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Employees"
            value={0}
            icon={<Users className="h-6 w-6 text-white" />}
            color="bg-blue-400"
          />
          <StatCard
            title="Total owners"
            value={0}
            icon={<Shield className="h-6 w-6 text-white" />}
            color="bg-purple-400"
          />
          <StatCard
            title="Delivered Items"
            value={delivered.length}
            icon={<Truck className="h-6 w-6 text-white" />}
            color="bg-red-400"
          />
          <StatCard
            title="Pending Items"
            value={pending.length}
            icon={<Clock className="h-6 w-6 text-white" />}
            color="bg-yellow-400"
          />
        </div>

        {/* Stats Row 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Orders"
            value={orders.length}
            icon={<Package className="h-6 w-6 text-white" />}
            color="bg-emerald-400"
          />
          <StatCard
            title="Total Revenue"
            value={0}
            icon={<DollarSign className="h-6 w-6 text-white" />}
            color="bg-indigo-400"
          />
          <StatCard
            title="Cities Delivered"
            value={0}
            icon={<Building className="h-6 w-6 text-white" />}
            color="bg-blue-400"
          />
          <StatCard
            title="Picked Up Items"
            value={pickedUp.length}
            icon={<Users className="h-6 w-6 text-white" />}
            color="bg-purple-400"
          />
        </div>

        <DataTable
          columns={
            columns as ColumnDef<
              { transactionId: string; id: string },
              unknown
            >[]
          }
          data={orders}
          totalEntries={orders.length}
          handleDelete={handleDelete}
        />
      </div>
    </main>
  );
}

type StatCard = {
  title: string;
  value: number;
  color: string;
  icon: JSX.Element;
};

function StatCard({ title, value, icon, color }: StatCard) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-4xl font-bold">{value}</p>
        </div>
        <div className={`rounded-full p-3 ${color}`}>{icon}</div>
      </div>
    </Card>
  );
}
