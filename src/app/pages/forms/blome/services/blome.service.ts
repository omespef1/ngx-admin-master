import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {Gn_blome} from '../models/models';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})


}
@Injectable({
  providedIn: 'root'
})


export class BlomeService {
  apiUrl:string="http://186.154.240.181/seven/sevenweb/api/CnBlome";
  //apiUrl:string="http://localhost/RCnBlome/api/CnBlome";

  constructor(private http:HttpClient) { }

//  GetBlome(myblome:Gn_blome){
//    return this.http.get<Gn_blome[]>(`${this.config.configUrl}api/`).subscribe()
//  }


 getBlome (myBlome:Gn_blome): Observable<Gn_blome[]> {
  return this.http.get<Gn_blome[]>(`${this.apiUrl}?Blo_Anop=${myBlome.Blo_Anop}&Blo_Mesp=${myBlome.Blo_Mesp}&Emp_Codi=${myBlome.Emp_Codi}&Blo_Acti=${myBlome.Blo_Acti}`)
    .pipe(    
      tap(data => console.log('fetched products')),
      catchError(this.handleError('getProducts', []))
    );
}
setBlome (myBlome): Observable<Gn_blome> {
  return this.http.post<Gn_blome>(this.apiUrl, myBlome, httpOptions).pipe(
    tap((myBlome: Gn_blome) => console.log(`added product w/ id=${myBlome.Blo_Acti}`)),
    catchError(this.handleError<Gn_blome>('addProduct'))
  );
}

deleteBlome (myBlome): Observable<Gn_blome> {
  console.log("borrando...");
  return this.http.post<Gn_blome>(`${this.apiUrl}/delete`, myBlome, httpOptions).pipe(
    tap((myBlome: Gn_blome) => console.log(`added product w/ id=${myBlome.Blo_Acti}`)),
    catchError(this.handleError<Gn_blome>('addProduct'))
  );
}


updateBlome (myBlome:Gn_blome): Observable<Gn_blome> {
  return this.http.post(`${this.apiUrl}/update`, myBlome, httpOptions).pipe(
    tap(_ => console.log(`updated product id=${myBlome.Blo_Mesp}`)),
    catchError(this.handleError<any>('updateProduct'))
  );
}

private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

}
