"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "@/components/shared/data-tables";

import { Badge } from "../ui/badge";

// This type should match your data structure
type Transaction = {
  id: string;
  name: string;
  status: "todo" | "pending" | "in progress" | "done";
  label: string;
  priority: "low" | "medium" | "high";
};

const columns: ColumnDef<Transaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant="outline"
          className={cn("capitalize", {
            "bg-green-100 text-green-800": status === "done",
            "bg-yellow-100 text-yellow-800": status === "in progress",
            "bg-blue-100 text-blue-800": status === "todo",
            "bg-gray-100 text-gray-800": status === "pending",
          })}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority") as string;
      return (
        <Badge
          variant="outline"
          className={cn("capitalize", {
            "bg-red-100 text-red-800": priority === "high",
            "bg-yellow-100 text-yellow-800": priority === "medium",
            "bg-green-100 text-green-800": priority === "low",
          })}
        >
          {priority}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const transaction = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(transaction.id)}
            >
              Copy transaction ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const data: Transaction[] = [
  {
    id: "728ed52f",
    name: "John Doe",
    status: "todo",
    label: "Feature",
    priority: "high",
  },
  {
    id: "489e1d42",
    name: "Jane Smith",
    status: "in progress",
    label: "Bug",
    priority: "medium",
  },
  {
    id: "a7c31ef8",
    name: "Alice Johnson",
    status: "done",
    label: "Enhancement",
    priority: "low",
  },
  {
    id: "b9d24f13",
    name: "Bob Wilson",
    status: "pending",
    label: "Feature",
    priority: "high",
  },
  {
    id: "c5e76g29",
    name: "Carol Brown",
    status: "in progress",
    label: "Bug",
    priority: "high",
  },
  {
    id: "d2f89h35",
    name: "David Lee",
    status: "todo",
    label: "Feature",
    priority: "medium",
  },
  {
    id: "e1i57j42",
    name: "Eva Garcia",
    status: "done",
    label: "Enhancement",
    priority: "low",
  },
  {
    id: "f8k63l78",
    name: "Frank Miller",
    status: "pending",
    label: "Bug",
    priority: "high",
  },
  {
    id: "g4m91n56",
    name: "Grace Taylor",
    status: "in progress",
    label: "Feature",
    priority: "medium",
  },
  {
    id: "h6o25p84",
    name: "Henry Anderson",
    status: "todo",
    label: "Enhancement",
    priority: "low",
  },
];

export function TransactionsTable() {
  return <DataTable columns={columns} data={data} />;
}
