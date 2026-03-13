export type DeadlineType =
  | "grant-deadline"
  | "tax-filing"
  | "application-due"
  | "review-date"
  | "report-due";

export type DeadlineUrgency = "urgent" | "soon" | "upcoming" | "future";

export interface DeadlineEvent {
  id: string;
  title: string;
  date: string; // ISO date
  type: DeadlineType;
  relatedId: string;
  relatedName: string;
  description: string;
  urgency: DeadlineUrgency;
}
