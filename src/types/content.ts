export interface Article {
  slug: string;
  title: string;
  metaDescription: string;
  publishedDate: string;
  updatedDate: string;
  readTimeMinutes: number;
  author: {
    name: string;
    role: string;
  };
  category: 'YouTube' | 'Podcasting' | 'Speech & Keynotes' | 'Video Production' | 'Voice-Over';
  featuredImageAlt: string;
  summaryAnswer: string;
  keyTakeaways: string[];
  contentHtml: string;
  quickReferenceTable?: {
    headers: string[];
    rows: (string | number)[][];
  };
  relatedCalculators: {
    title: string;
    path: string;
    badge: string;
  }[];
  relatedArticleSlugs: string[];
}

export interface SEOMetadata {
  title: string;
  description: string;
  canonical: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  schema?: Record<string, unknown> | Record<string, unknown>[];
}

export interface NavRoute {
  path: string;
  label: string;
  description?: string;
}
