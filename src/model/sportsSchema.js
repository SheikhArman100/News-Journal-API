import mongoose from 'mongoose';

const sportsSchema = new mongoose.Schema({
    title: {
    type: String,
    
  },
  link: {
    type: String,
    
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Sports= mongoose.models.sports || mongoose.model('sports', sportsSchema); //create user database.if not created yet,then create new database called user

export default Sports;