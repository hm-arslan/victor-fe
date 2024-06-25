import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpParams } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { config } from 'src/assets/configuration';

@Injectable({
  providedIn: 'root'
})
export class SetService {

  _url: string = ''

    constructor(private _http: HttpClient) { }

    postRequest (apiPath:string , data:JSON){
        // this._url = environment.apiURL +  apiPath;
        this._url = apiPath;
        return this._http.post<any>(this._url, data)
    }

    deleteRequest (apiPath:string, data:any){
        // this._url = environment.apiURL +  apiPath + data;
        return this._http.delete<any>(this._url, data)
    }

    postRequest_FormGroup(apiPath: string, data: FormGroup) {
      // this._url = environment.apiURL +  apiPath;
      this._url = apiPath;
      return this._http.post<any>(this._url, data)
    }
  
    postRequest_FormData(apiPath: string, data: FormData) {
      // this._url = environment.apiURL +  apiPath;
      this._url = config.baseURL + apiPath;
      return this._http.post<any>(this._url, data)
    }

}
