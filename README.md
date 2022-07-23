
<h2 style="text-align:center">Blogsway</h2>
<h3>Technologies used:</h3>
<p>
    Front-end: HTML, CSS, Bootstrap(CSS-framework), EJS templating
</p>
  <p>  Back-end: NodeJS, ExpressJS(NodeJS framework)
</p>
<p>
    Database:MongoDB, mongoose(JS library for MongoDB)
</p>
<h3>Features</h3>
<li>Create Account(Register and Login).</li>
<li>Usage of Bcrypt Hashing to store passwords as encrypted hashes instead of plain text</li>
<li>Create, edit and delete  a blogpost</li>
<li>Read blogposts published by other usernames</li>
<li>Toggle your post as either private or public</li>

<h3>Database Schema:</h3>

```
blogSchema={
             title
             content
             visibility
}
userSchema={
            username
            password
            [blogSchema]
}
```
<h3>Endpoints:</h3>

**Endpoints**       | **Description**             |**Acceptable values**| **Method**|
--------------------|-----------------------------|---------------------|-----------|
|/      | homepage|                 | GET       |
|/register       | add a new user to db|        | POST       |
|/login     | check for existing user to login         |                | POST      |
|/:username          | view blogs posted publicly by a username     | username                    | GET       |
|/:userId/blogs          | view all the users from db   | userId                    | GET       |
|/:userId/myblogs         | view all the blogs posted by the loggedin user |userId               | GET     |
|/:userId/compose |create a blog    |userId,blogId                    | POST     |
|/:userId/:blogId/edit       | edit a blog by id        | userId,blogId                     | POST      |
|/:userId/:blogId/del    | delete a blog by id     |  userId,blogId         | POST    |
|/:userId/:blogId/visibility/:visibility    |toggle a private blog to public and vice-versa    |  userId,blogId,visibility         | POST   |

**userId corresponds to the loggedin user

<h3>Run locally: </h3>

```
git clone git@github.com:thedumbsloth/blogsway.git
```
```
cd blogsway/
```
```
npm i
```
```
node app.js
```
Alternatively running ```npx nodemon``` instead of ```node app.js``` will  automatically restart the node application when file changes in the directory are detected.

open http://localhost:3000/ in your browser
