import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
  @Input('appHasRole') requiredPermission: string = '';

  private permissions: { [key: string]: string[] } = {
    user: ['READ'],
    shop: ['READ', 'WRITE'],
    blog: ['READ', 'WRITE'],
    admin: ['READ', 'WRITE', 'ADMIN']
  };

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.getUserInfor().subscribe(user => {
      if (user && user.role && this.checkPermission(user.role)) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }

  private checkPermission(role: string): boolean {
    const userPermissions = this.permissions[role] || [];
    return userPermissions.includes(this.requiredPermission);
  }
}
