import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { Options } from 'src/app/shared/interfaces/toast';
import { UtilService } from 'src/app/shared/services/util.service';
import { AuthService } from 'src/app/auth/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  loginForm: FormGroup;
  imageElement: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private util: UtilService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [null, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.status === 'VALID') {
      const form = this.loginForm.value;
      this.authService.login(form).subscribe(
        (data) => {
          if (data) {
            this.router.navigate(['/project']);
          }
        },
        (error) => {
          const optios: Options = {
            position: 'top',
            color: 'danger',
            duration: 4500,
            message: 'Ocorreu um erro!',
          };
          this.util.showMessage(optios);
        }
      );
    }
  }

  onRegister(): void {
    this.util.showMessage({
      duration: 4000,
      color: 'warning',
      message: 'Indisponível no Momento',
      position: 'top',
    });
  }

  keyDownFunction(event): void {
    if (event.keyCode === 13) {
      this.onSubmit();
    }
  }

  onReset(): void {
    this.loginForm.reset();
  }
}
