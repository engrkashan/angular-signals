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
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Add CommonModule here
})
export class SignUpComponent {
  signUpForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', Validators.required),
    marketingAccept: new FormControl(false),
  });

  submitSignal = signal<boolean | null>(null);
  errorSignal = signal<boolean | null>(null);

  constructor(private http: HttpClient) {}

  submitSignUpForm(event: Event) {
    if (event) {
      event.preventDefault();
    }

    if (this.signUpForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    const formData = this.signUpForm.value;
    if (formData.password !== formData.confirmPassword) {
      console.error('Passwords do not match');
      this.errorSignal.set(true);
      return;
    }

    const userData = {
      firstname: formData.firstName,
      lastname: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    this.submitSignal.set(true);
    this.errorSignal.set(null);

    this.http
      .post('http://localhost:3000/api/user/register', userData)
      .subscribe({
        next: (response: any) => {
          console.log('Registration successful:', response);
          this.signUpForm.reset();
          this.submitSignal.set(false);
          this.errorSignal.set(false);
        },
        error: (error) => {
          console.error('Error during registration:', error);
          this.submitSignal.set(false);
          this.errorSignal.set(true);
        },
      });
  }
}
