

## MVPs

- [x] Interactive map
- [x] Nav bar with search
  - [x] include relevant links 
- [x] Add rapper pins to map
- [x] add basic info box for selected rapper
- [x] redux store to maintain state
  - [x] include rapper list
  - [x] active rapper
  - [x] focus location
- [x] searchbox that updates active rapper in state and redirects view to correct location
- [ ] More information modal
  - [ ] Create and style modal
  - [ ] All information from DB 
  - [ ] Bring in additional data from spotify API
    - [ ] error handling when doesn't load
- [ ] Data visualization page
  - [ ] Use Google Data Studio API to create 4 basic maps and charts (or possibly other API). state-to-state comparison, regional comparison
- [ ] Add loading screens for components 
- [ ] 404 Page
- [ ] About Page
- [ ] Error handling
  - [ ] when search result not in DB 
- [ ] Backend 
  - [ ] create basic database to store rapper info (GraphQL?)
  - [ ] create restful route to serve to the redux store
- [ ] Mobile optimization
  - [ ] map size
  - [ ] search box
  - [ ] nav bar 
  - [ ] modals 
  - [ ] basic info popup
- [ ] Deploy app 
  - [ ] make sure API keys are secure
  - [ ] separate backend and front end (probably)
- [ ] Create project README

## Stretch Goals

- [ ] Data viz
  - [ ] integrate additional third party APIs to get further data (billboard, etc.)
- [ ] Add routes for infobox/modals 
- [ ] Add rapper functionality
  - [ ] form where user can add rapper
    - [ ] MUST include coordinates via Google Maps API
  - [ ] backend updates data with new rapper (pending review and confirmation)
  - [ ] 