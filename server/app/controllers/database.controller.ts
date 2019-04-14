import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";

import { Animal } from "../../../common/tables/Animal";
import {Clinique} from "../../../common/tables/Clinique";
import {Employe} from "../../../common/tables/Employe";
import {Proprio} from "../../../common/tables/Proprio";
import {Traitement} from "../../../common/tables/Traitement";

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
        router.delete("/deleteAnimal",
                      (req: Request, res: Response, next: NextFunction) => {
                        this.databaseService.delteAnimal(req.query.noAnimal_, req.query.noClinique_).then((result: pg.QueryResult) => {
                            res.json(result);
                        }).catch((e: Error) => {
                            console.error(e.stack);
                        });
                });
        router.put("/updateAnimal",
                   (req: Request, res: Response, next: NextFunction) => {
                        this.databaseService.updateAnimal(req.body.noAnimal_,
                                                          req.body.noClinique_,
                                                          req.body.nom_,
                                                          req.body.desc_,
                                                          req.body.etat_).then((result: pg.QueryResult) => {
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

        router.get("/Traitements",
                   (req: Request, res: Response, next: NextFunction) => {
                // Send the request to the service and send the response
                this.databaseService.getTraitements().then((result: pg.QueryResult) => {
                const traitements: Traitement[] = result.rows.map((pro: any) => (
                 {
                     "noTraitement" : pro.notraitement,
                     "description" : pro.description,
                     "cout" : pro.cout,
             }));
                res.json(traitements);
         }).catch((e: Error) => {
             console.error(e.stack);
            });
        });

        router.get("/TraitementsFFK",
                   (req: Request, res: Response, next: NextFunction) => {
                // Send the request to the service and send the response
                this.databaseService.getTraitementsFFK(req.query.noAnimal_, req.query.noClinique_).then((result: pg.QueryResult) => {
                const traitements: Traitement[] = result.rows.map((tra: any) => (
                 {
                     "noTraitement" : tra.notraitement,
                     "description" : tra.description,
                     "cout" : tra.cout,
             }));
                res.json(traitements);
         }).catch((e: Error) => {
             console.error(e.stack);
            });
        });
        router.get("/getFacture",
                   (req: Request, res: Response, next: NextFunction) => {
                // Send the request to the service and send the response
                this.databaseService.getFacture(req.query.noAnimal_, req.query.noClinique_).then((result: pg.QueryResult) => {
                const traitements: Traitement[] = result.rows.map((tra: any) => (
                 {
                     "noTraitement" : tra.notraitement,
                     "description" : tra.description,
                     "cout" : tra.cout,
             }));
                res.json(traitements);
         }).catch((e: Error) => {
             console.error(e.stack);
            });
        });

        router.get("/Employees",
                   (req: Request, res: Response, next: NextFunction) => {
                // Send the request to the service and send the response
                this.databaseService.getEmployees().then((result: pg.QueryResult) => {
                const traitements: Employe[] = result.rows.map((emp: any) => (
                 {
                    "noEmploye" : emp.noemploye,
                    "nom" : emp.nom,
                    "adresse" : emp.address,
                    "dob" : emp.dob,
                    "sex" : emp.sex,
                    "tellNum" : emp.numtel,
                    "NAS" : emp.nas,
                    "salaire" : emp.salaire,
                    "fonction" : emp.fonction,
                    "noClinique" : emp.noclinique,
             }));
                res.json(traitements);
         }).catch((e: Error) => {
             console.error(e.stack);
            });
        });

        router.get("/Animals",
                   (req: Request, res: Response, next: NextFunction) => {
                // Send the request to the service and send the response
                this.databaseService.getAnimals().then((result: pg.QueryResult) => {
                const animals: Animal[] = result.rows.map((ani: any) => (
                 {
                    "noAnimal" : ani.noanimal,
                    "nom" : ani.nom,
                    "type" : ani.type_,
                    "description" : ani.description,
                    "dob" : ani.dob,
                    "date_inscription" : ani.date_inscription,
                    "etat" : ani.etat,
                    "noProprio" : ani.noproprietaire,
                    "noClinique" : ani.noclinique,
             }));
                res.json(animals);
         }).catch((e: Error) => {
             console.error(e.stack);
            });
        });

        router.get("/AnimalsFromName",
                   (req: Request, res: Response, next: NextFunction) => {
                    // Send the request to the service and send the response
                    this.databaseService.getAnimalsFromName(req.query.nom_).then((result: pg.QueryResult) => {
                    const animalsFromName: Animal[] = result.rows.map((ani: any) => (
                    {
                        "noAnimal" : ani.noanimal,
                        "nom" : ani.nom,
                        "type" : ani.type_,
                        "description" : ani.description,
                        "dob" : ani.dob,
                        "date_inscription" : ani.date_inscription,
                        "etat" : ani.etat,
                        "noProprio" : ani.noproprietaire,
                        "noClinique" : ani.noclinique,
                    }));
                    res.json(animalsFromName);
                    }).catch((e: Error) => {
                    console.error(e.stack);
                    });
        });

        router.get("/Proprios/no",
                   (req: Request, res: Response, next: NextFunction) => {
                this.databaseService.getProprietaireNo().then((result: pg.QueryResult) => {
                    const cliniqueNo: string[] = result.rows.map((row: any) => row.noproprietaire);
                    res.json(cliniqueNo);
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

        router.get("/Clinique/no",
                   (req: Request, res: Response, next: NextFunction) => {
            this.databaseService.getCliniqueNo().then((result: pg.QueryResult) => {
              const cliniqueNo: string[] = result.rows.map((row: any) => row.noclinique);
              res.json(cliniqueNo);
            }).catch((e: Error) => {
              console.error(e.stack);
          });
     });

        router.post("/clinique/insert",
                    (req: Request, res: Response, next: NextFunction) => {
                        const cliniqueNumber: string = req.body.cliniqueNumber;
                        const cliniqueName: string = req.body.cliniqueName;
                        const adresse: string = req.body.adresse;
                        const telNumber: string = req.body.telNumber;
                        const faxNumber: string = req.body.faxNumber;
                        this.databaseService.createClinique(cliniqueNumber, cliniqueName, adresse,
                                                            telNumber, faxNumber).then((result: pg.QueryResult) => {
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
            this.databaseService.createEmploye(noEmploye, nom, adresse, dob, sex, tellNum,
                                               NAS, salaire, fonction, noClinique).then((result: pg.QueryResult) => {
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

        router.post("/animal/insert",
                    (req: Request, res: Response, next: NextFunction) => {
            const noAnimal: string = req.body.noAnimal;
            const nom: string = req.body.nom;
            const type: string = req.body.type;
            const description: string = req.body.description;
            const dob: string = req.body.dob;
            const date_inscription: string = req.body.date_inscription;
            const etat: string = req.body.etat;
            const noProprio: string = req.body.noProprio;
            const noClinique: string = req.body.noClinique;

            this.databaseService.createAnimal(noAnimal, nom, type, description, dob, date_inscription,
                                              etat, noProprio, noClinique).then((result: pg.QueryResult) => {
            res.json(result.rowCount);
        }).catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
            });
        });

        router.post("/traitement/insert",
                    (req: Request, res: Response, next: NextFunction) => {
            const noTraitement: string = req.body.noTraitement;
            const description: string = req.body.description;
            const cout: string = req.body.cout;
            this.databaseService.createTraitement(noTraitement, description, cout).then((result: pg.QueryResult) => {
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
