import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URI } from '../../../core/constants/api_uri';

@Injectable({
  providedIn: 'root',

})
export class ApiService {

  constructor(
    private _httpClient: HttpClient
  ) {

  }


  adminSignIn(admin: AdminSignIn) {
    return this._httpClient.post(API_URI.adminSignInURI, {admin: admin})
  }
}


interface AdminSignIn {
  email: string;
  password: string;
}
