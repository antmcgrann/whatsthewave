import express from 'express'
import { getAccounts, createAccount } from '../controllers/account.js'

const router = express.Router()
router.get('/', getEvents);
router.post('/', createEvent);

export default router;