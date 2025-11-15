'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Package,
  CheckCircle,
  Settings,
} from 'lucide-react';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

const links = [
  {
    href: '/staff/dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard />,
  },
  { href: '#', label: 'Orders', icon: <Package /> },
  { href: '#', label: 'Completed', icon: <CheckCircle /> },
  { href: '#', label: 'Settings', icon: <Settings /> },
];

export function StaffNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {links.map((link) => (
        <SidebarMenuItem key={link.href}>
          <SidebarMenuButton
            asChild
            isActive={pathname === link.href}
            tooltip={link.label}
          >
            <Link href={link.href}>
              {link.icon}
              <span>{link.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
