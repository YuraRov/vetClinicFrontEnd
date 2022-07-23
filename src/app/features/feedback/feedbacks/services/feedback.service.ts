import { Injectable } from '@angular/core';
import {ResourceService} from "../../../../core/services/resourceService/resource.service";
import {Feedback} from "../../../../core/models/Feedback";
import {HttpClient} from "@angular/common/http";
import {Location} from "@angular/common";
import {catchError, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {FeedbackParameters} from "../../../../core/models/operational-models/QueryParameters/FeedbackParameters";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService extends ResourceService<Feedback> {

  constructor(
    private httpClient: HttpClient,
    private currentLocation: Location
  ) {
    super(httpClient, currentLocation, Feedback, 'https://localhost:5001/api/feedback');
  }

  getFeedbacks(
    pageNumber: number = 1,
    pageSize: number = 5,
    filter: string | null = null): Observable<FeedbackParameters> {

    let url = `${this.apiUrl}?PageNumber=${pageNumber}&PageSize=${pageSize}`;

    if (filter!== null) {
      url += `&FilterParam=${filter}`;
    }

    return this.http.get<FeedbackParameters>(url, this.httpOptions)
      .pipe(catchError(this.handleError<FeedbackParameters>('getAll')));
  }
}
