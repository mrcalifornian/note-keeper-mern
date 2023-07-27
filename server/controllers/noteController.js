const Note = require("../models/Note");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @desc Get all notes
// @route GET /notes
// @access Private
exports.getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find().lean();
  if (!notes?.length) {
    return res.status(400).json({ message: "No notes found" });
  }

  const notesWithUser = await Promise.all(
    notes.map(async (note) => {
      const user = await User.findById(note.user).lean().exec();
      return { ...note, username: user.username };
    })
  );
  res.status(200).json(notesWithUser);
});

// @desc Create a new note
// @route POST /notes
// @access Private
exports.createNewNote = asyncHandler(async (req, res) => {
  const { user, title, text } = req.body;

  // Confirm the data
  if (!user || !title || !text) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check for duplicate title
  const duplicate = await Note.findOne({ title })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate note title" });
  }

  // Check for users existance
  const existingUser = await User.findById(user).lean().exec();

  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }

  const lastNote = await Note.findOne().sort({ createdAt: -1 }).exec();

  const newNote = {
    user,
    title,
    text,
    ticketNumber: lastNote?.ticketNumber + 1 || 1,
  };

  //   Create and store new note
  const note = await Note.create(newNote);

  if (note) {
    res.status(201).json({ message: `New note ${note.title} created` });
  } else {
    res.status(400).json({ message: `Invalid note data received` });
  }
});

// @desc Update a note
// @route PATCH /notes
// @access Private
exports.updateNote = asyncHandler(async (req, res) => {
  const { id, user, title, text, completed } = req.body;

  // Confirm the data
  if (!id || !user || !title || !text || typeof completed !== "boolean") {
    return res.status(400).json({ message: "All fields are required" });
  }

  const note = await Note.findById(id).exec();

  if (!note) {
    return res.status(400).json({ message: "Note not found" });
  }

  const duplicate = await Note.findOne({ title })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  // Allow renaming of the original note
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate note title" });
  }

  note.user = user;
  note.title = title;
  note.text = text;
  note.completed = completed;

  const updatedNote = await note.save();

  res.json({ message: `${updatedNote.title} updated` });
});

// @desc Delete new note
// @route DELETE /notes
// @access Private
exports.deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Note id required" });
  }

  const note = await Note.findById(id).exec();

  if (!note) {
    return res.status(400).json({ message: "Note not found" });
  }

  const result = await note.deleteOne();

  const reply = `Note ${note.title} with ID ${result._id}} deleted`;

  res.json(reply);
});
