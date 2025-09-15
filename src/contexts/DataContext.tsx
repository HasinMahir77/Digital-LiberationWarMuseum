import React, { createContext, useContext, useState } from 'react';
import { Artifact, Competition, CompetitionSubmission, CompetitionStatus, SubmissionStatus } from '../types';

export interface Artifact {
  id: string;
  collectionNumber: string;
  accessionNumber: string;
  collectionDate: string;
  contributorName: string;
  objectType: string;
  objectHead: string;
  description: string;
  measurement: string;
  images: string[];
  galleryNumber: string;
  foundPlace: string;
  experimentFormula?: string;
  significanceComment: string;
  correction?: string;
  dateCreated: string;
  tags: string[];
  isPublic: boolean;
}

interface DataContextType {
  artifacts: Artifact[];
  addArtifact: (artifact: Omit<Artifact, 'id' | 'dateCreated'>) => void;
  updateArtifact: (id: string, artifact: Partial<Artifact>) => void;
  deleteArtifact: (id: string) => void;
  searchArtifacts: (query: string, filters?: any) => Artifact[];
  competitions: Competition[];
  addCompetition: (competition: Omit<Competition, 'id' | 'dateCreated'>) => void;
  updateCompetition: (id: string, competition: Partial<Competition>) => void;
  deleteCompetition: (id: string) => void;
  getCompetitionById: (id: string) => Competition | undefined;
  competitionSubmissions: CompetitionSubmission[];
  submitCompetitionEntry: (submission: Omit<CompetitionSubmission, 'id' | 'submissionDate' | 'status'>) => void;
  updateSubmissionStatus: (id: string, status: SubmissionStatus, score?: number, feedback?: string) => void;
  withdrawCompetitionEntry: (competitionId: string, userId: string) => void; // Added withdraw function
  getSubmissionsForCompetition: (competitionId: string) => CompetitionSubmission[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

// Mock artifacts data
const mockArtifacts: Artifact[] = [
  {
    id: '1',
    collectionNumber: 'LW-001',
    accessionNumber: 'ACC-1971-001',
    collectionDate: '1971-12-16',
    contributorName: 'Abdul Kalam Memorial Foundation',
    objectType: 'Photograph',
    objectHead: 'Victory Day Celebration at Dhaka',
    description: 'Historic photograph capturing the moment of victory celebration in Dhaka on December 16, 1971. Shows crowds gathering at Ramna Race Course.',
    measurement: '8 x 10 inches',
    images: ['https://c8.alamy.com/comp/2DNY1G6/bangladeshi-people-visits-at-the-independence-museum-during-the-celebration-of-the-victory-day-amid-the-covid-19-pandemic-in-dhaka-bangladesh-on-dec-2DNY1G6.jpg'],
    galleryNumber: 'G-01',
    foundPlace: 'Dhaka, Bangladesh',
    significanceComment: 'Iconic representation of Bangladesh independence celebration',
    dateCreated: '2024-01-15',
    tags: ['Victory Day', 'Dhaka', '1971', 'Independence', 'Celebration'],
    isPublic: true,
  },
  {
    id: '2',
    collectionNumber: 'LW-002',
    accessionNumber: 'ACC-1971-002',
    collectionDate: '1971-03-26',
    contributorName: 'Bangladesh National Archives',
    objectType: 'Document',
    objectHead: 'Declaration of Independence Transcript',
    description: 'Original transcript of the Declaration of Independence of Bangladesh, broadcast on March 26, 1971.',
    measurement: '11 x 8.5 inches',
    images: ['https://www.dhakalawreview.org/wp-content/uploads/2015/04/1.jpg'],
    galleryNumber: 'G-02',
    foundPlace: 'Chittagong, Bangladesh',
    significanceComment: 'Historical document marking the beginning of Bangladesh independence',
    dateCreated: '2024-01-20',
    tags: ['Declaration', 'Independence', 'March 26', 'Document', 'Historic'],
    isPublic: true,
  },
  {
    id: '3',
    collectionNumber: 'LW-003',
    accessionNumber: 'ACC-1971-003',
    collectionDate: '1971-08-15',
    contributorName: 'Mukti Bahini Veterans Association',
    objectType: 'Weapon',
    objectHead: 'G3P3-7.62 Rifle',
    description: 'Rifle used by freedom fighters during the Liberation War. Donated by veteran freedom fighter Abdul Rahman.',
    measurement: '40 x 8 inches',
    images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/G3P3_7.62_MM_Rifle_1971_Bangladesh_Liberation_War_Arms.jpg/1600px-G3P3_7.62_MM_Rifle_1971_Bangladesh_Liberation_War_Arms.jpg?20210412090250'],
    galleryNumber: 'G-03',
    foundPlace: 'Jessore, Bangladesh',
    significanceComment: 'Represents the armed struggle for independence',
    dateCreated: '2024-02-01',
    tags: ['Weapon', 'Freedom Fighter', 'Mukti Bahini', 'Armed Struggle'],
    isPublic: true,
  },
  {
    id: '4',
    collectionNumber: 'LW-004',
    accessionNumber: 'ACC-1971-004',
    collectionDate: '1971-10-26',
    contributorName: 'Bangladesh Army Museum',
    objectType: 'Weapon',
    objectHead: 'Sten Gun Mk II',
    description: 'A British-designed 9mm submachine gun, widely used by the Mukti Bahini during the 1971 Liberation War due to its simplicity and effectiveness in close-quarters combat.',
    measurement: '762mm (overall length)',
    images: ['https://live.staticflickr.com/3926/15147746748_01429b79e1_b.jpg'],
    galleryNumber: 'G-04',
    foundPlace: 'Various battlefields, Bangladesh',
    significanceComment: 'A quintessential weapon of the Liberation War, symbolizing the resilience and resourcefulness of freedom fighters.',
    dateCreated: '2024-03-01',
    tags: ['Weapon', 'Sten Gun', 'Mukti Bahini', 'Submachine Gun', '1971'],
    isPublic: true,
  },
  {
    id: '5',
    collectionNumber: 'LW-005',
    accessionNumber: 'ACC-1971-005',
    collectionDate: '1971-11-10',
    contributorName: 'Individual Freedom Fighter Collection',
    objectType: 'Weapon',
    objectHead: 'AK-47 Assault Rifle',
    description: 'A Soviet-designed assault rifle, some variants of which were utilized by freedom fighters during the 1971 Liberation War, obtained through various channels. Known for its reliability and robust design.',
    measurement: '870mm (overall length) with fixed stock',
    images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/British_Museum_Room_25_AK-47_Wood_17022019_4908.jpg/1280px-British_Museum_Room_25_AK-47_Wood_17022019_4908.jpg'],
    galleryNumber: 'G-05',
    foundPlace: 'Border regions, Bangladesh',
    significanceComment: 'Represents the diverse international support and resourceful procurement of arms by the Mukti Bahini.',
    dateCreated: '2024-03-05',
    tags: ['Weapon', 'AK-47', 'Assault Rifle', 'Mukti Bahini', 'Soviet', '1971'],
    isPublic: true,
  },
];

const mockCompetitions: Competition[] = [
  {
    id: 'comp-1',
    title: 'District Level Essay Competition: Liberation War',
    description: 'Write an essay on the significance of the Bangladesh Liberation War.',
    level: 'district',
    eligibilityCriteria: 'Open to all Bangladeshi citizens aged 18-30',
    startDate: '2025-09-01T00:00:00Z',
    endDate: '2025-09-30T23:59:59Z',
    judgingCriteria: 'Originality, historical accuracy, and writing style.',
    rewards: 'Certificate of participation, top 3 qualify for division round.',
    status: 'open',
    adminUserId: '2', // archivist
    dateCreated: '2025-08-15T10:00:00Z',
    nextCompetitionId: 'comp-2' // Link to the division level competition
  },
  {
    id: 'comp-2',
    title: 'Division Level Art Competition: Figures of 1971',
    description: 'Create artwork depicting key figures or events from the Liberation War.',
    level: 'division',
    eligibilityCriteria: 'Open to district round qualifiers and invited artists.',
    startDate: '2025-10-15T00:00:00Z',
    endDate: '2025-11-15T23:59:59Z',
    judgingCriteria: 'Creativity, artistic skill, and relevance to the theme.',
    rewards: 'Cash prize, exhibition opportunity, top 2 qualify for national round.',
    status: 'open',
    adminUserId: '3', // curator
    dateCreated: '2025-09-20T11:00:00Z',
    nextCompetitionId: 'comp-3' // Link to the national level competition
  },
  {
    id: 'comp-3',
    title: 'National Level Photography Competition: Echoes of Liberation',
    description: 'Submit photographs that capture the spirit and legacy of the Liberation War.',
    level: 'national',
    eligibilityCriteria: 'Open to division round qualifiers and professional photographers.',
    startDate: '2025-12-01T00:00:00Z',
    endDate: '2025-12-31T23:59:59Z',
    judgingCriteria: 'Impact, technical quality, and narrative power.',
    rewards: 'Grand prize, national recognition, featured in museum\'s digital archive.',
    status: 'draft',
    adminUserId: '1', // super_admin
    dateCreated: '2025-11-01T09:00:00Z',
  }
];

const mockCompetitionSubmissions: CompetitionSubmission[] = [
  {
    id: 'sub-1',
    competitionId: 'comp-1',
    userId: 'public-user-1',
    submissionDate: '2025-09-10T14:30:00Z',
    status: 'submitted',
  }
];

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [artifacts, setArtifacts] = useState<Artifact[]>(mockArtifacts);
  const [competitions, setCompetitions] = useState<Competition[]>(mockCompetitions);
  const [competitionSubmissions, setCompetitionSubmissions] = useState<CompetitionSubmission[]>(mockCompetitionSubmissions);

  const addArtifact = (artifactData: Omit<Artifact, 'id' | 'dateCreated'>) => {
    const newArtifact: Artifact = {
      ...artifactData,
      id: Date.now().toString(),
      dateCreated: new Date().toISOString(),
    };
    setArtifacts(prev => [...prev, newArtifact]);
  };

  const updateArtifact = (id: string, updates: Partial<Artifact>) => {
    setArtifacts(prev => 
      prev.map(artifact => 
        artifact.id === id ? { ...artifact, ...updates } : artifact
      )
    );
  };

  const deleteArtifact = (id: string) => {
    setArtifacts(prev => prev.filter(artifact => artifact.id !== id));
  };

  const searchArtifacts = (query: string, filters?: any): Artifact[] => {
    let filtered = artifacts.filter(artifact => artifact.isPublic);

    if (query) {
      const lowercaseQuery = query.toLowerCase();
      filtered = filtered.filter(artifact =>
        artifact.objectHead.toLowerCase().includes(lowercaseQuery) ||
        artifact.description.toLowerCase().includes(lowercaseQuery) ||
        artifact.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
        artifact.contributorName.toLowerCase().includes(lowercaseQuery)
      );
    }

    if (filters?.objectType && filters.objectType !== 'all') {
      filtered = filtered.filter(artifact => artifact.objectType === filters.objectType);
    }

    if (filters?.dateRange) {
      // Implement date range filtering
    }

    return filtered;
  };

  const addCompetition = (competitionData: Omit<Competition, 'id' | 'dateCreated'>) => {
    const newCompetition: Competition = {
      ...competitionData,
      id: `comp-${Date.now()}`,
      dateCreated: new Date().toISOString(),
    };
    setCompetitions(prev => [...prev, newCompetition]);
  };

  const updateCompetition = (id: string, updates: Partial<Competition>) => {
    setCompetitions(prev => 
      prev.map(comp => 
        comp.id === id ? { ...comp, ...updates } : comp
      )
    );
  };

  const deleteCompetition = (id: string) => {
    setCompetitions(prev => prev.filter(comp => comp.id !== id));
    // Also delete associated submissions
    setCompetitionSubmissions(prev => prev.filter(sub => sub.competitionId !== id));
  };

  const getCompetitionById = (id: string) => {
    return competitions.find(comp => comp.id === id);
  };

  const submitCompetitionEntry = (submissionData: Omit<CompetitionSubmission, 'id' | 'submissionDate' | 'status'>) => {
    const newSubmission: CompetitionSubmission = {
      ...submissionData,
      id: `sub-${Date.now()}`,
      submissionDate: new Date().toISOString(),
      status: 'submitted',
    };
    setCompetitionSubmissions(prev => [...prev, newSubmission]);
  };

  const updateSubmissionStatus = (id: string, status: SubmissionStatus, score?: number, feedback?: string) => {
    setCompetitionSubmissions(prev =>
      prev.map(sub =>
        sub.id === id ? { ...sub, status, score, feedback } : sub
      )
    );
  };

  const getSubmissionsForCompetition = (competitionId: string) => {
    return competitionSubmissions.filter(sub => sub.competitionId === competitionId);
  };

  const withdrawCompetitionEntry = (competitionId: string, userId: string) => {
    setCompetitionSubmissions(prev => 
      prev.filter(sub => !(sub.competitionId === competitionId && sub.userId === userId))
    );
  };

  return (
    <DataContext.Provider value={{
      artifacts,
      addArtifact,
      updateArtifact,
      deleteArtifact,
      searchArtifacts,
      competitions,
      addCompetition,
      updateCompetition,
      deleteCompetition,
      getCompetitionById,
      competitionSubmissions,
      submitCompetitionEntry,
      updateSubmissionStatus,
      withdrawCompetitionEntry,
      getSubmissionsForCompetition,
    }}>
      {children}
    </DataContext.Provider>
  );
};