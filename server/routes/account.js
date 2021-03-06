import express from 'express'
import { getAccounts, createAccount, checkUser, logInAccount, getOneAccount, addEventToAccount } from '../controllers/account.js'
const accountRoutes = express.Router()

accountRoutes.get('/getAccounts', getAccounts);
accountRoutes.post('/createAccount', createAccount);
accountRoutes.post('/checkUser', checkUser);
accountRoutes.post('/logInAccount', logInAccount);
accountRoutes.post('/getOneAccount', getOneAccount);
accountRoutes.post('/addEventToAccount', addEventToAccount);

export default accountRoutes;