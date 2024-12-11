import { SidebarNavItem } from "@/types";
import { UserRole } from "@prisma/client";

export const sidebarLinks: SidebarNavItem[] = [
  {
    title: "MENU",
    items: [
      {
        href: "/admin",
        icon: "laptop",
        title: "Admin Panel",
        authorizeOnly: "ADMIN" as UserRole,
      },
      {
        href: "/dashboard",
        icon: "dashboard",
        title: "Dashboard",
        authorizeOnly: "ADMIN" as UserRole,
      },
      {
        href: "/dashboard",
        icon: "dashboard",
        title: "Dashboard",
        authorizeOnly: "PROFESSIONAL" as UserRole,
      },
      {
        href: "/dashboard/business",
        icon: "handshake",
        title: "Business",
        authorizeOnly: "PROFESSIONAL" as UserRole,
      },
      {
        href: "/dashboard/billing",
        icon: "billing",
        title: "Billing",
        authorizeOnly: "PROFESSIONAL" as UserRole,
      },
      {
        href: "/dashboard/trusts",
        icon: "shieldCheck",
        title: "My Trust",
        authorizeOnly: "CLIENT" as UserRole,
      },
      // { href: "/dashboard/charts", icon: "lineChart", title: "Charts" },
      {
        href: "/admin/orders",
        icon: "package",
        title: "Orders",
        badge: 2,
        authorizeOnly: "ADMIN" as UserRole,
      },
    ],
  },
  {
    title: "OPTIONS",
    items: [
      { href: "/dashboard/settings", icon: "settings", title: "Settings" },
      // { href: "/", icon: "home", title: "Homepage" },
      // { href: "/docs", icon: "bookOpen", title: "Documentation" },
      {
        href: "#",
        icon: "messages",
        title: "Support",
        authorizeOnly: "PROFESSIONAL" as UserRole,
        disabled: true,
      },
    ],
  },
];
