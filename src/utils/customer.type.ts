export interface CustomerProps {
  id: string;
  name: string;
  phone: string;
  email: string;
  created_at: Date | null;
  updated_at: Date | null;
  address: string | null;
  userId: string | null;
}