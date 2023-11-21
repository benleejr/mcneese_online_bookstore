import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

export default async function handle(req, res) {
  const { title, content } = req.body;
  
  const session = await getSession({ req: { headers: { cookie: req.headers.cookie || '' } } });

  if (session?.user?.email) {
    // Debug: Find user by email
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    
    if (!user) {
      return res.status(400).json({ error: 'No user found for this email' });
    }
    
    const result = await prisma.post.create({
      data: {
        title: title,
        content: content,
        author: { connect: { id: user.id } },  // Debug: Connect using ID
      },
    });
    res.json(result);
  } else {
    res.status(400).send("Session or email information is missing");
  }
}
