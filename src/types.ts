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

export interface Artifact {
  id: string;
  collectionNumber: string;
  accessionNumber: string;
  collectionDate: string; // YYYY-MM-DD
  contributorName: string;
  objectType: string; // e.g., Photograph, Document, Weapon, Clothing
  objectHead: string; // Title or brief description
  description: string;
  measurement: string; // e.g., "8 x 10 inches", "1.5 meters"
  images: string[]; // URLs or paths to images
  galleryNumber: string;
  foundPlace: string;
  significanceComment: string;
  dateCreated: string; // ISO date string
  tags: string[]; // e.g., "1971", "Mukti Bahini", "Historic Document"
  isPublic: boolean;
}

export interface NewsArticle {
  id: string;
  title: string;
  imageUrl: string;
  date: string;
  author: string;
  summary: string;
  content: string;
  tags: string[];
}

// Avoid using the global DOM Event name; use MuseumEvent for app events
export interface MuseumEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm (24h)
  location: string;
  type: string; // e.g., "Exhibitions", "Workshops & Talks", etc.
  description: string;
  imageUrl?: string;
  dateCreated: string; // ISO date string
}

export type CompetitionLevel = 'district' | 'division' | 'national';
export type CompetitionStatus = 'draft' | 'open' | 'closed' | 'judging' | 'completed' | 'upcoming';
export type CompetitionType = 'essay' | 'art' | 'photography' | 'poem-writing' | 'singing' | 'debate' | 'quiz';

export interface Competition {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  level: CompetitionLevel;
  type: CompetitionType;
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
