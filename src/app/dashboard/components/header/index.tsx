'use client';

import Container from '@/components/container';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const DashboardHeader = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <Container>
      <header className="w-full bg-gray-900 my-4 p-3 rounded flex gap-4">
        <Link
          href="/dashboard"
          className={`text-white transition-all duration-300 flex items-center hover:scale-[1.06] ${
            isActive('/dashboard') ? 'font-bold underline underline-offset-4' : ''
          }`}
        >
          Chamados
        </Link>
        <Link
          href="/dashboard/customer"
          className={`text-white transition-all duration-300 flex items-center hover:scale-[1.06] ${
            isActive('/dashboard/customer') ? 'font-bold underline underline-offset-4' : ''
          }`}
        >
          Clientes
        </Link>
      </header>
    </Container>
  );
};

export default DashboardHeader;
