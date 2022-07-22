import { Location } from "@angular/common";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { FinStatementOneMonth } from "../../models/FinancialStatement/FinStatementOneMonth";
import { MyDate } from '../../models/FinancialStatement/MyDate';
import { FinancialStatementParameters } from "../../models/operational-models/QueryParameters/FinancialStatementParameters";
import { ResourceService } from '../resourceService/resource.service';

@Injectable({
  providedIn: 'root'
})
export class FinancialStatementService extends ResourceService <FinStatementOneMonth>{

  constructor(
    private httpClient: HttpClient,
    private currentLocation: Location
  ) {
    super(httpClient, currentLocation, FinStatementOneMonth, 'https://localhost:5001/api/financialStatements');
  }

  getPDF(data: MyDate, pageNumber: number = 1, pageSize: number = 5): Observable<any> {
    let subUrl = 'https://localhost:5001/api/Financial'
    let url = `${subUrl}/generatePDF/?Date.StartDate=${data.startDate.toISOString()}&Date.EndDate=${data.endDate.toISOString()}&PageNumber=${pageNumber}&PageSize=${pageSize}`;
    return this.httpClient.get(url, { responseType: 'blob' });
  }

  getAllFinStat( data: MyDate ,pageNumber: number = 1, pageSize: number = 5)
    : Observable<FinancialStatementParameters> {

    let url = `${this.apiUrl}?Date.StartDate=${data.startDate.toISOString()}&Date.EndDate=${data.endDate.toISOString()}&PageNumber=${pageNumber}&PageSize=${pageSize}`;

    return this.http.get<FinancialStatementParameters>(url, this.httpOptions);
  }

  getFinancialStatement(data: MyDate): Observable<FinStatementOneMonth[]> {
    const viewModel =
    {
      startDate: data.startDate,
      endDate: data.endDate
    };
    return this.http.post<FinStatementOneMonth[]>(this.apiUrl, viewModel, this.httpOptions)
      .pipe(
        map((result) => result.map((i) => new this.tConstructor(i))),
        catchError(this.handleError<FinStatementOneMonth[]>('getAll'))
        );
  }

}
