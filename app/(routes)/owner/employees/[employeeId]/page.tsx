'use client';

import PersonOrderTabelView from '@/components/shared/personOrderTableView';
import { use } from 'react';

export default function Page({
    params,
}: {
    params: Promise<{ employeeId: string }>;
}) {
    const { employeeId } = use(params);
    const redirectLink = '/owner/orders';

    return <PersonOrderTabelView redirectLink={redirectLink} employeeId={employeeId}/>;
}
