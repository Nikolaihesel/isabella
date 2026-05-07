export interface Person {
  id: string;
  name: string;
  initials: string;
  role: string;
  contributions: string[];
  workload: 'low' | 'medium' | 'high' | 'unavailable';
  availability: string;
}
