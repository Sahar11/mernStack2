import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const ShowPost = () => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/posts/${id}`)
      .then((response) => {
        setPost(response.data.post);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Post</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-row w-fit p-4 ">
          <div className="my-4 mr-4">
            <span className="text-xl mr-4 text-blue-500">Id</span>
            <span>{post._id}</span>
          </div>
          <div className="my-4 mr-4">
            <span className="text-xl mr-4 text-blue-500">Heading</span>
            <span>{post.heading}</span>
          </div>
          <div className="my-4 mr-4">
            <span className="text-xl mr-4 text-blue-500"></span>
            <span>{post.image}</span>
          </div>
          <div className="my-4 mr-4">
            <span className="text-xl mr-4 text-blue-500">Author</span>
            <span>{post.author}</span>
          </div>
          <div className="my-4 mr-4">
            <span className="text-xl mr-4 text-blue-500">Publish Year</span>
            <span>{post.publishYear}</span>
          </div>
          <div className="my-4 mr-4">
            <span className="text-xl mr-4 text-blue-500">Post</span>
            <span>{post.post}</span>
          </div>
          <div className="my-4 mr-4">
            <span className="text-xl mr-4 text-blue-500">Posted on</span>
            <span>{new Date(post.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowPost;
