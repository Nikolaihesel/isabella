import { Component, inject, input, computed } from '@angular/core';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-explain-project-widget',
  standalone: true,
  imports: [],
  templateUrl: './explain-project-widget.component.html',
  styleUrl: './explain-project-widget.component.scss',
})
export class ExplainProjectWidgetComponent {
  private projectService = inject(ProjectService);
  projectId = input.required<string>();

  summary = computed(() => this.projectService.getAiSummary(this.projectId()));
}
