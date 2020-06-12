# RappaMappa
*By Ben Perlmutter * [Visit RappaMappa](http://rappamappa.herokuapp.com/)*

**Table of Contents**
* RappaMappa at a Glance
* Application Architecture & Technologies Used 
* Frontend Overview
* Backend Overview
* Conclusion & Next Steps

## RappaMappa at a Glance
RappaMappa is a fullstack [MERN](https://www.geeksforgeeks.org/mern-stack/) app that lets the user explore where rappers have come from and access information about the artist. 

Users can visually explore the map, which features 581 artists, and search for artists with the integrated search box. 
#### GIF HERE! 

RappaMappa is also integrated with the [Spotify Web API](https://developer.spotify.com/documentation/web-api/). When users click on the 'Music and More' button for each rapper, it renders additional information about the artist from Spotify, including a link to listen to the artist's music on the Spotify web player. 
#### GIF HERE !!

## Application Architecture
As noted above, RappaMappa is a fullstack MERN application. The majority of the application logic occurs within front end's [Redux](https://redux.js.org/) store and its interactions with the [Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript/tutorial) via the [react-google-maps](https://www.npmjs.com/package/react-google-maps) library. RappaMappa uses the [Material UI framework](https://material-ui.com/) for styling components. 

The backend serves the frontend, responds to frontend requests, acts as an intermediary to serve Spotify data to the frontend, and fetches data from the MongoDB database. 

![RappaMappa application architecture](/readme-resources/rappa-mappa-architecture.png)

## Frontend Overview
RappaMappa is very frontend heavy application. It makes extensive use of 3rd-party APIs and resources to create a dynamic and data-rich experience. Below are the frontend technologies that make this application possible. 
* 
### Frontend Technologies Used:
**React**: At its core, RappaMappa is a React application. It uses very little of the core React library besides passing a few props, but makes extensive use of the technologies and libraries of the React ecosystem. Without the robust and well-documented React ecosystem, creating RappaMappa would have been a substantially more challenging enterprise. 

**Redux**: Redux and the react-redux library were used to manage application state and make fetch requests to the server for data. T
  * stores all app info
  * this includes an array with all artists
    * that is why despite fairly slow initial load time, the app generally is pretty snappy
  * also allows for some interesting interactions like, setting a application-wide 'activeRapper', that dictates that additional info only about that rapper will show. 
    * this was very important given the large number of components. by keeping 1 active rapper, and moving where the information about them renders around the map, it ensures that there isn't constant component re-rendering. 
      * before implementing this feature during development, the React would actually crash because it had to render too many components all at once! 
**Material UI**: 
  * great resource for out of the box library
  * strong feature set with extensive documentation
    * talk about search using the Autocomplete component
      *  #### maybe search code example 
  * make sure to talk about making it responsive and how material is good for that 

**Google Maps Javascript API**:
  * probbly most important part of this project, as it provides the map and allows for all interaction with it 
  * robust API with lots of features that made RappaMappa possible
  * there were challenges with certain features, especially the pins and their associated infoboxes
    * repeatedly encountered bugs where they didn't show up when trying to do something
    * for example the active artist popup box is associated with a pin, b/c otherwise impossible (as far as i could gather) to move it around the map
      * the pin is just 1px by 1px (originally 0 by 0, but for some reason this would crash the whole application when doing the create-react-app build,)
    * #### add code for infobox here 

## Backend Overview
* idk some very quick intro
### Backend Technologies Used
* **Express**: natural choice b.c needed a very minimalist server, and fit well within the MERN stack
* **MongoDB**: natural DB choice b.c the DB was just a collection of JSON objects. 
  * i was able to spin up a MongoDB and implemented in the application using the Mongoose ORM (NTS: i think it's not called an ORM but smthn else)
  * note: mention hosted in cloud atlas
  * MAYBE FOOTNOTE??: also note that the single most vexing part of the process was a bug btwn Mongo Cloud atlas and the app, wherein the DB wasn't connecting ot the mongoose schema for artists. as it turned out, Mongoose wasn't reading the Cloud Atlas collection b.c the first letter was capitalized. 5 hours of trial, error, and Stack overflow, I changed 'Artists' to 'artists' and it worked as expected. 
* **Spotify Web API**: talk about had to do continuous auth process b.c token expires every hour 
  * ### code for spotify auth flow 
* **Rap World dataset**: served as seed data. a well curated dataset, without which this project would have become much more complicated! 
## Conclusion and Next Steps