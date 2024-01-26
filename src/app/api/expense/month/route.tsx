// import prisma from "@/app/libs/db";

// export const getMonthAndYearFromDate = (createdAt: any) => {
//   const date = new Date(createdAt);
//   const year = date.getFullYear();
//   const month = date.getMonth() + 1; // Months are zero-based, so we add 1
//   return { year, month };
// };

// interface CategorizedExpenses {
//   [monthYear: string]: any[]; // Define an index signature with string keys
// }

// function isValidDate(d: Date) {
//   return !isNaN(d.getTime());
// }

// export const GET = async (request: any) => {
//   try {
//     // const date = new Date(expenses[0].createdAt);  // Assuming you need the first expense's date
//     // const year = date.getFullYear();
//     // const month = date.getMonth() + 1;  // Months are 0-indexed
//     // const { year, month } = request.params;
    
//       console.log(request.nextUrl.searchParams.get("year"))
//       console.log(request.nextUrl.searchParams.get("month"))
//     // console.log(request);

//     // function to convert year and month to 2024-01-01T11:39:23.606Z

//     // console.log("Year:", year);
//     // console.log("Month:", month);

//     // const paddedMonth = month.toString().padStart(2, '0');

// // Create a date string in the format "YYYY-MM-01T00:00:00.000Z"
// // const dateString = `${year}-${paddedMonth}-01T00:00:00.000Z`;

// // console.log("Generated Date String:", dateString);

// const expenses = await prisma.expense.findMany({
//   // where: {
//     // createdAt: dateString,
//     // createdAt:
//   // },
// });

//     // const expenses = await prisma.expense.findMany({
//     //   where: {
//     //     createdAt: "2024-01-01T11:39:23.606Z",// enter it here
//     //   },
//     // });

//     // Categorize expenses by month and year
//     // const categorizedExpenses: CategorizedExpenses = {};
//     // expenses.forEach((expense) => {
//     //   const { year, month } = getMonthAndYearFromDate(expense.createdAt);
//     //   const monthYearKey = `${year}-${month}`;

//     //   if (!categorizedExpenses[monthYearKey]) {
//     //     categorizedExpenses[monthYearKey] = [];
//     //   }

//     //   categorizedExpenses[monthYearKey].push(expense);
//     // });

//     return new Response(JSON.stringify(expenses), { status: 200 });
//   } catch (err) {
//     console.error(err);
//     return new Response("Error occurred", { status: 500 });
//   }
// };

// // src/app/api/expense/month/[month]/route.tsx

// // import { GET } from '@/app/utils/api';  // Import the appropriate functions from your utility file
// // import prisma from "@/app/libs/db";

// // export const getMonthAndYearFromDate = (createdAt: any) => {
// //     const date = new Date(createdAt);
// //     const year = date.getFullYear();
// //     const month = date.getMonth() + 1; // Months are zero-based, so we add 1
// //     return { year, month };
// //   };

// // interface CategorizedExpenses {
// //   [monthYear: string]: any[]; // Define an index signature with string keys
// // }

// // export default GET(async (request) => {
// //   try {
// //     const { month } = request.params;  // Extract the 'month' parameter from request.params
// //     const year = new Date().getFullYear();  // You might want to adjust how you get the year

// //     const expenses = await prisma.expense.findMany();

// //     // Categorize expenses by month and year
// //     const categorizedExpenses: CategorizedExpenses = {};
// //     expenses.forEach((expense:any) => {
// //       const { year: expenseYear, month: expenseMonth } = getMonthAndYearFromDate(expense.createdAt);
// //       const monthYearKey = `${expenseYear}-${expenseMonth}`;

// //       if (!categorizedExpenses[monthYearKey]) {
// //         categorizedExpenses[monthYearKey] = [];
// //       }

// //       categorizedExpenses[monthYearKey].push(expense);
// //     });

// //     return new Response(JSON.stringify(categorizedExpenses), { status: 200 });
// //   } catch (err) {
// //     console.error(err);
// //     return new Response('Error occurred', { status: 500 });
// //   }
// // });


// import prisma from "@/app/libs/db";

// export const getMonthAndYearFromDate = (createdAt: any) => {
//   const date = new Date(createdAt);
//   const year = date.getFullYear();
//   const month = date.getMonth() + 1; // Months are zero-based, so we add 1
//   return { year, month };
// };

// export const GET = async (request: any) => {
//   try {
//     // const { month, year } = request.params;
//      const month=request.nextUrl.searchParams.get("month")
//     const year=request.nextUrl.searchParams.get("year")
    
//     // Validate month and year parameters
//     if (!month || !year || isNaN(parseInt(month)) || isNaN(parseInt(year))) {
//       return new Response("Invalid parameters", { status: 400 });
//     }

//     // Ensure month is zero-padded (e.g., "01" for January)
//     const paddedMonth = month.padStart(2, '0');

//     // Create a date string in the format "YYYY-MM-01T00:00:00.000Z"
//     const startDateString = `${year}-${paddedMonth}-01T00:00:00.000Z`;

//     const expenses = await prisma.expense.findMany({
//       where: {
//         createdAt: {
//           gte: new Date(startDateString), // Find expenses on or after the first day of the specified month
//           lt: new Date(`${year}-${parseInt(month) + 1}-01T00:00:00.000Z`), // Find expenses before the first day of the next month
//         },
//       },
//     });

//     return new Response(JSON.stringify(expenses), { status: 200 });
//   } catch (err) {
//     console.error(err);
//     return new Response("Error occurred", { status: 500 });
//   }
// };


import prisma from "@/app/libs/db";

export const GET = async (request: any) => {
  try {
    const month = request.nextUrl.searchParams.get("month");
    const year = request.nextUrl.searchParams.get("year");

    // Validate month and year parameters
    if (!month || !year || isNaN(parseInt(month)) || isNaN(parseInt(year))) {
      return new Response("Invalid parameters", { status: 400 });
    }

    const paddedMonth = month.padStart(2, '0');
    const startDateString = `${year}-${paddedMonth}-01T00:00:00.000Z`;
    const startDate = new Date(startDateString);


    const expenses = await prisma.expense.findMany({
      where: {
        createdAt: {
          gte: startDate,
          // lt: new Date(`${year}-${parseInt(month) + 1}-01T00:00:00.000Z`),
          lt: new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1), // Find expenses before the first day of the next month
        },
      },
    });

    // Categorize expenses by month and year (optional, if applicable)
    // ...

    return new Response(JSON.stringify(expenses), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Error occurred", { status: 500 });
  }
};
