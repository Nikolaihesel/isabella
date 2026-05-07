import { Component, inject, input, computed, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-info-widget',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './project-info-widget.component.html',
  styleUrl: './project-info-widget.component.scss',
})
export class ProjectInfoWidgetComponent {
  private projectService = inject(ProjectService);
  projectId = input.required<string>();

  project = computed(() => this.projectService.getProjectById(this.projectId()));
  aiSummary = computed(() => this.projectService.getAiSummary(this.projectId()));

  // Sections: open by default = facts only
  factsOpen = signal(true);
  backgroundOpen = signal(false);
  goalsOpen = signal(false);
  summaryOpen = signal(false);

  toggle(section: 'facts' | 'background' | 'goals' | 'summary') {
    if (section === 'facts') this.factsOpen.update(v => !v);
    if (section === 'background') this.backgroundOpen.update(v => !v);
    if (section === 'goals') this.goalsOpen.update(v => !v);
    if (section === 'summary') this.summaryOpen.update(v => !v);
  }

  statusLabel(status: string): string {
    const labels: Record<string, string> = {
      active: 'Aktiv', paused: 'Pause', completed: 'Afsluttet', archived: 'Arkiveret',
    };
    return labels[status] ?? status;
  }
}
