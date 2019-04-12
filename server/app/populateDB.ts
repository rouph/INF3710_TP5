export const data: string = `
--Hugo Lirette(1896849) et Elie Rouphael(1829529)

--CliniqueVet (noClinique, nom, adresseClinique,numTel, numTelecopieur)
INSERT INTO TP5_schema.CliniqueVet VALUES ('C50', 'Mondou', '123 kings bane boul. Naxxramas Enfer J5R 6L9', '123-123-1242', '420');
INSERT INTO TP5_schema.CliniqueVet VALUES ('C26', 'Banjo et kazoui', '147 Rouphael boul. Saint Laurent, QC, H4F7U', '514-666-6666', '5141234567');
INSERT INTO TP5_schema.CliniqueVet VALUES ('C25', 'Boubi froufrou', '456 Byblos, Jbeil, Jbeil, H4F7U', '514-666-6667', '5174155741');
INSERT INTO TP5_schema.CliniqueVet VALUES ('C24', 'educazoo', '151 kings bane boul. Naxxramas Enfer J8F 1O3', '141-518-1345', '079');
INSERT INTO TP5_schema.CliniqueVet VALUES ('C98', 'pet & co','123 Ragnaros boul. BlackRock Enfer U2E 1I8', '192-954-3592', '111');

--Employe(noEmploye, nom,adresse,dob,sex,numTel,nas,salaire,fonction, noClinique)
INSERT INTO TP5_schema.Employe VALUES ('E542','Jean Tremblay','543 kings bane boul. Naxxramas Enfer I8U9E4',DATE'1985-05-14','M', '123-123-1242', '420-123-152', '40000', 'veterinaire', 'C50');
INSERT INTO TP5_schema.Employe VALUES ('E232','Steven Sevensssennn','543 kings bane boul. Naxxramas Enfer O8Y7W7',DATE'1985-05-14','M', '123-123-1242', '420-123-152', '100000', 'veterinaire', 'C50');
INSERT INTO TP5_schema.Employe VALUES ('E748', 'Barry Allen','543 Flash Street boul. QC Q2S3T5', DATE'1957-07-21','F', '514-789-1442', '485-985-741', '150000', 'gestionnaire', 'C50');
INSERT INTO TP5_schema.Employe VALUES ('E103', 'Harrison Wells','7485 reverse-Flash Street. QC Q2S3U5', DATE'1947-07-11','M', '514-239-1442', '142-785-885', '1512300', 'veterinaire', 'C50');
INSERT INTO TP5_schema.Employe VALUES ('E750', 'Jobran khalil Jobran','300 cote-vertu QC H4L1E1', DATE'1940-03-29','M', '438-998-6594', '568-987-562', '1512410', 'veterinaire', 'C50');
INSERT INTO TP5_schema.Employe VALUES ('E106', 'Asuna Iruno','95 Thot Street boul. QC U7Y8T6', DATE'1997-06-8','F', '514-789-1442', '746-474-3737', '100000', 'gestionnaire', 'C26');
INSERT INTO TP5_schema.Employe VALUES ('E75', 'Yuki Roublay','36 Retro Street boul. QC P9O0I9', DATE'1993-02-25','F', '134-264-4444', '248-255-2578', '87000', 'gestionnaire', 'C25');
INSERT INTO TP5_schema.Employe VALUES ('E85', 'Tonald Drump','2854 LA Street boul. QC U7Y8E6', DATE'1900-10-2','M', '634-634-2344', '746-746-5555', '112555', 'gestionnaire', 'C24');
INSERT INTO TP5_schema.Employe VALUES ('E9', 'Terry Crews','1111 Actor Street boul. QC U2C8Z6', DATE'1994-07-1','M', '956-777-7765', '555-555-2235', '152355', 'gestionnaire', 'C98');

--Vétérinaire(noEmployé, estDisponible)
INSERT INTO TP5_schema.Veterinaire VALUES('E103', 'non');
INSERT INTO TP5_schema.Veterinaire VALUES('E750', 'non');
INSERT INTO TP5_schema.Veterinaire VALUES('E542', 'oui');
INSERT INTO TP5_schema.Veterinaire VALUES('E232', 'non');
		
--Proprietaire D’animal (noProprietaire, nom,adresse, numTel)
INSERT INTO TP5_schema.Proprietaire VALUES ('P539','Hugo Lirette','999 kings bane boul. Naxxramas Enfer 3I4I4I', '538-634-3664');
INSERT INTO TP5_schema.Proprietaire VALUES ('P953','Elie Rouphaelblay','51 kings bane boul. Naxxramas Enfer 1I9V0D', '754-523-4624');
INSERT INTO TP5_schema.Proprietaire VALUES ('P013','Bobby Tarantino','363 kings bane boul. Naxxramas Enfer 8U8R8R', '235-252-3532');
INSERT INTO TP5_schema.Proprietaire VALUES ('P151','Opblaypa Ivor-blay','105 kings bane boul. Naxxramas Enfer 7Y7Y7Y', '025-262-0000');
INSERT INTO TP5_schema.Proprietaire VALUES ('P444','Igus Mervce','0235 kings bane boul. Naxxramas Enfer 3I4I4I', '005-352-2526');

--Contact (noProprietaire, noClinique)
INSERT INTO TP5_schema.Contact VALUES ('P444', 'C50');
INSERT INTO TP5_schema.Contact VALUES ('P151', 'C50');
INSERT INTO TP5_schema.Contact VALUES ('P013', 'C50');
INSERT INTO TP5_schema.Contact VALUES ('P953', 'C26');
INSERT INTO TP5_schema.Contact VALUES ('P539', 'C26');

--Animal (noAnimal, nom,type,description,dob,date d’inscription,etat, noProprietaire, noClinique)
INSERT INTO TP5_schema.Animal VALUES ('A001', 'Alikhandro', 'chien', 'beautiful', date'2011-01-17', date'2019-06-04', 'vivant', 'P444','C50');
INSERT INTO TP5_schema.Animal VALUES ('A002', 'Julios', 'chien', 'labrador', date'2015-03-11', date'2019-06-04', 'mort', 'P444','C50');
INSERT INTO TP5_schema.Animal VALUES ('A003', 'Afande', 'chat', 'beautiful', date'2015-01-17', date'2019-04-04', 'vivant', 'P151','C50');
INSERT INTO TP5_schema.Animal VALUES ('A004', 'Chakib', 'chien', 'labrador', date'2017-03-19', date'2019-04-04', 'vivant', 'P151','C50');
INSERT INTO TP5_schema.Animal VALUES ('A005', 'zoulhoufa', 'tortue', 'malade', date'2015-01-17', date'2018-04-04', 'mort', 'P013','C50');
INSERT INTO TP5_schema.Animal VALUES ('A006', 'ressort', 'lapin', 'jolie', date'2014-06-05', date'2018-04-04', 'vivant', 'P013','C50');
INSERT INTO TP5_schema.Animal VALUES ('A007', 'Zoe', 'chien', 'beautiful', date'2015-01-17', date'2019-04-04', 'vivant', 'P953','C26');
INSERT INTO TP5_schema.Animal VALUES ('A008', 'sebastien', 'chat', 'labrador', date'2017-03-19', date'2019-04-04', 'mort', 'P953','C26');
		
--Examen (noExamen, noAnimal, noClinique, date, heure, noVet)
INSERT INTO TP5_schema.Examen VALUES ('Ex01', 'A001', 'C50', date'2019-4-5','1000','E750');											
INSERT INTO TP5_schema.Examen VALUES ('Ex02', 'A002', 'C50', date'2019-4-5','1000','E750');
INSERT INTO TP5_schema.Examen VALUES ('Ex03', 'A003', 'C50', date'2019-4-5','1000','E750');
INSERT INTO TP5_schema.Examen VALUES ('Ex04', 'A004', 'C50', date'2019-4-5','1000','E750');
INSERT INTO TP5_schema.Examen VALUES ('Ex05', 'A005', 'C50', date'2019-4-5','1000','E750');
INSERT INTO TP5_schema.Examen VALUES ('Ex06', 'A006', 'C50', date'2019-4-5','1000','E750');
INSERT INTO TP5_schema.Examen VALUES ('Ex07', 'A007', 'C26', date'2019-4-5','1000','E750');
INSERT INTO TP5_schema.Examen VALUES ('Ex08', 'A008', 'C26', date'2019-4-5','1000','E750');

--Traitement (noTraitement, description, cout)
INSERT INTO TP5_schema.Traitement VALUES ('T110','Traitement a la penicilline',50);
INSERT INTO TP5_schema.Traitement VALUES ('T112','Vaccination contre la grippe',70);
INSERT INTO TP5_schema.Traitement VALUES ('T100','Cout de lexamen',20);
INSERT INTO TP5_schema.Traitement VALUES ('T114','Couper griffes',2);
INSERT INTO TP5_schema.Traitement VALUES ('T116','Toilettage',40);
INSERT INTO TP5_schema.Traitement VALUES ('T118','Retrait de verres blancs',300);

--Proposition traitement(noTraitement, noExamen, quantité, date de début, date de fin)
INSERT INTO TP5_schema.PropositionTraitement VALUES ('T110', 'Ex01', '2', DATE'2019-4-5',DATE'2019-4-23');
INSERT INTO TP5_schema.PropositionTraitement VALUES ('T112', 'Ex02', '1', DATE'2019-4-5',DATE'2019-4-23');
INSERT INTO TP5_schema.PropositionTraitement VALUES ('T114', 'Ex03', '10', DATE'2019-4-5',DATE'2019-4-23');
INSERT INTO TP5_schema.PropositionTraitement VALUES ('T116', 'Ex04', '1', DATE'2019-4-5',DATE'2019-4-23');

INSERT INTO TP5_schema.PropositionTraitement VALUES ('T100', 'Ex01', '1', DATE'2019-4-5',DATE'2019-4-5');
INSERT INTO TP5_schema.PropositionTraitement VALUES ('T100', 'Ex02', '1', DATE'2019-4-5',DATE'2019-4-5');
INSERT INTO TP5_schema.PropositionTraitement VALUES ('T100', 'Ex03', '1', DATE'2019-4-5',DATE'2019-4-5');
INSERT INTO TP5_schema.PropositionTraitement VALUES ('T100', 'Ex04', '1', DATE'2019-4-5',DATE'2019-4-5');

`;
