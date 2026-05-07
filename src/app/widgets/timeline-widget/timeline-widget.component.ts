import { Component, inject, input, computed, signal, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { TimelineEvent } from '../../models/timeline-event.model';

type TimeRange = '1m' | '6m' | '1y' | 'all';

@Component({
  selector: 'app-timeline-widget',
  standalone: true,
  imports: [DatePipe, FormsModule],
  templateUrl: './timeline-widget.component.html',
  styleUrl: './timeline-widget.component.scss',
})
export class TimelineWidgetComponent {
  private projectService = inject(ProjectService);
  projectId = input.required<string>();

  allEvents = computed(() =>
    this.projectService.getTimelineByProjectId(this.projectId())
      .slice()
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  );

  timeRange = signal<TimeRange>('1y');
  searchQuery = signal('');
  selectedEvent = signal<TimelineEvent | null>(null);

  filteredEvents = computed(() => {
    const now = new Date();
    const range = this.timeRange();
    const query = this.searchQuery().toLowerCase().trim();

    const cutoff: Date = (() => {
      if (range === '1m') return new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
      if (range === '6m') return new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
      if (range === '1y') return new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
      return new Date(0);
    })();

    return this.allEvents().filter(e => {
      const inRange = new Date(e.date) >= cutoff;
      const matchesQuery = !query ||
        e.title.toLowerCase().includes(query) ||
        (e.notes ?? '').toLowerCase().includes(query) ||
        (e.aiSummary ?? '').toLowerCase().includes(query) ||
        this.typeLabel(e.type).toLowerCase().includes(query);
      return inRange && matchesQuery;
    });
  });

  // Positions each event along the horizontal rail (0–100%)
  eventPositions = computed(() => {
    const events = this.filteredEvents();
    if (events.length === 0) return [];
    if (events.length === 1) return [{ event: events[0], pct: 50 }];

    const times = events.map(e => new Date(e.date).getTime());
    const min = Math.min(...times);
    const max = Math.max(...times);
    const span = max - min || 1;

    return events.map(e => ({
      event: e,
      pct: ((new Date(e.date).getTime() - min) / span) * 90 + 5, // 5–95%
    }));
  });

  setTimeRange(r: TimeRange) {
    this.timeRange.set(r);
    this.selectedEvent.set(null);
  }

  selectEvent(event: TimelineEvent) {
    this.selectedEvent.update(cur => cur?.id === event.id ? null : event);
  }

  typeIcon(type: TimelineEvent['type']): string {
    const icons: Record<TimelineEvent['type'], string> = {
      milestone: '🏁',
      meeting: '💬',
      release: '🚀',
      decision: '✓',
    };
    return icons[type];
  }

  typeLabel(type: TimelineEvent['type']): string {
    const labels: Record<TimelineEvent['type'], string> = {
      milestone: 'Milepæl',
      meeting: 'Møde',
      release: 'Release',
      decision: 'Beslutning',
    };
    return labels[type];
  }

  ranges: { key: TimeRange; label: string }[] = [
    { key: '1m', label: 'Seneste måned' },
    { key: '6m', label: 'Seneste 6 mdr.' },
    { key: '1y', label: 'Seneste år' },
    { key: 'all', label: 'Alt' },
  ];
}
