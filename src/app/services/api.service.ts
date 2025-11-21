import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /** ------------------- MATCHES ---------------------- */

  getMatchesBySportsId(body: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/matches/getMatchesBySport`, body, {
      withCredentials: true,
    });
  }

  // allSports(body: any): Observable<any> {
  //   return this.http.post<any>(`${this.baseUrl}/matches`, body, {
  //     withCredentials: true,
  //   });
  // }

  allSports(body: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/matches/allSports`, body, {
      withCredentials: true,
    });
  }

  addMatch(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/matches`, data, {
      withCredentials: true,
    });
  }

  updateMatchScores(body: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/matches/updateMatchScores`, body, {
      withCredentials: true,
    });
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

  getAllActiveMatches(body: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/matches/activeMatches`, body, {
      withCredentials: true,
    });
  }

  changeMatchStatus(id: string, isActive: boolean): Observable<any> {
    return this.http.post(`${this.baseUrl}/matches/changeStatus`, { id, isActive }, {
      withCredentials: true,
    });
  }

  /** ---------------- SCORE TYPE SETTINGS ---------------- */

  /** Update scoreType for new matches */
  updateScoreTypeForSetting(body: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/matches/updateScoreTypeForNewMatches`,
      body,
      { withCredentials: true }
    );
  }

  /** Get scoreType for single sport */
  getScoreTypeBySportId(body: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/matches/getScoreTypeBySportId`,
      body,
      { withCredentials: true }
    );
  }

  /** Get ALL settings (scoreType list) */
  getAllSettings(body: any = {}): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/matches/getAllSettings`,
      body,
      { withCredentials: true }
    );
  }

  /** Update all scoreTypes at once */
  updateAllScoreTypes(body: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/matches/updateAllScoreTypes`,
      body,
      { withCredentials: true }
    );
  }

  /** -------------------- WEBSITES ----------------------- */

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

  /** -------------------- AUTH ----------------------- */

  login(body: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users/login`, body, {
      withCredentials: true,
    });
  }

  getScoreUrl(body: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/matches/getscoreurl`, body, {
      withCredentials: true,
    });
  }

  getMatchByEventId(body: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/matches/matchByEventId`, body, {
      withCredentials: true,
    });
  }
}
  ///////////////////////---------------- SOURIN API--------------------------------/////////////////////
/*
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
    return this.http.post(
      `${this.baseUrl}/matches/getScoreTypeBySportId`,
      body,
      {
        withCredentials: true,
      }
    );
  }

  getAllSettings(body: any): Observable<any> {
    return this.http.post(
      `
      ${this.baseUrl}/matches/getAllSettings`,
      body,
      { withCredentials: true }
    );
  }

  /** Update all scoreTypes at once */

