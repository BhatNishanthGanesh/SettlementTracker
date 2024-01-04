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

// export const GET = async (request: any, { params }: any) => {
//     try {
//         const { id } = params; // Extract 'id' and 'date' from params
//         const {createdAt} = request.query;
        
//         if (id) {
//             // Fetch a single expense by ID
//             const post = await prisma.expense.findUnique({
//                 where: {
//                     id,
//                 },
//             });

//             if (!post) {
//                 return NextResponse.json({ message: "Expense not found" }, { status: 404 });
//             }

//             return NextResponse.json(post);
//         } else if (createdAt) {
//             // Fetch expenses based on date
//     //         const startDate = new Date(createdAt);
//     //         const endDate = new Date(createdAt);
//     //         endDate.setDate(endDate.getDate() + 1); // Considering a single day range

//     //         const expenses = await prisma.expense.findMany({
//     //             where: {
//     //                 createdAt: {
//     //                     gte: startDate,
//     //                     lt: endDate,
//     //                     // equals: new Date(createdAt),
//     //                 },
//     //             },
//     //         });

//     //         if (expenses.length === 0) {
//     //             return NextResponse.json({ message: "No expenses found for this date" }, { status: 404 });
//     //         }

//     //         return NextResponse.json(expenses);
//     //     } else {
//     //         return NextResponse.json({ message: "Invalid request" }, { status: 400 });
//     //     }
//     // } catch (err) {
//     //     return NextResponse.json({ message: "Error", err }, { status: 500 });
//     // }
//           // Extract 'createdAt' from query parameters
        
//         if (!createdAt) {
//             return NextResponse.json({ message: "Date parameter is missing" }, { status: 400 });
//         }

//         // Convert the provided date to a Date object
//         const targetDate = new Date(createdAt);

//         // Get the start and end time for the provided date
//         const startDate = new Date(targetDate);
//         startDate.setUTCHours(0, 0, 0, 0); // Set time to start of the day

//         const endDate = new Date(targetDate);
//         endDate.setUTCHours(23, 59, 59, 999); // Set time to end of the day

//         // Fetch expenses for the specific day
//         const expenses = await prisma.expense.findMany({
//             where: {
//                 createdAt: {
//                     gte: startDate,
//                     lte: endDate,
//                 },
//             },
//         });

//         if (expenses.length === 0) {
//             return NextResponse.json({ message: "No expenses found for this date" }, { status: 404 });
//         }

//         return NextResponse.json(expenses);
//     } 
// }catch (err) {
//     return NextResponse.json({ message: "Error", err }, { status: 500 });
// }
// }

// export const GET = async (request: any, { params }: any) => {
//     try {
//         const { id: expenseId } = params; // Extract 'id' from params and rename it to 'expenseId'
//         // const { createdAt: requestedDate } = request.query; 
//         if (expenseId) {
//             // Fetch a single expense by ID
//             const post = await prisma.expense.findUnique({
//                 where: {
//                     id:expenseId,
//                 },
//             });

//             if (!post) {
//                 return NextResponse.json({ message: "Expense not found" }, { status: 404 });
//             }

//             return NextResponse.json(post);
//         } else {
//             const { createdAt: requestedDate } = request.query; 
            
//             // Convert the provided date to a string
//             // const targetDate = createdAt.toString();
//             const targetDate = new Date(requestedDate.toString());

//             // Check if the provided date is valid
//             if (isNaN(targetDate.getTime())) {
//                 return NextResponse.json({ message: "Invalid date format" }, { status: 400 });
//             }

//             // Set the start and end date for the provided day
//             const startDate = new Date(targetDate.toISOString().split('T')[0]);
//             const endDate = new Date(startDate);
//             endDate.setDate(startDate.getDate() + 1); // Set the end date to the next day

//             // Fetch expenses for the specific day
//             const expenses = await prisma.expense.findMany({
//                 where: {
//                     AND: [
//                         {
//                             createdAt: {
//                                 gte: startDate.toISOString(),
//                             },
//                         },
//                         {
//                             createdAt: {
//                                 lt: endDate.toISOString(),
//                             },
//                         },
//                     ],
//                 },
//             });

//             if (expenses.length === 0) {
//                 return NextResponse.json({ message: "No expenses found for this date" }, { status: 404 });
//             }

//             return NextResponse.json(expenses);
//         } 
//     } catch (err) {
//         return NextResponse.json({ message: "Error", err }, { status: 500 });
//     }
// };


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