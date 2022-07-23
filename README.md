
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
<ul></ul>
<li>Create Account(Register and Login).</li>
<li>Usage of Bcrypt Hashing to store passwords as encrypted hashes instead of plain text</li>
<li>Create, edit and delete  a blogpost</li>
<li>Read blogposts published by other usernames</li>
<li>Toggle your post as either private or public</li>

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
