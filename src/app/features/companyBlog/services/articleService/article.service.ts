import { Injectable } from '@angular/core';
import {ResourceService} from "../../../../core/services/resourceService/resource.service";
import {Article} from "../../../../core/models/Article";
import {HttpClient} from "@angular/common/http";
import {Location} from "@angular/common";
import {AuthService} from "../../../../core/services/authService/auth.service";
import {catchError, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {ArticleParameters} from "../../../../core/models/operational-models/QueryParameters/ArticleParameters";

@Injectable({
  providedIn: 'any'
})
export class ArticleService extends ResourceService<Article>{

  constructor(
    private httpClient: HttpClient,
    private currentLocation: Location,
    private authService: AuthService) {
      super(httpClient, currentLocation, Article, 'https://localhost:5001/api/articles');
  }

  getAllPaged(pageNumber: number = 1,
              pageSize: number = 5,
              filterParam: string | null = null,
              orderByParam: string | null = null,
              orderByDirection: string | null = null,
              published:boolean = false): Observable<ArticleParameters> {
    let url: string = this.apiUrl;

    if(published){
      url += '/published';
    }

    if(this.authService.isAuthorized() && this.authService.isInRole('Admin')){
      pageSize -= 1;
    }

    url += `?PageNumber=${pageNumber}&PageSize=${pageSize}`;
    if (filterParam !== null) {
      url += `&FilterParam=${filterParam}`;
    }

    if (orderByParam !== null) {
      url += `&OrderByParam=${orderByParam}`;
    }

    if(orderByDirection !== null){
      url += `&OrderByDirection=${orderByDirection}`;
    }

    return this.http.get<ArticleParameters>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<ArticleParameters>('getAll'))
      );
  }

  discardEditing(): Observable<void>{
    const url: string = `${this.apiUrl}/discard`
    return this.httpClient.post<void>(url, {}, this.httpOptions)
      .pipe(
        catchError(this.handleError<void>('discardEditing'))
      );
  }

  postArticle(article: Article): Observable<Article>{
    const viewModel = {
      title: article.title,
      body: article.body,
      published: article.published,
      authorId: this.authService.getUserId()! as number
    }

    return this.httpClient.post<Article>(this.apiUrl, viewModel, this.httpOptions)
      .pipe(
        map((result) => new this.tConstructor(result)),
        catchError(this.handleError<Article>('postArticle'))
      );
  }

  updateArticle(article: Article): Observable<Article>{
    const viewModel = {
      id: article.id,
      title: article.title,
      body: article.body,
      published: article.published,
    }

    return this.httpClient.put<Article>(this.apiUrl, viewModel, this.httpOptions)
      .pipe(
        map((result) => new this.tConstructor(result)),
        catchError(this.handleError<Article>('updateArticle'))
      );
  }
}
