import mongoose from 'mongoose';

const headlineSchema = new mongoose.Schema({
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

const Headline = mongoose.models.headline || mongoose.model('headline', headlineSchema); //create user database.if not created yet,then create new database called user

export default Headline;