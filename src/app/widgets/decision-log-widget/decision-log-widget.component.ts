import { Component, inject, input, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-decision-log-widget',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './decision-log-widget.component.html',
  styleUrl: './decision-log-widget.component.scss',
})
export class DecisionLogWidgetComponent {
  private projectService = inject(ProjectService);
  projectId = input.required<string>();

  decisions = computed(() => this.projectService.getDecisionsByProjectId(this.projectId()));
}
