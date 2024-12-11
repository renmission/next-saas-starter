"use client";

import * as React from "react";
import Link from "next/link";
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
import { Icons } from "@/components/shared/icons";

import { useDeleteClientModal } from "../modals/business/delete-client-modal";
import { Badge } from "../ui/badge";

// This type should match your data structure
type Client = {
  id: string;
  name: string;
  status: string;
  priority: string;
  createdAt: string | number | Date;
};

const ActionsCell = ({ client }: { client: Client }) => {
  const { DeleteClientModal, setShowDeleteClientModal, setClientToDelete } =
    useDeleteClientModal();

  return (
    <>
      <DeleteClientModal />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(client.id)}
          >
            Copy client ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/business/clients/${client.id}`}>
              View client
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/business/clients/${client.id}/payment`}>
              View payment details
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setClientToDelete({ id: client.id, name: client.name });
              setShowDeleteClientModal(true);
            }}
            className="text-red-600 focus:text-red-600"
          >
            <Icons.trash className="mr-2 size-4" />
            Delete Client
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

const columns: ColumnDef<Client>[] = [
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
          className="w-full"
        >
          Name
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const client = row.original;
      return (
        <Link href={`/dashboard/business/${client.id}`}>
          <div className="text-center capitalize">{row.getValue("name")}</div>
        </Link>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full"
        >
          Status
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <div className="text-center">
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
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full"
        >
          Created At
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return <div className="text-center">{date.toLocaleDateString()}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const client = row.original;
      return <ActionsCell client={client} />;
    },
  },
];

type ClientsTableProps = {
  initialData: Client[];
};

export function ClientsTable({ initialData }: ClientsTableProps) {
  return <DataTable columns={columns} data={initialData} />;
}
