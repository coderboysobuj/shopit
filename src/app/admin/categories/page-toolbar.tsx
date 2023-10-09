"use client";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { PlusIcon } from "lucide-react";

export default function PageToolbar() {
  const { onOpen } = useModal();
  return (
    <Button onClick={() => onOpen("createCategory")}>
      <PlusIcon className="h-4 w-4 mr-2" />
      Create a Category
    </Button>
  );
}
