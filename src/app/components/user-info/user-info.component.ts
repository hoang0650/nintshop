import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';// Service để lấy và cập nhật dữ liệu người dùng

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  userForm!: FormGroup;
  user: any;  // Dữ liệu người dùng
  isEditing: boolean = false;  // Kiểm soát trạng thái chỉnh sửa

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadUserData();
  }

  // Khởi tạo form
  initializeForm(): void {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: [{ value: '', disabled: true }],  // Không cho phép chỉnh sửa role
      phone: [''],
      address: ['']
    });
  }

  // Tải dữ liệu người dùng
  loadUserData(): void {
    this.userService.getUserInfor().subscribe((data) => {
      this.user = data;
      this.userForm.patchValue({
        username: this.user.username,
        email: this.user.email,
        role: this.user.role,
        phone: this.user.phone || '',
        address: this.user.address || ''
      });
    });
  }

  // Chuyển đổi giữa chế độ xem và chỉnh sửa
  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  // Gửi form để cập nhật thông tin
  onSubmit(): void {
    if (this.userForm.valid) {
      this.userService.updateUserInfo(this.userForm.value).subscribe((response) => {
        this.isEditing = false;
        this.loadUserData();  // Tải lại dữ liệu sau khi cập nhật thành công
      });
    }
  }
}
