const noteController = require("../controllers/noteController");
const router = require("express").Router();
const verifyJWT = require("../middlewares/verifyJWT");

router.use(verifyJWT);

router
  .route("/")
  .get(noteController.getAllNotes)
  .post(noteController.createNewNote)
  .patch(noteController.updateNote)
  .delete(noteController.deleteNote);

module.exports = router;
