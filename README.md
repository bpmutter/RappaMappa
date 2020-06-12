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
##### GIF HERE! 

RappaMappa is also integrated with the [Spotify Web API](https://developer.spotify.com/documentation/web-api/). When users click on the 'Music and More' button for each rapper, it renders additional information about the artist from Spotify, including a link to listen to the artist's music on the Spotify web player. 
##### GIF HERE !!

## Application Architecture
As noted above, RappaMappa is a fullstack MERN application. The majority of the application logic occurs within front end's [Redux](https://redux.js.org/) store and its interactions with the [Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript/tutorial) via the [react-google-maps](https://www.npmjs.com/package/react-google-maps) library. RappaMappa uses the [Material UI framework](https://material-ui.com/) for styling components. 

The backend serves the frontend, responds to frontend requests, acts as an intermediary to serve Spotify data to the frontend, and fetches data from the MongoDB database. 

![RappaMappa application architecture](/readme-resources/rappa-mappa-architecture.png)
*RappaMappa application architecture*

## Frontend Overview
RappaMappa is very frontend heavy application. It makes extensive use of 3rd-party APIs and resources to create a dynamic and data-rich experience. Below are the frontend technologies that make this application possible. 

### Frontend Technologies Used:
#### React
At its core, RappaMappa is a React application. It uses very little of the core React library besides passing a few props, but makes extensive use of the technologies and libraries of the React ecosystem. Without the robust and well-documented React ecosystem, creating RappaMappa would have been a substantially more challenging enterprise. 

#### Redux
Redux and the react-redux library were used to manage application state and make fetch requests to the server for data. 

All artist information is fetched on page load and kept in the Redux store. While this expensive operation lengthens the initial load time, it also allows for a snappy experience after that load.

Redux also stores and sets information about the 'activeRapper', whichever artist has been selected by the user. By managing this state in Redux, it provides easy access to the information across components without prop threading. This was particularly important because there were so many components in the application, largely due to all the artist pins being individual components, that if too many components were re-rendering constantly because of state change it would cause significant performance issues or crash the application completely. Redux provided a relatively simple way to manage this point of complexity. 

Redux also allows for a lot of extendibility if new features are to be implemented (additional feature wish-list discussed in conclusion). 

#### Material UI
RappaMappa uses the Material UI framework. Material provides a great library of elegant, responsive components, and tools for refactoring them to the application's need. There is also extensive documentation of Material, which helped resolve the issues that came up during the development process.

Material is also great for mobilize optimizing custom components with its `makeStyles` and `useMediaQuery` hooks. These hooks were particularly useful for making the navbar and popup box responsive to varying device widths. 

One Material component that was particularly important for the project was [Autocomplete](https://material-ui.com/components/autocomplete/). It was used in the search box to dynamically display artist recommendations based on user input. The Autocomplete component allowed for a rich search experience with minimal technical overhead. 

##### maybe add codeblock here for Autocomplete

#### Google Maps Javascript API
The Google Maps Javascript API is absolutely essential to this project. Basically the entire frontend is built on top of the Google Maps API via the react-google-maps library. All artist information is rendered on a Google Map component as pins, and then displayed in custom stylized Infobox components. 

The API has a truly robust feature set, of which this application just scratched the surface. However, with its scope also lie many bugs and other issues. Of particular pain throughout the development, were the Pins and Infobox components. For instance, to render the artist information on mobile devices, it required forgoing the Infobox component associated with the Pin of the large-screen version in favor of a different component positioned to the bottom of the screen. This change was necessary because the Infobox component has to have static position, while the mobile styling required positioning relative to the device window for easy use on smaller screen size. 

##### add code for infobox here

## Backend Overview
RappaMappa uses an Express server with MongoDB as the database. Compared to the frontend, the backend of RappaMappa is fairly simple, with the server sending the front end to the client, receiving requests, and sending data to the frontend. Below are the backend technologies used with some notes regarding their implementation. 

### Backend Technologies Used
#### ExpressJS
Express was the natural choice for RappaMappa's server-side framework. The minimalism of Express lent itself to the very light-weight responsibilities of RappaMappa's server. The server is just a couple of routes and a connection to the database, with a couple utilities to facilitate this. 

#### MongoDB
MongoDB was perfect for this project because its collections of JSON-like records made it very easy to store the artist information, which is in JSON object form. The [Mongoose ORM](https://mongoosejs.com/) was used to communicate between the database, hosted in MongoDB Atlas, and the server. 

#### Spotify Web API**: 
In addition to the information stored in the database, the backend also fetches additional artist data in a JSON object from the Spotify Web API. This information includes: artist image, artist popularity, subgenres, and an external link to listen to the artists on Spotify. 

While the Spotify Web API is a fairly standard RESTful API, it requires authentication with a token that expires after an hour. To facilitate this, the Express server fetches a new token every hour, which is used in all requests to the Spotify server.

  * ### code for spotify auth flow 
  
#### Rap World Dataset 
The artist information in the database was gathered from the [Rap World dataset](https://public.opendatasoft.com/explore/dataset/rapworld/api/). It's a well-curated dataset with consistent information about rappers and where they're from. Without this dataset, collecting the information that makes this project possible would have been much more complicated—likely involving some web scraping and \*shudder\* manual data entry. 

It is worth noting that the Rap World data was generated as part of a somewhat similar project, [Rap World Map](https://rapworldmap.com/). However, the Rap World Map site was actually down for the entire development of this project (June 2020), so the website was never used as a reference for the final product here. Any similarities beyond the fact that both projects use the same dataset are purely coincidental.

## Conclusion and Next Steps
Time to break the 4th wall. RappaMappa was a ton of fun to build. I'm a lifelong fan of hip-hop and it was an amazing experience getting to combine that passion with my newer passion for coding. 

This also marks the first time that I've built a fullstack app solo, and my first project of significant scope where I originated the idea and brought it into existence. It has been an incredibly rewarding experience to create it. 

While making RappaMappa, I got to play with a whole bunch of new technologies and get better at even more. At the beginning of the project, I'd only learned React 2 weeks previous, Redux 1 week before. I've come out of it stronger with both, and eager to continue getting better with React and creating cool stuff with the many amazing libraries and technologies of the React ecosystem. 

This was also my first time using MongoDB (I've previously worked with Postgres). I found it and the full MERN stack very smooth and well integrated, and now understand why it's so popular. I look forward to learning more about MongoDB and build projects  that have more robust backends than RappaMappa using it. 

**Next Steps:** Next steps for RappaMappa may be found in the [project todo list](https://github.com/bpmutter/RappaMappa/blob/master/project-todos.md), where you can also find a somewhat exhaustive list of the tasks of the project development. If you'd like to participate in the further development of RappaMappa, [reach out to me (Ben Perlmutter) on Twitter](https://twitter.com/bpmutter). And if you want to support this project financially, please make a contribution to [Black Lives Matter](https://secure.actblue.com/donate/ms_blm_homepage_2019) instead. 

Thanks for reading! ✌🏽