import prisma from "@/app/libs/db";

export const GET = async (request:any) => {
  try {
    const date = request.url.slice(request.url.lastIndexOf('/') + 1);
    const formattedDate = date.substring(0, 10); // Extract yyyy-mm-dd from the URL
    
    const expenses = await prisma.expense.findMany({
      where: {
        createdAt: {
          gte: new Date(formattedDate + 'T00:00:00.000Z'), // Start of the day
          lt: new Date(new Date(formattedDate).getTime() + 24 * 60 * 60 * 1000), // End of the day
        },
      },
    });

    return new Response(JSON.stringify(expenses), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response('Error occurred', { status: 500 });
  }
};
