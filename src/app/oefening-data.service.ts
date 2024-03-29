import { Injectable } from '@angular/core';
import { Oefening } from './oefening/oefening.model';
import { HttpClient } from '@angular/common/http';
import * as globals from '../globals/globals';
import { Observable } from 'rxjs/Observable';
import { Feedback } from './feedback/feedback.model';

@Injectable()
export class OefeningDataService {
  constructor(private http: HttpClient) {}

  getOefeningen(): Observable<Oefening[]> {
    return this.http.get<Oefening[]>(globals.backendUrl + `/oefeningen`).pipe();
  }

  getOefeningenFromSessie(sessieId: number): Observable<Oefening[]> {
    return this.http
      .get<Oefening[]>(globals.backendUrl + `/oefeningen/` + sessieId)
      .pipe();
  }

  getOefening(oefeningId: number): Observable<Oefening> {
    return this.http
    .get<Oefening>(globals.backendUrl + `/oefeningen/oef/` + oefeningId)
    .pipe();
  }

  voegNieuweOefeningToe(oefening: Oefening): Observable<Oefening> {
    const fd = new FormData();
    fd.append('naam', oefening.naam);
    fd.append('beschrijving', oefening.beschrijving);
    fd.append('sessieId', oefening.sessieId.toString());
    fd.append('groepen', oefening.groepen);
    fd.append('file', oefening.file);

    return this.http
      .post<Oefening>(globals.backendUrl + `/oefeningen`, fd)
      .pipe();
  }

  verwijderOefening(oefening: Oefening) {
    return this.http
      .delete(globals.backendUrl + '/oefeningen/' + oefening.oefeningId)
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
  }

  updateOefening(oefening: Oefening) {
    return this.http
      .put(globals.backendUrl + '/oefeningen/', oefening)
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
  }

  getFeedbackFromOefening(oefeningId: number): Observable<Feedback[]> {
    return this.http
    .get<Feedback[]>(globals.backendUrl + `/oefeningen/oef/` + oefeningId + '/feedback')
    .pipe();
  }

  verwijderFeedbackOefening(oefeningId: number) {
    return this.http
      .delete(globals.backendUrl + '/oefeningen/oef/' + oefeningId + '/feedback')
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
  }
}
