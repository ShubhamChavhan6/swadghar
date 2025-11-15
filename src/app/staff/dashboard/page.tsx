import { ORDERS } from '@/lib/data';
import { StaffOrderCard } from '@/components/staff/StaffOrderCard';

export default function StaffDashboardPage() {
  const liveOrders = ORDERS.filter(
    (o) => o.status === 'confirmed' || o.status === 'preparing' || o.status === 'ready'
  ).sort((a, b) => a.timestamp - b.timestamp);

  return (
    <div className="p-4 md:p-8">
      <h1 className="font-headline text-4xl font-bold">Live Orders</h1>

      {liveOrders.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {liveOrders.map((order) => (
            <StaffOrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-lg border-2 border-dashed border-border p-12 text-center">
          <h2 className="text-xl font-semibold">All caught up!</h2>
          <p className="mt-2 text-muted-foreground">No live orders at the moment.</p>
        </div>
      )}
    </div>
  );
}
