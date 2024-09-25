import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  login(){
    // const user = {email: this.email,password: this.password}
    // this.userService.login(user).subscribe(response=>{
    //   localStorage.setItem('access_token',response.token);
    //   this.userService.loggedIn.next(true)
    //   this.router.navigate(['home'])

    // },error=>{
    //   console.error('Đăng nhập thất bại',error)
      
    // })
  }
}
