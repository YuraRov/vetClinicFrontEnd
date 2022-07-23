import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Specialization} from "../../../../core/models/Specialization";
import {ResourceService} from "../../../../core/services/resourceService/resource.service";
import {Location} from "@angular/common";
import {catchError} from "rxjs/operators";
import {Procedure} from "../../../../core/models/Procedure";
import {SpecializationParameters} from "../../../../core/models/operational-models/QueryParameters/SpecializationParameters";
import {User} from "../../../../core/models/User";

@Injectable({
  providedIn: 'root'
})
export class SpecializationService extends ResourceService<Specialization>{

  constructor(private httpClient : HttpClient,
              private currentLocation: Location) {
    super(httpClient, currentLocation, Specialization, "https://localhost:5001/api/specialization");
  }

  getAllSpecializations(pageNumber : number = 1, pageSize: number = 4)
    : Observable<SpecializationParameters>{
    let url = `${this.apiUrl}?PageNumber=${pageNumber}&PageSize=${pageSize}`;

    return this.http.get<SpecializationParameters>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<SpecializationParameters>('GetAllSpecializations'))
      );
  }

  removeProcedure(procedureId: number, specializationId: number) : Observable<void>{
    const requestUrl = `${this.apiUrl}/removeProcedure/${specializationId}/${procedureId}`;
    return this.http.put<void>(requestUrl, this.httpOptions)
      .pipe(
        catchError(this.handleError<void>('delete'))
      );
  }

  addProcedures(specialization : Specialization) : Observable<void>{
    const requestUrl = `${this.apiUrl}/addProcedures/${specialization.id}`;
    const viewModel = {
      id: specialization.id,
      name: specialization.name,
      procedureIds: specialization.procedures!.map(procedure => procedure.id)
    };
    return this.http.put<void>(requestUrl,viewModel,this.httpOptions)
      .pipe(
        catchError(this.handleError<void>('update'))
      );
  }

  getEmployees() : Observable<User[]>{
    let url = `${this.apiUrl}/employees`;
    return this.http.get<User[]>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<User[]>('get'))
      );
  }

  addUsers(specialization: Specialization) : Observable<void>{
    const  requestUrl = `${this.apiUrl}/addUsers/${specialization.id}`;
    const viewModel = {
      id: specialization.id,
      name: specialization.name,
      usersIds: specialization.users!.map(user => user.id)
    };

    return this.http.put<void>(requestUrl,viewModel, this.httpOptions)
      .pipe(
        catchError(this.handleError<void>('update'))
      );
  }

  removeUser(userId : number, specializationId : number){
    const requestUrl = `${this.apiUrl}/removeUser/${specializationId}/${userId}`;
    return this.http.put<void>(requestUrl, this.httpOptions)
      .pipe(
        catchError(this.handleError<void>('delete'))
      );
  }
}
