import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css'
})
export class InicioSesionComponent {
  email: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.userService.validateUser(this.email).subscribe(
      (response) => {
        if (response.exists) {
          // Redirigir a la página de productos o perfil
          this.router.navigate(['/products']);
        } else {
          // Mostrar mensaje de error
          this.errorMessage = 'El correo no está registrado. Por favor, regístrate.';
        }
      },
      (error) => {
        console.error(error);
        this.errorMessage = 'Hubo un problema con el servidor. Inténtalo de nuevo.';
      }
    );
  }
}
