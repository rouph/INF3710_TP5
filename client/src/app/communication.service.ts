import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { concat, of, Observable, Subject } from "rxjs";
import { catchError } from "rxjs/operators";
import { Clinique} from "../../../common/tables/Clinique";
import { Proprio } from "../../../common/tables/Proprio";

@Injectable()
export class CommunicationService {

    // tslint:disable:no-any
    private readonly BASE_URL: string = "http://localhost:3000/database";
    public constructor(private http: HttpClient) { }

    private _listners: any = new Subject<any>();

    public listen(): Observable<any> {
       return this._listners.asObservable();
    }

    public filter(filterBy: string): void {
       this._listners.next(filterBy);
    }

    public getCliniques(): Observable<any[]> {

        return this.http.get<Clinique[]>(this.BASE_URL + "/Clinique").pipe(
            catchError(this.handleError<Clinique[]>("getClinique")),
        );
    }
    public getCliniquesNumber(): Observable<any[]> {

        return this.http.get<string[]>(this.BASE_URL + "/Clinique/no").pipe(
            catchError(this.handleError<string[]>("getCliniqueNo")),
        );
    }
    public getProprietaireNo(): Observable<any[]> {

        return this.http.get<string[]>(this.BASE_URL + "/Proprios/no").pipe(
            catchError(this.handleError<string[]>("getPropriosNo")),
        );
    }

    public getProprios(): Observable<any[]> {

        return this.http.get<Proprio[]>(this.BASE_URL + "/Proprios").pipe(
            catchError(this.handleError<Proprio[]>("getProprios")),
        );
    }

    public getTraitements(): Observable<any[]> {

        return this.http.get<Proprio[]>(this.BASE_URL + "/Traitements").pipe(
            catchError(this.handleError<Proprio[]>("getTraitements")),
        );
    }

    /*
    public getHotelPKs(): Observable<string[]> {

        return this.http.get<string[]>(this.BASE_URL + "/hotel/hotelNo").pipe(
            catchError(this.handleError<string[]>("getHotelPKs")),
        );
    }
    */

    public insertClinique(clinique: any): Observable<number> {
        return this.http.post<number>(this.BASE_URL + "/clinique/insert", clinique).pipe(
            catchError(this.handleError<number>("insertClinique")),
        );
    }
    public insertEmploye(employe: any): Observable<number> {
        return this.http.post<number>(this.BASE_URL + "/employe/insert", employe).pipe(
            catchError(this.handleError<number>("insertEmploye")),
        );
    }

    public insertProprio(proprio: any): Observable<number> {
        return this.http.post<number>(this.BASE_URL + "/proprio/insert", proprio).pipe(
            catchError(this.handleError<number>("insertProprio")),
        );
    }

    public insertTraitement(traitement: any): Observable<number> {
        return this.http.post<number>(this.BASE_URL + "/traitement/insert", traitement).pipe(
            catchError(this.handleError<number>("insertTraitement")),
        );
    }

    public setUpDatabase(): Observable<any> {
        return concat(this.http.post<any>(this.BASE_URL + "/createSchema", []),
                      this.http.post<any>(this.BASE_URL + "/populateDb", []));
    }

    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {

        return (error: Error): Observable<T> => {
            return of(result as T);
        };
    }
}
