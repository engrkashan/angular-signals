import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  loginSignal = signal<boolean | null>(null);
  errorSignal = signal<boolean | null>(null);

  constructor(private http: HttpClient) {}

  submitLoginForm(event: Event) {
    if (event) {
      event.preventDefault();
    }

    if (this.loginForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    const formData = this.loginForm.value;

    this.loginSignal.set(true);
    this.errorSignal.set(null);

    this.http.post('http://localhost:3000/api/user/login', formData).subscribe({
      next: (response: any) => {
        localStorage.setItem('authToken', response.token);
        this.loginForm.reset();
        this.loginSignal.set(false);
        this.errorSignal.set(false);
      },
      error: (error) => {
        console.error('Error during login:', error);
        this.loginSignal.set(false);
        this.errorSignal.set(true);
      },
    });
  }
}
