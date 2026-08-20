export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role?: "Owner" | "Co-Admin" | "Member" | "Viewer";
}

export type TripStatus =
  "Draft" | "Planning" | "Active" | "Completed" | "Archived";

export interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  coverImage?: string;
  status: TripStatus;
  membersCount: number;
  totalBudget?: number;
}

export interface Expense {
  id: string;
  tripId: string;
  title: string;
  amount: number;
  currency: string;
  payerId: string;
  payerName: string;
  category:
    | "Accommodation"
    | "Food"
    | "Transport"
    | "Tickets"
    | "Activities"
    | "Shopping"
    | "Fuel"
    | "Miscellaneous";
  date: string;
}
