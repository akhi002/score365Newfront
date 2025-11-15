import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // 🔐 Login
  loginUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/login`, data);
  }

  // 🏏 Fetch all active matches
  getAllActiveMatches(): Observable<any> {
    const headers = this.getAuthHeaders();
    if (!headers) {
      return new Observable((observer) => {
        observer.next({ success: false, message: 'No token found' });
        observer.complete();
      });
    }
    return this.http.post(`${this.baseUrl}/matches/activeMatches`, {}, { headers });
  }

  // 🔄 Toggle match status
  changeMatchStatus(id: string, isActive: boolean): Observable<any> {
    const headers = this.getAuthHeaders();
    if (!headers) {
      return new Observable((observer) => {
        observer.next({ success: false, message: 'No token found' });
        observer.complete();
      });
    }
    const body = { id, isActive };
    return this.http.post(`${this.baseUrl}/matches/changeStatus`, body, { headers });
  }

  // 👤 Register user (not used)
  registerUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/register`, data);
  }

  // 🧹 Clear Redis sessions
  clearRedisSessions(userId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/redisclear`, { userId });
  }

  // ⚙️ Update score type (your provided API)
  updateScoreType(sportId: number, scoreType: string): Observable<any> {
    const headers = this.getAuthHeaders();
    if (!headers) {
      return new Observable((observer) => {
        observer.next({ success: false, message: 'No token found' });
        observer.complete();
      });
    }

    const body = { sportId, scoreType };
    return this.http.post(`${this.baseUrl}/matches/updateScoreType`, body, { headers });
  }
}
