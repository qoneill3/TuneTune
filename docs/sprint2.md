# Sprint 2

"My greatest pain in life is that I will never be able to see myself perform live." - Kanye West

**User Story:**
Now, Kayne is always working on new stuff. He's going to need to be able to add more albums to his collection.


## Overview

To complete this user story we will:
* focus on the **Create** part of CRUD
* build a form to save Albums into our database
* add a `.post` method to our server so that it can receive the form's data

> Note: as we go through this if you get stuck make use of the hints, your neighbors and senior dev.

> You must complete all of the previous sprint before starting this sprint. (excludes stretch challenges)

## Step 1:

1. Open `views/index.html`

1. Edit the file adding a new `section.container` and `div.row` after the jumbotron for the form.

1. Use bootstrap to create a form to input your Album info.  Follow the fields we've already used in our database.

> Hint: You can build your own form or use some [pre-made html](/docs/code_samples/sprint2_form.html).


## Step 2:

1. Edit your `app.js`. Use jQuery to capture the form values when the form is submitted and serialize them.  `console.log` the output.

sample serialized form data:

```js
name=Marble+House&textinput=The+Knife&releaseDate=2006&genres=electronica%2C+synth+pop%2C+trip+hop
```

2. Clear the form after getting the data.

<details><summary>hint: serializing form data</summary>

```js
var formdata = $(this).serialize();
```
</details>
<details><summary>hint: clearing the form info</summary>

```js
$(this).trigger("reset");
```
</details>

## Step 3:

Let's add a post route on the server now.  We already know that POST is used to create a new resource.  If we're following good conventions we'll use the same URL that we did to retrieve all the albums.

```
POST  /api/albums
```

1. In `server.js`, after the current `GET /api/albums` add a new route for POST.  Start by just `console.log`ing the output and returning the same data you received as json.

1. Add body-parser to the server. Make sure you `npm install --save body-parser`. Check to see if it's in `package.json` and then also require it in your `server.js` file.

1. You can test this by either using AJAX from your browser's javascript console, or by using curl or postman.

<details><summary>hint: requiring/using body-parser in server.js</summary>

```js
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
```
</details>



curl:
```bash
 curl -X POST http://localhost:3000/api/albums --data "name=Marble+House&textinput=The+Knife&releaseDate=2006&genres=electronica%2C+synth+pop%2C+trip+hop"
```

> Hint: If using postman to POST set the BODY type to x-www-form-urlencoded, then set key-value pairs.


## Step 4:

1. In the client-side JS, setup your form handler to make an AJAX POST request with the data.

1. Verify it's getting logged by the server when you submit. Check that the information from the form is being sent in the `req.body`.

1. On the server-side split up the data we're getting in the `req.body.genre` field into an array.


## Step 5:

1. Connect the POST route to the database. Use mongoose method to create a new album and save it to the database. Make sure you're returning the new album.

1. Test it!

> Hint: if you get stuck here take a look at the solutions.

## Step 6:

1. When your server returns JSON, append the new album to the page.  We already have a function to render it!

1. TEST ALL THE THINGS

![Test all the things](http://www.xclusivetouch.co.uk/wp-content/uploads/2014/03/kanye-west-yeezy-but-im-the-best-gif.gif)

## Stretch Challenges

1. Add HTML5 form validations to the form.  Ensure that all fields are filled.  

1. Change the form, replacing the textarea for genre with a field that has a button to add a new field for each genre.  See the mockup:

![add new field button](/docs/assets/images/add_new_field_button.png)

1. Convert the form to a modal and add a link to the right-side of the "Albums" header to open it!
