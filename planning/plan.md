## Food Pick-up Ordering App Plan

### User Stories
* describe how a user will interact with our application
* As a _____, I can ____, because ____

file name can be: user-stories.md

Questions to ask Alfredo:
1. Should a user be able to login?
2. Do we need a separate message table for SMS?
3. Do we need to implement payment?
4. Do logged-in users able to leave review?

### Pick out the nouns
* nouns are resources
* all of our nouns will become our tables
* draw the ERD based on the tables


### Routes to interact with the recources
* front-end is going to be making request for these diff things
* REST (Representational State Transfer - naming convention)
* create the endpoints to interact with all of the diff tables we have
* think what our app needs to do in order to decide which endpoint we really need

e.g.
Browse: GET  /users
Read:   GET  /users/:id
Edit:   POST /users/:id(/edit)
Add:    POST /users
Delete: POST /users/:id(/delete)

file name can be: routes.md


### MVP
* Minimum viable product
* what is a minimum feature set that a user will find useful

What we wanna do:
* Minimum Viable Demo (MVD)
* what features can we effectively show off in 5 minutes
* if we not gonna show it, just don't bother to build it
* maybe it's not worth the time investment to meke the app responsive to diff screen sizes


### Wireframe/Mockup
* design the front end
* anyone on the team can read & implement the design
* can get innovations from other apps (uberEats Doordash etc.)
* Wireframing tools: diagrams.net & Figma (these will allow users to export them as pngs)

file name can be: wireframe.png


### User Registration and Login
* don't do it, don't do the whole thing of user registration, don't do the comparison of passwords or anything like that, can just copy and paste these into the server file and move on

```javascript

// localhost:3000/login/5
app.get('/login/:user_id', (req, res) => {
  // set the cookie
  req.cookies.user_id = req.params.user_id;

  // cookie_parser
  res.cookie('user_id', req.params.user_id);

  // send the user somewhere
  res.redirect('/home');
});

```


### Tech Choices
* Back end - node, express, postgres
* Front end - HTML, CSS, JavaScript, jQuery


### Single-page app vs Multi-page app
* this up to us
* not mutually exclusive


### Git
* apart from initial setup, NEVER code on master/main branch


### Splitting up the work
* vertical - every member is working on a diff piece of the stack
Advantage: This is less likely to encounter a MERGE CONFLICT
* horizontal - every member working on the same layer
* pair programming
