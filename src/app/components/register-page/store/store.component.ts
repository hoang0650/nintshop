import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { UserService } from '../../../services/user.service';
@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent implements OnInit {
  storeForm!: FormGroup;
  userId: string = '';

  constructor(private fb: FormBuilder, private apiService: AdminService, private userService: UserService) {
    this.storeForm = this.fb.group({
      storeName: ['', Validators.required],
      ownerName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userService.getUserInfor().subscribe((data:any)=>{
      this.userId = data._id
    })
  }

  onSubmit() {
    if (this.storeForm.valid) {
      this.apiService.registerStore(this.storeForm.value).subscribe(
        response => {
          console.log('Store registered successfully', response);
          // Handle success (e.g., show success message, redirect)
        },
        error => {
          console.error('Error registering store', error);
          // Handle error (e.g., show error message)
        }
      );
    }
  }
}
