# Group Up API

## Routes

| Action                                        | Method | Permissions |               Path               |
| :-------------------------------------------- | :----- | :---------: | :------------------------------: |
| Login                                         | POST   |    None     |          [[+](#login)]           |
| Logout                                        | GET    |    User     |          [[+](#logout)]          |
| Get all users                                 | GET    |    Admin    |         [[+](#allusers)]         |
| Get an user by their username                 | GET    |    User     |         [[+](#userbyid)]         |
| Create users                                  | POST   |    Admin    |        [[+](#createuser)]        |
| Edit an user                                  | PUT    |    Admin    |        [[+](#updateuser)]        |
| Delete an user                                | DELETE |    Admin    |        [[+](#deleteuser)]        |
| Get all students                              | GET    |    Admin    |       [[+](#allstudents)]        |
| Get a student by their username               | GET    |    User     |       [[+](#studentbyid)]        |
| Edit a student                                | PUT    |   Student   |      [[+](#updatestudent)]       |
| Get all professors                            | GET    |    Admin    |      [[+](#allprofessors)]       |
| Get a professor by their username             | GET    |    User     |      [[+](#professorbyid)]       |
| Edit a professor                              | PUT    |  Professor  |     [[+](#updateprofessor)]      |
| Get all admins                                | GET    |    Admin    |        [[+](#alladmins)]         |
| Get an admin by their username                | GET    |    User     |        [[+](#adminbyid)]         |
| Edit an admin                                 | PUT    |    Admin    |       [[+](#updateadmin)]        |
| Get all courses                               | GET    |    User     |        [[+](#allcourses)]        |
| Get a course by its code                      | GET    |    User     |        [[+](#coursebyid)]        |
| Create courses                                | POST   |    Admin    |       [[+](#createcourse)]       |
| Edit a course                                 | PUT    |    Admin    |       [[+](#updatecourse)]       |
| Delete a course                               | DELETE |    Admin    |       [[+](#deletecourse)]       |
| Get all units from a course                   | GET    |    User     |         [[+](#allunits)]         |
| Get a unit from a course by its code          | GET    |    User     |         [[+](#unitbyid)]         |
| Create units                                  | POST   |    Admin    |        [[+](#createunit)]        |
| Edit an unit                                  | PUT    |    Admin    |        [[+](#updateunit)]        |
| Delete an unit                                | DELETE |    Admin    |        [[+](#deleteunit)]        |
| Get all classes from an unit                  | GET    |    User     |        [[+](#allclasses)]        |
| Get a class by its academic year and number   | GET    |    User     |        [[+](#classbyid)]         |
| Add a class to an unit                        | POST   |    Admin    |       [[+](#createclass)]        |
| Edit a class                                  | PUT    |    Admin    |       [[+](#updateclass)]        |
| Remove a class from an unit                   | DELETE |    Admin    |       [[+](#deleteclass)]        |
| Get all students from a class                 | GET    |    User     |   [[+](#allstudentsfromclass)]   |
| Add a student to a class                      | POST   |    Admin    |      [[+](#studenttoclass)]      |
| Remove a student from a class                 | DELETE |    Admin    |  [[+](#removestudentfromclass)]  |
| Get all professors from a class               | GET    |    User     |  [[+](#allprofessorsfromclass)]  |
| Add a professor to a class                    | POST   |    Admin    |     [[+](#professortoclass)]     |
| Remove a professor from a class               | DELETE |    Admin    | [[+](#removeprofessorfromclass)] |
| Get a project from an unit                    | GET    |    User     |       [[+](#allprojects)]        |
| Get a project by its academic year            | GET    |    User     |       [[+](#yearprojects)]       |
| Get a project by its academic year and number | GET    |    User     |    [[+](#yearnumberproject)]     |
| Create a project                              | POST   |  Professor  |      [[+](#createproject)]       |
| Edit a project                                | PUT    |  Professor  |      [[+](#updateproject)]       |
| Delete a project                              | DELETE |  Professor  |      [[+](#deleteproject)]       |

## Authentication:

<a name="login"></a>

### **POST** <br> /login

Logs a user in

#### Body:

```JSON
{
  "user": {
    "email": "example@example.com",
    "password": "password"
  }
}
```

#### Success: 200 OK

```JSON
{
  "username": "example"
}
```

#### Failure: 401 Unauthorized

```JSON
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "Wrong email or password"
}
```

---

<a name="logout"></a>

### **GET** <br> /logout

Logs a user out

#### Success: 204 No Content

## Users:

<a name="allusers"></a>

### **GET** <br> /users

Gets all users

#### Success: 200 OK

```JSON
[
  {
    "username": "student",
    "first_name": "Student",
    "last_name": "Example",
    "email": "student@example.com",
    "avatar_url": null,
    "status": "offline"
  },
  {
    "username": "professor",
    "first_name": "Professor",
    "last_name": "Example",
    "email": "professor@example.com",
    "avatar_url": null,
    "status": "online"
  }
]
```

#### Failure: 401 Unauthorized

```JSON
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "You must be an admin"
}
```

---

<a name="userbyid"></a>

### **GET** <br> /users/{username}

Gets a user by their username

#### Success: 200 OK

```JSON
{
  "username": "student",
  "first_name": "Student",
  "last_name": "Example",
  "email": "student@example.com",
  "avatar_url": null,
  "status": "offline"
}
```

#### Failure: 404 Not Found

```JSON
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "The user with the username example was not found",
  "validation": {
    "source": "params",
    "values": [
      "example"
      ]
  }
}
```

#### Failure: 401 Unauthorized

```JSON
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "You must be logged in"
}
```

#### Failure: 400 Bad Request

```JSON
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "\"username\" must only contain alpha-numeric characters",
  "validation": {
    "source": "params",
    "keys": [
      "username"
    ]
  }
}
```

---

<a name="createuser"></a>

### **POST** <br> /users

Creates a new user

#### Body:

```JSON
{
  "users": [
    {
      "username": "student",
      "first_name": "Student",
      "last_name": "Example",
      "email": "student@example.com",
      "password": "password",
      "role": {
        "type": "student",
        "data": {}
      }
    },
    {
      "username": "admin",
      "first_name": "Admin",
      "last_name": "Example",
      "email": "admin@example.com",
      "password": "password",
      "role": {
        "type": "admin",
        "data": {
          "previleges": 1
        }
      }
    },
    {
      "username": "professor",
      "first_name": "Professor",
      "last_name": "Example",
      "email": "professor@example.com",
      "password": "password",
      "role": {
        "type": "professor",
        "data": {
          "room": "6.2.98",
          "department": "DI"
        }
      }
    }
  ]
}
```

#### Success: 201 Created

```JSON
{
  "students": [
    {
      "username": "student"
    }
  ],
  "professors": [
    {
      "username": "professor"
    }
  ],
  "admins": [
    {
      "username": "admin"
    }
  ]
}
```

#### Failure: 401 Unauthorized

```JSON
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "You must be an admin"
}
```

#### Failure: 409 Conflict

```JSON
{
 "error": {
   "statusCode": 409,
   "error": "Conflict",
   "message": "This field(s) must be unique in the database.",
   "detail": "Key (username)=(example) already exists."
 },
 "created": {
   "students": [],
   "professors": [],
   "admins": []
 }
}
```

#### Failure: 400 Bad Request

```JSON
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "\"users[0].username\" is not allowed to be empty",
  "validation": {
    "source": "body",
    "keys": [
      "users.0.username"
    ]
  }
}
```

---

<a name="updateuser"></a>

### **PUT** <br> /users/{username}

Edits an user

#### Body:

```JSON
{
  "user": {
    "password": "password",
    "status": "online",
    "avatar_url": "example.jpg"
  }
}
```

#### Success: 200 OK

```JSON
{
  "username": "student",
  "first_name": "Student",
  "last_name": "Example",
  "email": "student@example.com",
  "avatar_url": null,
  "status": "online"
}
```

#### Failure: 401 Unauthorized

```JSON
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "You don't have permissions to manage this resource"
}
```

#### Failure: 404 Not Found

```JSON
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "The user with the username example was not found",
  "validation": {
    "source": "params",
    "values": [
      "example"
    ]
  }
}
```

#### Failure: 400 Bad Request

```JSON
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "\"user.status\" must be one of [online, offline]",
  "validation": {
    "source": "body",
    "keys": [
      "user.status"
    ]
  }
}
```

---

<a name="deleteuser"></a>

### **DELETE** <br> /users/{username}

Deletes an user

#### Success: 204 No Content

#### Failure: 401 Unauthorized

```JSON
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "You must be an admin"
}
```

#### Failure: 404 Not Found

```JSON
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "The user with the username example was not found",
  "validation": {
    "source": "params",
    "values": [
      "example"
    ]
  }
}
```

#### Failure: 400 Bad Request

```JSON
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "\"username\" must only contain alpha-numeric characters",
  "validation": {
    "source": "params",
    "keys": [
      "username"
    ]
  }
}
```

## Students

<a name="allstudents"></a>

### **GET** <br> /users/students

Gets all students

#### Success: 200 OK

```JSON
[
  {
    "username": "student",
    "working_student": true,
    "github_url": null,
    "facebook_url": null,
    "instagram_url": null,
    "twitter_url": null,
    "first_name": "Student",
    "last_name": "Example",
    "email": "student@example.com"
  },
  {
    "username": "student2",
    "working_student": false,
    "github_url": null,
    "facebook_url": null,
    "instagram_url": null,
    "twitter_url": null,
    "first_name": "Student2",
    "last_name": "Example",
    "email": "student2@example.com"
  }
]
```

#### Failure: 401 Unauthorized

```JSON
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "You must be an admin"
}
```

---

<a name="studentbyid"></a>

### **GET** <br> /users/students/{username}

Gets a student by their username

#### Success: 200 OK

```JSON
{
  "username": "student",
  "working_student": true,
  "github_url": null,
  "facebook_url": null,
  "instagram_url": null,
  "twitter_url": null,
  "first_name": "Student",
  "last_name": "Example",
  "email": "student@example.com"
}
```

#### Failure: 404 Not Found

```JSON
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "The student with the username example was not found",
  "validation": {
    "source": "params",
    "keys": [
      "example"
    ]
  }
}
```

#### Failure: 401 Unauthorized

```JSON
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "You must be logged in"
}
```

#### Failure: 400 Bad Request

```JSON
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "\"username\" must only contain alpha-numeric characters",
  "validation": {
    "source": "params",
    "keys": [
      "username"
    ]
  }
}
```

---

<a name="updatestudent"></a>

### **PUT** <br> /users/students/{username}

Edits a student

#### Body:

```JSON
{
  "student": {
    "working_student": true,
    "github": "example",
    "facebook": "example",
    "instagram": "example",
    "twitter": "example"
  }
}
```

#### Success: 200 OK

```JSON
{
  "username": "example",
  "working_student": true,
  "github_url": "https://github.com/example",
  "facebook_url": "https://facebook.com/example",
  "instagram_url": "https://instagram.com/example",
  "twitter_url": "https://twitter.com/example"
}
```

#### Failure: 401 Unauthorized

```JSON
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "You don't have permissions to manage this resource"
}
```

#### Failure: 404 Not Found

```JSON
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "The student with the username example was not found",
  "validation": {
    "source": "params",
    "values": [
      "example"
    ]
  }
}
```

#### Failure: 400 Bad Request

```JSON
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "\"student.working_student\" must be a boolean",
  "validation": {
    "source": "body",
    "keys": [
      "student.working_student"
    ]
  }
}
```

## Professors

<a name="allprofessors"></a>

### **GET** <br> /users/professors

Gets all professors

#### Success: 200 OK

```JSON
[
  {
    "username": "professor",
    "room": "6.2.98",
    "department": "DI",
    "first_name": "Professor",
    "last_name": "Example",
    "email": "professor@example.com"
  },
  {
    "username": "professor2",
    "room": "6.2.99",
    "department": "DI",
    "first_name": "Professor2",
    "last_name": "Example",
    "email": "professor2@example.com"
  }
]
```

#### Failure: 401 Unauthorized

```JSON
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "You must be an admin"
}
```

---

<a name="professorbyid"></a>

### **GET** <br> /users/professors/{username}

Gets a professor by their username

#### Success: 200 OK

```JSON
{
  "username": "professor",
  "room": "10.10.10",
  "department": "EX",
  "first_name": "Professor",
  "last_name": "Example",
  "email": "professor@example.com"
}
```

#### Failure: 404 Not Found

```JSON
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "The professor with the username example was not found",
  "validation": {
    "source": "params",
    "values": [
      "example"
    ]
  }
}
```

#### Failure: 401 Unauthorized

```JSON
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "You must be logged in"
}
```

#### Failure: 400 Bad Request

```JSON
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "\"username\" must only contain alpha-numeric characters",
  "validation": {
    "source": "params",
    "keys": [
      "username"
    ]
  }
}
```

---

<a name="updateprofessor"></a>

### **PUT** <br> /users/professors/{username}

Edits a professor

#### Body:

```JSON
{
  "professor": {
    "room": "1.1.1",
    "department": "EX",
  }
}
```

#### Success: 200 OK

```JSON
{
  "username": "example",
  "room": "1.1.1",
  "department": "EX"
}
```

#### Failure: 401 Unauthorized

```JSON
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "You don't have permissions to manage this resource"
}
```

#### Failure: 404 Not Found

```JSON
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "The professor with the username example was not found",
  "validation": {
    "source": "params",
    "values": [
      "example"
    ]
  }
}
```

#### Failure: 400 Bad Request

```JSON
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "\"professor.room\" must be a string",
  "validation": {
    "source": "body",
    "keys": [
      "professor.room"
    ]
  }
}
```

## Admins

<a name="alladmins"></a>

### **GET** <br> /users/admins

Gets all admins

#### Success: 200 OK

```JSON
[
  {
    "username": "admin",
    "previleges": 1,
    "first_name": "Admin",
    "last_name": "Example",
    "email": "admin@example.com"
  },
  {
    "username": "admin2",
    "previleges": 1,
    "first_name": "Admin2",
    "last_name": "Example",
    "email": "admin2@example.com"
  }
]
```

#### Failure: 401 Unauthorized

```JSON
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "You must be an admin"
}
```

---

<a name="adminbyid"></a>

### **GET** <br> /users/admins/{username}

Gets an admin by their username

#### Success: 200 OK

```JSON
{
  "username": "admin",
  "previleges": 1,
  "first_name": "Admin",
  "last_name": "Example",
  "email": "admin@example.com"
}
```

#### Failure: 404 Not Found

```JSON
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "The admin with the username example was not found",
  "validation": {
    "source": "params",
    "values": [
      "example"
    ]
  }
}
```

#### Failure: 401 Unauthorized

```JSON
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "You must be logged in"
}
```

#### Failure: 400 Bad Request

```JSON
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "\"username\" must only contain alpha-numeric characters",
  "validation": {
    "source": "params",
    "keys": [
      "username"
    ]
  }
}
```

---

<a name="updateadmin"></a>

### **PUT** <br> /users/admins/{username}

Edits an admin

#### Body:

```JSON
{
  "admin": {
    "previleges": 1
  }
}
```

#### Success: 200 OK

```JSON
{
  "username": "example",
  "previleges": 1
}
```

#### Failure: 401 Unauthorized

```JSON
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "You don't have permissions to manage this resource"
}
```

#### Failure: 404 Not Found

```JSON
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "The admin with the username example was not found",
  "validation": {
    "source": "params",
    "values": [
      "example"
    ]
  }
}
```

#### Failure: 400 Bad Request

```JSON
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "\"admin.previleges\" must be one of [1, 2, 3]",
  "validation": {
    "source": "body",
    "keys": [
      "admin.previleges"
    ]
  }
}
```

## Courses

<a name="allcourses"></a>

### **GET** <br> /courses

Gets all courses

#### Success: 200 OK

```JSON
[
  {
    "code": "L111",
    "name": "Course One",
    "cycle": 1,
    "initials": "C1"
  },
  {
    "code": "L112",
    "name": "Course Two",
    "cycle": 1,
    "initials": "C2"
  }
]
```

#### Failure: 401 Unauthorized

```JSON
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "You must be logged in"
}
```

---

<a name="coursebyid"></a>

### **GET** <br> /courses/{code}

Gets a course by its code

#### Success: 200 OK

```JSON
{
  "code": "L111",
  "name": "Course One",
  "cycle": 1,
  "initials": "C1"
}
```

#### Failure: 404 Not Found

```JSON
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "The course with the code L111 was not found",
  "validation": {
    "source": "params",
    "values": [
      "L111"
    ]
  }
}
```

#### Failure: 401 Unauthorized

```JSON
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "You must be logged in"
}
```

#### Failure: 400 Bad Request

```JSON
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "\"code\" must only contain alpha-numeric characters",
  "validation": {
    "source": "params",
    "keys": [
      "code"
    ]
  }
}
```

---

<a name="createcourse"></a>

### **POST** <br> /courses

Creates a new course

#### Body:

```JSON
{
  "courses": [
    {
      "code": "L111",
      "name": "Course One",
      "cycle": 1,
      "initials": "C1",
      "units": [
        {
          "code": 11111,
          "name": "Unit One",
          "semester": 1,
          "initials": "U1",
          "ects": 6
        }
      ]
    }
  ]
}
```

#### Success: 201 Created

```JSON
[
  {
    "code": "L111",
    "name": "Course One",
    "units": [
      {
        "code": 11111,
        "name": "Unit One"
      }
    ]
  }
]
```

#### Failure: 401 Unauthorized

```JSON
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "You must be an admin"
}
```

#### Failure: 409 Conflict

```JSON
{
  "error": {
    "statusCode": 409,
    "error": "Conflict",
    "message": "This field(s) must be unique in the database.",
    "detail": "Key (code)=(L111) already exists."
  },
  "created": []
}
```

#### Failure: 400 Bad Request

```JSON
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "\"courses[0].code\" is not allowed to be empty",
  "validation": {
    "source": "body",
    "keys": [
      "courses.0.code"
    ]
  }
}
```

---

<a name="updatecourse"></a>

### **PUT** <br> /courses/{code}

Edits a course

#### Body:

```JSON
{
  "course":
    {
      "name": "Example",
      "initials": "EX"
    }
}
```

#### Success: 200 OK

```JSON
{
  "code": "L111",
  "name": "Example",
  "cycle": 1,
  "initials": "EX"
}
```

#### Failure: 401 Unauthorized

```JSON
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "You must be an admin"
}
```

#### Failure: 404 Not Found

```JSON
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "The course with the code L111 was not found",
  "validation": {
    "source": "params",
    "values": [
      "L111"
    ]
  }
}
```

#### Failure: 400 Bad Request

```JSON
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "\"code\" must only contain alpha-numeric characters",
  "validation": {
    "source": "params",
    "keys": [
      "code"
    ]
  }
}
```

---

<a name="deletecourse"></a>

### **DELETE** <br> /courses/{code}

Deletes a course

#### Success: 204 No Content

#### Failure: 404 Not Found

```JSON
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "The course with the code L111 was not found",
  "validation": {
    "source": "params",
    "values": [
      "L111"
    ]
  }
}
```

#### Failure: 400 Bad Request

```JSON
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "\"code\" must only contain alpha-numeric characters",
  "validation": {
    "source": "params",
    "keys": [
      "code"
    ]
  }
}
```

## Units

<a name="allunits"></a>

### **GET** <br> /courses/{code}/units

Gets all units from a course

#### Success: 200 OK

```JSON
[
  {
    "course_code": "L111",
    "unit_code": 11111,
    "name": "Unit One",
    "semester": 5,
    "initials": "U1",
    "ects": 6
  },
  {
    "course_code": "L111",
    "unit_code": 11112,
    "name": "Unit Two",
    "semester": 6,
    "initials": "U2",
    "ects": 6
  }
]
```

#### Failure: 401 Unauthorized

```JSON
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "You must be logged in"
}
```

---

<a name="unitbyid"></a>

### **GET** <br> /courses/{code}/units/{unit_code}

Gets a unit from a course by its code

#### Success: 200 OK

```JSON
{
  "course_code": "L111",
  "unit_code": 11111,
  "name": "Unit One",
  "semester": 5,
  "initials": "U1",
  "ects": 6
}
```

#### Failure: 404 Not Found

```JSON
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "The unit with the code 11111 was not found",
  "validation": {
    "source": "params",
    "values": [
      11111
    ]
  }
}
```

#### Failure: 401 Unauthorized

```JSON
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "You must be logged in"
}
```

#### Failure: 400 Bad Request

```JSON
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "\"unit_code\" must be a number",
  "validation": {
    "source": "params",
    "keys": [
      "unit_code"
    ]
  }
}
```

---

<a name="createunit"></a>

### **POST** <br>/courses/{code}/units

Creates units for a course

#### Body:

```JSON
{
  "units": [
    {
      "code": 11111,
      "name": "Unit One",
      "semester": 6,
      "initials": "U1",
      "ects": 6
    },
    {
      "code": 11112,
      "name": "Unit Two",
      "semester": 6,
      "initials": "U2",
      "ects": 6
    }
  ]
}
```

#### Success: 201 Created

```JSON
[
  {
    "code": 11111,
    "name": "Unit One"
  },
  {
    "code": 11112,
    "name": "Unit Two"
  }
]
```

#### Failure: 401 Unauthorized

```JSON
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "You must be an admin"
}
```

#### Failure: 409 Conflict

```JSON
{
  "error": {
    "statusCode": 409,
    "error": "Conflict",
    "message": "This field(s) must be unique in the database.",
    "detail": "Key (code)=(11111) already exists."
  },
  "created": []
}
```

#### Failure: 400 Bad Request

```JSON
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "\"units[0].name\" is not allowed to be empty",
  "validation": {
    "source": "body",
    "keys": [
      "units.0.name"
    ]
  }
}
```

---

<a name="updateunit"></a>

### **PUT** <br> /courses/{code}/units/{unit_code}

Edits a unit

#### Body:

```JSON
{
  "unit":
    {
      "name": "Example",
      "semester": 5,
      "initials": "EX",
      "ects": 3
    }
}
```

#### Success: 200 OK

```JSON
{
  "code": 11111,
  "name": "Example",
  "semester": 5,
  "initials": "EX",
  "ects": 3
}
```

#### Failure: 401 Unauthorized

```JSON
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "You must be an admin"
}
```

#### Failure: 404 Not Found

```JSON
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "The unit with the code 11111 was not found",
  "validation": {
    "source": "params",
    "values": [
      11111
    ]
  }
}
```

#### Failure: 400 Bad Request

```JSON
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "\"unit.semester\" must be a number",
  "validation": {
    "source": "body",
    "keys": [
      "unit.semester"
    ]
  }
}
```

---

<a name="deleteunit"></a>

### **DELETE** <br> /courses/{code}/units/{unit_code}

Deletes a unit

#### Success: 204 No Content

#### Failure: 404 Not Found

```JSON
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "The unit with the code 11111 was not found",
  "validation": {
    "source": "params",
    "values": [
      11111
    ]
  }
}
```

#### Failure: 400 Bad Request

```JSON
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "\"unit_code\" must be a number",
  "validation": {
    "source": "params",
    "keys": [
      "unit_code"
    ]
  }
}
```

## Classes

<a name="allclasses"></a>

### **GET** <br> /courses/{code}/units/{unit_code}/classes

Gets all classes from a unit

#### Success: 200 OK

```JSON
[
  {
    "unit_code": 11111,
    "number": "T1",
    "begins_at": "10:30:00",
    "ends_at": "12:00:00",
    "week_day": 2,
    "academic_year": "2019-2020"
  },
  {
    "unit_code": 11111,
    "number": "T2",
    "begins_at": "10:30:00",
    "ends_at": "12:00:00",
    "week_day": 4,
    "academic_year": "2019-2020"
  }
]
```

#### Failure: 401 Unauthorized

```JSON
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "You must be logged in"
}
```

---

<a name="classbyid"></a>

### **GET** <br> /courses/{code}/units/{unit_code}/classes/{year}/{class_number}

Gets a class by its year and number

#### Success: 200 OK

```JSON
{
  "unit_code": 11111,
  "number": "T1",
  "begins_at": "10:30:00",
  "ends_at": "12:00:00",
  "week_day": 2,
  "academic_year": "2019-2020"
}
```

#### Failure: 404 Not Found

```JSON
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "The class T2 from 2019-2020 was not found",
  "validation": {
    "source": "params",
    "values": [
      "T2",
      "2019-2020"
    ]
  }
}
```

#### Failure: 401 Unauthorized

```JSON
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "You must be logged in"
}
```

#### Failure: 400 Bad Request

```JSON
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "\"year\" length must be 9 characters long",
  "validation": {
    "source": "params",
    "keys": [
      "year"
    ]
  }
}
```

---

<a name="createclass"></a>

### **POST** <br> /courses/{code}/units/{unit_code}/classes

Adds a class to a unit

#### Body:

```JSON
{
  "classes": [
    {
      "number": "T1",
      "begins_at": "10:30",
      "ends_at": "12:00",
      "week_day": 2,
      "academic_year": "2019-2020"
    },
    {
      "number": "T2",
      "begins_at": "10:30",
      "ends_at": "12:00",
      "week_day": 4,
      "academic_year": "2019-2020"
    }
  ]
}
```

#### Success: 201 Created

```JSON
[
  {
    "unit_code": 11111,
    "number": "T1",
    "begins_at": "10:30:00",
    "ends_at": "12:00:00",
    "week_day": 2,
    "academic_year": "2019-2020"
  },
  {
    "unit_code": 11111,
    "number": "T2",
    "begins_at": "10:30:00",
    "ends_at": "12:00:00",
    "week_day": 4,
    "academic_year": "2019-2020"
  }
]
```

#### Failure: 401 Unauthorized

```JSON
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "You must be an admin"
}
```

#### Failure: 409 Conflict

```JSON
{
  "error": {
    "statusCode": 409,
    "error": "Conflict",
    "message": "This field(s) must be unique in the database.",
    "detail": "Key (unit_code, number, academic_year)=(11111, T1, 2019-2020) already exists."
  },
  "created": []
}
```

#### Failure: 400 Bad Request

```JSON
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "\"classes[0].number\" is not allowed to be empty",
  "validation": {
    "source": "body",
    "keys": [
      "classes.0.number"
    ]
  }
}
```

---

<a name="updateclass"></a>

### **POST** <br> /courses/{code}/units/{unit_code}/classes/{year}/{class_number}

Edits a class

#### Body:

```JSON
{
  "class": {
    "number": "T2",
    "begins_at": "12:00",
    "ends_at": "13:30",
    "week_day": 3,
    "academic_year": "2020-2021",
  }
}
```

#### Success: 200 OK

```JSON
{
  "unit_code": 11111,
  "number": "T2",
  "begins_at": "12:00:00",
  "ends_at": "13:30:00",
  "week_day": 3,
  "academic_year": "2020-2021"
}
```

#### Failure: 401 Unauthorized

```JSON
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "You must be an admin"
}
```

#### Failure: 404 Not Found

```JSON
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "The class T1 from 2019-2020 was not found",
  "validation": {
    "source": "params",
    "values": [
      "T1",
      "2019-2020"
    ]
  }
}
```

#### Failure: 400 Bad Request

```JSON
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "\"class.number\" must only contain alpha-numeric characters",
  "validation": {
    "source": "body",
    "keys": [
      "class.number"
    ]
  }
}
```

---

<a name="deleteclass"></a>

### **DELETE** <br> /courses/{code}/units/{unit_code}/classes/{year}/{class_number}

Removes a class from a unit

#### Success: 204 No Content

#### Failure: 401 Unauthorized

```JSON
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "You must be an admin"
}
```

#### Failure: 404 Not Found

```JSON
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "The class T1 from 2019-2020 was not found",
  "validation": {
    "source": "params",
    "values": [
      "T1",
      "2019-2020"
    ]
  }
}
```

#### Failure: 400 Bad Request

```JSON
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "\"year\" length must be 9 characters long",
  "validation": {
    "source": "params",
    "keys": [
      "year"
    ]
  }
}
```

---

<a name="allstudentsfromclass"></a>

### **GET** <br> /courses/{code}/units/{unit_code}/classes/{year}/{class_number}/students

Gets all students from a class

#### Success: 200 OK

```JSON
[
  {
    "student_username": "student",
    "first_name": "Student",
    "last_name": "Example",
    "email": "student@example.com",
    "avatar_url": null,
    "status": "offline"
  },
  {
    "student_username": "student2",
    "first_name": "Student2",
    "last_name": "Example",
    "email": "student2@example.com",
    "avatar_url": null,
    "status": "online"
  }
]
```

#### Failure: 401 Unauthorized

```JSON
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "You must be logged in"
}
```

---

<a name="studenttoclass"></a>

### **POST** <br> /courses/{code}/units/{unit_code}/classes/{year}/{class_number}/students

Adds a student to a class

#### Body:

```JSON
{
  "students": [
    {
      "username": "student"
    },
    {
      "username": "student2"
    }
  ]
}
```

#### Success: 200 OK

```JSON
[
  {
    "student_username": "student"
  },
  {
    "student_username": "student2"
  }
]
```

#### Failure: 401 Unauthorized

```JSON
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "You must be an admin"
}
```

#### Failure: 404 Not Found

```JSON
{
  "error": {
    "statusCode": 404,
    "error": "Not Found",
    "message": "The student with the username example was not found",
    "validation": {
      "source": "body",
      "values": [
        "example"
      ]
    }
  },
  "created": []
}
```

#### Failure: 400 Bad Request

```JSON
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "\"students[0].username\" is not allowed to be empty",
  "validation": {
    "source": "body",
    "keys": [
      "students.0.username"
    ]
  }
}
```

---

<a name="removestudentfromclass"></a>

### **DELETE** <br> /courses/{code}/units/{unit_code}/classes/{year}/{class_number}/students/{student_username}

Removes a student from a class

#### Success: 204 No Content

#### Failure: 401 Unauthorized

```JSON
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "You must be an admin"
}
```

#### Failure: 404 Not Found

```JSON
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "The student with the username example was not found",
  "validation": {
    "source": "params",
    "values": [
      "example"
    ]
  }
}
```

#### Failure: 400 Bad Request

```JSON
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "\"student_username\" must only contain alpha-numeric characters",
  "validation": {
    "source": "params",
    "keys": [
      "student_username"
    ]
  }
}
```

---

<a name="allprofessorsfromclass"></a>

### **GET** <br> /courses/{code}/units/{unit_code}/classes/{year}/{class_number}/professors

Gets all professors from a class

#### Success: 200 OK

```JSON
[
  {
    "professor_username": "professor",
    "first_name": "Professor",
    "last_name": "Example",
    "email": "professor@example.com",
    "avatar_url": null,
    "status": "offline"
  },
  {
    "professor_username": "professor2",
    "first_name": "Professor2",
    "last_name": "Example",
    "email": "professor2@example.com",
    "avatar_url": null,
    "status": "online"
  }
]
```

#### Failure: 401 Unauthorized

```JSON
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "You must be logged in"
}
```

---

<a name="professortoclass"></a>

### **POST** <br> /courses/{code}/units/{unit_code}/classes/{year}/{class_number}/professors

Adds a professor to a class

#### Body:

```JSON
{
  "professors": [
    {
      "username": "professor"
    },
    {
      "username": "professor2"
    }
  ]
}
```

#### Success: 200 OK

```JSON
[
  {
    "professor_username": "professor"
  },
  {
    "professor_username": "professor2"
  }
]
```

#### Failure: 401 Unauthorized

```JSON
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "You must be an admin"
}
```

#### Failure: 404 Not Found

```JSON
{
  "error": {
    "statusCode": 404,
    "error": "Not Found",
    "message": "The professor with the username example was not found",
    "validation": {
      "source": "body",
      "values": [
        "example"
      ]
    }
  },
  "created": []
}
```

#### Failure: 400 Bad Request

```JSON
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "\"professors[0].username\" is not allowed to be empty",
  "validation": {
    "source": "body",
    "keys": [
      "professors.0.username"
    ]
  }
}
```

---

<a name="removeprofessorfromclass"></a>

### **DELETE** <br> /courses/{code}/units/{unit_code}/classes/{year}/{class_number}/professors/{professor_username}

Removes a professor from a class

#### Success: 204 No Content

#### Failure: 401 Unauthorized

```JSON
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "You must be an admin"
}
```

#### Failure: 404 Not Found

```JSON
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "The professor with the username example was not found",
  "validation": {
    "source": "params",
    "values": [
      "example"
    ]
  }
}
```

#### Failure: 400 Bad Request

```JSON
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "\"professor_username\" must only contain alpha-numeric characters",
  "validation": {
    "source": "params",
    "keys": [
      "professor_username"
    ]
  }
}
```

## Project:

<a name="allprojects"></a>

### **GET** <br> /courses/{code}/units/{unit_code}/projects

Gets all projects from a unit

#### Success: 200 OK

```JSON
[
  {
    "name": "Nada",
    "min_students": 1,
    "max_students": 2,
    "description": "Nothing",
    "objectives": "None",
    "assignment_url": "assignment.pdf"
  }
]
```

---

<a name="yearprojects"></a>

### **GET** <br> /courses/{code}/units/{unit_code}/projects/{academic_year}

Gets all projects from a certain academic year

#### Success: 200 OK

```JSON
[
  {
    "name": "Nada",
    "min_students": 1,
    "max_students": 2,
    "description": "Nothing",
    "objectives": "None",
    "assignment_url": "assignment.pdf"
  }
]
```

#### Failure: 404 Not Found

```JSON
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "The projects with the academic year example were not found",
  "validation": {
    "source": "params",
    "values": [
      "example"
    ]
  }
}
```

---

<a name="yearnumberproject"></a>

### **GET** <br> /courses/{code}/units/{unit_code}/projects/{academic_year}/{project_number}

Gets a project from a certain academic year and with a certain project_number

#### Success: 200 OK

```JSON
{
  "name": "Nada",
  "min_students": 1,
  "max_students": 2,
  "description": "Nothing",
  "objectives": "None",
  "assignment_url": "assignment.pdf"
}
```

#### Failure: 404 Not Found

```JSON
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "The projects with the academic year example were not found",
  "validation": {
    "source": "params",
    "values": [
      "example"
    ]
  }
}
```
---

<a name="createproject"></a>

### **POST** <br> /courses/{code}/units/{unit_code}/projects

Create a project

#### Body:

```JSON
{
  "project": {
      "name": "Nada",
      "min_students": 1,
      "max_students": 2,
      "description": "Nothing",
      "objectives": "None",
      "assignment_url": "assignment.pdf",
      "stages": [
        {
          "description": "Fazer absolutamente nada",
          "start_date": "01-03-2019",
          "end_date": "02-04-2019",
          "weight": 1
        }
      ]
    }
}
```

#### Success: 201 Created

```JSON
{
  "number": 1,
  "name": "Nada",
  "academic_year": "2019-2020"
}
```

#### Failure: 401 Unauthorized

```JSON
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "You must be a professor"
}
```

#### Failure: 400 Bad Request

```JSON
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "\"project.name\" is required",
  "validation": {
    "source": "body",
    "keys": [
      "project.name"
    ]
  }
}
```

---

<a name="updateproject"></a>

### **PUT** <br> /courses/{code}/units/{unit_code}/projects/{academic_year}/{project_number}

Update a project

#### Body:

```JSON
{
  "project": {
      "name": "Tudo",
      "min_students": 2,
      "max_students": 3,
      "description": "Everything",
      "objectives": "All",
      "assignment_url": "new_harder_assignment.pdf",
    }
}
```

#### Success: 200 OK

```JSON
{
  "name": "Tudo",
  "min_students": 2,
  "max_students": 3,
  "description": "Everything",
  "objectives": "All",
  "assignment_url": "new_harder_assignment.pdf",
  "academic_year": "2019-2020"
}
```

#### Failure: 401 Unauthorized

```JSON
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "You must be a professor"
}
```

#### Failure: 400 Bad Request

```JSON
{
  "expose": true,
  "statusCode": 400,
  "status": 400,
  "body": "{\n  \"project\": {\n      \"name\": \"Tudo\",\n      \"min_students\": %#%%3535,\n      \"max_students\": 3,\n      \"description\": \"Everything\",\n      \"objectives\": \"All\",\n      \"assignment_url\": \"new_harder_assignment.pdf\"\n    }\n}",
  "type": "entity.parse.failed"
}
```

---

<a name="deleteproject"></a>

### **DELETE** <br> /courses/{code}/units/{unit_code}/projects/{academic_year}/{project_number}

Delete a project

#### Success: 204 No Content

#### Failure: 401 Unauthorized

```JSON
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "You must be a professor"
}
```

## Entities

### User

| Attributes |  Type  |         Restrictions          |
| :--------- | :----: | :---------------------------: |
| username   | string |     **not null, unique**      |
| first_name | string |         **not null**          |
| last_name  | string |         **not null**          |
| email      | string |     **not null, unique**      |
| password   | string |         **not null**          |
| status     | string | **not null, default offline** |
| avatar_url | string |               -               |

### Student

| Attributes      |  Type   |        Restrictions         |
| :-------------- | :-----: | :-------------------------: |
| username        | string  |         **foreign**         |
| working_student | boolean | **not null, default false** |
| github_url      | string  |              -              |
| facebook_url    | string  |              -              |
| instagram_url   | string  |              -              |
| twitter_url     | string  |              -              |

### Professor

| Attributes |  Type  | Restrictions |
| :--------- | :----: | :----------: |
| username   | string | **foreign**  |
| department | string |      -       |
| room       | string |      -       |

### Admin

| Attributes |  Type   |      Restrictions       |
| :--------- | :-----: | :---------------------: |
| username   | string  |       **foreign**       |
| previleges | integer | **not null, default 1** |

### Course

| Attributes |  Type   |     Restrictions     |
| :--------- | :-----: | :------------------: |
| code       | string  | **not null, unique** |
| name       | string  |     **not null**     |
| cycle      | integer |     **not null**     |
| initials   | string  |     **not null**     |

### Unit

| Attributes |  Type   |     Restrictions     |
| :--------- | :-----: | :------------------: |
| code       | integer | **not null, unique** |
| name       | string  |     **not null**     |
| semester   | integer |     **not null**     |
| initials   | string  |     **not null**     |
| ects       | integer |     **not null**     |

### Class

| Attributes    |  Type   | Restrictions |
| :------------ | :-----: | :----------: |
| unit_code     | integer | **foreign**  |
| number        | string  | **not null** |
| begins_at     |  time   | **not null** |
| ends_at       |  time   | **not null** |
| week_day      | integer | **not null** |
| academic_year | string  | **not null** |
