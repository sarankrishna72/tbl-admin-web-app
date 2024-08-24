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
  adminSignIn(admin: SignInInterface) {
    return this._httpService.post(API_URI.adminSignInURI, {admin: admin})
  }

  /**
   * Admin Sign in Api Service Call
   *
   * @param {AdminSignIn} admin
   * @return {*}
   * @memberof ApiService
   */
  cashierSignIn(admin: SignInInterface) {
    return this._httpService.post(API_URI.cashierSignInURI, {cashier: admin})
  }



  /**
   * Get User Account Information for the Cashier to Add Wallet Points
   *
   * @param {*} data
   * @return {*}
   * @memberof ApiService
   */
  cashierGetUserDetails(data: any) {
    return this._httpService.get(API_URI.cashierUserDetailsURI, {params: data})
  }

  /**
   * Update User Wallet Points
   *
   * @param {*} data
   * @return {*}
   * @memberof ApiService
   */
  cashierUpdateWalletPoints(data: any) {
    return this._httpService.post(API_URI.cashierUpdateWalletPointsURI, data)
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
interface SignInInterface {
  email: string;
  password: string;
}
