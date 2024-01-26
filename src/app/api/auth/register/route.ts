// import bcrypt from 'bcrypt';
// import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '@/lib/prismadb';
// import { z } from 'zod';
// import { Resend } from 'resend';
// import { EmailTemplate } from '@/components/emails/welcome-email';
// import { NextResponse } from 'next/server';
// import { KoalaWelcomeEmail } from '@/email/welcome-email';
// const resend = new Resend(process.env.RESEND_EMAIL_API_KEY);

// export async function POST(request: Request) {
//     const body = await request.json()
//     const { email, username, name, password } = body
//     const hashedPassword = await bcrypt.hash(password, 12);
//     const user = await prisma.user.create({
//         data: {
//             email,
//             username,
//             name,
//             hashedPassword,
//         },
//     });
//     const sendWelcomeEmail = await resend.emails.send({
//         from: 'onboarding@resend.dev',
//         to: ['tejgankri@outlook.com'],
//         subject: 'Hello world',
//         react: KoalaWelcomeEmail({ userFirstname: 'John' }),
//         text: 'hello',
//     });

//     console.log(sendWelcomeEmail);

//     return new Response(JSON.stringify({user,sendWelcomeEmail}), {
//         headers: { 'Content-Type': 'application/json' },
//     });
// }

import prisma from '@/app/libs/db'
import { NextResponse,NextRequest } from 'next/server'


export const POST = async(request:Request)=>{
    try{
    const body=await request.json()
    const {email,password}=body
    const posts=await prisma.register.create({
      data:{
        email,
        password
      }
    })
    return NextResponse.json(posts)
    }catch(err){
        return NextResponse.json({message:"Error",err})
    }
  
}

export const GET = async()=>{
    try{
        const getpost=await prisma.register.findMany()
        return NextResponse.json(getpost)
    }catch(err){
        return NextResponse.json({message:"Error",err},{status:500})
    }

}

