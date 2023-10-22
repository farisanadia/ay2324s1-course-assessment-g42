const express = require('express');
const router = express.Router();

const questionController = require("../controllers/question-controller.js");
const auth = require("../middleware/auth.js");

router.get("/getQuestions", auth, questionController.getQuestions);
router.post("/getQuestionById", auth, questionController.getQuestionById);
router.get("/getMaxQuestionId", auth, questionController.getMaxQuestionId);
router.post("/addQuestion", auth, questionController.addQuestion);
router.post("/deleteQuestion", auth, questionController.deleteQuestion);

module.exports = router;
