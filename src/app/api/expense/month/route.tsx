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

    return new Response(JSON.stringify(expenses), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Error occurred", { status: 500 });
  }
};
