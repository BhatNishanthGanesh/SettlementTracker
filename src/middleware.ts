export { default } from "next-auth/middleware";

// to protect matching routes

export const config = {
  matcher: ["/", "/owes", "/pay", "/savings", "/calculator", "/expense","/expense/day","/monthlyexpenses"],
};
