import image from '../image/post.jpg'

function Uploadcontent (){
 return (
    <>
       <div className="  bg-blue-400 h-[100vh] p-5  flex sm:justify-around">
        <div>
            <h1 className="text-3xl">UPLOAD YOUR POST HERE</h1>
            <form>
              <input type="file" className="w-[%]"/>
              <h1>description</h1>
              <input type="text" className=""/>
              <h1>location:</h1>
              <input type="text"/><br></br>
              <h1>deadline</h1>
              <input type="date"/>
              <option class="text-2xl">Category:
                <select>
                    <option value ='music'>Kitchen</option>
                    <option value ='music'>Clothes</option>
                    <option value ='music'>Shoes</option>
                    <option value ='music'>Accessories</option>
                    <option value ='music'>Garden</option>
                    <option value ='music'>Room</option>
                </select>
              </option>
              <button className="bg-green-700 text-2xl rounded w-[20%] h-[5vh]">Post</button>
            </form>
        </div>
        <div className="mt-[100px]">
        <img src={image} classsName=""  alt="" />
        </div>

       </div>
    </>
 )
}
export default Uploadcontent;