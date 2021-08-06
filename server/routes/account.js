import express from 'express'
import { getAccounts, createAccount, getOneAccount, logInAccount } from '../controllers/account.js'
const accountRoutes = express.Router()

accountRoutes.get('/getAccounts', getAccounts);
accountRoutes.post('/createAccount', createAccount);
accountRoutes.get('/getOneAccount', getOneAccount);
accountRoutes.get('/logInAccount', logInAccount);

export default accountRoutes;