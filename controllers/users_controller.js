const User =require('../models/user')

module.exports.profile = function (req, res) {
      if (req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if (user){
                return res.render('user_profile', {
                    title: "User Profile",
                    user: user
                })
            }else{
                return res.redirect('/users/sign-in');

            }
        });
    }else{
        return res.redirect('/users/sign-in');

    }
};

//render the sign up page
module.exports.signUp = function (req, res) {
  res.render("user_sign_up", {
    title: "Codeial / Sign Up",
  });
};


//render the sign in page
module.exports.signIn = function (req, res) {
  res.render("user_sign_in", {
    title: "Codeial / Sign In",
  });
};

//get the sign up data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return redirect("back");
  }
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in finding user signing up");
      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("error in creating user while signing up");
          return;
        }
        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};

//get the sign in data
module.exports.createSession = function (req, res) {
  return res.redirect('/users/profile');
}

//deleting cookies for sign out
module.exports.destroySession=function(req,res){
  res.clearCookie('user_id');
  return res.redirect('/');
} 