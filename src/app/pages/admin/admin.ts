import { Component, inject, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { DatePipe, SlicePipe } from '@angular/common';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { ProjectFormPanelComponent } from '../../shared/project-form-panel/project-form-panel';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink, DatePipe, SlicePipe, ProjectFormPanelComponent],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin {
  private projectService = inject(ProjectService);
  private router = inject(Router);

  projects = this.projectService.projects;
  editingProject = signal<Project | null>(null);
  panelOpen = signal(false);
  deleteConfirmId = signal<string | null>(null);

  statusOptions: { value: Project['status']; label: string }[] = [
    { value: 'active', label: 'Aktiv' },
    { value: 'paused', label: 'Pause' },
    { value: 'completed', label: 'Afsluttet' },
    { value: 'archived', label: 'Arkiveret' },
  ];

  statusLabel(s: Project['status']) {
    return this.statusOptions.find(o => o.value === s)?.label ?? s;
  }

  openNew() { this.editingProject.set(null); this.panelOpen.set(true); }
  openEdit(p: Project) { this.editingProject.set(p); this.panelOpen.set(true); }
  closePanel() { this.panelOpen.set(false); this.editingProject.set(null); }
  onSaved() { this.closePanel(); }

  confirmDelete(id: string) { this.deleteConfirmId.set(id); }
  cancelDelete() { this.deleteConfirmId.set(null); }
  doDelete(id: string) { this.projectService.deleteProject(id); this.deleteConfirmId.set(null); }
  goToProject(id: string) { this.router.navigate(['/project', id]); }
}
