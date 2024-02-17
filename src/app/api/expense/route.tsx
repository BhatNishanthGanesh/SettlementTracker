import prisma from '@/app/libs/db'
import { NextResponse,NextRequest } from 'next/server'


export const POST = async(request:Request)=>{
    try{
    const body=await request.json()
    const {name,description,spent}=body
    const posts=await prisma.expense.create({
      data:{
        name,
        description,
        spent
      }
    })
    return NextResponse.json(posts)
    }catch(err){
        return NextResponse.json({message:"Error",err})
    }
  
}

export const GET = async()=>{
    try{
        const getpost=await prisma.expense.findMany()
        return NextResponse.json(getpost)
    }catch(err){
        return NextResponse.json({message:"Error",err},{status:500})
    }

}