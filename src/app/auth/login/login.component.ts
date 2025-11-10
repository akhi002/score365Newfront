import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm;

  constructor(private fb: FormBuilder, private router: Router) {
    // Initialize inside constructor
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.router.navigate(['/app/dashboard']);
    }
  }
}
