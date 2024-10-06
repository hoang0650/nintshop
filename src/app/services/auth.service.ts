import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser = { role: 'admin' }; // Mock current user

  hasPermission(permission: string): boolean {
    // Kiểm tra quyền của người dùng hiện tại
    return this.currentUser.role === permission;
  }
}
