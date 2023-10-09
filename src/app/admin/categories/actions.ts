"use server";
import * as z from "zod";
import { categorySchema } from "@/validator/schema";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createCategory(data: z.infer<typeof categorySchema>) {
  const validationResult = categorySchema.safeParse(data);
  if (!validationResult.success) {
    throw new Error("Invalid Input");
  }

  const category = await db.category.create({
    data,
  });

  if (!category) {
    throw new Error("Something went wrong");
  }
  revalidatePath("/admin/categories");
}

export async function deleteCategory(id: string) {
  await db.category.delete({
    where: { id },
  });

  revalidatePath("/admin/categories");
}

export async function updateCategory({
  data,
  id,
}: {
  id: string;
  data: z.infer<typeof categorySchema>;
}) {
  const validationResult = categorySchema.safeParse(data);
  if (!validationResult.success) {
    throw new Error("Invalid Input");
  }

  const category = await db.category.update({
    where: {
      id,
    },
    data,
  });

  if (!category) {
    throw new Error("Invalid ID");
  }
  revalidatePath("/admin/categories");
}
