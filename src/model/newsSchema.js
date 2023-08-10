import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
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

const News = mongoose.models.news || mongoose.model('news', newsSchema); //create user database.if not created yet,then create new database called user

export default News;