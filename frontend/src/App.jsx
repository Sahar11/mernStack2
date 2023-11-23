import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import ShowPost from './pages/ShowPost';
import EditPost from './pages/EditPost';
import DeletePost from "./pages/DeletePost";


const App = () => {
 
  return (
   <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/posts/create' element={<CreatePost />} />
    <Route path='/posts/edit/:id' element={<EditPost />} />
    <Route path='.posts/details/:id' element={<ShowPost />} />
    <Route path='.posts/delete/:id' element={<DeletePost />} />
   </Routes>
  )
}

export default App
