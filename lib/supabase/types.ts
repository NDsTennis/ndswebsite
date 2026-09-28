export type ReviewStatus = "pending" | "approved" | "rejected";

export interface ReviewRow {
  id: string;
  display_name: string;
  rating: number;
  message: string;
  status: ReviewStatus;
  language: string | null;
  source: string | null;
  created_at: string;
  updated_at: string;
}

export interface InquiryRow {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  intent: string;
  message: string;
  consent: boolean;
  language: string | null;
  created_at: string;
}
