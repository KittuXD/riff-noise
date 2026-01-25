export interface ContentItem {
  id: string;
  title: string;
  type: string;
  status: string;
  author: string;
  views: number;
  featured: boolean;
  createdAt: string;
  content?: string;
  excerpt?: string;
  tags?: string[];
  featuredImage?: string;
}