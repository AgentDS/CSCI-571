import { NewsSource } from "./news-source";
export interface News {
  source: NewsSource | null;
  author: string | null;
  title: string | null;
  description: string | null;
  url: string | null;
  urlToImage: string | null;
  publishedAt: string | null;
  content: string | null;
}
