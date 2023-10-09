"use client";
import { useState, useEffect } from "react";
import { DeleteCategoryModal } from "./modals/delete-category-modal";
import { CategoryFormModal } from "./modals/category-form-modal";
export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return (
    <>
      <DeleteCategoryModal />
      <CategoryFormModal />
    </>
  );
};
