'use server'

import { createCart, getCart } from "@/lib/cart";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function setProductQuantity(productId: string, quantity: number) {

  const cart = (await getCart()) ?? (await createCart());
  const articleInCart = cart.items.find(item => item.productId === productId)

  if (articleInCart) {
    if (quantity === 0) {

      await db.cart.update({
        where: {
          id: cart.id,
        },
        data: {
          items: {
            delete: {
              id: articleInCart.id
            }
          }
        }
      });

    } else {

      await db.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            update: {
              where: {
                id: articleInCart.id
              },
              data: {
                quantity
              }
            }
          }
        }
      })

    }
  } else {
    if (quantity > 0) {
      await db.cart.update({
        where: {
          id: cart.id
        },
        data: {
          items: {
            create: {
              productId,
              quantity
            }
          }
        }
      })
    }
  }

  revalidatePath('/cart')

}
