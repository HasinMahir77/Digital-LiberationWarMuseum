import React, { createContext, useContext, useState } from 'react';

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

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [artifacts, setArtifacts] = useState<Artifact[]>(mockArtifacts);

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

  return (
    <DataContext.Provider value={{
      artifacts,
      addArtifact,
      updateArtifact,
      deleteArtifact,
      searchArtifacts,
    }}>
      {children}
    </DataContext.Provider>
  );
};