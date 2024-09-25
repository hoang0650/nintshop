import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  onSubmit() {
    // if (this.registerForm.valid) {
    //   this.userData = this.registerForm.value as User

    //   this.userService.signUp(this.userData).subscribe((response) => {
    //     console.log('successful!', response);
    //     this.router.navigate(['login'])
    //   }, (err) => {
    //     console.error('failed', err);
    //   })
    // }

  }

}
