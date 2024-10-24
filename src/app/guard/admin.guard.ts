import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

// Định nghĩa các loại quyền truy cập
export enum Permission {
  READ = 'READ',
  WRITE = 'WRITE',
  ADMIN = 'ADMIN'
}

// Định nghĩa các role có thể có
export type UserRole = 'user' | 'shop' | 'blog' | 'admin';

// Ánh xạ role với quyền truy cập
const rolePermissions: Record<UserRole, Permission[]> = {
  user: [Permission.READ],
  shop: [Permission.READ, Permission.WRITE],
  blog: [Permission.READ, Permission.WRITE],
  admin: [Permission.READ, Permission.WRITE, Permission.ADMIN]
};

// Định nghĩa kiểu dữ liệu cho user
interface User {
  role: UserRole;
}

export const adminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> => {
  const userService = inject(UserService);
  const router = inject(Router);
  const message = inject(NzMessageService);

  const requiredPermission = route.data['requiredPermission'] as Permission;

  return userService.getUserInfor().pipe(
    map((user: User | null) => {
      if (user && user.role) {
        const userPermissions = rolePermissions[user.role];
        
        if (userPermissions.includes(requiredPermission)) {
          return true;
        }
      }
      return false;
    }),
    tap(hasPermission => {
      if (!hasPermission) {
        // router.navigate(['unauthorized']);
        window.location.href = '/unauthorized';
        message.error('Bạn không có quyền truy cập vào trang này');
      }
    })
  );
};