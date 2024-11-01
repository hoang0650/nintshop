import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrl: './complaint.component.css'
})
export class ComplaintComponent {
  complaintForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: AdminService) {
    this.complaintForm = this.fb.group({
      subject: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(20)]],
      relatedEntityType: ['', Validators.required],
      relatedEntityId: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.complaintForm.valid) {
      this.apiService.submitComplaint(this.complaintForm.value).subscribe(
        response => {
          console.log('Complaint submitted successfully', response);
          // Handle success (e.g., show success message, redirect)
        },
        error => {
          console.error('Error submitting complaint', error);
          // Handle error (e.g., show error message)
        }
      );
    }
  }
}
