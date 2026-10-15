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
  inquiry_type: string;
  message: string;
  privacy_consent: boolean;
  language: string | null;
  status: string;
  created_at: string;
}
