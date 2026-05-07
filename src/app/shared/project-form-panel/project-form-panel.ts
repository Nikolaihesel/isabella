import { Component, inject, input, output, signal, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';

interface ProjectForm {
  name: string; description: string; background: string;
  status: Project['status']; version: string; startDate: string;
  tags: string; goals: string[]; milestoneTitle: string; milestoneDate: string;
}

function toForm(p: Project): ProjectForm {
  return {
    name: p.name, description: p.description, background: p.background,
    status: p.status, version: p.version,
    startDate: new Date(p.startDate).toISOString().split('T')[0],
    tags: p.tags.join(', '),
    goals: p.goals.length ? [...p.goals] : [''],
    milestoneTitle: p.nextMilestone?.title ?? '',
    milestoneDate: p.nextMilestone ? new Date(p.nextMilestone.date).toISOString().split('T')[0] : '',
  };
}

function emptyForm(): ProjectForm {
  return {
    name: '', description: '', background: '', status: 'active', version: '1.0.0',
    startDate: new Date().toISOString().split('T')[0],
    tags: '', goals: [''], milestoneTitle: '', milestoneDate: '',
  };
}

@Component({
  selector: 'app-project-form-panel',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './project-form-panel.html',
  styleUrl: './project-form-panel.scss',
})
export class ProjectFormPanelComponent {
  private projectService = inject(ProjectService);

  project = input<Project | null>(null);
  saved = output<Project>();
  cancelled = output<void>();

  form = signal<ProjectForm>(emptyForm());
  submitted = signal(false);

  statusOptions: { value: Project['status']; label: string }[] = [
    { value: 'active', label: 'Aktiv' },
    { value: 'paused', label: 'Pause' },
    { value: 'completed', label: 'Afsluttet' },
    { value: 'archived', label: 'Arkiveret' },
  ];

  constructor() {
    effect(() => {
      const p = this.project();
      this.submitted.set(false);
      this.form.set(p ? toForm(p) : emptyForm());
    });
  }

  patchForm(patch: Partial<ProjectForm>) { this.form.update(f => ({ ...f, ...patch })); }
  addGoal() { this.form.update(f => ({ ...f, goals: [...f.goals, ''] })); }
  updateGoal(i: number, v: string) {
    this.form.update(f => { const g = [...f.goals]; g[i] = v; return { ...f, goals: g }; });
  }
  removeGoal(i: number) {
    this.form.update(f => ({ ...f, goals: f.goals.filter((_, idx) => idx !== i) }));
  }
  isValid() {
    const f = this.form();
    return f.name.trim().length >= 2 && f.description.trim().length >= 2;
  }

  save() {
    this.submitted.set(true);
    if (!this.isValid()) return;
    const f = this.form();
    const tags = f.tags.split(',').map(t => t.trim()).filter(Boolean);
    const goals = f.goals.map(g => g.trim()).filter(Boolean);
    const nextMilestone = f.milestoneTitle.trim() && f.milestoneDate
      ? { title: f.milestoneTitle.trim(), date: new Date(f.milestoneDate) } : undefined;
    const existing = this.project();
    let result: Project;
    if (existing) {
      result = { ...existing, name: f.name.trim(), description: f.description.trim(),
        background: f.background.trim(), status: f.status, version: f.version.trim(),
        startDate: new Date(f.startDate), tags, goals, nextMilestone, lastActivity: new Date() };
      this.projectService.updateProject(result);
    } else {
      result = { id: this.projectService.generateId(f.name), name: f.name.trim(),
        description: f.description.trim(), background: f.background.trim(), status: f.status,
        version: f.version.trim() || '1.0.0', startDate: new Date(f.startDate),
        lastActivity: new Date(), tags, goals, nextMilestone };
      this.projectService.addProject(result);
    }
    this.saved.emit(result);
  }

  cancel() { this.cancelled.emit(); }
}
