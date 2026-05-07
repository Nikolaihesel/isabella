export interface TimelineEvent {
  id: string;
  type: 'milestone' | 'meeting' | 'release' | 'decision';
  title: string;
  date: Date;
  attendees?: string[];
  notes?: string;
  aiSummary?: string;
}
