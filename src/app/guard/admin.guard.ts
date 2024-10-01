import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const adminGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService); // Inject UserService
  const router = inject(Router); // Inject Router để điều hướng nếu không có quyền

  // Kiểm tra quyền admin từ dữ liệu người dùng
  return userService.getUserInfor().pipe(
    map((user) => {
      if (user && user.role === 'admin') {
        return true; // Trả về true nếu là admin
      }

      // Nếu không phải admin, điều hướng đến trang 'no-access'
      router.navigate(['/unauthorized']);
      return false;
    })
  );
};
