import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true
    },
    post: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
    {
      timestamps: true
    }
  
)

export const Post = mongoose.model('Post', postSchema)