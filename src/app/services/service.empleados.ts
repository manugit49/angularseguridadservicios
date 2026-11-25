import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Empleado } from "../models/empleado";
import { firstValueFrom } from "rxjs";
import { environment } from "../../environments/environment.development";
import { Login } from "../models/login";

@Injectable()
export class ServiceEmpleados {
    constructor(
        private _http: HttpClient
    ) {}

    async getEmpleadosAsync(): Promise<Empleado[]> {
        let request = "api/empleadosauth"
        let url = environment.apiejemplos + request;

        return firstValueFrom(
            this._http.get<Empleado[]>(url)
        )
    }

    async getPerfilAsync(): Promise<Empleado> {
        let request = "api/empleadosauth/perfilauth"
        let url = environment.apiejemplos + request;
        //Debemos recuperar el token
        let token = localStorage.getItem("TOKEN")
        console.log(token)
        //creamos la cabecera de validación
        let header = new HttpHeaders().set("Authorization","bearer " + token)
        return firstValueFrom(
            this._http.get<Empleado>(url, { headers: header })
        )
    }

    //Necesitamos saber si nos da error la petición o no
    async loginEmpleadosAsync(user: Login): Promise<any> {
        let request = "api/authempleados/login"
        let url = environment.apiejemplos + request
        let header = new HttpHeaders().set("content-type", "application/json")
        
        try {
            //Si no da error es aqui
            //Guardamos la petición en la variable data

            let data: any = await firstValueFrom(
                this._http.post(url, user, { headers: header})
            ) 
            //De data, guardamos el response (token)
            console.log(data)
            console.log(data.response)
            
            return data.response
        } catch (error) {
            console.log("errores de login");
            throw error;
        }
    }
}