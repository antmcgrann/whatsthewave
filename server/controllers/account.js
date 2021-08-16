import AccountData from '../models/accountData.js';

//This probably will not get used also
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
    const newAccount = new AccountData(req.body);
    try  {
      await newAccount.save();
      res.status(201).json(newAccount);
    }  catch (error) {
      res.status(409).json({ message: error.message });
    }

}

//Needs to be used to see if a account username is unique
export const getOneAccount = async (req,res) => {
}

export const logInAccount = async (req,res) => {
  let login = req.body;
  let acc = await AccountData.findOne(req.body.user);
  //WIP
}

//Add event id to account
//Req should say whether it is the creator or rsvp
export const addEventToAccount = async (req,res) => {

}