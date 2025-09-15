export interface Exhibition {
  id: string;
  title: string;
  description: string;
  curatorNote: string;
  featuredImage: string;
  artifactCount: number;
  viewCount: number;
  featured: boolean;
  dateCreated: string;
}

export type CompetitionLevel = 'district' | 'division' | 'national';
export type CompetitionStatus = 'draft' | 'open' | 'closed' | 'judging' | 'completed';

export interface Competition {
  id: string;
  title: string;
  description: string;
  level: CompetitionLevel;
  eligibilityCriteria: string; // e.g., "Open to all Bangladeshi citizens aged 18-30"
  startDate: string; // ISO date string
  endDate: string; // ISO date string - submission deadline
  judgingCriteria: string;
  rewards: string;
  status: CompetitionStatus;
  adminUserId: string; // ID of the admin who created/manages this competition
  relatedExhibitionId?: string; // Optional: Link to an exhibition
  maxParticipants?: number; // Optional: Maximum number of participants
  nextCompetitionId?: string; // Optional: Link to the next level of competition
  dateCreated: string; // ISO date string
}

export type SubmissionStatus = 'submitted' | 'under_review' | 'qualified' | 'not_qualified' | 'winner';

export interface CompetitionSubmission {
  id: string;
  competitionId: string;
  userId: string; // ID of the user who submitted
  submissionDate: string; // ISO date string
  status: SubmissionStatus;
  score?: number; // Optional: Judge's score
  feedback?: string; // Optional: Judge's feedback
}
