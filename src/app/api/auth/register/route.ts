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

// import prisma from '@/app/libs/db'
// import { NextResponse,NextRequest } from 'next/server'


// export const POST = async(request:Request)=>{
//     try{
//     const body=await request.json()
//     const {email,password}=body
//     const posts=await prisma.register.create({
//       data:{
//         email,
//         password
//       }
//     })
//     return NextResponse.json(posts)
//     }catch(err){
//         return NextResponse.json({message:"Error",err})
//     }
  
// }

// export const GET = async()=>{
//     try{
//         const getpost=await prisma.register.findMany()
//         return NextResponse.json(getpost)
//     }catch(err){
//         return NextResponse.json({message:"Error",err},{status:500})
//     }

// }

// import { NextResponse } from "next/server"
// import { connectToDb } from "../../../../helpers/server-helpers"
// import prisma from '@/app/libs/db'
// import bcrypt from 'bcrypt'

// export const POST = async(req:Request)=>{
//    try{
//      const {email,name,password}=await req.json()
     
//      if(!name || !email || !password){
//         return NextResponse.json({message:"Inavalid data"},{status:422})
//     }
//     const hashedpassword=await bcrypt.hash(password,10)
//     await connectToDb()
//     const user=await prisma.register.create({
//         //@ts-ignore
//       data:{email,name,password:hashedpassword},
//     })
//     return NextResponse.json({user},{status:201})
//    }catch(error){ 
//     console.log(error);

//     return NextResponse.json({message:"Error"},{status:500})
    
//    }finally{
//       await prisma.$disconnect()
//    }

// }
import prisma from '@/app/libs/db';
import { connectToDb } from "../../../../helpers/server-helpers";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (request:Request) => {
  const { name, email, password } = await request.json();

  await connectToDb();

    // Check if the user already exists
    const existingUser = await prisma.register.findUnique({ where: { email } });

    if (existingUser) {
      return new NextResponse("Email is already in use", { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 5);

    // Create a new user using Prisma
    const newUser = await prisma.register.create({
        //@ts-ignore
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    try{
    return new NextResponse("User is registered", { status: 201 }); // Use 201 for resource creation
  } catch (error) {
    // @ts-ignore
    return new NextResponse(error.message || "Internal Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
