import {Link} from "react-router-dom"
function Nav(){
  return(
    <div className="border-5 border-red-600 bg-blue-800 h-[20vh] w-[100%]">
        <div>
            <h1 className="">Logo</h1>
        </div>
        <div>
          <li>
             <Link to ="" className="">Home</Link>
             <Link to ="" className="">About</Link>
             <Link to ="" className="">Achievement</Link>
             <Link to ="" className="">event</Link>
             <Link to ="" className="">contact</Link>

          </li>
        </div>
    </div>
  )
}

export default Nav;
