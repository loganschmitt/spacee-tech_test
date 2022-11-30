# Mars Rover Images by Earth Date
By: Logan Schmitt

<br/>

# Setup

After cloning the repository and loading it into your preferred IDE, you should navigate into the "backend" directory with the command: `cd backend`

To run this program, you will need Node.js. This can be installed from their website [here](https://nodejs.org/en/download/).

Having done this, there are a series of packagae installs you will need to run the `app.js` file.
1. Firstly, you will need to install **Express** using the command `npm install express`.
2. Next, install **Node-Fetch** using the command `npm install node-fetch`.
3. Lastly, install **Node-Cache** using the command `npm install node-cache`.

# Run
Now that we have all the necessary packages we need and we are in the `/backend` directory, we can run the program with the command: `node app.js`. This will start the server up and allow the user to make queries directly through the URL.

The server will be running on port 3000 so an example query will look as such in the URL of your preferred browser: <br/>
`http://localhost:3000/mars-rover/images/2015-6-3`.


If the query is valid, the following will be returned to the page given the example query: <br/>
![example_image](https://user-images.githubusercontent.com/55211410/204692178-85be7994-6e22-460d-9798-5d4cd4f7d4a5.png)
