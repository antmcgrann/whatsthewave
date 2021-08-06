import mongoose from 'mongoose';

const accountSchema = mongoose.Schema ({
    username: String,
    password: String,
    bio: String,
    email: String,
    eventsHosted: [String],
    eventsRSVP: [Event],
    eventsAttended: [String]
})

const AccountData = Mongoose.model('AccountData', accountSchema);

const account1 = new AccountData({username: 'wtwAdmin', password: 'password', bio: 'The creators of Whats the Wave', 
    email: 'whatsthewave@gmail.com', eventsHosted: ['SDD party'], eventsRSVP: ['SDD party part 2'], eventsAttended: ['SDD Lecture', 'SDD party'] });


account1.save(function (err) {
    if (err) return handleError(err); 
});

export default AccountData;