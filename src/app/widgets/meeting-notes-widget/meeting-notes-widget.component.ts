import { Component, inject, input, computed, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-meeting-notes-widget',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './meeting-notes-widget.component.html',
  styleUrl: './meeting-notes-widget.component.scss',
})
export class MeetingNotesWidgetComponent {
  private projectService = inject(ProjectService);
  projectId = input.required<string>();

  meetings = computed(() => this.projectService.getMeetingsByProjectId(this.projectId()));

  expandedIds = signal<Set<string>>(new Set());

  toggleExpand(id: string) {
    this.expandedIds.update((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  isExpanded(id: string): boolean {
    return this.expandedIds().has(id);
  }

  summaryPreview(text: string): string {
    return text.length > 120 ? text.slice(0, 120) + '…' : text;
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('');
  }
}
