import { Component, inject, input, computed } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-people-widget',
  standalone: true,
  imports: [],
  templateUrl: './people-widget.component.html',
  styleUrl: './people-widget.component.scss',
})
export class PeopleWidgetComponent {
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
}
