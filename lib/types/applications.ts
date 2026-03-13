export type ApplicationStatus =
  | "researching"
  | "preparing"
  | "submitted"
  | "under-review"
  | "approved"
  | "denied";

export interface GrantApplication {
  id: string;
  grantId: string;
  grantName: string;
  agency: string;
  agencyInitials: string;
  status: ApplicationStatus;
  amountRequested: number; // cents
  deadline: string; // ISO date
  submittedDate: string | null;
  lastUpdated: string; // ISO date
  notes: string;
  documentsUploaded: number;
  documentsRequired: number;
  nextStep: string;
  completionPercentage: number; // 0-100
}
