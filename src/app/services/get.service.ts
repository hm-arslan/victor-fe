import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'src/assets/configuration';

@Injectable({
  providedIn: 'root'
})
export class GetService {

  _url: string = ''

  constructor(private _http: HttpClient) { }

  getRequest(apiPath: string) {
    this._url = config.baseURL + apiPath;
    var res = this._http.get<any>(this._url)
    return res
  }

  getRequestWithParams(apiPath: string, reportID: string) {
    this._url = config.baseURL + apiPath;
    let queryparams = new HttpParams().set("reportID", reportID)
    var res = this._http.get<any>(this._url, { params: queryparams })
    return res
  }
}
