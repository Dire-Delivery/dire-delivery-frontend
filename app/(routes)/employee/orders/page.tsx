'use client';

import { userProfile } from '@/actions/auth';
import OrderTabelView from '@/components/order/orderTableView';
import { userType } from '@/types/user';
import { useEffect, useState } from 'react';

export default function Page() {
  const [user, setUser] = useState<userType | null>(null);

  const role = user?.role;
  const name = user?.name;
  const userId = user?.id;
  const redirectLink = '/employee/orders';

  useEffect(() => {
    const fetchUser = async () => {
      const decoded = await userProfile();
      console.log('user', decoded);
      setUser(decoded as userType);
    };

    fetchUser();
  }, []);

  return (
    <OrderTabelView
      role={role!}
      name={name!}
      userId={userId!}
      redirectLink={redirectLink}
    />
  );
}
