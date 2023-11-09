// pages/api/auth/[...nextauth].ts
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
    session: async (session, token) => {
      if (token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};

const NextAuthHandler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions);
export default NextAuthHandler;
