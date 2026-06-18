export interface IReviewItem {
  name: string;
  role: string;
  company: string;
  sphere: string;
  tint: string;
  rating: number;
  quote: string;
}

export interface IReviews {
  title: string;
  lead: string;
  averageRating: number;
  totalCompanies: string;
  items: IReviewItem[];
}
