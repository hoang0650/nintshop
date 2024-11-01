import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { MessageService } from '../../../services/message.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email!: string;
  password!: string;
  constructor(private userService:UserService, private router:Router, private messageService:MessageService) { }

  ngOnInit(): void {
  }
  login(){
    const user = {email: this.email,password: this.password}
    this.userService.login(user).subscribe(response=>{
      this.messageService.addMessage('success', 'This is an success message!');
      localStorage.setItem('access_token',response.token);
      this.userService.loggedIn.next(true)
      window.location.href = '/home';

    },error=>{
      this.messageService.addMessage('danger', 'Invalid username or password!');
      console.error('Đăng nhập thất bại',error)
      
    })
  }

}