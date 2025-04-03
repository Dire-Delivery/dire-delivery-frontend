import type { StatCard } from '@/types/StatCard';
import { Card } from '@/components/ui/card';
import { dashboardTotals, locations } from '@/types/dashboard';
import { Building, Clock, Package, Shield, Truck, Users } from 'lucide-react';

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

type Props = {
  dashboarTotals: dashboardTotals;
  locations: locations[];
};

const DashCards = ({ dashboarTotals, locations }: Props) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Employees"
          value={dashboarTotals.totalEmployees ?? 0}
          icon={<Users className="h-6 w-6 text-white" />}
          color="bg-blue-400"
        />
        <StatCard
          title="Total Admins"
          value={dashboarTotals.totalAdmins ?? 0}
          icon={<Shield className="h-6 w-6 text-white" />}
          color="bg-purple-400"
        />
        <StatCard
          title="Delivered Items"
          value={dashboarTotals.totalDelivered ?? 0}
          icon={<Truck className="h-6 w-6 text-white" />}
          color="bg-red-400"
        />
        <StatCard
          title="Pending Items"
          value={dashboarTotals.totalPending ?? 0}
          icon={<Clock className="h-6 w-6 text-white" />}
          color="bg-yellow-400"
        />
      </div>

      {/* Stats Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Orders"
          value={dashboarTotals.totalOrders ?? 0}
          icon={<Package className="h-6 w-6 text-white" />}
          color="bg-emerald-400"
        />
        <StatCard
          title="Cities"
          value={locations.length}
          icon={<Building className="h-6 w-6 text-white" />}
          color="bg-blue-400"
        />
        <StatCard
          title="Picked Up Items"
          value={dashboarTotals.totalPickedup ?? 0}
          icon={<Users className="h-6 w-6 text-white" />}
          color="bg-purple-400"
        />
      </div>
    </div>
  );
};

export default DashCards;
