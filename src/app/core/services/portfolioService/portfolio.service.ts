import { Injectable } from '@angular/core';
import { ResourceService } from "../resourceService/resource.service";
import { Portfolio } from "../../models/Portfolio";
import { HttpClient } from "@angular/common/http";
import { Location } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class PortfolioService extends ResourceService<Portfolio> {

  constructor(
    private httpClient: HttpClient,
    private currentLocation: Location
  ) {
    super(httpClient, currentLocation, Portfolio, 'https://localhost:5001/api/portfolios');
  }
}