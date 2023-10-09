"use client";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";

import { useModal } from "@/hooks/use-modal-store";
import toast from "react-hot-toast";
import { useTransition } from "react";
import { createCategory, updateCategory } from "@/app/admin/categories/actions";
import { useForm } from "react-hook-form";
import { categorySchema } from "@/validator/schema";
import { zodResolver } from "@hookform/resolvers/zod";

type CategorySchemaType = z.infer<typeof categorySchema>;

export const CategoryFormModal = () => {
  const {
    isOpen,
    onClose,
    type,
    data: { category },
  } = useModal();
  const [isPending, startTransition] = useTransition();

  const isModalOpen =
    isOpen && (type === "createCategory" || type === "editCategory");

  const form = useForm<CategorySchemaType>({
    defaultValues: {
      name: "",
      description: "",
    },
    values: {
      name: category?.name ? category.name : "",
      description: category?.description ? category.description : "",
    },
    resolver: zodResolver(categorySchema),
  });

  function handleCreate(values: CategorySchemaType) {
    startTransition(async () => {
      try {
        await createCategory(values);
        form.reset();
        onClose();
        toast.success("Category Created!");
      } catch (error) {
        toast.error("Something went wrong");
      }
    });
  }

  function handleUpdate(values: CategorySchemaType) {
    startTransition(async () => {
      try {
        if (!category) return;
        await updateCategory({ id: category.id, data: values });
        onClose();
        form.reset();
        toast.success("Category Updated!");
      } catch (error) {
        toast.error("Something went wrong");
      }
    });
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(
            type === "createCategory" ? handleCreate : handleUpdate
          )}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {type === "createCategory"
                  ? "Create Category"
                  : "Edit Category"}
              </DialogTitle>
            </DialogHeader>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Category Name{" "}
                    <span className="text-sm text-rose-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripton (optional)</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                disabled={isPending}
                onClick={onClose}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                onClick={form.handleSubmit(
                  type === "createCategory" ? handleCreate : handleUpdate
                )}
                type="submit"
                autoFocus
                disabled={isPending}
              >
                {type === "createCategory"
                  ? "Create Category"
                  : "Edit Category"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
};
