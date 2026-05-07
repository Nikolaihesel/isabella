import { Injectable, signal, computed } from '@angular/core';
import { PROJECTS, PEOPLE, TIMELINE_EVENTS, DECISIONS, MEETINGS, AI_SUMMARIES } from '../data/mock-data';
import { Project } from '../models/project.model';
import { Person } from '../models/person.model';
import { TimelineEvent } from '../models/timeline-event.model';
import { Decision } from '../models/decision.model';
import { Meeting } from '../models/meeting.model';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private _projects = signal<Project[]>(PROJECTS);
  private _people = signal(PEOPLE);
  private _timelineEvents = signal(TIMELINE_EVENTS);
  private _decisions = signal(DECISIONS);
  private _meetings = signal(MEETINGS);

  readonly projects = this._projects.asReadonly();

  allTimelineEvents = computed(() => this._timelineEvents());

  getProjectById(id: string): Project | undefined {
    return this._projects().find((p) => p.id === id);
  }

  getPeopleByProjectId(projectId: string): Person[] {
    return this._people().filter((p) => p.projectIds.includes(projectId));
  }

  getTimelineByProjectId(projectId: string): TimelineEvent[] {
    return this._timelineEvents()
      .filter((e) => e.projectId === projectId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  getDecisionsByProjectId(projectId: string): Decision[] {
    return this._decisions()
      .filter((d) => d.projectId === projectId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  getMeetingsByProjectId(projectId: string): Meeting[] {
    return this._meetings()
      .filter((m) => m.projectId === projectId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  getAiSummary(projectId: string): string {
    return AI_SUMMARIES[projectId] ?? 'Ingen AI-opsummering tilgængelig for dette projekt.';
  }

  getRecentActivity(limit = 5) {
    return this._timelineEvents()
      .slice()
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit)
      .map((event) => {
        const project = this._projects().find((p) => p.id === event.projectId);
        return { ...event, projectName: project?.name ?? 'Ukendt projekt', projectId: event.projectId };
      });
  }

  getNeedsAttention(): Project[] {
    const now = new Date();
    const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    return this._projects().filter((p) => {
      if (p.status === 'archived') return false;
      const inactive = p.status === 'active' && new Date(p.lastActivity) < fourteenDaysAgo;
      const upcomingDeadline = p.nextMilestone && new Date(p.nextMilestone.date) <= sevenDaysFromNow;
      const paused = p.status === 'paused';
      return inactive || upcomingDeadline || paused;
    });
  }

  // ── CRUD ────────────────────────────────────────────────────────────────────

  addProject(project: Project): void {
    this._projects.update(list => [...list, project]);
  }

  updateProject(updated: Project): void {
    this._projects.update(list =>
      list.map(p => p.id === updated.id ? updated : p)
    );
  }

  deleteProject(id: string): void {
    this._projects.update(list => list.filter(p => p.id !== id));
  }

  generateId(name: string): string {
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').slice(0, 12);
    const suffix = Math.random().toString(36).slice(2, 6);
    return `${slug}-${suffix}`;
  }
}
