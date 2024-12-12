import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Add CommonModule here
})
export default class ContactComponent {
  contactForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', Validators.required),
  });

  submitSignal = signal<boolean | null>(null); // null means no action yet
  errorSignal = signal<boolean | null>(null);

  constructor(private http: HttpClient) {}

  submitContactForm(event: Event) {
    if (event) {
      event.preventDefault();
    }

    if (this.contactForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    const contactData = {
      firstName: this.contactForm.value.firstName || '',
      lastName: this.contactForm.value.lastName || '',
      email: this.contactForm.value.email || '',
      message: this.contactForm.value.message || '',
    };

    this.submitSignal.set(true); // Indicate form is being submitted
    this.errorSignal.set(null); // Reset error state

    this.http
      .post('http://localhost:3000/api/contact-us', contactData)
      .subscribe({
        next: (response: any) => {
          console.log('API response:', response);
          this.contactForm.reset();
          this.submitSignal.set(false); // Success state
          this.errorSignal.set(false); // No error
        },
        error: (error) => {
          console.error('Error submitting form:', error);
          this.submitSignal.set(false); // Not in progress
          this.errorSignal.set(true); // Error occurred
        },
      });
  }
}
