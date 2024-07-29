import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  userName!: string;
  messgae: string = ' 👋 Welcome! Please start by telling us your name:';
  buttonContent: string = 'Start Shoping';
  isLogin: boolean = false;
  constructor(private router: Router) {}
  ngOnInit() {
    if (sessionStorage.getItem('userName')) {
      this.messgae = `👋 Hello ${sessionStorage.getItem('userName')}`;
      this.userName = sessionStorage.getItem('userName') as string;
      this.buttonContent = `Continue Shopping ...`;
      this.isLogin = true;
    } else this.isLogin = false;
  }
  onSubmit(form: any) {
    if (form.controls['userName'].errors?.['required']) return;
    sessionStorage.setItem('userName', this.userName);
    this.router.navigate(['/products']);
  }
  navigateToProducts() {
    this.router.navigate(['/products']);
  }
}
