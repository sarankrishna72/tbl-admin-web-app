import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URI } from '../../../core/constants/api_uri';
import { environment } from '../../../../environments/environment';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root',

})
export class ApiService {

  constructor(
    private _httpService: HttpService
  ) {}

  /**
   * Admin Sign in Api Service Call
   *
   * @param {AdminSignIn} admin
   * @return {*}
   * @memberof ApiService
   */
  adminSignIn(admin: AdminSignIn) {
    return this._httpService.post(API_URI.adminSignInURI, {admin: admin})
  }


  /**
   * Get a list of Cities
   *
   * @return {*}
   * @memberof ApiService
   */
  getCitiesList() {
    return this._httpService.get(API_URI.citiesURI)
  }


}


/**
 * Interface for admin SignIn Data API
 *
 * @interface AdminSignIn
 */
interface AdminSignIn {
  email: string;
  password: string;
}
