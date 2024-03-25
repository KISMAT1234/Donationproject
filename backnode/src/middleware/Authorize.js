const authorize = (roles = []) => {
  return (req, res, next) => {
    // console.log(req.body.userRole)
    if (req.body.userId && roles.includes(req.body?.userRole)) {
      next();
    } else {
      res.status(200).json({err:"error in authorization"});
    }
  };
};

export default authorize