import mongoose from 'mongoose';

const accountSchema = mongoose.Schema ({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    //Uncomment if we actually need email
    //email: String,
    //Store the _id for event in these lists
    eventsHosted: [String],
    eventsRSVP: [String],
    eventsAttended: [String]
})

const AccountData = mongoose.model('AccountData', accountSchema);
/*
const account1 = new AccountData({username: 'wtwAdmin', password: 'password', bio: 'The creators of Whats the Wave', 
    email: 'whatsthewave@gmail.com', eventsHosted: ['SDD party'], eventsRSVP: ['SDD party part 2'], eventsAttended: ['SDD Lecture', 'SDD party'] });


account1.save(function (err) {
    if (err) return handleError(err); 
});
*/

export default AccountData;