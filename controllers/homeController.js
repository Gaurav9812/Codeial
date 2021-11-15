module.exports.home=function(req,res)
{
  //to access cookies
  console.log(req.cookies);

  // to alter cookies
  res.cookie('name','Jatin');

  return  res.render('home.ejs');
}
module.exports.profile=function(req,res)
{
  return  res.end("<h1> Codeial progile page page</h1>");
}