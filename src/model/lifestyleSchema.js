import mongoose from 'mongoose';

const lifestyleSchema = new mongoose.Schema({
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

const Lifestyle = mongoose.models.lifestyle || mongoose.model('lifestyle', lifestyleSchema); //create user database.if not created yet,then create new database called user

export default Lifestyle;