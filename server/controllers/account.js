import AccountData from '../models/accountData.js';

//This probably will not get used also
export const getAccounts = async (  req, res  ) => {
    try{
      const accountsData = await AccountData.find();
      res.status(200).json(accountsData);
      }  catch (error)  {
      res.status(404).json({ message: error.message});
  }
}

//Working
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
//Send username, recieve yes or no
export const checkUser = async (req,res) => {
  //unique is true
  let uniqueBool = true;
  console.log(req.body);
  if(await AccountData.findOne({username: String(req.body.username)}).exec() != null){
    //Account exists
    uniqueBool = false;
  }
  try{
    res.status(200).json(uniqueBool);
  }catch(error){
    res.status(400).json({ message: error.message});
  }
}

//Working
export const logInAccount = async (req,res) => {
  let user = req.body.user,
  pass = req.body.pass,
  userExists = true,
  passCorrect = false;
  console.log(req.body.user);
  let acc = await AccountData.findOne({username: req.body.user})
    .then(result => {
      if(result){
        //found
        console.log("Found");
      } else {
        //not found
        console.log("Not found");
      }
      return result;
    })
    .catch(err => console.log("Failed to find document"));
  console.log(acc);
  if(acc == null){
    //account does not exist
    userExists = false;
  }
  else{
    if(acc.password == pass){
      passCorrect = true;
    }
  }
  let responsePkg = {
    userValid: userExists,
    passValid: passCorrect,
    accID: acc._id
  }
  try{
    res.status(202).json(responsePkg);
  }catch(error){
    res.status(405).json({ message: error.message});
  }
}

//Add event id to account
//Req should say whether it is the creator or rsvp
export const addEventToAccount = async (req,res) => {
  const filter = {_id: req.body.accountID};
  let doc = {};
  if(req.body.created){
    //Add to events created
    const update = { $push : {eventsHosted : req.body.eventID}};
    doc = await AccountData.findOneAndUpdate(filter, update, {
      new: true
    });
  }
  else{
    //Add to events rsvp
    if (!json(await AccountData.findById(req.body.accountID)).eventsRSVP.includes(req.body.eventID)) {
      /* vendors contains the element we're looking for */
      const update = { $push : {eventsRSVP : req.body.eventID}};
      doc = await AccountData.findOneAndUpdate(filter, update, {
        new: true
      });
    }
  }
  try{
    res.status(210).json(doc);
  }catch(error){
    res.status(410).json({ error : error.message});
  }
}

//Send account id, get all accounts details
//Working
export const getOneAccount = async (req,res) => {
  console.log(req.body.id);
  let acc = await AccountData.findById(req.body.id)
    .then(result => {
      if(result){
        console.log(result);
        console.log("Account exists");
      }
      else{
        console.log("Account does not exist");
      }
      return result;
    })
    .catch(err => console.log({message: error.message}));
  console.log(acc);
  try{
    res.status(201).json(acc);
  }catch(error){
    res.status(401).json({error: error.message});
  }
}
