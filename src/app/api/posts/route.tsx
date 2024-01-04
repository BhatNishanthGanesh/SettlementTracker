import prisma from '@/app/libs/db'
import { NextResponse,NextRequest } from 'next/server'


export const POST = async(request:Request)=>{
    try{
        const body=await request.json()
    const {name,expense,spent,recieved}=body
    const posts=await prisma.user.create({
      data:{
        name,
        expense,
        spent,
        recieved
      }
    })
    return NextResponse.json(posts)
    }catch(err){
        return NextResponse.json({message:"Error",err})
    }
  
}

export const GET = async()=>{
    try{
        const getpost=await prisma.user.findMany()
        return NextResponse.json(getpost)
    }catch(err){
        return NextResponse.json({message:"Error",err},{status:500})
    }

}

