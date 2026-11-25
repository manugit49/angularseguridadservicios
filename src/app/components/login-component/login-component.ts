import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { ServiceEmpleados } from '../../services/service.empleados';
import { Login } from '../../models/login';

@Component({
  selector: 'app-login-component',
  standalone: false,
  styleUrl: './login-component.css',
  templateUrl: './login-component.html',
})
export class LoginComponent {
  @ViewChild('cajausuario') cajausuario!: ElementRef
  @ViewChild('cajapassword') cajapassword!: ElementRef
  mensaje!: string

  constructor(
    private _service: ServiceEmpleados,
    private _cdr: ChangeDetectorRef
  ) {}

  async validarUsuario(): Promise<void> {
    let nombre = this.cajausuario.nativeElement.value
    let pass = this.cajapassword.nativeElement.value
    let user = new Login(nombre, pass);
    try{
      //si funciona, recuperamos el token
      let token = await this._service.loginEmpleadosAsync(user)
      this.mensaje = "Usuario correcto"
      //almacenamos el token en localStorage
      localStorage.setItem("TOKEN", token)
    } catch(error){
      this.mensaje = "Credenciales no válidas"
    }
    this._cdr.detectChanges()
  }
}
