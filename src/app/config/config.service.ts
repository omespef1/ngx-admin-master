import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  configUrl = 'http://localhost/rgnblome/api/';
  constructor(private http:HttpClient) { }

  
}
