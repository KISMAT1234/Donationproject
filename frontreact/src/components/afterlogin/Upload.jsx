function Uploadcontent (){
 return (
    <>
       <h1>Uploads</h1>
       <div className="border-4 border-red-600 bg-blue-400 h-[80vh]  ">
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
          
       </div>
    </>
 )
}
export default Uploadcontent;