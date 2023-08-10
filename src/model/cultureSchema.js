import mongoose from 'mongoose';

const cultureSchema = new mongoose.Schema({
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

const Culture = mongoose.models.culture || mongoose.model('culture', cultureSchema); //create user database.if not created yet,then create new database called user

export default Culture;