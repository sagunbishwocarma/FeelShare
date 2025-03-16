const express = require('express');
const router = express.Router() // allows us to use router inside routes folder
const cors = require('cors')
const authenticateUser = require('../middlewares/authentication');


const {test, registerUser, registerProfessional, loginUser, getUserProfile, getProfessionalProfile, logout } = require('../controller/controller');
const {createJournalEntry, getJournalEntries, deleteJournalEntry, getJournalByID, updateJournal } = require('../controller/journalController');
const { addDailyMood, getDailyMood, getMoodByID, updateMood, deleteDailyMood } = require('../controller/dailyMoodController');

const upload = require('../middlewares/fileUploadMiddleware');
const {uploadFile, getFiles, getFilesByProfessionalId} = require('../controller/uploadFileController');
const { createArticle, getArticles } = require('../controller/uploadArticleController');
const { addGoal, getGoalById, updateTask } = require('../controller/goalsController');


//middleware for router
router.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173"

    })
)

//middleware for multer


//routes

router.get('/', test)
router.post('/signup', registerUser)
router.post('/professionalregister', registerProfessional)
router.post('/login', loginUser)

router.get('/profile', getUserProfile)
router.get('/profile', getProfessionalProfile)
router.post('/logout', logout)


// routes for journal
router.post('/createJournal',  createJournalEntry)
router.get('/getJournal', getJournalEntries)
router.delete("/deleteJournal/:id", deleteJournalEntry);
router.get('/getJournalById/:journalId', getJournalByID)
router.put('/updateJournal/:journalId', updateJournal)

// routes for dailyMood

router.post('/addDailyMood', addDailyMood)
router.get('/getDailyMood', getDailyMood)
router.get('/getMoodById/:moodId', getMoodByID)
router.put('/updateMood/:moodId', updateMood)
router.delete('/deleteDailyMood/:id', deleteDailyMood)

//routes for uploadFiles
router.post('/upload', upload.single('file'), uploadFile);
router.get('/files', getFiles);
router.get('/files/:professionalId', getFilesByProfessionalId);

//route for upload articles
router.post('/createArticle', createArticle)
router.get('/getArticle', getArticles)

//route for add goals
router.post('/addGoals', addGoal)
router.get('/getGoals', getGoalById)
router.put('/updateTask', updateTask)

module.exports = router
