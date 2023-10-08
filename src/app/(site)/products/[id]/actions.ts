'use server';

import { createCart, getCart } from "@/lib/cart";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";


export async function incrementProductQuantity(productId: string) {
  const cart = (await getCart()) ?? (await createCart());

  const articleInCart = cart.items.find(item => item.productId === productId)

  if (articleInCart) {
    await db.cart.update({
      where: {
        id: cart.id
      },
      data: {
        items: {
          update: {
            where: {
              id: articleInCart.id
            },
            data: {
              quantity: {
                increment: 1
              }
            }
          }
        }
      }
    })
  } else {
    await db.cart.update({
      where: {
        id: cart.id
      },
      data: {
        items: {
          create: {
            productId,
            quantity: 1
          }
        }
      }
    })
  }

  revalidatePath('/products/[id]')
}


