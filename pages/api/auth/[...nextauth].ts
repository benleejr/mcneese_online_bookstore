// pages/api/auth/[...nextauth].ts
import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import prisma from '../../../lib/prisma';  

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  adapter: PrismaAdapter(prisma),

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    session: async ({ session, user }) => {
      if (user?.id) {
        session.user.id = user.id;
      }
      return Promise.resolve(session);
    },
  },
};

const NextAuthHandler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions);
export default NextAuthHandler;
