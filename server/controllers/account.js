import AccountData from '../models/accountData.js';

export const getAccounts = async (  req, res  ) => {
    try{
      const accountsData = await AccountData.find();
      console.log(accountData);
      res.status(200).json(accountsData);
      }  catch (error)  {
      res.status(404).json({ message: error.message});
  }
}

export const createAccount = async (req, res) => {
    const account = req.body;

    const newAccount = new AccountData(account);

    try  {
      await newAccount.save();
      res.status(201).json(newAccount);
    }  catch (error) {
      res.status(409).json({ message: error.message });
    }

}

export const getOneAccount = async (req,res) => {

}

export const logInAccount = async (req,res) => {
  
}