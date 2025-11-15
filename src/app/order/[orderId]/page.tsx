import { OrderStatusClient } from '@/components/order/OrderStatusClient';

export default function OrderPage({
  params,
  searchParams,
}: {
  params: { orderId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const orderId = params.orderId;
  const initialWaitTime = Number(searchParams.wait) || 15;
  const waitTimeReason = (searchParams.reason as string) || 'Calculating best route for your food...';

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <OrderStatusClient 
        orderId={orderId} 
        initialWaitTime={initialWaitTime}
        waitTimeReason={waitTimeReason}
      />
    </div>
  );
}
