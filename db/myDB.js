var sqlite3 = require("sqlite3").verbose();
const util = require("util");

function myDB() {
  const myDB = {};

  const getDb = () => new sqlite3.Database("./db/apartment.db");

  myDB.getTenant = function (page) {
    const db = getDb();

    const PAGE_SIZE = 10;
    const query = `SELECT tenantId, firstName, lastName
      FROM Tenants
      ORDER BY tenantId
      LIMIT ${PAGE_SIZE} OFFSET ${PAGE_SIZE * (page - 1)};`;

    const allPromise = util.promisify(db.all.bind(db));

    return allPromise(query).finally(() => {
      console.log("done, closing");
      db.close();
    });
  };

  myDB.getReservation = function (page) {
    const db = getDb();

    const PAGE_SIZE = 10;
    const query = `SELECT amenityId, reservationID, tenantID, dateTime
      FROM AmenityReservations
      ORDER BY dateTime
      LIMIT ${PAGE_SIZE} OFFSET ${PAGE_SIZE * (page - 1)};`;

    const allPromise = util.promisify(db.all.bind(db));

    return allPromise(query).finally(() => {
      console.log("done, closing");
      db.close();
    });
  };


  myDB.createTenant = function (tenant) {
    const db = getDb();

    const query = `
    INSERT INTO Tenants(tenantID, firstName, lastName, phoneNumber, emailAddress)
VALUES($tenantID, $firstName, $lastName, $phoneNumber, $emailAddress);`;

    const runPromise = util.promisify(db.run.bind(db));

    return runPromise(query, tenant).finally(() => db.close());
  };

  myDB.createReservation = function (reserv) {
    const db = getDb();

    const query = `
    INSERT INTO AmenityReservations(reservationID, amenityID, tenantID, dateTime, durationHrs)
VALUES($reservationID, $amenityID, $tenantID, $dateTime, $durationHrs);`;

    const runPromise = util.promisify(db.run.bind(db));

    return runPromise(query, reserv).finally(() => db.close());
  };

  myDB.updateTenant = function (tenant) {
    const db = getDb();

    const query = `
    UPDATE Tenants
    SET
      firstName = $firstName,
      lastName = $lastName
    WHERE
      tenantID = $tenantID;`;

    const runPromise = util.promisify(db.run.bind(db));

    return runPromise(query, {
      $tenantID: +tenant.$tenantID,
      $firstName: tenant.$firstName,
      $lastName: tenant.$lastName,
    })
      .then(() => db)
      .finally(() => db.close());
  };

  myDB.updateReservation = function (reservation) {
    const db = getDb();

    const query = `
    UPDATE AmenityReservations
    SET
      dateTime = $dateTime,
      amenityID = $amenityID,
      tenantID = $tenantID
    WHERE
      reservationID = $reservationID;`;

    const runPromise = util.promisify(db.run.bind(db));

    return runPromise(query, {
      $reservationID: +reservation.$reservationID,
      $amenityID: +reservation.$amenityID,
      $tenantID: +reservation.$tenantID,
      $dateTime: reservation.$dateTime,
    })
      .then(() => db)
      .finally(() => db.close());
  };

  myDB.deleteTenant = function (tID) {
    const db = getDb();

    const query = `
    DELETE FROM Tenants WHERE tenantID==$tenantID;`;

    const runPromise = util.promisify(db.run.bind(db));

    return runPromise(query, {
      $tenantID: tID,
    }).finally(() => db.close());
  };

  myDB.deleteReservation = function (rID) {
    const db = getDb();

    const query = `
    DELETE FROM AmenityReservations WHERE reservationID==$reservationID;`;

    const runPromise = util.promisify(db.run.bind(db));

    return runPromise(query, {
      $reservationID: rID,
    }).finally(() => db.close());
  };

  return myDB;
}

module.exports = myDB();
