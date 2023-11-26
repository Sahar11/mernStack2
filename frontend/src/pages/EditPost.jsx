/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

export const EditPost = () => {
  const [heading, setHeading] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [post, setPost] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/posts/${id}`)
    .then((response) => {  
      setHeading(response.data.post.heading);
      setAuthor(response.data.post.author);
      setPublishYear(response.data.post.publishYear);
      setPost(response.data.post.post);
      setImage(response.data.post.image);
      setLoading(false)
      
    })
    .catch((error) => {
      setLoading(false);
      alert("An error has occured, Please check console.");
      console.log(error);
    });
  }, [id]);

  function handleEditPost() {
    const data = {
      heading,
      author,
      publishYear,
      post,
      image,
    };
    axios
      .put(`http://localhost:5555/posts/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(true);
        alert("Something went wrong");
        console.log(error);
      });
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="number"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Post</label>
          <input
            type="text"
            value={post}
            onChange={(e) => setPost(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Image</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditPost}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditPost;
