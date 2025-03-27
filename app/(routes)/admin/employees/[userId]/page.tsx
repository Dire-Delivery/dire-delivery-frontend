'use client';

import UserOrderTabelView from '@/components/shared/userOrderTableView';
import { use } from 'react';

export default function Page({
    params,
}: {
    params: Promise<{ userId: string }>;
}) {
    const { userId } = use(params);
    const redirectLink = '/owner/orders';

    return <UserOrderTabelView redirectLink={redirectLink} userId={userId}/>;
}
