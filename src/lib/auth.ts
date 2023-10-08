import { getServerSession, type AuthOptions } from 'next-auth'
import { compare } from 'bcrypt';
import { db } from './db';

import CredentialsProvider from 'next-auth/providers/credentials'
import { mergeAnonymousCartIntoUserCart } from './cart';

export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string,
          password: string
        }


        const user = await db.user.findUnique({
          where: {
            email
          }
        });
        if (!user) {
          throw new Error("Email or password invalid")
        }

        const matchPassword = await compare(password, user.password);

        if (!matchPassword) {
          throw new Error("Email or password invalid")
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user?.image,
          role: user.role
        }
      }
    })
  ],

  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
          email: user.email,
          role: user.role

        }
      }

      return token;

    },
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          email: token.email,
          role: token.role

        }
      }
    }
  },

  events: {
    async signIn({ user }) {
      await mergeAnonymousCartIntoUserCart(user.id)
    }
  }

}


export async function getAuthSesssion() {
  return await getServerSession(authOptions);
}
