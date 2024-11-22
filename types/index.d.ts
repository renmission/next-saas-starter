import { User } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";
import type { Icon } from "lucide-react";

import { Icons } from "@/components/shared/icons";

export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  mailSupport: string;
  links: {
    twitter: string;
    github: string;
  };
};

export type NavItem = {
  title: string;
  href: string;
  badge?: number;
  disabled?: boolean;
  external?: boolean;
  authorizeOnly?: UserRole;
  icon?: keyof typeof Icons;
};

export type MainNavItem = NavItem;

export type MarketingConfig = {
  mainNav: MainNavItem[];
};

export type SidebarNavItem = {
  title: string;
  items: NavItem[];
  authorizeOnly?: UserRole;
  icon?: keyof typeof Icons;
};

export type DocsConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};

// subcriptions
export type SubscriptionPlan = {
  title: string;
  description: string;
  benefits: string[];
  limitations: string[];
  prices: {
    monthly: number;
    yearly: number;
  };
  stripeIds: {
    monthly: string | null;
    yearly: string | null;
  };
};

export type UserSubscriptionPlan = SubscriptionPlan &
  Pick<User, "stripeCustomerId" | "stripeSubscriptionId" | "stripePriceId"> & {
    stripeCurrentPeriodEnd: number;
    isPaid: boolean;
    interval: "month" | "year" | null;
    isCanceled?: boolean;
  };

// compare plans
export type ColumnType = string | boolean | null;
export type PlansRow = { feature: string; tooltip?: string } & {
  [key in (typeof plansColumns)[number]]: ColumnType;
};

// landing sections
export type InfoList = {
  icon: keyof typeof Icons;
  title: string;
  description: string;
};

export type InfoLdg = {
  title: string;
  image: string;
  description: string;
  list: InfoList[];
};

export type FeatureLdg = {
  title: string;
  description: string;
  link: string;
  icon: keyof typeof Icons;
};

export type TestimonialType = {
  name: string;
  job: string;
  image: string;
  review: string;
};

export type Client = {
  id: string;
  name: string;
  status: string;
  priority: string;
  createdAt: string | number | Date;
  invitationAccepted?: boolean;
  invitationSent?: boolean;
  // amount: number;
};

export interface Form {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  businessId: string;
  creator: {
    email: string | null;
    name: string | null;
  };
}
export enum TrustType {
  NEVADA_DYNASTY_TRUST = "Nevada Dynasty Trust",
  NEVADA_ASSET_PROTECTION_TRUST = "Nevada Asset Protection Trust",
}
export interface Trust {
  id: string;
  name: string;
  type: string;
  documents?: JsonValue;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  // clientId?: string;
  businessId: string;
  professional: {
    email: string | null;
    name: string | null;
  };
}

export interface FormField {
  name: string;
  label: string;
  type:
    | "text"
    | "number"
    | "email"
    | "password"
    | "select"
    | "checkbox"
    | "textarea";
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
}

export interface FormStep {
  title: string;
  description?: string;
  fields: FormField[];
}

export interface MultiStepFormProps {
  steps: FormStep[];
  onSubmit: (data: Record<string, any>) => void;
}

export enum TrustStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  ARCHIVED = "ARCHIVED",
  COMPLETED = "COMPLETED",
}
