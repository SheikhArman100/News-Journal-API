import mongoose from 'mongoose';

const opinionSchema = new mongoose.Schema({
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

const Opinion = mongoose.models.opinion || mongoose.model('opinion', opinionSchema); //create user database.if not created yet,then create new database called user

export default Opinion;