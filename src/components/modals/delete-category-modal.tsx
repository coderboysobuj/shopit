"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { useModal } from "@/hooks/use-modal-store";
import toast from "react-hot-toast";
import { useTransition } from "react";
import { deleteCategory } from "@/app/admin/categories/actions";

export const DeleteCategoryModal = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { category },
  } = useModal();
  const [isPending, startTransition] = useTransition();

  const isModalOpen = isOpen && type === "deleteCategory";

  if (!category) return null;

  const onDelete = () => {
    startTransition(async () => {
      try {
        await deleteCategory(category.id);
        toast.success("Category deleted!");
        onClose();
      } catch (error) {
        toast.error("something went wrong.");
      }
    });
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Category</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-bold text-indigo-500 mr-2">
              {category?.name}.
            </span>
            <span className="font-semibold text-red-500">
              This action also delete products for this category.
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button disabled={isPending} onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button
            autoFocus
            variant="destructive"
            disabled={isPending}
            onClick={onDelete}
          >
            Delete Category
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
