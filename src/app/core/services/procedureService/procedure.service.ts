import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { map } from "rxjs/operators";
import { Location } from "@angular/common";
import { Procedure } from '../../models/Procedure';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { ResourceService } from '../resourceService/resource.service';

@Injectable({
  providedIn: 'root'
})
export class ProcedureService extends ResourceService<Procedure> {

  constructor(
    private httpClient: HttpClient,
    private currentLocation: Location
  ) {
    super(httpClient, currentLocation, Procedure, 'https://localhost:5001/api/procedures');
  }

  createProcedure(procedure: Procedure): Observable<Procedure>{
    const viewModel = {
      id: procedure.id,
      name: procedure.name,
      cost: procedure.cost,
      durationInMinutes: procedure.durationInMinutes,
      description: procedure.description,
      specializationIds: procedure.specializations!.map(spec => spec.id)
    };
    return this.httpClient.post<Procedure>(this.apiUrl, viewModel, this.httpOptions)
    .pipe(
      map((result) => new this.tConstructor(result)),
      catchError(this.handleError<Procedure>('getById'))
    );
  }

  updateProcedure(procedure: Procedure): Observable<Procedure>{
    const viewModel = {
      id: procedure.id,
      name: procedure.name,
      cost: procedure.cost,
      durationInMinutes: procedure.durationInMinutes,
      description: procedure.description,
      specializationIds: procedure.specializations!.map(spec => spec.id)
    };
    return this.httpClient.put<Procedure>(this.apiUrl, viewModel, this.httpOptions)
    .pipe(
      map((result) => new this.tConstructor(result)),
      catchError(this.handleError<Procedure>('getById'))
    );
  }
}