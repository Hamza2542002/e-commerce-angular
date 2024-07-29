import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  userName: string = '';
  constructor(private router: Router) {}
  onSubmit(form: any) {
    if (form.controls['userName'].errors?.['required']) return;
    sessionStorage.setItem('userName', this.userName);
    this.router.navigate(['/products']);
  }
}
