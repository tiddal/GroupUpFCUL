# Group Up API

## Routes

| Action                                | Method | Permissions |               Path               |
| :------------------------------------ | :----- | :---------: | :------------------------------: |
| Logs an user in                       | POST   |    None     |          [[+](#login)]           |
| Logs an user out                      | GET    |    User     |          [[+](#logout)]          |
| Gets all users                        | GET    |    Admin    |         [[+](#allusers)]         |
| Gets an user by their username        | GET    |    User     |         [[+](#userbyid)]         |
| Creates a new user                    | POST   |    Admin    |        [[+](#createuser)]        |
| Edits an user                         | PUT    |    Admin    |        [[+](#updateuser)]        |
| Deletes an user                       | DELETE |    Admin    |        [[+](#deleteuser)]        |
| Gets all students                     | GET    |    Admin    |       [[+](#allstudents)]        |
| Gets a student by their username      | GET    |    User     |       [[+](#studentbyid)]        |
| Edits a student                       | PUT    |   Student   |      [[+](#updatestudent)]       |
| Gets all professors                   | GET    |    Admin    |      [[+](#allprofessors)]       |
| Gets a professor by their username    | GET    |    User     |      [[+](#professorbyid)]       |
| Edits a professor                     | PUT    |  Professor  |     [[+](#updateprofessor)]      |
| Gets all admins                       | GET    |    Admin    |        [[+](#alladmins)]         |
| Gets an admin by their username       | GET    |    User     |        [[+](#adminbyid)]         |
| Edits an admin                        | PUT    |    Admin    |       [[+](#updateadmin)]        |
| Gets all courses                      | GET    |    User     |        [[+](#allcourses)]        |
| Gets a course by its code             | GET    |    User     |        [[+](#coursebyid)]        |
| Creates a new course                  | POST   |    Admin    |       [[+](#createcourse)]       |
| Edits a course                        | PUT    |    Admin    |       [[+](#updatecourse)]       |
| Deletes a course                      | DELETE |    Admin    |       [[+](#deletecourse)]       |
| Gets all units from a course          | GET    |    User     |         [[+](#allunits)]         |
| Gets a unit from a course by its code | GET    |    User     |         [[+](#unitbyid)]         |
| Creates units for a course            | POST   |    Admin    |        [[+](#createunit)]        |
| Edits a unit                          | PUT    |    Admin    |        [[+](#updateunit)]        |
| Deletes a unit                        | DELETE |    Admin    |        [[+](#deleteunit)]        |
| Gets all classes from a unit          | GET    |    User     |        [[+](#allclasses)]        |
| Gets a class by its year and number   | GET    |    User     |        [[+](#classbyid)]         |
| Adds a class to a unit                | POST   |    Admin    |       [[+](#createclass)]        |
| Edits a class                         | PUT    |    Admin    |       [[+](#updateclass)]        |
| Removes a class from a unit           | DELETE |    Admin    |       [[+](#deleteclass)]        |
| Gets all students from a class        | GET    |    User     |   [[+](#allstudentsfromclass)]   |
| Adds a student to a class             | POST   |    Admin    |      [[+](#studenttoclass)]      |
| Removes a student from a class        | DELETE |    Admin    |  [[+](#removestudentfromclass)]  |
| Gets all professors from a class      | GET    |    User     |  [[+](#allprofessorsfromclass)]  |
| Adds a professor to a class           | POST   |    Admin    |     [[+](#professortoclass)]     |
| Removes a professor from a class      | DELETE |    Admin    | [[+](#removeprofessorfromclass)] |

---

## Authentication:

<a name="login"></a>

### POST /login

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

<a name="logout"></a>

### GET /logout

Logs a user out

#### Success: 204 No Content

---

## Users:

<a name="allusers"></a>

### GET /users

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

<a name="userbyid"></a>

### GET /users/{username}

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

<a name="createuser"></a>

### POST /users

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

<a name="updateuser"></a>

### PUT /users/{username}

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

<a name="deleteuser"></a>

### DELETE /users/{username}

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

---

## Students

<a name="allstudents"></a>

### GET /users/students

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
    "first_name": "Student",
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

### GET /users/students/{username}

<a name="studentbyid"></a>
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

<a name="updatestudent"></a>

### PUT /users/students/{username}

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

---

## Professors

<a name="allprofessors"></a>

### GET /users/professors

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

<a name="professorbyid"></a>

### GET /users/professors/{username}

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

<a name="updateprofessor"></a>

### PUT /users/professors/{username}

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

---

## Admins

<a name="alladmins"></a>

### GET /users/admins

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

<a name="adminbyid"></a>

### GET /users/admins/{username}

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

<a name="updateadmin"></a>

### PUT /users/admins/{username}

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

---

## Courses

<a name="allcourses"></a>

### GET /courses

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

<a name="coursebyid"></a>

### GET /courses/{code}

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

<a name="createcourse"></a>

### POST /courses

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

<a name="updatecourse"></a>

### PUT /courses/{code}

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

<a name="deletecourse"></a>

### DELETE /courses/{code}

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

---

## Units

<a name="allunits"></a>

### GET /courses/{code}/units

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

<a name="unitbyid"></a>

### GET /courses/{code}/units/{unit_code}

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

<a name="createunit"></a>

### POST /courses/{code}/units

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

<a name="updateunit"></a>

### PUT /courses/{code}/units/{unit_code}

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

<a name="deleteunit"></a>

### DELETE /courses/{code}/units/{unit_code}

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

---

## Classes

<a name="allclasses"></a>

## GET /courses/{code}/units/{unit_code}/classes

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

<a name="classbyid"></a>

## GET /courses/{code}/units/{unit_code}/classes/{year}/{class_number}

Gets a class by its year and number

#### Success: 200 OK

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

### Erros Possiveis

401 Unauthorized

```JSON
{
   "title": "Not logged in",
  "status": 401,
  "detail": "You must be logged in to access this resource."
}
```

```JSON
{
   "title": "Course Not Found",
  "status": 404,
  "detail": "Sorry, that course does not exist in our system."
}
```

```JSON
{
   "title": "Program Not Found",
  "status": 404,
  "detail": "Sorry, that course does not exist in our system."
}
```

## GET /programs/{id}/courses/{courseId}/classes/{classId}

```JSON

{
  "classes": [
    {
      "number": "T1",
      "beginsAt": "10:00",
      "endsAt": "11:30",
      "weekDay": 1,
      "academicYear": "2019/2020"
    }

```

### Erros Possiveis

401 Unauthorized

```JSON
{
   "title": "Not logged in",
  "status": 401,
  "detail": "You must be logged in to access this resource."
}
```

```JSON
{
   "title": "Class Not Found",
  "status": 404,
  "detail": "Sorry, that course does not exist in our system."
}
```

```JSON
{
   "title": "Course Not Found",
  "status": 404,
  "detail": "Sorry, that course does not exist in our system."
}
```

```JSON
{
   "title": "Program Not Found",
  "status": 404,
  "detail": "Sorry, that course does not exist in our system."
}
```

## POST /programs/{id}/courses/{courseId}/classes/

```JSON
{
      "number": "T5",
      "beginsAt": "15:00",
      "endsAt": "16:30",
      "weekDay": 1,
      "academicYear": "2019/2020"
    }

```

### Erros Possiveis

400 Bad Request

```JSON
{
   "title": "Invalid JSON",
  "status": 400,
  "detail": "Could not parse the given JSON. Make sure your JSON has all the requierd fields."
}
```

## PUT /programs/{id}/courses/{courseId}/classes/{classId}

```JSON
{
   "number": "T5",
   "beginsAt": "15:00",
   "endsAt": "16:30",
   "weekDay": 3,
   "academicYear": "2019/2020"
}
```

### Erros Possiveis

400 Bad Request

```JSON
{
   "title": "Invalid JSON",
  "status": 400,
  "detail": "Could not parse the given JSON. Make sure your JSON has all the requierd fields."
}
```

422 Unprocessable Entity

```JSON
{
   "title": "Validation Failed",
  "status": 422,
  "detail": {
      "field": err.path,
      "message": err.message,
      "instance": err.instance
   }
}
```

409 Conflict

```JSON
{
   "title": "Duplicate Entry",
  "status": 409,
  "detail": {
      "message": "This field(s) must be unique in the database.",
      "value": "username"
   }
}
```

404 Not Found

```JSON
{
   "title": "Class Not Found",
  "status": 404,
  "detail": "Sorry, that class does not exist in our system."
}
```

```JSON
{
   "title": "Program Not Found",
  "status": 404,
  "detail": "Sorry, that program does not exist in our system."
}
```

```JSON
{
   "title": "Course Not Found",
  "status": 404,
  "detail": "Sorry, that course does not exist in our system."
}
```

## DELETE /programs/{id}/courses/{courseId}/classes/{classId}

## Erros Possiveis

```JSON
{
   "title": "Program Not Found",
  "status": 404,
  "detail": "Sorry, that program does not exist in our system."
}
```

```JSON
{
   "title": "Course Not Found",
  "status": 404,
  "detail": "Sorry, that course does not exist in our system."
}
```

```JSON
{
   "title": "Class Not Found",
  "status": 404,
  "detail": "Sorry, that class does not exist in our system."
}
```

## GET /programs/{id}/courses/{courseId}/classes/{classId}/students

```JSON
"users": [
   {
      "username": "fc60001",
      "firstName": "Judah",
      "lastName": "Koelpin",
      "email": "judahkoelpin@fc.ul.pt",
      "password": "UD1mnRKS7IR7aqF",
      "role": {
         "type": "professor",
         "data": {
            "department": "Departamento de Informática",
            "room": "6.1.51"
         }
      }
   },
]
```

### Erros Possiveis

401 Unauthorized

```JSON
{
   "title": "Not an Admin",
  "status": 401,
  "detail": "You don't have admin previleges to access this resource."
}
```

## GET /programs/{id}/courses/{courseId}/classes/{classId}/students/{studentId}

```JSON
{
   "username": "fc60001",
   "firstName": "Judah",
   "lastName": "Koelpin",
   "email": "judahkoelpin@fc.ul.pt",
   "password": "UD1mnRKS7IR7aqF",
   "role": {
      "type": "professor",
      "data": {
         "department": "Departamento de Informática",
         "room": "6.1.51"
      }
   }
}
```

### Erros Possiveis

401 Unauthorized

```JSON
{
   "title": "Not logged in",
  "status": 401,
  "detail": "You must be logged in to access this resource."
}
```

404 Not Found

```JSON
{
   "title": "Student Not Found",
  "status": 404,
  "detail": "Sorry, that student does not exist in our system."
}
```

## POST /programs/{id}/courses/{courseId}/classes/{classId}/students

```JSON
{
   "userId": 1
}
```

### Erros Possiveis

400 Bad Request

```JSON
{
   "title": "Invalid JSON",
  "status": 400,
  "detail": "Could not parse the given JSON. Make sure your JSON has all the requierd fields."
}
```

404 Not Found

```JSON
{
   "title": "Class Not Found",
  "status": 404,
  "detail": "Sorry, that class does not exist in our system."
}
```

404 Not Found

```JSON
{
   "title": "User Not Found",
  "status": 404,
  "detail": "Sorry, that user does not exist in our system."
}
```

## DELETE /programs/{id}/courses/{courseId}/classes/{classId}/students/{studentId}

### Erros Possiveis

404 Not Found

```JSON
{
   "title": "Class Not Found",
  "status": 404,
  "detail": "Sorry, that class does not exist in our system."
}
```

404 Not Found

```JSON
{
   "title": "User Not Found",
  "status": 404,
  "detail": "Sorry, that user does not exist in our system."
}
```

## GET /programs/{id}/courses/{courseId}/classes/{classId}/professors

```JSON
"users": [
   {
      "username": "fc60001",
      "firstName": "Judah",
      "lastName": "Koelpin",
      "email": "judahkoelpin@fc.ul.pt",
      "password": "UD1mnRKS7IR7aqF",
      "role": {
         "type": "professor",
         "data": {
            "department": "Departamento de Informática",
            "room": "6.1.51"
         }
      }
   },
]
```

### Erros Possiveis

401 Unauthorized

```JSON
{
   "title": "Not an Admin",
  "status": 401,
  "detail": "You don't have admin previleges to access this resource."
}
```

## GET /programs/{id}/courses/{courseId}/classes/{classId}/professors/{professorId}

````JSON

```JSON
{
   "username": "fc60001",
   "firstName": "Judah",
   "lastName": "Koelpin",
   "email": "judahkoelpin@fc.ul.pt",
   "password": "UD1mnRKS7IR7aqF",
   "role": {
      "type": "professor",
      "data": {
         "department": "Departamento de Informática",
         "room": "6.1.51"
      }
   }
}
````

### Erros Possiveis

401 Unauthorized

```JSON
{
   "title": "Not logged in",
  "status": 401,
  "detail": "You must be logged in to access this resource."
}
```

404 Not Found

```JSON
{
   "title": "Professor Not Found",
  "status": 404,
  "detail": "Sorry, that professor does not exist in our system."
}
```

## POST /programs/{id}/courses/{courseId}/classes/{classId}/professors

```JSON
{
   "userId": 1
}
```

### Erros Possiveis

400 Bad Request

```JSON
{
   "title": "Invalid JSON",
  "status": 400,
  "detail": "Could not parse the given JSON. Make sure your JSON has all the requierd fields."
}
```

404 Not Found

```JSON
{
   "title": "Class Not Found",
  "status": 404,
  "detail": "Sorry, that class does not exist in our system."
}
```

404 Not Found

```JSON
{
   "title": "User Not Found",
  "status": 404,
  "detail": "Sorry, that user does not exist in our system."
}
```

## DELETE /programs/{id}/courses/{courseId}/classes/{classId}/professors/{professorId}

### Erros Possiveis

404 Not Found

```JSON
{
   "title": "Class Not Found",
  "status": 404,
  "detail": "Sorry, that class does not exist in our system."
}
```

404 Not Found

```JSON
{
   "title": "User Not Found",
  "status": 404,
  "detail": "Sorry, that user does not exist in our system."
}
```

## POST /login

```JSON
{
   "id": 1,
   "username": "fc12345",
   "firstName": "Exemplo",
   "lastName": "Aluno",
   "email": "fc12345@alunos.fc.ul.pt",
   "status": null,
   "avatarURL": null,
   "createdAt": "2020-03-18T14:30:22.000Z",
   "updatedAt": "2020-03-18T14:30:22.000Z",
}
```

### Erros Possiveis

```JSON
{
   "title": "User Not Found",
  "status": 404,
  "detail": "Sorry, that user does not exist in our system."
}
```

## GET /me

```JSON
{
   "id": 1,
   "username": "fc12345",
   "firstName": "Exemplo",
   "lastName": "Aluno",
   "email": "fc12345@alunos.fc.ul.pt",
   "status": null,
   "avatarURL": null,
   "createdAt": "2020-03-18T14:30:22.000Z",
   "updatedAt": "2020-03-18T14:30:22.000Z",
}
```

### Erros Possiveis

```JSON
{
   "title": "User Not Found",
  "status": 404,
  "detail": "Sorry, that user does not exist in our system."
}
```

## GET /logout

### Erros Possiveis

```JSON
{
   "title": "Not logged in",
  "status": 401,
  "detail": "You must be logged in to access this resource."
}
```

## Erros

### Failure: 401 Unauthorized

```JSON
{
   "title": "Not an Admin",
  "status": 401,
  "detail": "You don't have admin previleges to access this resource."
}
```

```JSON
{
   "title": "Not logged in",
  "status": 401,
  "detail": "You must be logged in to access this resource."
}
```

```JSON
{
   "title": "Invalid Identity",
  "status": 401,
  "detail": "You don't have permissions to manage other users accounts."
}
```

```JSON
{
   "title": "Failed to Log In",
  "status": 401,
  "detail": "Wrong email or password."
}
```

### 404 Not Found

```JSON
{
   "title": "Not Found",
  "status": 404,
  "detail": "Sorry, we can't find the page you were looking for."
}
```

```JSON
{
   "title": "User Not Found",
  "status": 404,
  "detail": "Sorry, that user does not exist in our system."
}
```

```JSON
{
   "title": "Program Not Found",
  "status": 404,
  "detail": "Sorry, that program does not exist in our system."
}
```

```JSON
{
   "title": "Course Not Found",
  "status": 404,
  "detail": "Sorry, that course does not exist in our system."
}
```

```JSON
{
   "title": "Class Not Found",
  "status": 404,
  "detail": "Sorry, that class does not exist in our system."
}
```

```JSON
{
   "title": "Professor Not Found",
  "status": 404,
  "detail": "Sorry, that professor does not exist in our system."
}
```

```JSON
{
   "title": "Student Not Found",
  "status": 404,
  "detail": "Sorry, that student does not exist in our system."
}
```

### 503 Service Unavailable

```JSON
{
   "title": "Service Unavailable",
  "status": 503,
  "detail": "Sorry, this service seems to be unavailable... Try again later."
}
```

### 400 Bad Request

```JSON
{
   "title": "Invalid JSON",
  "status": 400,
  "detail": "Could not parse the given JSON. Make sure your JSON has all the requierd fields."
}
```

### 422 Unprocessable Entity

```JSON
{
   "title": "Validation Failed",
  "status": 422,
  "detail": {
      "field": err.path,
      "message": err.message,
      "instance": err.instance
   }
}
```

### 409 Conflict

```JSON
{
   "title": "Duplicate Entry",
  "status": 409,
  "detail": {
      "message": "This field(s) must be unique in the database.",
      "value": error.value
   }
}
```

### Base de Dados

#### Users

| Coluna    |  Tipo  |      Restrições      |
| :-------- | :----: | :------------------: |
| number    | string | **not null, unique** |
| firstName | string |     **not null**     |
| lastName  | string |     **not null**     |
| email     | string | **not null, unique** |
| password  | string |     **not null**     |
| status    | string |          -           |
| avatarURL | string |          -           |

#### Students

| Coluna |  Tipo   |  Restrições  |
| :----- | :-----: | :----------: |
| userId | integer | **not null** |

#### Professors

| Coluna     |  Tipo   |  Restrições  |
| :--------- | :-----: | :----------: |
| userId     | integer | **not null** |
| department | string  | **not null** |
| room       | string  |      -       |

#### Admins

| Coluna |  Tipo   |  Restrições  |
| :----- | :-----: | :----------: |
| userId | integer | **not null** |
