export interface TicketProps {
  id: string;
  name: string;
  status: string;
  description: string;
  customerId: string | null;
  userId: string | null;
  created_at: Date | null;
  updated_at: Date | null;
}