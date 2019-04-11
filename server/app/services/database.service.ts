import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import {schema} from "../createSchema";
import {data} from "../populateDB";

@injectable()
export class DatabaseService {

    // A MODIFIER POUR VOTRE BD
    public connectionConfig: pg.ConnectionConfig = {
        user: "admin",
        database: "TP5",
        password: "admin",
        port: 5432,
        host: "127.0.0.1",
        keepAlive : true
    };

    private pool: pg.Pool = new pg.Pool(this.connectionConfig);

    public createSchema(): Promise<pg.QueryResult> {

        return this.pool.query(schema);
    }

    public populateDb(): Promise<pg.QueryResult> {

        return this.pool.query(data);
    }

    public getAllFromTable(tableName: string): Promise<pg.QueryResult> {

        return this.pool.query(`SELECT * FROM HOTELDB.${tableName};`);
    }

    public getCliniques(): Promise<pg.QueryResult> {

        return this.pool.query('SELECT * FROM tp5_schema.cliniquevet;');
    }

    public getProprios(): Promise<pg.QueryResult> {

        return this.pool.query('SELECT * FROM TP5_schema.Proprietaire;');
    }

    public getTraitements(): Promise<pg.QueryResult> {

        return this.pool.query('SELECT * FROM TP5_schema.Traitement;');
    }

    public getEmployees(): Promise<pg.QueryResult> {

        return this.pool.query('SELECT * FROM TP5_schema.Employe;');
    }
       // this.pool.connect();
    public getCliniqueNo(): Promise<pg.QueryResult> {
        return this.pool.query('SELECT noClinique FROM tp5_schema.cliniquevet;');
    }
    public getProprietaireNo(): Promise<pg.QueryResult> {

        return this.pool.query('SELECT noProprietaire FROM TP5_schema.Proprietaire;');
    }

    public createClinique(cliniqueNumber: string, cliniqueName: string,
                          adresse: string, telNumber: string, faxNumber: string): Promise<pg.QueryResult> {
      //  this.pool.connect();
        const values: string[] = [
            cliniqueNumber,
            cliniqueName,
            adresse,
            telNumber,
            faxNumber,
        ];
        const queryText: string = `INSERT INTO TP5_schema.CliniqueVet VALUES($1, $2, $3, $4, $5);`;

        return this.pool.query(queryText, values);
    }
    public createEmploye(noEmploye: string, nom: string, adresse: string, dob: string, sex: string, tellNum: string,
                         NAS: string, salaire: string, fonction: string, noClinique: string): Promise<pg.QueryResult> {

            const values: string[] = [
                noEmploye,
                nom,
                adresse,
                dob,
                sex,
                tellNum,
                NAS,
                salaire,
                fonction,
                noClinique
            ];
            const queryText: string = `INSERT INTO TP5_schema.Employe VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;

            return this.pool.query(queryText, values);
    }

    public createProprio(noProprietaire: string, nom: string, adresse: string, telNumber: string): Promise<pg.QueryResult> {
        //  this.pool.connect();
        const values: string[] = [
        noProprietaire,
        nom,
        adresse,
        telNumber,
        ];
        const queryText: string = `INSERT INTO TP5_schema.Proprietaire VALUES($1, $2, $3, $4);`;

        return this.pool.query(queryText, values);
    }

    public createTraitement(noTraitement: string, description: string, cout: string): Promise<pg.QueryResult> {
        //  this.pool.connect();
        const values: string[] = [
        noTraitement,
        description,
        cout,
        ];
        const queryText: string = `INSERT INTO TP5_schema.Traitement VALUES($1, $2, $3);`;

        return this.pool.query(queryText, values);
    }

    /*
    // ROOM
    public getRoomFromHotel(hotelNo: string, roomType: string, price: number): Promise<pg.QueryResult> {
       // this.pool.connect();

        let query: string =
        `SELECT * FROM HOTELDB.room
        WHERE hotelno=\'${hotelNo}\'`;
        if (roomType !== undefined) {
            query = query.concat('AND ');
            query = query.concat(`typeroom=\'${roomType}\'`);
        }
        if (price !== undefined) {
            query = query.concat('AND ');
            query = query.concat(`price =\'${price}\'`);
        }
        console.log(query);

        return this.pool.query(query);
    }

    public getRoomFromHotelParams(params: object): Promise<pg.QueryResult> {
      //  this.pool.connect();

        let query: string = 'SELECT * FROM HOTELDB.room \n';
        const keys: string[] = Object.keys(params);
        if (keys.length > 0) {
            query = query.concat(`WHERE ${keys[0]} =\'${params[keys[0]]}\'`);
        }

        // On enleve le premier element
        keys.shift();

        // tslint:disable-next-line:forin
        for (const param in keys) {
            const value: string = keys[param];
            query = query.concat(`AND ${value} = \'${params[value]}\'`);
            if (param === 'price') {
                query = query.replace('\'', '');
            }
        }

        console.log(query);

        return this.pool.query(query);

    }

    public createRoom(room: Room): Promise<pg.QueryResult> {
      //  this.pool.connect();
        const values: string[] = [
            room.roomno,
            room.hotelno,
            room.typeroom,
            room.price.toString()
        ];
        const queryText: string = `INSERT INTO HOTELDB.ROOM VALUES($1,$2,$3,$4);`;

        return this.pool.query(queryText, values);
    }

    */
}
