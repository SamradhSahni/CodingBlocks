const express = require("express");
const router = express.Router();
const workshopController = require("../controllers/workshopController");

router.get("/", workshopController.viewAllWorkshops);
router.get("/:id", workshopController.viewWorkshopDetails);
router.post("/enroll/:id", workshopController.enrollWorkshop);

router.get("/admin/create", workshopController.showCreateForm);
router.post("/admin/create", workshopController.createWorkshop);
router.get("/admin/enrollments", workshopController.viewEnrollments);
router.post("/admin/delete/:id", workshopController.deleteWorkshop); // ✅ Add this

module.exports = router;
