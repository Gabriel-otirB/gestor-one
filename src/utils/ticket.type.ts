export interface TicketProps {
  id: string;
  name: string;
  status: string;
  description: string;
  customerId: string | null;
  userId: string | null;
}