import prisma from '@/app/libs/db'
import { NextResponse } from 'next/server'

export const GET=async(request:any,{params}:any)=>{
    const {id}=params
    
    const post = await prisma.expense.findUnique({
        where:{
            id
        }
    })
    if(!post){
        return NextResponse.json({message:"GET ERROR"},{status:404})
    }
    return NextResponse.json(post)
}

export const PATCH =async(request:any,{params}:any)=>{
    try{
        const body = await request.json()
        const {name,description,spent}=body
        const {id}=params
        const updateposts = await prisma.expense.update({
            where:{
                id
            },
            data:{
                name,
                description,
                spent,
            }
        })
        if(!updateposts){
            return NextResponse.json({message:"Error"},{status:404})
        }
        return NextResponse.json(updateposts)
    }catch(err){
        return NextResponse.json({message:"Updation error",err},{status:500})
    }
   
}

export const DELETE=async(request:any,{params}:any)=>{
    try{
     const {id}=params
     await prisma.expense.delete({
        where:{
            id
        }
     })
     return NextResponse.json({message:"Deleted success"})
    }catch(err){
        return NextResponse.json({message:"Error",err},{status:500})
    }
}