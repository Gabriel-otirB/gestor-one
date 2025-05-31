export interface TicketProps {
  id: string;
  name: string;
  status: string;
  customerId: string | null;
  userId: string | null;
}