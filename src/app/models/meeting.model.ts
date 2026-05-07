export interface Meeting {
  id: string;
  title: string;
  date: Date;
  attendees: string[];
  aiSummary: string;
  transcriptAvailable: boolean;
  sourceLink?: string;
}
