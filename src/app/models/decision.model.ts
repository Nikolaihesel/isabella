export interface Decision {
  id: string;
  title: string;
  date: Date;
  description: string;
  madeBy: string[];
  sourceLink?: string;
  sourceType: 'Teams' | 'SharePoint' | 'Jira' | 'Manual';
}
