import PostsLoder from "./PostsLoder.jsx"

export default function App()
{
  return (
    <div className="bg-light min-vh-100 py-4">
    <div className="container"> 
     <h1 className="mb-4 text center">
     Partial loading of posts
     </h1>
     <div className="row justify-content-center">
  <div className="col-lg-8 col-md-10">
    <PostsLoder />
  </div>
</div>

    </div>
    </div>
  )
}