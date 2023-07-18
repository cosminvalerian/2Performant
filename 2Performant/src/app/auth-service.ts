import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, map } from 'rxjs'
import { SessionHeaders } from './interfaces/sesssionHeaders';
import { User } from './interfaces/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }

    login(user: User): Observable<any> {
        const url = '/users/sign_in.json';
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        
        const body = { user };

        return this.http.post(url, body, { headers: headers, observe: 'response' }).pipe(map((response: HttpResponse<any>) => {
            const sessionHeaders: SessionHeaders = {
                accessToken: response.headers.get('access-token'),
                client: response.headers.get('client'),
                expiry: response.headers.get('expiry'),
                tokenType: response.headers.get('token-type'),
                uid: response.headers.get('uid')
              };

              localStorage.setItem('sessionHeaders', JSON.stringify(sessionHeaders));
        
              // Return the response body or any other data you need
              return response.body;
            })
        );
    }

    logout(): void {
        localStorage.removeItem('sessionHeaders');
    }

    private getSessionHeaders(): SessionHeaders | null {
        const headersJson = localStorage.getItem('sessionHeaders');
        return headersJson ? JSON.parse(headersJson) : null;
    }

    isAuthenticated(): boolean {
        const sessionHeaders = this.getSessionHeaders();
        if(sessionHeaders?.accessToken && sessionHeaders.client)
            return true;
        return false;
    }
}