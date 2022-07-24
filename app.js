const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const _ = require("lodash");
const bcrypt = require("bcrypt");

const saltRounds = 2;

const http = require('http');
const app = express();
const server = http.createServer(app);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
mongoose.connect("mongoose.connect("mongodb://127.0.0.1:27017/blogswayDB",{useNewUrlParser:true});",{useNewUrlParser:true});

blogSchema = new mongoose.Schema({
    title:String,
    content:String,
    visibility:String
});
const Blog = mongoose.model("Blog",blogSchema);

const userSchema = new mongoose.Schema({
    username:String,
    password:String,
    blog : [blogSchema]
});
const User = new mongoose.model("User",userSchema);



app.get("/",function(req,res){
res.render("home");
});

app.get("/register",function(req,res){
  res.render("login-register",{status:"Register",result:"rendering"});
})

app.post("/register",function(req,res){
    
    
    const userName = req.body.username;
    const password = req.body.password;
    User.findOne({username:userName},function(err,user){
        if(err) console.log(err);
        
        else{
            if(user) {
                const result = "usernameexists";
                const text = "Username already exists. Please try another one."
                res.render("login-register",{status:"Register",result:result,text:text});
               
             }
            else{

                bcrypt.hash(password,saltRounds,function(error,hash){
                    if(error) console.log(error);
                    else{
                        const user = new User({
                            username : userName,
                            password: hash
                        });  
                        user.save(); 
                        res.redirect("/" + user._id + "/blogs");
                    }
                
                })
               

                
            }
        }

    })

})


app.get("/login",function(req,res){

    res.render("login-register",{status:"Login",result:"rendering"});
  })

app.post("/login",function(req,res){
    const userName = req.body.username;
    const password = req.body.password;
    User.findOne({username:userName},function(err,user){

        if(user){
             bcrypt.compare(password,user.password,function(error,result){
                const userId = user._id;
                if(!err){
                if(result === true) res.redirect("/"+ userId +"/blogs");
                else{
                    const result = "incorrectpassword";
                    const text = "Your password is incorrect."
                    res.render("login-register",{status:"Login",result:result,text:text});
                }
                
                }
        });
        }
        else{
            const result = "newuser_on_loginpage";
            const text = "New user? Please register yourself."
            res.render("login-register",{status:"Register",result:result,text:text});
        }
    }); 
});

app.get("/:userId/blogs",function(req,res){
    
    const userId = req.params.userId;
    // console.log(userId);
    User.findOne({_id:userId},function(err,user){
        if(user){
    User.find({},function(err,user){
        if(!err)
        // console.log(user);
        res.render("blogs",{authors:user,userId:userId});
       })
    }

})
});

app.get("/:userId/myblogs",function(req,res){

    const userId = req.params.userId;
    User.findOne({_id:userId},function(err,user){
        if(!err) 
        res.render("my_blogs",{my_blogs:user.blog,user:user});
    })
   
})

app.get("/:userId/compose",function(req,res){

    const userId = req.params.userId;
    res.render("compose",{userId:userId});

});

app.post("/:userId/compose",function(req,res){

   const blogTitle = req.body.blogTitle;
    const blogPost = req.body.blogPost;
    const method = req.body.button;
  const userId = req.params.userId;

  User.findOne({_id:userId},function(err,user){

    if(!err){
    const myblog = new Blog ({
        title:blogTitle,
        content:blogPost,
        visibility:method
    });
    if(user){
        user.blog.push(myblog);
        user.save();       
    }
    }
  });

    res.redirect("/"+ userId +"/myblogs");

})

app.post("/:userId/:blogId/edit",function(req,res){
    // console.log("edit");
const blogTitle = req.body.blogTitle;
const blogPost = req.body.blogPost;
const method = req.body.button;
const userId = req.params.userId;
const blogId = req.params.blogId;

User.findOne({_id:userId},function(err,user){
    if(err) console.log(err);
    if(user){
        user.blog.forEach(function(blog){
            if(blog._id.toString() == blogId){
                blog.title = blogTitle;
                blog.content  = blogPost;
                blog.visibility = method;
            }
        })
        user.save();
        res.redirect("/" +userId+ "/myblogs");
    }
})
})

app.get("/:username",function(req,res){
    const username = req.params.username;
    User.findOne({username:username},function(err,user){

        if(!err && user){
            res.render("username_blogs",{user:user});
        }
    })
   
});

app.get("/:userId/:blogId/del",function(req,res){
    const userId = req.params.userId;
    const blogId = req.params.blogId;
    // console.log(userId);
    // console.log(blogId);

    User.findOne({_id:userId},function(err,user){
       if(err) console.log(err);
       else{
        for(let i = 0; i < user.blog.length; i++){
            if(user.blog[i]._id.toString() == blogId)
            user.blog.splice(i,1);
        }
        user.save();
        res.redirect("/"+ userId +"/myblogs");
    }

})
})

app.get("/:userId/:blogId/visibility/:visibility",function(req,res){
    const userId = req.params.userId;
    const blogId = req.params.blogId;
    const visibility = req.params.visibility;

    User.findOne({_id:userId},function(err,user){

        if(err) console.log(err);
        else{

            if(user){
                user.blog.forEach(function(blog){
                    if(blog._id.toString() == blogId){
                        blog.visibility = visibility;
                    }
                })
                user.save();
                // console.log(user.blog);
            }
            res.redirect("/" +userId+ "/myblogs" );

        }

    })
    })

    app.get("/:userId/:blogId/edit",function(req,res){
        const userId = req.params.userId;
        const blogId = req.params.blogId;

        User.findOne({_id:userId},function(err,user){
            if(err) console.log(err);
            else{
                if(user){
                    user.blog.forEach(function(blog){
                        if(blog._id.toString() == blogId){
                            res.render("edit", {blog:blog,userId:userId});
                        }
                    })
                }
            }
        })
        


    })


    
let port = process.env.PORT;
if(port == null|| port==""){
port = 3000;
}

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running successfully");
  });
