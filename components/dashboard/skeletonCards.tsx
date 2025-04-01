import { Card } from '@/components/ui/card';

function SkeletonCard() {
  return (
    <Card className="p-6 animate-pulse">
      <div className="flex justify-between items-center">
        <div>
          <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
          <div className="h-8 bg-gray-300 rounded w-16"></div>
        </div>
        <div className="rounded-full p-3 bg-gray-300 h-12 w-12"></div>
      </div>
    </Card>
  );
}

const SkeletonDashCards = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>

      {/* Stats Row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
};

export default SkeletonDashCards;
