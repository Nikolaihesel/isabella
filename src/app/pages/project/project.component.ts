import { Component, inject, input, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CdkDrag, CdkDropList, CdkDragHandle, CdkDropListGroup, CdkDragPlaceholder, moveItemInArray, transferArrayItem, CdkDragDrop } from '@angular/cdk/drag-drop';
import { ProjectService } from '../../services/project.service';
import { PeopleWidgetComponent } from '../../widgets/people-widget/people-widget.component';
import { ProjectInfoWidgetComponent } from '../../widgets/project-info-widget/project-info-widget.component';
import { TimelineWidgetComponent } from '../../widgets/timeline-widget/timeline-widget.component';
import { DecisionLogWidgetComponent } from '../../widgets/decision-log-widget/decision-log-widget.component';
import { MeetingNotesWidgetComponent } from '../../widgets/meeting-notes-widget/meeting-notes-widget.component';
import { ProjectFormPanelComponent } from '../../shared/project-form-panel/project-form-panel';

export type WidgetType =
  | 'people'
  | 'project-info'
  | 'timeline'
  | 'decision-log'
  | 'meeting-notes';

export interface WidgetConfig {
  id: string;
  type: WidgetType;
  title: string;
}

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    RouterLink,
    CdkDrag, CdkDropList, CdkDragHandle, CdkDropListGroup, CdkDragPlaceholder,
    PeopleWidgetComponent,
    ProjectInfoWidgetComponent,
    TimelineWidgetComponent,
    DecisionLogWidgetComponent,
    MeetingNotesWidgetComponent,
    ProjectFormPanelComponent,
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent {
  private projectService = inject(ProjectService);

  id = input<string>('');
  project = computed(() => this.projectService.getProjectById(this.id()));
  panelOpen = signal(false);

  openEdit() { this.panelOpen.set(true); }
  closePanel() { this.panelOpen.set(false); }
  onSaved() { this.closePanel(); }

  leftWidgets: WidgetConfig[] = [
    { id: 'project-info', type: 'project-info', title: 'Projektinfo' },
    { id: 'people',       type: 'people',        title: 'Team' },
  ];

  rightWidgets: WidgetConfig[] = [
    { id: 'timeline',   type: 'timeline',      title: 'Tidslinje' },
    { id: 'decisions',  type: 'decision-log',  title: 'Beslutningslog' },
    { id: 'meetings',   type: 'meeting-notes', title: 'Mødenoter' },
  ];

  drop(event: CdkDragDrop<WidgetConfig[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
