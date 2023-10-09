import * as z from "zod";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/lib/db";
import {
  categorySchema,
  productSchema,
  signUpSchema,
} from "@/validator/schema";
import { hash, genSalt } from "bcrypt";

export const appRouter = router({
  signUp: publicProcedure
    .input(
      z.object({
        name: z.string().min(2).max(50),
        email: z.string().email(),
        password: z.string().min(4).max(50),
      })
    )
    .mutation(async ({ input }) => {
      // validator user input
      const { success } = signUpSchema.safeParse(input);
      if (!success) {
        throw new TRPCError({ message: "Invalid Inputs", code: "BAD_REQUEST" });
      }

      // cheak user already exists with reqest email
      const userExists = await db.user.findFirst({
        where: {
          email: input.email,
        },
      });
      if (userExists) {
        throw new TRPCError({
          message: "Email address already exists",
          code: "BAD_REQUEST",
        });
      }

      // hash password

      const saltRounds = 10;
      const salt = await genSalt(saltRounds);

      const passwordHash = await hash(input.password, salt);

      const newUser = await db.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: passwordHash,
        },
      });

      return newUser;
    }),

  categoryGet: privateProcedure
    .input(z.object({ currentPage: z.string() }))
    .query(async ({ input }) => {
      const currentPage = parseInt(input.currentPage);
      const pageSize = 2;
      const totalItemCount = await db.category.count();
      const totalPages = Math.ceil(totalItemCount / pageSize);

      const categories = await db.category.findMany({
        skip: (currentPage - 1) * pageSize,
        take: pageSize,
        orderBy: {
          createdAt: "desc",
        },
      });

      return {
        totalPages,
        categories,
      };
    }),

  categoryStore: privateProcedure
    .input(categorySchema)
    .mutation(async ({ input, ctx }) => {
      const validationResult = categorySchema.safeParse(input);
      if (!validationResult.success) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid Inputs" });
      }

      const category = await db.category.create({
        data: input,
      });

      if (!category) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
      return category;
    }),

  productStore: privateProcedure
    .input(productSchema)
    .mutation(async ({ input, ctx }) => {
      const validationResult = productSchema.safeParse(input);
      if (!validationResult.success) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid Inputs" });
      }

      const product = await db.product.create({
        data: {
          ...input,
          userId: ctx.userId,
          price: parseInt(input.price),
        },
      });

      if (!product) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
      return product;
    }),
});

export type AppRouter = typeof appRouter;
