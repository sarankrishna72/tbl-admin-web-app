import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  BASE_URI = environment.baseURI;
  constructor(
    private _httpClient: HttpClient
  ) { }

  /**
   * Post Request Method
   *
   * @param {string} url
   * @param {*} body
   * @param {*} headers
   * @memberof HttpService
   */
  post(url: string, body: any, headers ?: any) {
    return this._httpClient.post(`${this.BASE_URI}${url}`, body, headers)
  }

  /**
   * Get Request Method
   *
   * @param {string} url
   * @param {*} configs
   * @memberof HttpService
   */
  get(url: string, configs?: any) {
    return this._httpClient.get(`${this.BASE_URI}${url}`, configs)
  }

  /**
   * Put Request Method
   *
   * @param {string} url
   * @param {*} body
   * @param {*} headers
   * @memberof HttpService
   */
  put(url: string, body: any, headers?: any) {
    return this._httpClient.put(`${this.BASE_URI}${url}`, body, headers)
  }

  /**
   * Delete Request Method
   *
   * @param {string} url
   * @param {*} configs
   * @memberof HttpService
   */
  delete(url: string, configs ?: any) {
    return this._httpClient.delete(`${this.BASE_URI}${url}`, configs)
  }

}
