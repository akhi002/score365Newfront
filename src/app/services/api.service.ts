import { AllSports } from "./../layout/all-sports/all-sports";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class ApiService {
  private baseUrl = environment.apiUrl; // 👈 use env apiUrl

  constructor(private http: HttpClient) {}

  getMatchesBySportsId(body: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/matches/getMatchesBySport`,
      body,
      {
        withCredentials: true,
      }
    );
  }

  allSports(body: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/matches`, body, {
      withCredentials: true,
    });
  }

  // POST a new match
  addMatch(matchData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/matches`, matchData, {
      withCredentials: true,
    });
  }

  updateMatchScores(body: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/matches/updateMatchScores`,
      body,
      { withCredentials: true }
    );
  }

  updateStatus(body: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/matches/changeStatus`, body, {
      withCredentials: true,
    });
  }

  getAllMatches(body: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/matches/activeMatches`, body, {
      withCredentials: true,
    });
  }

  addWebsite(body: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/websites`, body, {
      withCredentials: true,
    });
  }

  getAllWebsites(body: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/websites/get`, body, {
      withCredentials: true,
    });
  }

  updateWebsite(body: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/websites/update`, body, {
      withCredentials: true,
    });
  }

  deleteWebsite(body: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/websites/delete`, body, {
      withCredentials: true,
    });
  }

  updateScoreType(body: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/matches/updateScoreTypeForNewMatches`,
      body,
      { withCredentials: true }
    );
  }

  updateAllScoreTypes(body: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/matches/updateAllScoreTypes`,
      body,
      { withCredentials: true }
    );
  }

  getScoreTypes(body: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/matches/getAllSettings`, body, {
      withCredentials: true,
    });
  }

  login(body: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users/login`, body, {
      withCredentials: true,
    });
  }

  ///////////////////////---------------- SOURIN API--------------------------------/////////////////////

  getAllActiveMatches(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/matches/activeMatches`, body, {
      withCredentials: true,
    });
  }

  // 🔄 Toggle match status
  changeMatchStatus(id: string, isActive: boolean): Observable<any> {
    const body = { id, isActive };
    return this.http.post(`${this.baseUrl}/matches/changeStatus`, body, {
      withCredentials: true,
    });
  }

  updateScoreTypeForSetting(body: any) {
    return this.http.post(`${this.baseUrl}/matches/updateScoreType`, body, {
      withCredentials: true,
    });
  }

  getScoreTypeBySportId(body: any) {
  return this.http.post(`${this.baseUrl}/matches/getScoreTypeBySportId`, body, {
      withCredentials: true,
    });
}

}
