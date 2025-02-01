const express = require('express');
const router = express.Router() // allows us to use router inside routes folder
const cors = require('cors')
const {test, registerUser, registerProfessional, loginUser } = require('../controller/controller');


//middleware for router
router.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173"

    })
)

router.get('/', test)
router.post('/signup', registerUser)
router.post('/professionalregister', registerProfessional)
router.post('/login', loginUser)


module.exports = router