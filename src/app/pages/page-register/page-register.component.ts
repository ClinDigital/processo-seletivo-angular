import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-page-register',
  templateUrl: './page-register.component.html',
  styleUrls: ['./page-register.component.scss']
})
export class PageRegisterComponent {

  constructor(
    private router: Router,
    private registerService: RegisterService,
    private toastService: ToastService,
  ){}

  form: FormGroup = new FormGroup({
    cpf: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    phoneNumber: new FormControl('', [Validators.required])
  });

  register() {
    if (this.form.valid) {
      const { cpf, name, email, password, phoneNumber } = this.form.value;

      this.registerService.register(cpf, name, email, password, phoneNumber).subscribe({
        next: () => {
          alert("Registro concluído com sucesso!");
          this.router.navigate(['/login']);
        },
        error: (err: any) => {
          this.toastService.showError(err?.error?.message);
        },
      });
    } else {
      this.toastService.showError("Por favor, preencha todos os campos corretamente.");
    }
  }

}
