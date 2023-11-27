/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import "../styles/home.css";
import { MdOutlineAddBox } from "react-icons/md";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/posts")
      .then((response) => {
        setPosts(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
      <h1 className="text-3xl my-8">Home Page</h1>
      <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      <div className="flex justify-center items-center gap-x-4">
      <table className="w-full border-separate border-spacing-2">
     
        {/* <th className="border border-slate-600 rounded-md">No</th>
          <th className="border border-slate-600 rounded-md">Heading</th>
          <th className="border border-slate-600 rounded-md">Author</th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Publish Year
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Post
          </th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            imageURL
          </th>
          <th className="border border-slate-600 rounded-md">Operations</th> */}
        <tbody>
        {loading ? (
          <Spinner />
        ) : ( 
          posts.map((post) => {
            return (
              <tr key={post._id} className="h-8">
                <td className="text-center">{post.image}</td>
                <td className="text-center rounded-md">{post.heading}</td>
                <td className="text-center">{post.author}</td>
                <td className="text-center">{post.publishYear}</td>
                {/* <td className="text-center border border-slate-700 rounded-md truncate">{post.post}</td> */}
                
                <td className="text-center border border-slate-700 rounded-md">
                  <div className="flex">
                    <Link to={`/posts/details/${post._id}`}>Show Post</Link>
                    <Link to={`/posts/edit/${post._id}`}>Edit Post</Link>
                    <Link to={`/posts/delete/${post._id}`}>Delete Post</Link>
                  </div>
                </td>
              </tr>
              
            );
          })
        )}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default Home;
