import prisma from '@/app/libs/db'

export const connectToDb=async()=>{
    try{
        await prisma.$connect()
    }catch(error){
        console.log(error);
        throw new Error("Unable to connect to db")
    }

}