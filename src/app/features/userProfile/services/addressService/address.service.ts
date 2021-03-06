import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Address} from "../../../../core/models/Address";
import { Location } from "@angular/common";
import {ResourceService} from "../../../../core/services/resourceService/resource.service";

@Injectable({
  providedIn: 'any'
})
export class AddressService extends ResourceService<Address> {

  constructor(
    private httpClient: HttpClient,
    private currentLocation: Location
  ) {
    super(httpClient, currentLocation, Address, 'https://localhost:5001/api/addresses');
  }
}
