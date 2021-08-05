import express from 'express'
import { getAccounts, createAccount, getOneAccount, logInAccount } from '../controllers/account.js'
const router = express.Router()

router.get('/getAccounts', getAccounts);
router.post('/createAccount', createAccount);
router.get('/getOneAccount', getOneAccount);
router.get('/logInAccount', logInAccount);

export default router;