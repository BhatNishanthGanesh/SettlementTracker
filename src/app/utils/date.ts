export const getMonthAndYearFromDate = (createdAt: any) => {
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based, so we add 1
    return { year, month };
  };