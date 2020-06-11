

## MVPs

- [x] Interactive map
- [x] Nav bar with search
  - [x] include relevant links 
  - [x] bring user back to main page
- [x] Add rapper pins to map
- [x] add basic info box for selected rapper
- [x] redux store to maintain state
  - [x] include rapper list
  - [x] active rapper
  - [x] focus location
- [x] searchbox that updates active rapper in state and redirects view to correct location
- [x] More information modal 
  - [x] Create modal
  - [x] add custom styles and populate info
  - [x] All information from DB 
  - [x] Bring in additional data from spotify API
- [x] 404 Page (1 hour remaining)
  - [x] create/render routes correctly
  - [x] make content
- [x] About Page 
  - [x] basic project information
  - [x] contact info and github
  - [x] styling
- [x] Error handling 
  - [x] when search result not in DB 
  - [x] when problem with Spotify API
  - [x] set up error handling in redux for extendibility 
- [ ] Mobile optimization (half day)
  - [ ] map size
  - [ ] search box
  - [ ] nav bar 
  - [ ] modals 
  - [ ] basic info popup
- [ ] Backend (full day)
  - [x] add spotify auth to backend (NOTE: already half done in frontend, but migrate back there)
  - [x] create basic database to store rapper info - Mongo DB
  - [x] add route for get all rappers from DB
  - [x] create restful route to serve to the redux store
  - [ ] add dotenv configuration
- [ ] Add loading screens for components (time indeterminate)
  - [ ] main map
- [ ] Deploy app (2+ hours)
  - [ ] make sure API keys are secure 
    - [x] spotify
    - [ ] google maps - need to secure from google cloud console 
  - [ ] heroku for app files
  - [x] db cloud hosting 
  - [ ] create separate dev/production environments
- [ ] Create project README (4 hours)

## Stretch Goals
- [ ] Data visualization page (whole day)
  - [ ] Use Google Data Studio API to create 4 basic maps and charts (or possibly other API). state-to-state comparison, regional comparison
  - [ ] **super strech** integrate additional third party APIs to get further data (billboard, etc.)
- [ ] database stuff
  - [ ] add route for get 1 rapper (actually not nec, but shouldn't be hard..could be useful later)
- [ ] Update site visual language 
  - [ ] better icon
  - [ ] customize colors/fonts 
  - [ ] make everything dark mode 
- [ ] Add routes for infobox/modals (not sure if desirable) (2+ hours)
- [ ] Add rapper functionality (whole day)
  - [ ] form where user can add rapper
    - [ ] MUST include coordinates via Google Maps API
  - [ ] backend updates data with new rapper (pending review and confirmation)
- [ ] Bug fixes
  - [ ] when you click on more info and button over a rapper pin it says there was a problem w the DB
