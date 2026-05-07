import { Component, inject, input, computed } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-workload-widget',
  standalone: true,
  imports: [],
  templateUrl: './workload-widget.component.html',
  styleUrl: './workload-widget.component.scss',
})
export class WorkloadWidgetComponent {
  private projectService = inject(ProjectService);
  projectId = input.required<string>();

  people = computed(() => this.projectService.getPeopleByProjectId(this.projectId()));

  workloadLabel(workload: Person['workload']): string {
    const labels: Record<Person['workload'], string> = {
      low: 'Lav belastning',
      medium: 'Middel belastning',
      high: 'Høj belastning',
      unavailable: 'Ikke tilgængelig',
    };
    return labels[workload];
  }

  workloadPercent(workload: Person['workload']): number {
    const pct: Record<Person['workload'], number> = {
      low: 30,
      medium: 65,
      high: 95,
      unavailable: 0,
    };
    return pct[workload];
  }
}
