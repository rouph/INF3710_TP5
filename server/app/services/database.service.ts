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

    public getAnimals(): Promise<pg.QueryResult> {

        return this.pool.query('SELECT * FROM TP5_schema.Animal;');
    }
    public delteAnimal(noAnimal: string, noClinique: string): Promise<pg.QueryResult> {

        return this.pool.query("DELETE FROM TP5_schema.Animal WHERE noAnimal = '" + noAnimal + "' AND noCLinique ='" + noClinique +"';");
    }

    public getAnimalsFromName(nom: string): Promise<pg.QueryResult> {
        console.log(nom);
        let query: string = '';
        query += "SELECT * FROM TP5_schema.Animal WHERE LOWER(nom) LIKE LOWER('%";
        query += nom;
        query += "%');";
        console.log(query);

        return this.pool.query(query);
    }

    public getTraitementsFFK(noAnimal: string, noClinique: string): Promise<pg.QueryResult> {
        let query: string = '';
        console.log(noAnimal);
        console.log(noClinique);
        query += "SELECT * FROM TP5_schema.Traitement WHERE noTraitement IN ( SELECT noTraitement ";
        query += "FROM TP5_schema.PropositionTraitement WHERE noExamen IN ( SELECT noExamen ";
        query += "FROM TP5_schema.Examen WHERE noAnimal = ( SELECT noAnimal FROM TP5_schema.Examen ";
        query += "WHERE noAnimal='";
        query += noAnimal;
        query += "' AND noCLinique = '";
        query += noClinique;
        query += "')));";
        console.log(query);

        return this.pool.query(query);
    }

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
        const values: string[] = [
        noProprietaire,
        nom,
        adresse,
        telNumber,
        ];
        const queryText: string = `INSERT INTO TP5_schema.Proprietaire VALUES($1, $2, $3, $4);`;

        return this.pool.query(queryText, values);
    }

    public createAnimal(noAnimal: string, nom: string, type: string, description: string, dob: string, date_inscription: string,
                        etat: string, noProprio: string, noClinique: string): Promise<pg.QueryResult> {
        const values: string[] = [
            noAnimal, nom, type, description, dob, date_inscription,
            etat, noProprio, noClinique
        ];
        const queryText: string = `INSERT INTO TP5_schema.Animal VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9);`;

        return this.pool.query(queryText, values);
    }

    public createTraitement(noTraitement: string, description: string, cout: string): Promise<pg.QueryResult> {
        const values: string[] = [
        noTraitement,
        description,
        cout,
        ];
        const queryText: string = `INSERT INTO TP5_schema.Traitement VALUES($1, $2, $3);`;

        return this.pool.query(queryText, values);
    }

}
