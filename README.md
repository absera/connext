# Connext - Visualize and Expand Your Academic Network

Connext is a powerful tool designed to help college students uncover hidden connections within their academic environment. By visualizing direct and indirect relationships between classmates, potential study partners, and collaborators, Connext empowers students to build meaningful communities, find study buddies, and team up for projects.

## Features

- **Explore Courses**: Discover all available courses and see who's enrolled.
  ![Explore Courses](/documentation/explore_course.png)

- **The Network**: View an interactive graph of your academic network. Stronger ties (students sharing more classes) are highlighted with bold or bright connections.
  ![The Network](/documentation/network.png)

- **My Profile**: Manage your profile, including personal details and enrolled courses.
  ![My Profile](/documentation/my_profile.png)

- **Add Course**: Easily add courses to your profile and instantly update your network.
  ![Add Course](/documentation/add_course.png)

- **Chat List**: Access a list of your ongoing conversations with classmates.
  ![Chat List](/documentation/chat_list.png)

- **Individual Chat**: Communicate directly with peers for seamless collaboration.
  ![Individual Chat](/documentation/single_chat.png)

---

## How It Works

1. **Register**: Create an account using your university email.
2. **Add Courses**: Input the courses you're taking this semester.
3. **Visualize Connections**: Instantly see a map of your academic network.
4. **Collaborate**: Use the chat feature to connect with classmates and build stronger relationships.

---

## Built With

- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Frontend**: Tailwind CSS, Handlebars (HBS)
- **Visualization**: D3.js

---

## Schema Overview

### User
- `netid`: Unique identifier for each user.
- `firstName`, `lastName`: Personal details.
- `email`: Validated NYU email address.
- `password`: Secure password storage.
- `classYear`: Academic year of the student.
- `karma`: Reputation score (default: 0).
- `courses`: List of courses the user is enrolled in.

### Course
- `creatorId`: Reference to the user who created the course entry.
- `courseNumber`: Unique identifier for the course.
- `semester`: Semester during which the course is offered.
- `courseName`: Name of the course.

### Enrollment
- Tracks which users are enrolled in which courses.
- Ensures unique combinations of `course` and `user`.

### Message
- `senderId`, `receiverId`: References to users involved in the conversation.
- `value`: Content of the message (1–500 characters).
- `timeSent`: Timestamp of when the message was sent.

---

## Why Connext?

College is full of untapped potential—connections waiting to be discovered. Connext bridges the gap by revealing these hidden links, fostering collaboration, and helping students make the most of their academic journey.