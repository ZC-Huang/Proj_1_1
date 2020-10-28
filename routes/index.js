const express = require("express");
const router = express.Router();

const myDB = require("../db/myDB.js");

/* GET home page. */
router.get("/", function (req, res) {
  res.redirect("/index");
});

router.get("/index", async (req, res) => {
  const page = req.query.page || 1;
  console.log("/index", page);

  try {
    const tenants = await myDB.getTenant(page);
    const reservations = await myDB.getReservation(page);
    // console.log("got tenants", tenants);
    res.render("index", {
      tenants: tenants,
      reservations: reservations,
      err: req.session.err,
      msg: req.session.msg,
    });
  } catch (err) {
    console.log("got error", err);
    res.render("index", { err: err.message, tenants: [] });
  }
});


router.post("/index/tDelete", async (req, res) => {
  try {
    const tenants = req.body;
    await myDB.deleteTenant(tenants.$tenantID);

    req.session.msg = "Tenant deleted";
    res.redirect("/index");
  } catch (err) {
    console.log("got error update");
    req.session.err = err.message;
    res.redirect("/index");
  }
});

router.post("/index/rDelete", async (req, res) => {
  try {
    const reservations = req.body;
    await myDB.deleteReservation(reservations.$reservationID);

    req.session.msg = "Reservation deleted";
    res.redirect("/index");
  } catch (err) {
    console.log("got error update");
    req.session.err = err.message;
    res.redirect("/index");
  }
});

router.post("/index/tUpdate", async (req, res) => {
  try {
    const tenants = req.body;
    const db = await myDB.updateTenant(tenants);

    console.log("update", db);

    req.session.msg = "Tenant Updated";
    res.redirect("/index");
  } catch (err) {
    console.log("got error update");
    req.session.err = err.message;
    res.redirect("/index");
  }
});

router.post("/index/rUpdate", async (req, res) => {
  try {
    const reservations = req.body;
    const db = await myDB.updateReservation(reservations);

    console.log("update", db);

    req.session.msg = "Reservation Updated";
    res.redirect("/index");
  } catch (err) {
    console.log("got error update");
    req.session.err = err.message;
    res.redirect("/index");
  }
});

router.post("/index/tCreate", async (req, res) => {
  const tenants = req.body;

  try {
    console.log("Create tenant", tenants);
    await myDB.createTenant(tenants, res);
    req.session.msg = "Tenant created";
    res.redirect("/index");
  } catch (err) {
    req.session.err = err.message;
    res.redirect("/index");
  }
});

router.post("/index/rCreate", async (req, res) => {
  const reservations = req.body;

  try {
    console.log("Create reservation", reservations);
    await myDB.createReservation(reservations, res);
    req.session.msg = "Reservation created";
    res.redirect("/index");
  } catch (err) {
    req.session.err = err.message;
    res.redirect("/index");
  }
});

module.exports = router;
