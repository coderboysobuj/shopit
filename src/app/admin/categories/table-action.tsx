"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";
import { Category } from "@prisma/client";
import { DeleteIcon, EditIcon, MoreHorizontal } from "lucide-react";

export default function TableAction({ category }: { category: Category }) {
  const { onOpen } = useModal();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => onOpen("deleteCategory", { category })}
          className="flex items-center gap-2"
        >
          Delete
          <DeleteIcon className="h-4 w-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onOpen("editCategory", { category })}
          className="flex items-center gap-2"
        >
          Edit
          <EditIcon className="h-4 w-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
