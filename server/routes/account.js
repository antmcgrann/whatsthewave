import express from 'express'
import { getAccounts, createAccount } from '../controllers/account.js'
const router = express.Router()

router.get('/getAccounts', getAccounts);
router.post('/createAccount', createAccount);

export default router;