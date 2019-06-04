import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


let httpOptions

  if(localStorage.getItem('token')){
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization' : `${'Token ' + localStorage.getItem('token')}}`})
    };
  } else {
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    };
  }
  




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = '/rest-auth/';  // URL to DJANGO!!!!!!!!!

  public result: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(private http: HttpClient,
              private messageService: MessageService,
              private router: Router) { }

  isLoggedIn: boolean = false;


  signin(username: string, password: string): Observable<any> {
    const credentials = {
      username,
      password
    };

    this.post(credentials, 'login/', `login to ${credentials.username}`).subscribe(
      (data: any) => {
        if (data.key) {
          localStorage.setItem('token', data.key);
          this.result.next({ success: true });
        }
      },
      error => {
        this.result.next({ success: false });
      }
    );
    return this.result;
  }

  logout(){
    this.post({}, 'logout/', 'logout').subscribe(data => {
      localStorage.removeItem('token');
      this.router.navigateByUrl('/login');
    });
    this.isLoggedIn = false;
  }



  post(obj, part_url, operation = 'operation') {
    part_url = this.authUrl + part_url
    return this.http.post(part_url, obj, httpOptions).pipe(
      catchError(this.handleError(operation)),
    );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation, result ?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed:${error.status} - ${error.statusText}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
  this.messageService.add(`⚫${message}`);
}

  }

