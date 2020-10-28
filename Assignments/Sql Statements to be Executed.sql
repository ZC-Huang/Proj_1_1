--- 1 ---
--- Return the first names of tenants who own a red car and are primary tenants
SELECT te.firstName
FROM Parking pa, Tenants te, PrimaryTenants pt
WHERE pa.tenantID = te.tenantID AND pa.tenantID = pt.tenantID AND pa.vehicleColor LIKE "%Red%"
GROUP BY 1;

--- 2 ---
--- Return the phone numbers of tenants who live in a unit with an area larger than 1000 sqft
SELECT te.phoneNumber
FROM Tenants te, Units un, PrimaryTenants pt, SecondaryTenants st
WHERE te.tenantID = pt.tenantID AND pt.unitID = un.unitID AND un.areaSqft >= 1000 OR te.tenantID = st.tenantID AND st.unitID = un.unitID AND un.areaSqft >= 1000
GROUP BY 1;

--- 3 ---
--- Which units have ovens?
SELECT un.unitID
FROM Units un, InstalledAppliances ia
WHERE ia.applianceTypeID = "705" AND un.unitID = ia.unitID
GROUP BY 1;

--- 4 ---
--- List the car makes that have more than 8 cars in the garage
SELECT vehicleMake
FROM Parking
WHERE vehicleMake IS NOT NULL
GROUP BY 1
HAVING count(*) > 5;

--- 5 ---
--- How many primary tenants reserved pool for more than 1.5 hours?
SELECT te.tenantID
FROM Tenants te, AmenityReservations ar
WHERE te.tenantID = ar.tenantID AND ar.durationHrs > 1.5 AND ar.amenityID = 901;