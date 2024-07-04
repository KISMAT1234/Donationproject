const Pagination = (req) =>{
    let page =Number(req.query.page) || 1;
    console.log(page,'page value')
    let size = Number(req.query.size) || 3;
        // console.log(skip,'skip value');
    let skip = (page-1) * size;

      return { size, skip}  
}

export default Pagination