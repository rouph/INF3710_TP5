import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Clinique} from "../../../common/tables/Clinique";
// tslint:disable-next-line:ordered-imports
import { of, Observable,concat, Subject } from "rxjs";
import { catchError } from "rxjs/operators";
import { Room } from "../../../common/tables/Room";

@Injectable()
export class CommunicationService {

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

    public getHotelPKs(): Observable<string[]> {

        return this.http.get<string[]>(this.BASE_URL + "/hotel/hotelNo").pipe(
            catchError(this.handleError<string[]>("getHotelPKs")),
        );
    }

    public insertClinique(Clinique: any): Observable<number> {
        return this.http.post<number>(this.BASE_URL + "/clinique/insert", Clinique).pipe(
            catchError(this.handleError<number>("insertClinique")),
        );
    }

    public inserProprio(Proprio: any): Observable<number> {
        return this.http.post<number>(this.BASE_URL + "/proprio/insert", Proprio).pipe(
            catchError(this.handleError<number>("insertProprio")),
        );
    }

    public insertRoom(room: Room): Observable<number> {
        return this.http.post<number>(this.BASE_URL + "/rooms/insert", room).pipe(
            catchError(this.handleError<number>("inserHotel")),
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
