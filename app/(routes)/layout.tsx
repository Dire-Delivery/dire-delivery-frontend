'use client';

import BaseLayout from '@/components/shared/layout/base-layout';
import { usePathname } from 'next/navigation';

export default function RouteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  // Define routes that should NOT use BaseLayout
  const excludedRoutes = ['/login', '/register', '/order'];

  return excludedRoutes.includes(pathname) ? (
    <>{children}</>
  ) : (
    <BaseLayout>{children}</BaseLayout>
  );
}
