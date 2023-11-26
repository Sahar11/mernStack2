import  express  from "express";
import { Post } from "../models/postModel.js";

const router = express.Router();

router.post('/', async (request, response) => {
  try {
    if (
      !request.body.heading ||
      !request.body.author ||
      !request.body.publishYear ||
      !request.body.post ||
      !request.body.image
    ) {
      return response.status(400).send({
        message: 'All fields are required: heading, author, publishYear, post, image',
      });
    }
    const postData = await Post.create(request.body);
    return response.status(201).send(postData);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message })
  }
});

router.get('/', async (request, response) => {
  try {
    const postData = await Post.find();

    return response.status(200).json({
      count: postData.length,
      data: postData
    })
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.get('/:id', async (request, response) => {
  try{
    const { id } = request.params;
    const post = await Post.findById(id);

    return response.status(200).json({post});
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
})
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.heading ||
      !request.body.author ||
      !request.body.publishYear ||
      !request.body.post ||
      !request.body.image
    ) {
      return response.status(400).send({
        message: 'Send all required fields: heading, author, publishYear, post, image',
      });
    }
    const { id } = request.params;

    const result = await Post.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Post not found' })
    }
    return response.status(200).send({ message: "Post updated successfully" });
  } catch (error) {
    console.log(error.message)
    response.status(500).send({ message: error.message });
  }
});

router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Post.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({
        message: 'Post not found'
      })
    }
    return response.status(200).send({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
})

export default router;

