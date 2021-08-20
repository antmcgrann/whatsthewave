import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import eventRoutes from './routes/events.js';
import accountRoutes from './routes/account.js';

const app = express();

app.use(express.json({ limit: "30mb", extended: true}));
app.use(express.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

app.use('/events', eventRoutes);
app.use('/accounts', accountRoutes);

const CONNECTION_URL = 'mongodb+srv://whatsthewave-user:whatsthewave@cluster0.ayb4p.mongodb.net/whatsthewave?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then( () => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);