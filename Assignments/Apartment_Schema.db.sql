BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "Amenities" (
	"amenityID"	INTEGER NOT NULL,
	"amenityName"	TEXT NOT NULL,
	"capacity"	INTEGER NOT NULL,
	PRIMARY KEY("amenityID" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "AmenityReservations" (
	"reservationID"	INTEGER NOT NULL,
	"amenityID"	INTEGER NOT NULL,
	"tenantID"	INTEGER NOT NULL,
	"dateTime"	TEXT NOT NULL,
	"durationHrs"	NUMERIC NOT NULL,
	FOREIGN KEY("amenityID") REFERENCES "Amenities"("amenityID"),
	FOREIGN KEY("tenantID") REFERENCES "Tenants"("tenantID"),
	PRIMARY KEY("reservationID" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "ApplianceTypes" (
	"applicanceTypeID"	INTEGER NOT NULL,
	"applicanceType"	TEXT NOT NULL UNIQUE,
	PRIMARY KEY("applicanceTypeID" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "InstalledAppliances" (
	"applianceID"	INTEGER NOT NULL,
	"unitID"	INTEGER NOT NULL,
	"installDate"	TEXT NOT NULL,
	"applianceTypeID"	INTEGER NOT NULL,
	FOREIGN KEY("applianceTypeID") REFERENCES "ApplianceTypes"("applicanceTypeID"),
	FOREIGN KEY("unitID") REFERENCES "Units"("unitID"),
	PRIMARY KEY("applianceID" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Parking" (
	"spaceID"	INTEGER NOT NULL,
	"tenantID"	INTEGER,
	"vehicleMake"	TEXT,
	"vehicleColor"	TEXT,
	"VIN"	TEXT UNIQUE,
	"reserved"	INTEGER NOT NULL,
	FOREIGN KEY("tenantID") REFERENCES "Tenants"("tenantID"),
	PRIMARY KEY("spaceID" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "PrimaryTenants" (
	"unitID"	INTEGER NOT NULL,
	"tenantID"	INTEGER NOT NULL,
	FOREIGN KEY("unitID") REFERENCES "Units"("unitID"),
	FOREIGN KEY("tenantID") REFERENCES "Tenants"("tenantID"),
	PRIMARY KEY("unitID" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "SecondaryTenants" (
	"unitID"	INTEGER NOT NULL UNIQUE,
	"tenantID"	INTEGER NOT NULL,
	FOREIGN KEY("tenantID") REFERENCES "Tenants"("tenantID"),
	FOREIGN KEY("unitID") REFERENCES "Units"("unitID"),
	PRIMARY KEY("unitID","tenantID")
);
CREATE TABLE IF NOT EXISTS "Tenants" (
	"tenantID"	INTEGER NOT NULL,
	"firstName"	TEXT NOT NULL,
	"lastName"	TEXT NOT NULL,
	"phoneNumber"	TEXT NOT NULL UNIQUE,
	"emailAddress"	TEXT NOT NULL UNIQUE,
	PRIMARY KEY("tenantID" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "Units" (
	"unitID"	INTEGER NOT NULL,
	"rent"	NUMERIC NOT NULL,
	"areaSqft"	INTEGER NOT NULL,
	PRIMARY KEY("unitID" AUTOINCREMENT)
);
COMMIT;
