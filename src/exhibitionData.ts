import { Exhibition } from "./types";

export const exhibitions: Exhibition[] = [
  {
    id: '1',
    title: 'exhibitions.exhibition1.title',
    description: 'exhibitions.exhibition1.description',
    curatorNote: 'exhibitions.exhibition1.curatorNote',
    featuredImage: 'https://www.tbsnews.net/sites/default/files/styles/infograph/public/images/2020/12/15/jadu_ghor_3-min.jpg',
    artifactCount: 24,
    viewCount: 1250,
    featured: true,
    dateCreated: '2024-01-15',
  },
  {
    id: '2',
    title: 'exhibitions.exhibition2.title',
    description: 'exhibitions.exhibition2.description',
    curatorNote: 'exhibitions.exhibition2.curatorNote',
    featuredImage: 'https://www.nationalarchives.gov.uk/wp-content/uploads/2022/11/trafalgar-square-rally-1100px.gif',
    artifactCount: 18,
    viewCount: 980,
    featured: false,
    dateCreated: '2024-02-01',
  },
  {
    id: '3',
    title: 'exhibitions.exhibition3.title',
    description: 'exhibitions.exhibition3.description',
    curatorNote: 'exhibitions.exhibition3.curatorNote',
    featuredImage: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Artifact_in_liberation_war_museum%2C_Agargaon_143.jpg',
    artifactCount: 31,
    viewCount: 1580,
    featured: true,
    dateCreated: '2024-01-20',
  },
];
