import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";

import {Clinique} from "../../../common/tables/Clinique";
import {Proprio} from "../../../common/tables/Proprio";

import { DatabaseService } from "../services/database.service";
import Types from "../types";

@injectable()
export class DatabaseController {
    public constructor(@inject(Types.DatabaseService) private databaseService: DatabaseService) { }

    public get router(): Router {
        const router: Router = Router();

        router.post("/createSchema",
                    (req: Request, res: Response, next: NextFunction) => {
                    this.databaseService.createSchema().then((result: pg.QueryResult) => {
                        console.log("CECI EST UNE FONCTION DE TEST SEULEMENT");
                        res.json(result);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                    });
                });

        router.post("/populateDb",
                    (req: Request, res: Response, next: NextFunction) => {
                    this.databaseService.populateDb().then((result: pg.QueryResult) => {
                        console.log("CECI EST UNE FONCTION DE TEST SEULEMENT");
                        res.json(result);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                    });
        });

        router.get("/Proprios",
                   (req: Request, res: Response, next: NextFunction) => {
                    // Send the request to the service and send the response
                    this.databaseService.getProprios().then((result: pg.QueryResult) => {
                    const proprios: Proprio[] = result.rows.map((pro: any) => (
                        {
                            "noProprietaire" : pro.noproprietaire,
                            "nom" : pro.nom,
                            "adresse" : pro.adresse,
                            "telNumber" : pro.numtel,
                    }));
                    res.json(proprios);
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });

        router.get("/Clinique",
                   (req: Request, res: Response, next: NextFunction) => {
                    // Send the request to the service and send the response
                    this.databaseService.getCliniques().then((result: pg.QueryResult) => {
                    const cliniques: Clinique[] = result.rows.map((cli: any) => (
                        {
                            "cliniqueNumber" : cli.noclinique,
                            "cliniqueName" : cli.nom,
                            "adresse" : cli.adresseclinique,
                            "telNumber" : cli.numtel,
                            "faxNumber" : cli.numtelecopieur,
                    }));
                    res.json(cliniques);
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
            });
<<<<<<< HEAD
        router.get("/Clinique/no",
                   (req: Request, res: Response, next: NextFunction) => {
            this.databaseService.getCliniqueNo().then((result: pg.QueryResult) => {
              const cliniqueNo: string[] = result.rows.map((row: any) => row.noclinique);
              res.json(cliniqueNo);
            }).catch((e: Error) => {
              console.error(e.stack);
          });
     });
=======

        /*
        router.get("/hotel/hotelNo",
                   (req: Request, res: Response, next: NextFunction) => {
                      this.databaseService.getHotelNo().then((result: pg.QueryResult) => {
                        const hotelPKs: string[] = result.rows.map((row: any) => row.hotelno);
                        res.json(hotelPKs);
                      }).catch((e: Error) => {
                        console.error(e.stack);
                    });
                  });
        */        
>>>>>>> e9a3e8656ebc48ba197c8278b3016f1ad2163aa8
        router.post("/clinique/insert",
                    (req: Request, res: Response, next: NextFunction) => {
                        const cliniqueNumber: string = req.body.cliniqueNumber;
                        const cliniqueName: string = req.body.cliniqueName;
                        const adresse: string = req.body.adresse;
                        const telNumber: string = req.body.telNumber;
                        const faxNumber: string = req.body.faxNumber;
                        this.databaseService.createClinique(cliniqueNumber, cliniqueName, adresse, telNumber, faxNumber).then((result: pg.QueryResult) => {
                        res.json(result.rowCount);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                        res.json(-1);
                    });
         });
        router.post("/employe/insert",
                    (req: Request, res: Response, next: NextFunction) => {
            const noEmploye: string = req.body.noEmploye;
            const nom: string = req.body.nom;
            const adresse: string = req.body.adresse;
            const dob: string = req.body.dob;
            const sex: string = req.body.sex;
            const tellNum: string = req.body.tellNum;
            const NAS: string = req.body.NAS;
            const salaire: string = req.body.salaire;
            const fonction: string = req.body.fonction;
            const noClinique: string = req.body.noClinique;
            this.databaseService.createEmploye(noEmploye, nom,adresse, dob, sex, tellNum, NAS, salaire, fonction, noClinique).then((result: pg.QueryResult) => {
            res.json(result.rowCount);
        }).catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
        });
});

        router.post("/proprio/insert",
        (req: Request, res: Response, next: NextFunction) => {
            const noProprietaire: string = req.body.noProprietaire;
            const nom: string = req.body.nom;
            const adresse: string = req.body.adresse;
            const telNumber: string = req.body.telNumber;
          
            this.databaseService.createProprio(noProprietaire, nom, adresse, telNumber).then((result: pg.QueryResult) => {
            res.json(result.rowCount);
        }).catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
        });
        });

        router.get("/tables/:tableName",
                   (req: Request, res: Response, next: NextFunction) => {
                this.databaseService.getAllFromTable(req.params.tableName)
                    .then((result: pg.QueryResult) => {
                        res.json(result.rows);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                    });
            });

        return router;
    }
}
