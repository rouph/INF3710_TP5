export const schema: string = `

SELECT * FROM TP5_schema.Animal;
DELETE FROM TP5_schema.Animal 
WHERE noAnimal = 'A002 ' AND noCLinique = 'C50';





DELETE FROM TP5_schema.Animal WHERE noAnimal = 'A002 ' AND noCLinique ='C50';



--Hugo Lirette(1896849) et Elie Rouphael(1829529)

SET search_path = TP5;
DROP SCHEMA IF EXISTS TP5_schema CASCADE;
CREATE SCHEMA TP5_schema;

DROP DOMAIN IF EXISTS TP5_schema.sexType CASCADE;
CREATE DOMAIN TP5_schema.sexType AS CHAR 
		CHECK (VALUE IN ('M', 'F'));
						 
--CliniqueVet (noClinique, nom, adresseClinique,numTel, numTelecopieur)
DROP TABLE IF EXISTS TP5_schema.CliniqueVet CASCADE;
CREATE TABLE IF NOT EXISTS TP5_schema.CliniqueVet (
		noClinique		VARCHAR(10)		NOT NULL,
		nom				VARCHAR(30)		NOT NULL,
		adresseClinique VARCHAR(100)	NOT NULL,
		numTel			VARCHAR(40)		NOT NULL,
		numTelecopieur	VARCHAR(40) 	NOT NULL,
		PRIMARY KEY(noClinique));
					
--Employe(noEmploye, nom,adresse,dob,sex,numTel,nas,salaire,fonction, noClinique)
DROP TABLE IF EXISTS TP5_schema.Employe CASCADE;
CREATE TABLE IF NOT EXISTS TP5_schema.Employe (
		noEmploye	VARCHAR(10) 	NOT NULL,
		nom			VARCHAR(30) 	NOT NULL,
		Address		VARCHAR(100)	NOT NULL,
		Dob			DATE		 	NOT NULL,
		sex			TP5_schema.sexType	DEFAULT 'M',
		numTel		VARCHAR(40)		NOT NULL,
		nas			VARCHAR(12)		NOT NULL,
		salaire		NUMERIC			NOT NULL,
		fonction	VARCHAR(40)		NOT NULL,
		noClinique	VARCHAR(10)		NOT NULL,
		PRIMARY KEY(noEmploye),
		FOREIGN KEY(noClinique) references TP5_schema.CliniqueVet(noClinique));

--V�t�rinaire(noEmploy�, estDisponible)
DROP TABLE IF EXISTS TP5_schema.Veterinaire CASCADE;																  
CREATE TABLE IF NOT EXISTS TP5_schema.Veterinaire (
		noEmploye		VARCHAR(10)	NOT NULL,
		estDisponible	VARCHAR(10) NOT NULL,
		PRIMARY KEY(noEmploye),
		FOREIGN KEY (noEmploye) references TP5_schema.Employe(noEmploye) ON DELETE CASCADE);														  

--Proprietaire D�animal (noProprietaire, nom,adresse, numTel)
DROP TABLE IF EXISTS TP5_schema.Proprietaire CASCADE;												  
CREATE TABLE IF NOT EXISTS TP5_schema.Proprietaire (
		noProprietaire	VARCHAR(30)		NOT NULL,
		nom				VARCHAR(30)		NOT NULL,
		adresse			VARCHAR(100)	NOT NULL,
		numTel			VARCHAR(40) 	NOT NULL,
		PRIMARY KEY(noProprietaire));

--Contact (noProprietaire, noClinique)
DROP TABLE IF EXISTS TP5_schema.Contact CASCADE;	
CREATE TABLE IF NOT EXISTS TP5_schema.Contact (
		noProprietaire	VARCHAR(30)		NOT NULL,
		noClinique		VARCHAR(10)		NOT NULL,				
		PRIMARY KEY(noProprietaire, noClinique),
		FOREIGN KEY (noProprietaire) references TP5_schema.Proprietaire (noProprietaire),
		FOREIGN KEY (noClinique) references TP5_schema.CliniqueVet (noClinique));

--Animal (noAnimal, nom,type,description,dob,date d�inscription,etat, noProprietaire, noClinique)
DROP TABLE IF EXISTS TP5_schema.Animal CASCADE;	
CREATE TABLE IF NOT EXISTS TP5_schema.Animal (
		noAnimal			VARCHAR(30)		NOT NULL,
		nom					VARCHAR(30)		NOT NULL,
		type_				VARCHAR(40)		NOT NULL,
		description			VARCHAR(40) 	NOT NULL,
		Dob					DATE		 	NOT NULL,
		Date_inscription 	DATE			NOT NULL,
		etat				VARCHAR(10)		NOT NULL,
		noProprietaire		VARCHAR(30)		NOT NULL,
		noClinique			VARCHAR(10)		NOT NULL,
		PRIMARY KEY(noAnimal, noClinique),																
		FOREIGN KEY (noProprietaire) references TP5_schema.Proprietaire (noProprietaire),
		FOREIGN KEY (noClinique) references TP5_schema.CliniqueVet (noClinique)
		ON DELETE cascade);

--Examen (noExamen, noAnimal, noClinique, date, heure, noVet)
DROP TABLE IF EXISTS TP5_schema.Examen CASCADE;	
CREATE TABLE IF NOT EXISTS TP5_schema.Examen (
		noExamen		VARCHAR(30)		NOT NULL,
		noAnimal		VARCHAR(10)		NOT NULL,	
		noClinique		VARCHAR(10)		NOT NULL,
		date_			DATE			NOT NULL,
		heure			VARCHAR(10)		NOT NULL,
		noEmploye		VARCHAR(10)		NOT NULL,
		PRIMARY KEY(noExamen),
		FOREIGN KEY (noEmploye) references TP5_schema.Veterinaire (noEmploye),
		FOREIGN KEY(noAnimal, noClinique) references TP5_schema.Animal (noAnimal, noClinique)
		ON DELETE CASCADE );

--Traitement (noTraitement, description, cout)
DROP TABLE IF EXISTS TP5_schema.Traitement CASCADE;	
CREATE TABLE IF NOT EXISTS TP5_schema.Traitement (
		noTraitement	VARCHAR(15)		NOT NULL,
		description		VARCHAR(40)		NOT NULL,	
		cout			INT				NOT NULL,
PRIMARY KEY(noTraitement));

--Proposition traitement(noTraitement, noExamen, quantit�, date de d�but, date de fin)
DROP TABLE IF EXISTS TP5_schema.PropositionTraitement CASCADE;	
CREATE TABLE IF NOT EXISTS TP5_schema.PropositionTraitement (
		noTraitement	VARCHAR(30)		NOT NULL, 		
		noExamen		VARCHAR(30)		NOT NULL,
		quantite		VARCHAR(30)		NOT NULL,
		dateDeDebut		DATE			NOT NULL,	
		dateDeFin		DATE			NOT NULL,
PRIMARY KEY(noTraitement, noExamen),
FOREIGN KEY (noTraitement) references TP5_schema.Traitement (noTraitement),
FOREIGN KEY (noExamen) references TP5_schema.Examen (noExamen)
ON DELETE CASCADE);

`;
