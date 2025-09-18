import React, { createContext, useContext, useState } from 'react';
import { Artifact, Competition, CompetitionSubmission, SubmissionStatus, NewsArticle, MuseumEvent } from '../types';
import { TFunction } from 'i18next';

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
  withdrawCompetitionEntry: (competitionId: string, userId: string) => void;
  getSubmissionsForCompetition: (competitionId: string) => CompetitionSubmission[];
  news: NewsArticle[];
  addNews: (article: Omit<NewsArticle, 'id'>) => void;
  updateNews: (id: string, article: Partial<NewsArticle>) => void;
  deleteNews: (id: string) => void;
  getNewsArticleById: (id: string) => NewsArticle | undefined;
  events: MuseumEvent[];
  addEvent: (event: Omit<MuseumEvent, 'id' | 'dateCreated'>) => void;
  updateEvent: (id: string, event: Partial<MuseumEvent>) => void;
  deleteEvent: (id: string) => void;
  getEventById: (id: string) => MuseumEvent | undefined;
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
    contributorName: 'artifacts.artifact1.contributorName',
    objectType: 'artifacts.artifact1.objectType',
    objectHead: 'artifacts.artifact1.objectHead',
    description: 'artifacts.artifact1.description',
    measurement: '8 x 10 inches',
    images: ['https://c8.alamy.com/comp/2DNY1G6/bangladeshi-people-visits-at-the-independence-museum-during-the-celebration-of-the-victory-day-amid-the-covid-19-pandemic-in-dhaka-bangladesh-on-dec-2DNY1G6.jpg'],
    galleryNumber: 'G-01',
    foundPlace: 'artifacts.artifact1.foundPlace',
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
    contributorName: 'artifacts.artifact2.contributorName',
    objectType: 'artifacts.artifact2.objectType',
    objectHead: 'artifacts.artifact2.objectHead',
    description: 'artifacts.artifact2.description',
    measurement: '11 x 8.5 inches',
    images: ['https://www.dhakalawreview.org/wp-content/uploads/2015/04/1.jpg'],
    galleryNumber: 'G-02',
    foundPlace: 'artifacts.artifact2.foundPlace',
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
    contributorName: 'artifacts.artifact3.contributorName',
    objectType: 'artifacts.artifact3.objectType',
    objectHead: 'artifacts.artifact3.objectHead',
    description: 'artifacts.artifact3.description',
    measurement: '40 x 8 inches',
    images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/G3P3_7.62_MM_Rifle_1971_Bangladesh_Liberation_War_Arms.jpg/1600px-G3P3_7.62_MM_Rifle_1971_Bangladesh_Liberation_War_Arms.jpg?20210412090250'],
    galleryNumber: 'G-03',
    foundPlace: 'artifacts.artifact3.foundPlace',
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
    contributorName: 'artifacts.artifact4.contributorName',
    objectType: 'artifacts.artifact4.objectType',
    objectHead: 'artifacts.artifact4.objectHead',
    description: 'artifacts.artifact4.description',
    measurement: '762mm (overall length)',
    images: ['https://live.staticflickr.com/3926/15147746748_01429b79e1_b.jpg'],
    galleryNumber: 'G-04',
    foundPlace: 'artifacts.artifact4.foundPlace',
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
    contributorName: 'artifacts.artifact5.contributorName',
    objectType: 'artifacts.artifact5.objectType',
    objectHead: 'artifacts.artifact5.objectHead',
    description: 'artifacts.artifact5.description',
    measurement: '870mm (overall length) with fixed stock',
    images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/British_Museum_Room_25_AK-47_Wood_17022019_4908.jpg/1280px-British_Museum_Room_25_AK-47_Wood_17022019_4908.jpg'],
    galleryNumber: 'G-05',
    foundPlace: 'artifacts.artifact5.foundPlace',
    significanceComment: 'Represents the diverse international support and resourceful procurement of arms by the Mukti Bahini.',
    dateCreated: '2024-03-05',
    tags: ['Weapon', 'AK-47', 'Assault Rifle', 'Mukti Bahini', 'Soviet', '1971'],
    isPublic: true,
  },
];

const mockCompetitions: Competition[] = [
  {
    id: 'comp-1',
    title: 'competitions.competition1.title',
    description: 'competitions.competition1.description',
    level: 'district', // Changed to translation key
    type: 'essay', // Changed to translation key
    eligibilityCriteria: 'Open to all Bangladeshi citizens aged 18-30',
    startDate: '2025-09-01T00:00:00Z',
    endDate: '2025-09-30T23:59:59Z',
    judgingCriteria: 'Originality, historical accuracy, and writing style.',
    rewards: 'Certificate of participation, top 3 qualify for division round.',
    status: 'open', // Changed to translation key
    adminUserId: '2', // archivist
    dateCreated: '2025-08-15T10:00:00Z',
    thumbnail: 'https://s3.amazonaws.com/thumbnails.thecrimson.com/photos/2018/10/15/132830_1333019.jpg.1500x1000_q95_crop-smart_upscale.jpg',
  },
  {
    id: 'comp-2',
    title: 'competitions.competition2.title',
    description: 'competitions.competition2.description',
    level: 'division', // Changed to translation key
    type: 'art', // Changed to translation key
    eligibilityCriteria: 'Open to all Bangladeshi citizens aged 18-30',
    startDate: '2025-10-01T00:00:00Z',
    endDate: '2025-11-15T23:59:59Z',
    judgingCriteria: 'Creativity, relevance to theme, artistic skill.',
    rewards: 'Certificate of participation, top 3 qualify for national round.',
    status: 'open', // Changed to translation key
    adminUserId: '2', // archivist
    dateCreated: '2025-09-01T10:00:00Z',
    thumbnail: 'https://static.wixstatic.com/media/c995a3_f793fd38a79741c89f371d107d974aa2~mv2.jpg/v1/fill/w_768,h_544,al_c,lg_1,q_85/c995a3_f793fd38a79741c89f371d107d974aa2~mv2.jpg',
  },
  {
    id: 'comp-3',
    title: 'competitions.competition3.title',
    description: 'competitions.competition3.description',
    level: 'national', // Changed to translation key
    type: 'photography', // Changed to translation key
    eligibilityCriteria: 'Open to all Bangladeshi citizens, all ages.',
    startDate: '2025-10-15T00:00:00Z',
    endDate: '2025-11-30T23:59:59Z',
    judgingCriteria: 'Impact, composition, technical quality, relevance.',
    rewards: 'Cash prize, exhibition in museum, certificate.',
    status: 'open', // Changed to translation key
    adminUserId: '2', // archivist
    dateCreated: '2025-09-10T10:00:00Z',
    thumbnail: 'https://img.freepik.com/free-photo/photographer-taking-pictures-nature_23-2149176882.jpg?size=626&ext=jpg&ga=GA1.1.1880011253.1699320215&semt=ais',
  },
  {
    id: 'comp-4',
    title: 'competitions.competition4.title',
    description: 'competitions.competition4.description',
    level: 'national', // Changed to translation key
    type: 'poem-writing', // Changed to translation key
    eligibilityCriteria: 'Open to all Bangladeshi citizens, all ages.',
    startDate: '2025-11-01T00:00:00Z',
    endDate: '2025-11-30T23:59:59Z',
    judgingCriteria: 'Originality, emotional depth, literary merit, relevance.',
    rewards: 'Publication in museum journal, certificate, recognition.',
    status: 'open', // Changed to translation key
    adminUserId: '2', // archivist
    dateCreated: '2025-10-01T10:00:00Z',
    thumbnail: 'https://i.ytimg.com/vi/_L_bfisuocw/maxresdefault.jpg',
  },
  {
    id: 'comp-5',
    title: 'competitions.competition5.title',
    description: 'competitions.competition5.description',
    level: 'division', // Changed to translation key
    type: 'singing', // Changed to translation key
    eligibilityCriteria: 'Open to all Bangladeshi citizens, all ages.',
    startDate: '2025-10-15T00:00:00Z',
    endDate: '2025-10-31T23:59:59Z',
    judgingCriteria: 'Vocal ability, emotional delivery, song choice, stage presence.',
    rewards: 'Performance opportunity at museum event, certificate.',
    status: 'open', // Changed to translation key
    adminUserId: '2', // archivist
    dateCreated: '2025-09-15T10:00:00Z',
    thumbnail: 'https://www.indianewsstream.com/wp-content/uploads/2025/08/Bangladesh-BNP-accuses-Jamaat-of-erasing-Liberation-War-memories.jpg',
  },
  {
    id: 'comp-6',
    title: 'competitions.competition6.title',
    description: 'competitions.competition6.description',
    level: 'national', // Changed to translation key
    type: 'debate', // Changed to translation key
    eligibilityCriteria: 'Open to university students in Bangladesh.',
    startDate: '2025-11-15T00:00:00Z',
    endDate: '2025-12-15T23:59:59Z',
    judgingCriteria: 'Argumentation, rebuttal, public speaking, historical accuracy.',
    rewards: 'Scholarship, certificate, mentorship opportunity.',
    status: 'upcoming', // Changed to translation key
    adminUserId: '2', // archivist
    dateCreated: '2025-10-10T10:00:00Z',
    thumbnail: 'https://www.tbsnews.net/sites/default/files/styles/big_2/public/images/2024/12/07/img-20241207-wa0048.jpg',
  },
  {
    id: 'comp-7',
    title: 'competitions.competition7.title',
    description: 'competitions.competition7.description',
    level: 'division', // Changed to translation key
    type: 'quiz', // Changed to translation key
    eligibilityCriteria: 'Open to all Bangladeshi citizens, all ages.',
    startDate: '2025-11-01T00:00:00Z',
    endDate: '2025-11-20T23:59:59Z',
    judgingCriteria: 'Accuracy of answers, speed, teamwork.',
    rewards: 'Trophies, gift hampers, certificates.',
    status: 'open', // Changed to translation key
    adminUserId: '2', // archivist
    dateCreated: '2025-10-05T10:00:00Z',
    thumbnail: 'https://bims.ac.in/sites/default/files/2024-12/images_10_0.jpg',
  },
];

const mockNews = (): NewsArticle[] => [
  {
    id: 'news-1',
    title: 'newsPage.news.news1.title',
    imageUrl: 'https://static.theprint.in/wp-content/uploads/2019/10/1971_Instrument_of_Surrender-696x392.jpg?compress=true&quality=80&w=376&dpr=2.6',
    date: '1971-12-16',
    author: 'Liberation War Museum Archives',
    summary: 'newsPage.news.news1.summary',
    content: 'newsPage.news.news1.content',
    tags: ['Surrender', 'Victory Day', '1971', 'Dhaka', 'Pakistan Army'],
  },
  {
    id: 'news-2',
    title: 'newsPage.news.news2.title',
    imageUrl: 'https://images.news18.com/ibnlive/uploads/2021/03/1616766970_bangladesh-liberation-war.png',
    date: '1971-07-20',
    author: 'Historical Review Board',
    summary: 'newsPage.news.news2.summary',
    content: 'newsPage.news.news2.content',
    tags: ['Mukti Bahini', 'Freedom Fighters', 'Guerrilla Warfare', '1971', 'Independence'],
  },
  {
    id: 'news-3',
    title: 'newsPage.news.news3.title',
    imageUrl: 'https://cdn.daily-sun.com/public/news_images/2024/03/07/1709785712-311914fe43ab0f3455975f00cd7df8e9.gif',
    date: '1971-03-07',
    author: 'Bangabandhu Research Institute',
    summary: 'newsPage.news.news3.summary',
    content: 'newsPage.news.news3.content',
    tags: ['March 7 Speech', 'Bangabandhu', 'Sheikh Mujibur Rahman', 'Independence', 'Historic Speech'],
  },
  {
    id: 'news-4',
    title: 'newsPage.news.news4.title',
    imageUrl: 'https://ecdn.dhakatribune.net/contents/cache/images/640x359x1/uploads/dten/2022/03/08/1971.jpeg',
    date: '1971-03-25',
    author: 'Human Rights Watch',
    summary: 'newsPage.news.news4.summary',
    content: 'newsPage.news.news4.content',
    tags: ['Genocide', 'Operation Searchlight', '1971', 'War Crimes', 'Human Rights'],
  },
  {
    id: 'news-5',
    title: 'newsPage.news.news5.title',
    imageUrl: 'https://www.netmaps.net/wp-content/uploads/2015/07/world-globe-presentation-map.jpg',
    date: '1971-12-03',
    author: 'Global History Review',
    summary: 'newsPage.news.news5.summary',
    content: 'newsPage.news.news5.content',
    tags: ['International Support', 'India', 'Refugees', 'Diplomacy', '1971'],
  },
];

const mockEvents: MuseumEvent[] = [
  {
    id: 'evt-1',
    title: 'Victory Day Celebration: Remembering Our Heroes',
    date: '2025-12-16',
    time: '10:00-14:00 BST',
    location: 'Museum Main Hall & Online',
    type: 'Festivals and Event Series',
    description: 'A grand celebration to honor the martyrs and freedom fighters of the Liberation War. Featuring speeches, cultural performances, and a special exhibition.',
    imageUrl: 'https://raw.githubusercontent.com/hasin/Digital-LiberationWarMuseum/assets/newly-built-liberation.jpg',
    dateCreated: '2025-08-01T10:00:00Z',
  },
  {
    id: 'evt-2',
    title: 'Oral Histories Project: Share Your Story',
    date: '2025-11-05',
    time: '10:00-16:00 BST',
    location: 'Museum Archive Wing',
    type: 'Workshops & Talks',
    description: 'An opportunity for freedom fighters, their families, and witnesses to share their personal stories and contribute to the museum\'s oral history collection.',
    imageUrl: 'https://raw.githubusercontent.com/hasin/Digital-LiberationWarMuseum/assets/687-400x200.jpg',
    dateCreated: '2025-08-15T10:00:00Z',
  },
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

export const DataProvider: React.FC<{ children: React.ReactNode, t: TFunction }> = ({ children, t }) => {
  const [artifacts, setArtifacts] = useState<Artifact[]>(mockArtifacts);
  const [competitions, setCompetitions] = useState<Competition[]>(mockCompetitions);
  const [competitionSubmissions, setCompetitionSubmissions] = useState<CompetitionSubmission[]>(mockCompetitionSubmissions);
  const [news, setNews] = useState<NewsArticle[]>(mockNews().map(article => ({ // Added map to translate news articles
    ...article,
    title: t(article.title),
    summary: t(article.summary),
    content: t(article.content),
  })));
  const [events, setEvents] = useState<MuseumEvent[]>(mockEvents);

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
        artifact.tags.some((tag: string) => tag.toLowerCase().includes(lowercaseQuery)) ||
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

  const getNewsArticleById = (id: string) => {
    return news.find(article => article.id === id);
  };

  const addNews = (articleData: Omit<NewsArticle, 'id'>) => {
    const newArticle: NewsArticle = {
      ...articleData,
      id: `news-${Date.now()}`,
    };
    setNews(prev => [newArticle, ...prev]);
  };

  const updateNews = (id: string, updates: Partial<NewsArticle>) => {
    setNews(prev => prev.map(n => (n.id === id ? { ...n, ...updates } : n)));
  };

  const deleteNews = (id: string) => {
    setNews(prev => prev.filter(n => n.id !== id));
  };

  const addEvent = (eventData: Omit<MuseumEvent, 'id' | 'dateCreated'>) => {
    const newEvent: MuseumEvent = {
      ...eventData,
      id: `evt-${Date.now()}`,
      dateCreated: new Date().toISOString(),
    };
    setEvents(prev => [newEvent, ...prev]);
  };

  const updateEvent = (id: string, updates: Partial<MuseumEvent>) => {
    setEvents(prev => prev.map(e => (e.id === id ? { ...e, ...updates } : e)));
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const getEventById = (id: string) => {
    return events.find(e => e.id === id);
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
      news,
      addNews,
      updateNews,
      deleteNews,
      getNewsArticleById,
      events,
      addEvent,
      updateEvent,
      deleteEvent,
      getEventById,
    }}>
      {children}
    </DataContext.Provider>
  );
};