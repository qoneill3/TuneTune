# Sprint 1

"I'll say things that are serious and put them in a joke form so people can enjoy them. We laugh to keep from crying."  - Kanye West

**User Story:**
First things first, Kanye will need to be able to see all the albums currently in his collection on the index page of the application.

## Overview

To complete this user story, on our first sprint we will:
* focus on the **Read** part of CRUD
* connect our _partially_ pre-built front-end to a back-end with hard-coded data.
* replace the hard-coded data with data stored in a mongo db


## Step 0:

Now would be a great time to explore the files provided for you.  In particular note:
* the html in views/index.html
* the incomplete server in server.js
* the included package.json

### Working through the lab

Use nodemon throughout the exercise to run your server. Don't forget to run npm install after your forked and cloned this repo if you do not see the node_modules folder.

When you run nodemon, you should see where your Express server is running in the Terminal.  You should use this address in your browser to test your progress.

Continually verify that your browser console is displaying the `app.js loaded!` message on document-ready.

## Step 1:
**Goal** display hard-coded data from `app.js` on `index.html`
Let's start on the outside and work our way in.  

1. Open `index.html` and find the HTML for an **album**. Delete the hardcoded HTML for all of the albums. Leave the outer `div#albums` in place.

1. Open `app.js` and edit the function `renderAlbum` to display one Album on the page.
You should use the `albumHTML`, which is just like what you just deleted in `index.html`, as the template for the album info.  Build-up the HTML string and use jQuery to render it on the page.

1. Run the function on document-ready and give it `sampleAlbums[0]` (just one album).  Verify that the page looks right.

1. Now, update your code to use **all** the sampleAlbums.  Use `forEach`.

<details><summary>hint: calling renderAlbum</summary>

```js
$(document).ready(function() {
  console.log('app.js loaded!');
  renderAlbum(sampleAlbums[0]);
});
```
</details>


## Step 2:

We're going to add the following _index_ route on our server:

```
GET /api/albums
```

1. Open `server.js` and create a new route for `/api/albums`

1. Serve the hard-coded albums in the `server.js` file on `/api/albums`.  This is an API route, so let's send JSON.

1. In `app.js`, use `ajax` to hit that route you just built and get the albums as a JSON object from your server file.  Render them on the page.

> The data in `server.js` and `app.js` is different; making it easy to see which data is being rendered on your page.


## Step 3:

Let's setup the database now.

1. Use `npm` to install `mongoose`. Check your package.json to make sure it's listed there as a dependency.

1. In `models/album.js` add a model for our albums.  You should be able to determine the attributes and their datatypes based on the sample data in the server.

1. Export Album in `models/album.js`

1. Require and export Album in `models/index.js`


<details><summary>hint: `models/albums.js`</summary>

```js
//models/album.js
var AlbumSchema = new Schema({
  artistName: String,
  name: String,
  releaseDate: String,
  genres: [ String ]
});

var Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;
```

</details>

<details><summary>hint: `models/index.js`</summary>

```js
module.exports.Album = require("./album.js");
```

</details>


## Step 4

Let's try seeding our database.

1. Move the hard-coded model data from `server.js` into `seed.js`.  You'll note there's already an empty variable there for you to use.  

1. Strip out the pre-coded `_id` properties, mongo will take of creating these for us.

1. Make sure `mongod` is running in a terminal.

1. Seed the database by running node seed.js in the terminal

1. Resolve any errors you encounter.

<details><summary>hint: `error connect ECONNREFUSED`</summary>
If you see an error like:

```
process.nextTick(function() { throw err; })
                              ^
Error: connect ECONNREFUSED 127.0.0.1:27017
```

It usually means that `mongod` is not running.
</details>


## Step 5:

Now that the database is seeded, let's continue and use it in our `/api/albums` route.

1. Require `./models` in `server.js`.

1. Edit the current `app.get('/api/albums', fun...` to access the database and pull all albums.

1. Verify that you're getting the right data on your index page now.  Your ajax should still work; but if the `keys` in the data have changed at all you'll have to resolve that.

<details><summary>hint: requiring `./models`</summary>

```js
var db = require('./models');
```
</details>

<details><summary>hint: accessing Album info from db</summary>

```js
db.Album.find({}, function(err, albums) {
  res.json(albums);
})
```
</details>

## Sprint 1 Conclusion

**If you're stuck, ask your senior dev for help.**

If you've made it this far then we've created an API that has an index route `/api/albums`.
Our app has a single-page view that makes an ajax GET request to the API and renders the information.  Our data is being **R**ead from the database by the server.

We've completed the **Read** component of our **CRUD** app for the moment.

![alt text](http://cdn2.crushable.com/wp-content/uploads/2015/04/kanye.gif "Kanye")


**Good job!**
