import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  projectForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: AdminService) {
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      bloggerId: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.projectForm.valid) {
      this.apiService.createProject(this.projectForm.value).subscribe(
        response => {
          console.log('Project created successfully', response);
          // Handle success (e.g., show success message, redirect)
        },
        error => {
          console.error('Error creating project', error);
          // Handle error (e.g., show error message)
        }
      );
    }
  }
}
