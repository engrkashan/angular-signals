import { Component, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export default class ContactComponent {
  contactForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', Validators.required),
  });

  firstName = signal('hello');
  lastName = signal('dark');
  email = signal('dakr@gmail.com');
  message = signal('good work');
  responseMessage = signal<string | null>(null);

  constructor(private http: HttpClient) {}

  handleInput(event: Event, signal: Signal<string>) {
    alert('Form submitted!');
    console.log("event is here",event.target)
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    console.log("event is here",event)
    // if (target) {
    //   signal(target.value); // Pass the input value to the signal
    // }
  }

  submitContactForm(event: Event) {
    console.log('event =======', event);
    if (event) {
      event.preventDefault(); // Prevent default form submission
    }

    const contactData = {
      firstName: this.firstName(),
      lastName: this.lastName(),
      email: this.email(),
      message: this.message(),
    };

    this.http
      .post('http://localhost:3000/api/contact-us', contactData)
      .subscribe({
        next: (response: any) => {
          console.log(response.message);
          this.responseMessage.update(() => response.message); // Update with response
        },
        error: (error) => {
          console.error('Error submitting the contact form:', error);
          this.responseMessage.update(
            () =>
              'There was an error submitting your message. Please try again.'
          ); // Update with error message
        },
      });
  }
}
