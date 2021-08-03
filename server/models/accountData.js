import mongoose from 'mongoose';

const accountSchema = mongoose.Schema ({
    username: String,
    password: String,
    bio: String,
    email: String,
    eventsHosted: [ {
        title: String,
        lat: Number,
        lng: Number,
        desc: String,
        creator: String,
        tags: [String],
        rsvp: [String],
        date: Date
    } ],
    eventsRSVP: [ { 
        title: String,
        lat: Number,
        lng: Number,
        desc: String,
        creator: String,
        tags: [String],
        rsvp: [String],
        date: Date
    } ],
    eventsAttended: [ {
        title: String,
        lat: Number,
        lng: Number,
        desc: String,
        creator: String,
        tags: [String],
        rsvp: [String],
        date: Date
    } ]
})

const AccountData = Mongoose.model('AccountData', accountSchema);

const account1 = new AccountData({username: 'wtwAdmin', password: 'password', bio: 'The creators of Whats the Wave', 
    email: 'whatsthewave@gmail.com', eventsHosted: ['SDD party'], eventsRSVP: ['SDD party part 2'], eventsAttended: ['SDD Lecture', 'SDD party'] });

const account2 = new AccountData({username: 'wtwAdmin', password: 'password', bio: 'The creators of Whats the Wave', 
    email: 'whatsthewave@gmail.com', eventsHosted: [ {
        title: 'SDD party',
        lat: 42.7248,
        lng: -73.6918,
        desc: 'End of the semester party! Celebrate with cake!',
        creator: 'wtwAdmin',
        tags: ['Get-together', 'Food'],
        rsvp: ['AndrewW27', 'AnthonyM30', 'AudreyS2', 'WillW20', 'JustinK45'],
        date: '2021-08-20'
    }], eventsRSVP: ['SDD party part 2'], eventsAttended: ['SDD Lecture', 'SDD party'] });

account1.save(function (err) {
    if (err) return handleError(err); 
});

export default AccountData;