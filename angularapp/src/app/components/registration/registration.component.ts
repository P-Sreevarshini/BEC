import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm!: FormGroup;
  username: string = "";
  password: string = "";
  confirmPassword: string = "";
  mobileNumber: string = "";
  userRole: string = "";
  email: string = "";
  passwordMismatch: boolean = false; // New property to track password mismatch

  constructor(private authService: AuthService, private router: Router,private fb: FormBuilder) {

  }
  ngOnInit() {
   this.registrationForm = this.fb.group({
     mobileNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
     email: ['', [Validators.required, Validators.email]],
   });
 }
  register(): void {
    if (this.password !== this.confirmPassword) {
      this.passwordMismatch = true;
      return;
    }

    this.passwordMismatch = false;

    if (!this.isPasswordComplex(this.password)) {
      return; // Password complexity check failed
    }

    this.authService.register(this.username, this.password, this.userRole, this.email,this.mobileNumber).subscribe(
      (user) => {
        console.log(user);

          this.router.navigate(['/login']);
  
      },
      (error) => {
        console.log(error);

        // Handle registration error, display a message, etc.
      }
    );
  }
  isPasswordComplex(password: string): boolean {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\-]/.test(password);

    return hasUppercase && hasLowercase && hasDigit && hasSpecialChar;
  }

}
