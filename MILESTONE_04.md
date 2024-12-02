Milestone 04 - Final Project Documentation
===

NetID
---
* ay2395

Name
---
* Absera Temesgen Yihunie

Repository Link
---
* https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-absera.git

URL for deployed site 
---
* http://linserv1.cims.nyu.edu:12134

URL for form 1 (from previous milestone) 
---
* http://linserv1.cims.nyu.edu:12134/courses/add

Special Instructions for Form 1
---
* 

URL for form 2 (for current milestone)
---
* [Link to a code snippet where I used AJAX interaction](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-absera/blob/cd0cf87d26e3116ba889a314761f7b28a2b69e47/public/d3vis.mjs#L3C1-L5C20)

Special Instructions for Form 2
---
* In addition to multiple forms, I've used AJAX here to fetch data for the network graph and dynamically display it without refreshing the page. I have setup a route in the backend to serve this data specificaly for this purpose. The data is then used by D3.js to generate the graph.

URL for form 3 (from previous milestone) 
---
* `http://linserv1.cims.nyu.edu:12134/chat`
* `http://linserv1.cims.nyu.edu:12134/chat/<netid>`<br>

Special Instructions for Form 3
---
* To send messages to another student, you can either use the UI by going to the `Messages` navigation menu or you can start a new conversation from a user's profile page.
    * You can also put a user's netid directly in the url itself. <br>

First link to github line number(s) for constructor, HOF, etc.
---
* [link to github HOF 1](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-absera/blob/cd0cf87d26e3116ba889a314761f7b28a2b69e47/services/network.service.mjs#L26C1-L30C9)

Second link to github line number(s) for constructor, HOF, etc.
---
* [link to github HOF 2](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-absera/blob/cd0cf87d26e3116ba889a314761f7b28a2b69e47/services/chat.service.mjs#L44C1-L48C8)

Short description for links above
---
* The first one is .map() which takes in a list of user ids and return another list of objects with user id and a count of this users course enrollement from another object. <br>
* The second one is also a .map() that takes in a mongodb object returned from retrieving and changes it into a javascript object and modify its date property to be in a different format than before. <br>

Link to github line number(s) for schemas (db.js or models folder)
---
* [link to database schema file on Github](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-absera/blob/cd0cf87d26e3116ba889a314761f7b28a2b69e47/config/db.mjs)

Description of research topics above with points
---
* [5pt - D3.js] - I've used DJ.js to draw a network of users enrolled in the same courses
* [2pts - CSS Framework: Tailwind.css] - I've used tailwind css to style the UI of the app
* [2pts - Authentication] - I've implemented a solid authentication system with input validation and error message displays.
* [1pt - Task runner:] - I've used node's package.json to write custom automatic task running scripts such as for auto running and watching files to rebuild the css, and to run linting using npm.
* [1pt - ESLint:] - I've integrated eslint with my project.

Links to github line number(s) for research topics described above (one link per line)
---
* [(5pt) D3.js](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-absera/blob/3f16de8a85f280cde8041907866b7e9b02809db7/public/d3vis.mjs)
* [(2pts) CSS Framework (Tailwind.CSS)](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-absera/blob/3f16de8a85f280cde8041907866b7e9b02809db7/public/dist/styles.css)
* [(2pts) Authentication](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-absera/blob/3f16de8a85f280cde8041907866b7e9b02809db7/routes/auth.routes.mjs)
* [(1pt) Task Runner](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-absera/blob/b60cfae13f4392a5ee57a1656394e47f73028a18/package.json#L6C1-L11C5)  |  [image](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-absera/blob/13749b9f404a423ee68770e60e6e24d2afa8e7ac/documentation/connext-build-process.png)
* [(1pt) Integrate ESLint into your workflow](https://github.com/nyu-csci-ua-0467-001-002-fall-2024/final-project-absera/blob/b60cfae13f4392a5ee57a1656394e47f73028a18/eslint.config.mjs)


Optional project notes 
--- 
N/A

Attributions
---
N/A