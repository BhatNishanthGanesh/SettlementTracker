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

// In your API route file (e.g., pages/api/expense/day/[date].js)



// export const GET = async(req: NextRequest, res: NextResponse)=>{
//     try {
//         // @ts-ignore
//         const { createdAt } = req.query;
//         if (!createdAt) {
//         //   return NextResponse.json({ message: 'Date parameter is missing' });
//         const getpost=await prisma.expense.findMany()
//                 return NextResponse.json(getpost)
//         }
    
//         // Convert the provided date to a string
//         const targetDate = new Date(createdAt.toString());
    
//         // Check if the date format is invalid
//         if (isNaN(targetDate.getTime())) {
//           return NextResponse.json({ message: 'Invalid date format' });
//         }
    
//         const startDate = new Date(targetDate.toISOString().split('T')[0]);
//         const endDate = new Date(startDate);
//         endDate.setDate(startDate.getDate() + 1); // Set the end date to the next day
    
//         const expenses = await prisma.expense.findMany({
//           where: {
//                   createdAt: {
//                     gte: startDate.toISOString(),
//                     lt: endDate.toISOString(),
//                   },
//           },
//         });
    
//         if (expenses.length === 0) {
//           return NextResponse.json({ message: 'No expenses found for this date' });
//         }
    
//         return NextResponse.json(expenses);
//       } catch (error) {
//         return NextResponse.json({ message: 'Error fetching expenses', err: error });
//       }
// }



// export const GET = async (request: any) => {
//     try {
//         const { createdAt } = request.query || [];
//         console.log(createdAt);
        

//         // Fetch all posts
//         const allPosts = await prisma.expense.findMany();

//         if (!createdAt) {
//             return NextResponse.json({ message: "Date parameter is missing" }, { status: 400 });
//         }

//         // Convert the provided date to a string
//         const targetDate = new Date(createdAt.toString());

//         // Filter posts by date
//         const postsOnRequestedDate = allPosts.filter((post: any) => {
//             const postDate = new Date(post.createdAt);
//             return postDate.toISOString().split('T')[0] === targetDate.toISOString().split('T')[0];
//         });

//         if (postsOnRequestedDate.length === 0) {
//             return NextResponse.json({ message: "No posts found for this date" }, { status: 404 });
//         }

//         return NextResponse.json(postsOnRequestedDate);
//     } catch (err) {
//         return NextResponse.json({ message: "Error", err }, { status: 500 });
//     }
// };





// export const GET = async (request: any) => {
//     try {
//         const { createdAt } = request.query;

//         if (createdAt) {
//             // If createdAt is not provided, fetch all expenses
//             const getpost = await prisma.expense.findMany();
//             return NextResponse.json(getpost);
//         } else {
//             // Convert the provided date to a string
//             const targetDate = new Date(createdAt.toString());

//             // Check if the date format is invalid
//             if (isNaN(targetDate.getTime())) {
//                 return NextResponse.json({ message: "Invalid date format" }, { status: 400 });
//             }

//             const startDate = new Date(targetDate.toISOString().split('T')[0]);
//             const endDate = new Date(startDate);
//             endDate.setDate(startDate.getDate() + 1); // Set the end date to the next day

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
