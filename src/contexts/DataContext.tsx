import React, { createContext, useContext, useState } from 'react';
import { Artifact, Competition, CompetitionSubmission, SubmissionStatus, NewsArticle, MuseumEvent } from '../types';

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
    type: 'essay',
    eligibilityCriteria: 'Open to all Bangladeshi citizens aged 18-30',
    startDate: '2025-09-01T00:00:00Z',
    endDate: '2025-09-30T23:59:59Z',
    judgingCriteria: 'Originality, historical accuracy, and writing style.',
    rewards: 'Certificate of participation, top 3 qualify for division round.',
    status: 'open',
    adminUserId: '2', // archivist
    dateCreated: '2025-08-15T10:00:00Z',
    thumbnail: 'https://s3.amazonaws.com/thumbnails.thecrimson.com/photos/2018/10/15/132830_1333019.jpg.1500x1000_q95_crop-smart_upscale.jpg',
  },
  {
    id: 'comp-2',
    title: 'Division Level Art Competition: Figures of 1971',
    description: 'Create artwork depicting key figures or events from the Liberation War.',
    level: 'division',
    type: 'art',
    eligibilityCriteria: 'Open to district round qualifiers and invited artists.',
    startDate: '2025-10-15T00:00:00Z',
    endDate: '2025-11-15T23:59:59Z',
    judgingCriteria: 'Creativity, artistic skill, and relevance to the theme.',
    rewards: 'Cash prize, exhibition opportunity, top 2 qualify for national round.',
    status: 'open',
    adminUserId: '3', // curator
    dateCreated: '2025-09-20T11:00:00Z',
    thumbnail:'https://static.wixstatic.com/media/c995a3_f793fd38a79741c89f371d107d974aa2~mv2.jpg/v1/fill/w_768,h_544,al_c,lg_1,q_85/c995a3_f793fd38a79741c89f371d107d974aa2~mv2.jpg',
    nextCompetitionId: 'comp-3' // Link to the national level competition
  },
  {
    id: 'comp-3',
    title: 'National Level Photography Competition: Echoes of Liberation',
    description: 'Submit photographs that capture the spirit and legacy of the Liberation War.',
    level: 'national',
    type: 'photography',
    eligibilityCriteria: 'Open to division round qualifiers and professional photographers.',
    startDate: '2025-12-01T00:00:00Z',
    endDate: '2025-12-31T23:59:59Z',
    judgingCriteria: 'Impact, technical quality, and narrative power.',
    rewards: 'Grand prize, national recognition, featured in museum\'s digital archive.',
    status: 'draft',
    adminUserId: '1', // super_admin
    dateCreated: '2025-11-01T09:00:00Z',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Indian_soldiers_in_Bangladesh_Liberation_War.jpg/1200px-Indian_soldiers_in_Bangladesh_Liberation_War.jpg',
  },
  {
    id: 'comp-4',
    title: 'Poem Writing Competition: Verses of Valor',
    description: 'Compose a poem reflecting on the bravery and sacrifices of the Liberation War. Express emotions, historical context, and aspirations for the future.',
    level: 'national',
    type: 'poem-writing',
    eligibilityCriteria: 'Open to all citizens, amateur and professional poets.',
    startDate: '2025-11-01T00:00:00Z',
    endDate: '2025-11-30T23:59:59Z',
    judgingCriteria: 'Creativity, emotional depth, and thematic relevance.',
    rewards: 'Publication in museum anthology, cash prize, certificate.',
    status: 'open',
    adminUserId: '2',
    dateCreated: '2025-10-01T10:00:00Z',
    thumbnail: 'https://miro.medium.com/1*a-AQ061Ce9uBvL7mrkyZ6g.jpeg',
  },
  {
    id: 'comp-5',
    title: 'Singing Competition: Melodies of Freedom',
    description: 'Perform patriotic songs from the Liberation War era or original compositions inspired by the war. Solo and group performances welcome.',
    level: 'division',
    type: 'singing',
    eligibilityCriteria: 'Open to amateur and professional singers.',
    startDate: '2025-10-01T00:00:00Z',
    endDate: '2025-10-31T23:59:59Z',
    judgingCriteria: 'Vocal quality, emotional delivery, and connection to the theme.',
    rewards: 'Recording contract, cash prize, performance at national events.',
    status: 'open',
    adminUserId: '3',
    dateCreated: '2025-09-10T11:00:00Z',
    thumbnail: 'https://iansportalimages.s3.amazonaws.com/ianslive_watermark/1c43ecd03a19080ef821f6953fa65596.jpg',
  },
  {
    id: 'comp-6',
    title: 'Debate Competition: Historical Perspectives',
    description: 'Engage in a debate on various historical perspectives and interpretations of the Liberation War. Critical thinking and evidence-based arguments are key.',
    level: 'national',
    type: 'debate',
    eligibilityCriteria: 'Open to university students and young professionals.',
    startDate: '2025-11-15T00:00:00Z',
    endDate: '2025-12-15T23:59:59Z',
    judgingCriteria: 'Argumentation, research, public speaking skills.',
    rewards: 'Scholarship, mentorship opportunity, certificate.',
    status: 'upcoming',
    adminUserId: '1',
    dateCreated: '2025-10-20T12:00:00Z',
    thumbnail: 'https://www.dcgpsc.edu.bd/media/imgAll/31-03-2016-1459438238.jpg',
  },
  {
    id: 'comp-7',
    title: 'Quiz Competition: Know Your History',
    description: 'Test your knowledge about the Bangladesh Liberation War in this exciting quiz competition. Teams of three.',
    level: 'division',
    type: 'quiz',
    eligibilityCriteria: 'Open to high school and college students.',
    startDate: '2025-10-20T00:00:00Z',
    endDate: '2025-11-20T23:59:59Z',
    judgingCriteria: 'Accuracy of answers, speed, teamwork.',
    rewards: 'Educational tour, books, certificate.',
    status: 'open',
    adminUserId: '2',
    dateCreated: '2025-09-25T09:00:00Z',
    thumbnail: 'https://assets.thehansindia.com/h-upload/2023/12/18/1407606-quiz.webp',
  },
];

const mockNews: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'Historic Surrender of Pakistan Army in Dhaka',
    imageUrl: 'https://static.theprint.in/wp-content/uploads/2019/10/1971_Instrument_of_Surrender-696x392.jpg?compress=true&quality=80&w=376&dpr=2.6',
    date: '1971-12-16',
    author: 'Liberation War Museum Archives',
    summary: 'On December 16, 1971, the Pakistan Army officially surrendered to the joint forces of Bangladesh and India, marking the end of the Liberation War and the birth of independent Bangladesh.',
    content: 'The instrument of surrender was signed by Lieutenant General A. A. K. Niazi, commander of the Pakistani forces in East Pakistan, and Lieutenant General Jagjit Singh Aurora, GOC-in-C of the Indian and Bangladesh forces, at the Ramna Race Course in Dhaka. This historic event led to the unconditional surrender of approximately 93,000 Pakistani troops, the largest surrender since World War II. The joyous occasion was met with widespread celebrations across Bangladesh, symbolizing the culmination of nine months of valiant struggle and immense sacrifice.',
    tags: ['Surrender', 'Victory Day', '1971', 'Dhaka', 'Pakistan Army'],
  },
  {
    id: 'news-2',
    title: 'The Role of Mukti Bahini in Bangladesh\'s Independence',
    imageUrl: 'https://images.news18.com/ibnlive/uploads/2021/03/1616766970_bangladesh-liberation-war.png',
    date: '1971-07-20',
    author: 'Historical Review Board',
    summary: 'The Mukti Bahini, or Freedom Fighters, played a pivotal role in the Bangladesh Liberation War, employing guerrilla tactics and immense bravery against the Pakistani military.',
    content: 'Comprised of Bengali military, paramilitary, and civilians, the Mukti Bahini emerged as a formidable force following the crackdown by the Pakistani army on March 25, 1971. Their guerrilla warfare disrupted Pakistani supply lines, ambushed convoys, and liberated various areas, significantly contributing to the morale of the Bengali populace and weakening the Pakistani occupation forces. Their unwavering commitment and sacrifice were instrumental in achieving the long-sought independence.',
    tags: ['Mukti Bahini', 'Freedom Fighters', 'Guerrilla Warfare', '1971', 'Independence'],
  },
  {
    id: 'news-3',
    title: 'March 7 Speech: A Call for Independence',
    imageUrl: 'https://cdn.daily-sun.com/public/news_images/2024/03/07/1709785712-311914fe43ab0f3455975f00cd7df8e9.gif',
    date: '1971-03-07',
    author: 'Bangabandhu Research Institute',
    summary: 'Sheikh Mujibur Rahman\'s historic speech on March 7, 1971, at the Ramna Race Course in Dhaka, effectively declared Bangladesh\'s independence and galvanized the nation.',
    content: 'In front of a massive gathering, Bangabandhu Sheikh Mujibur Rahman delivered a powerful and inspiring speech that is considered a de facto declaration of Bangladesh\'s independence. He famously declared, "The struggle this time is for our emancipation! The struggle this time is for our independence!" The speech outlined the grievances against West Pakistan, called for a non-cooperation movement, and prepared the Bengali people for the impending war. It remains a foundational document in the history of Bangladesh.',
    tags: ['March 7 Speech', 'Bangabandhu', 'Sheikh Mujibur Rahman', 'Independence', 'Historic Speech'],
  },
  {
    id: 'news-4',
    title: 'The Genocide of 1971: A Dark Chapter',
    imageUrl: 'https://ecdn.dhakatribune.net/contents/cache/images/640x359x1/uploads/dten/2022/03/08/1971.jpeg',
    date: '1971-03-25',
    author: 'Human Rights Watch',
    summary: 'The 1971 Bangladesh Genocide, initiated by the Pakistani military\'s Operation Searchlight, resulted in the systematic killing of millions of Bengalis and widespread atrocities.',
    content: 'Beginning on March 25, 1971, with Operation Searchlight, the Pakistani army launched a brutal campaign of genocide against the Bengali population, targeting intellectuals, students, Hindus, and political activists. Estimates suggest that between 500,000 and 3,000,000 Bengalis were killed, and millions more were displaced and sought refuge in India. The atrocities included mass murders, rape, and forced displacement, leaving an indelible scar on the nation\'s history and highlighting the immense human cost of the Liberation War.',
    tags: ['Genocide', 'Operation Searchlight', '1971', 'War Crimes', 'Human Rights'],
  },
  {
    id: 'news-5',
    title: 'International Support for Bangladesh\'s Liberation War',
    imageUrl: 'https://www.netmaps.net/wp-content/uploads/2015/07/world-globe-presentation-map.jpg',
    date: '1971-12-03',
    author: 'Global History Review',
    summary: 'The Bangladesh Liberation War garnered significant international support, particularly from India, which played a crucial role in providing military and humanitarian aid.',
    content: 'Beyond India\'s direct military intervention, various countries and international organizations voiced support for Bangladesh\'s independence. India provided sanctuary to millions of refugees, trained and equipped the Mukti Bahini, and eventually intervened militarily. Other nations, through diplomatic pressure and humanitarian assistance, also contributed to the global recognition of the atrocities committed by Pakistan and the legitimacy of Bangladesh\'s struggle for self-determination. This international solidarity was vital in securing Bangladesh\'s swift victory.',
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

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [artifacts, setArtifacts] = useState<Artifact[]>(mockArtifacts);
  const [competitions, setCompetitions] = useState<Competition[]>(mockCompetitions);
  const [competitionSubmissions, setCompetitionSubmissions] = useState<CompetitionSubmission[]>(mockCompetitionSubmissions);
  const [news, setNews] = useState<NewsArticle[]>(mockNews);
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