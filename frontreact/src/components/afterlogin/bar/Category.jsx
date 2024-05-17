import {Link} from "react-router-dom"

const Category = () => {
  return(
    <>
      <div className="flex justify-between px-2 py-2 rounded-2xl bg-stone-100 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
        <Link to="/Mainpage">
        <div className="mx-1 my-1 px-1 py-1 rounded-2xl bg-gray-400 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
          <h1 className="text-sm md:text-xl">All</h1>
        </div>
        </Link>

        <Link to = "/Mainpage/search?category=Accident">
        <div className="mx-1 my-1 px-1 py-1 rounded-2xl bg-gray-400 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
          <h1 className="text-sm md:text-xl">Accident</h1>
        </div>
        </Link>

          <Link to ="">
        <div className="mx-1 my-1 px-1 py-1 rounded-2xl bg-gray-400 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
          <h1 className="text-sm md:text-xl">Disease</h1>
        </div>
        </Link>
  
        <Link to ="">
        <div className="mx-1 my-1 px-1 py-1 rounded-2xl bg-gray-400 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
          <h1 className="text-sm md:text-xl">Animal</h1>
        </div>
        </Link>
  
        <Link to ="">
        <div className="mx-1 my-1 px-1 py-1 rounded-2xl bg-gray-400 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
          <h1 className="text-sm md:text-xl">Environment</h1>
        </div>
        </Link>
  
        <Link to ="">
        <div className="mx-1 my-1 px-1 py-1 rounded-2xl bg-gray-400 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
          <h1 className="text-sm md:text-xl">Orphange</h1>
        </div>
        </Link>


      </div>
    </>
  )
}
export default Category;
