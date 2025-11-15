import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading = false;
  loginForm!: FormGroup;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.errorMsg = 'Please fill in all fields correctly.';
      return;
    }

    this.loading = true;
    this.errorMsg = '';

    this.api.loginUser(this.loginForm.value).subscribe({
      next: (res: any) => {
        this.loading = false;
        if (res.success && res.token) {
          // ✅ Save token
          localStorage.setItem('token', res.token);

          // ✅ Optionally store basic user info
          if (res.user) {
            localStorage.setItem('user', JSON.stringify(res.user));
          }

          // ✅ Navigate to matches list page
          this.router.navigate(['/app/dashboard']);
        } else {
          this.errorMsg = res.message || 'Invalid credentials';
        }
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = err.error?.message || 'Login failed. Please try again.';
      }
    });
  }
}
