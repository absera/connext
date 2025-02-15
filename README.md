# Connext

## Overview

College is full of hidden connections--classmates, potential study partners, and collaborators you may not even know exist. Connext reveals these links, helping students visualize and expand their academic network with purpose.

With Connext, students register, add their courses, and instantly see a map of direct and indirect connections in their classes. Students who are taking more classes together will have bold or bright connections in the graph, highlighting their stronger ties. By showcasing these unseen relationships in an interactive graph, Connext empowers students to find study buddies, team up for projects, and build a meaningful community. It’s a unique tool for unlocking the full potential of college connections and fostering collaboration across campus.


## Data Model

The app stores information for Users, Courses, Enrollments, Messages, and Activity Feeds.

- Users have profiles with names, emails, passwords, class year, karma score, and a list of their enrolled courses.
- Courses are created by users and contain a course number, name, semester, and a link to the user who created it.
- Enrollments connect users to courses, with each entry ensuring users are enrolled in a unique course per semester.
- Messages allow users to chat, with each message showing the sender, receiver, content, and timestamp.
- Activity Feeds log key events, like new courses or classmates joining, so users stay updated.


An Example User:

```javascript
{
  netid: "jdoe123",
  firstName: "John",
  lastName: "Doe",
  email: "jdoe123@nyu.edu",
  password: // a hashed password,
  classYear: 2025,
  karma: 10,
  courses: [ // an array of references to Course documents
    ObjectId("609c1f1b34edbc3d9e2a842f"),
    ObjectId("609c1f1b34edbc3d9e2a8430")
  ]
}
```