export interface Project {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed' | 'archived';
  version: string;
  lastActivity: Date;
  nextMilestone?: { title: string; date: Date };
  description: string;
  background: string;
  goals: string[];
  startDate: Date;
  tags: string[];
}
