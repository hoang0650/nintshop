import { Component, OnInit } from '@angular/core';

declare var window: any;

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  users = [
    { username: 'john_doe', email: 'john@example.com', role: 'User', blocked: false, image: 'https://via.placeholder.com/50' },
    { username: 'jane_doe', email: 'jane@example.com', role: 'Admin', blocked: true, image: 'https://via.placeholder.com/50' }
  ];

  roles = ['User', 'Admin'];
  totalUsers = this.users.length;
  selectedUser: any = {};

  loginHistory = [
    'john_doe logged in at 10:00 AM',
    'jane_doe logged in at 12:30 PM'
  ];

  orderHistory = [
    'Order #123 by john_doe at 1:00 PM',
    'Order #456 by jane_doe at 2:30 PM'
  ];

  editUserModal: any;

  constructor() { }

  ngOnInit(): void {
    // Initialize Bootstrap modal
    this.editUserModal = new window.bootstrap.Modal(document.getElementById('editUserModal'));
  }

  editUser(user: any) {
    this.selectedUser = { ...user }; // Copy thông tin người dùng được chọn
    this.editUserModal.show(); // Hiển thị modal
  }

  saveChanges() {
    console.log('User after editing:', this.selectedUser);
    // Cập nhật thông tin người dùng thông qua API hoặc trong local
    this.editUserModal.hide(); // Đóng modal sau khi lưu
  }

  closeModal(){
    this.editUserModal.hide();
  }

  updateUserRole(user: any) {
    console.log('Updated role:', user);
    // API call to update role
  }

  toggleBlockUser(user: any) {
    console.log('Toggled block status:', user);
    // API call to block/unblock user
  }

  deleteUser(user: any) {
    console.log('Delete user:', user);
    // Logic for deleting user
  }
}
