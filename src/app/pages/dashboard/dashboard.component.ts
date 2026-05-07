import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { ProjectFormPanelComponent } from '../../shared/project-form-panel/project-form-panel';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, DatePipe, FormsModule, ProjectFormPanelComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private projectService = inject(ProjectService);

  searchQuery = signal('');
  panelOpen = signal(false);

  filteredProjects = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return this.projectService.projects();
    return this.projectService.projects().filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)),
    );
  });

  recentActivity = computed(() => this.projectService.getRecentActivity(5));
  needsAttention = computed(() => this.projectService.getNeedsAttention());

  onSearch(event: Event) {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }

  openNew() { this.panelOpen.set(true); }
  closePanel() { this.panelOpen.set(false); }
  onSaved() { this.closePanel(); }

  statusLabel(status: Project['status']): string {
    const labels: Record<Project['status'], string> = {
      active: 'Aktiv', paused: 'Pause', completed: 'Afsluttet', archived: 'Arkiveret',
    };
    return labels[status];
  }

  attentionReason(project: Project): string {
    if (project.status === 'paused') return 'Projektet er sat på pause';
    const now = new Date();
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    if (project.nextMilestone && new Date(project.nextMilestone.date) <= sevenDaysFromNow) {
      return `Milepæl "${project.nextMilestone.title}" inden for 7 dage`;
    }
    return 'Ingen nylig aktivitet';
  }

  eventTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      milestone: 'Milepæl', meeting: 'Møde', release: 'Release', decision: 'Beslutning',
    };
    return labels[type] ?? type;
  }

  daysAgo(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'I dag';
    if (days === 1) return 'I går';
    return `${days} dage siden`;
  }
}
