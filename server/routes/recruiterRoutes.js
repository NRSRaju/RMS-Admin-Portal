const express = require("express");
const router = express.Router();
const recruiterController = require("../controllers/recruiterController");

router.get("/", recruiterController.getRecruiters);
router.put("/approve", recruiterController.approveRecruiter);
router.put("/reject", recruiterController.rejectRecruiter);
router.put("/verify/:id", recruiterController.verifyRecruiter);

module.exports = router;
