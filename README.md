# Group Up API

## Routes

| Action                                | Method | Permissions |               Path               |
| :------------------------------------ | :----- | :---------: | :------------------------------: |
| Logs a user in                        | POST   |    None     |          [[+](#login)]           |
| Logs a user out                       | GET    |    User     |          [[+](#logout)]          |
| Gets all users                        | GET    |    Admin    |         [[+](#allusers)]         |
| Gets a user by their username         | GET    |    User     |         [[+](#userbyid)]         |
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
| Gets a course by its code             | GET    |    User     |        [[+](#coursebyid)]        |
| Creates a new course                  | POST   |    Admin    |       [[+](#createcourse)]       |
| Deletes a course                      | DELETE |    Admin    |       [[+](#deletecourse)]       |
| Gets all units from a course          | GET    |    User     |         [[+](#allunits)]         |
| Gets a unit from a course by its code | GET    |    User     |         [[+](#unitbyid)]         |
| Creates units for a course            | POST   |    Admin    |        [[+](#createunit)]        |
| Edits a unit                          | PUT    |    Admin    |        [[+](#updateunit)]        |
| Removes a unit from a course          | DELETE |    Admin    |        [[+](#removeunit)]        |
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

### POST /login

<a name="login"></a>
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

### GET /logout

<a name="logout"></a>
Logs a user out

#### Success: 204 No Content

---

## Users:

### GET /users

<a name="allusers"></a>
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

<a name="userbyid"></a>
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

<a name="createuser"></a>
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

<a name="updateuser"></a>
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

<a name="deleteuser"></a>
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

### GET /users/students

<a name="allstudents"></a>
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

### PUT /users/students/{username}

<a name="updatestudent"></a>
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

### GET /users/professors

<a name="allprofessors"></a>
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

### GET /users/professors/{username}

<a name="professorbyid"></a>
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

### PUT /users/professors/{username}

<a name="updateprofessor"></a>
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

### GET /users/admins

<a name="alladmins"></a>
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

### GET /users/admins/{username}

<a name="adminbyid"></a>
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

### PUT /users/admins/{username}

<a name="updateadmin"></a>
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

## GET /programs/

```JSON

{
      "code": "L079",
      "name": "Tecnologias de Informação",
      "cycle": 1,
      "initials": "LTI",
      "courses": [
        {
          "code": 26719,
          "name": "Projeto de Tecnologias de Informação",
          "initials": "PTI",
          "ects": 6
        },
        {
          "code": 26718,
          "name": "Projeto de Tecnologias de Redes",
          "initials": "PTR",
          "ects": 6
        },
        {
          "code": 26716,
          "name": "Planeamento e Gestão de Projeto",
          "initials": "PGP",
          "ects": 6
        },
        {
          "code": 22701,
          "name": "Introdução às Probabilidades e Estatística",
          "initials": "IPE",
          "ects": 6
        }
      ]
    },
    {
      "code": "9119",
      "name": "Engenharia Informática",
      "cycle": 1,
      "initials": "LEI",
      "courses": [
        {
          "code": 26737,
          "name": "Teoria da Computação",
          "initials": "TC",
          "ects": 6
        },
        {
          "code": 26704,
          "name": "Redes de Computadores",
          "initials": "RC",
          "ects": 6
        },
        {
          "code": 22701,
          "name": "Introdução às Probabilidades e Estatística",
          "initials": "IPE",
          "ects": 6
        }
      ]
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

## GET /programs/{id}

```JSON

{
  "programs": [
    {
      "code": "L079",
      "name": "Tecnologias de Informação",
      "cycle": 1,
      "initials": "LTI",
      "courses": [
        {
          "code": 26719,
          "name": "Projeto de Tecnologias de Informação",
          "initials": "PTI",
          "ects": 6
        },
        {
          "code": 26718,
          "name": "Projeto de Tecnologias de Redes",
          "initials": "PTR",
          "ects": 6
        },
        {
          "code": 26716,
          "name": "Planeamento e Gestão de Projeto",
          "initials": "PGP",
          "ects": 6
        },
        {
          "code": 22701,
          "name": "Introdução às Probabilidades e Estatística",
          "initials": "IPE",
          "ects": 6
        }
      ]
    },
  ]
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
   "title": "Program Not Found",
  "status": 404,
  "detail": "Sorry, that program does not exist in our system."
}
```

## POST /programs/

```JSON
{
      "code": "L069",
      "name": "Estatística Aplicada",
      "cycle": 1,
      "initials": "LEA",
      "courses": [
        {
          "code": 1111,
          "name": "Estatística Paramétrica",
          "initials": "EPAR",
          "ects": 6
        }
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

400 Bad Request

```JSON
{
   "title": "Invalid JSON",
  "status": 400,
  "detail": "Could not parse the given JSON. Make sure your JSON has all the requierd fields."
}
```

409 Conflict

```JSON
{
   "title": "Duplicate Entry",
  "status": 409,
  "detail": {
      "message": "This field(s) must be unique in the database.",
      "value": "code"
   }
}
```

## PUT /programs/{id}

````JSON

{
   "code": "L069",
  "name": "Tecnologias de Informação",
  "cycle": 1,
  "initials": "LTI",
}


### Erros Possiveis

400 Bad Request

```JSON
{
   "title": "Invalid JSON",
  "status": 400,
  "detail": "Could not parse the given JSON. Make sure your JSON has all the requierd fields."
}
````

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
      "value": error.value
   }
}
```

404 Not Found

```JSON
{
   "title": "Program Not Found",
  "status": 404,
  "detail": "Sorry, that program does not exist in our system."
}
```

## DELETE /programs/{id}

### Erros Possiveis

404 Not Found

```JSON
{
   "title": "Program Not Found",
  "status": 404,
  "detail": "Sorry, that program does not exist in our system."
}
```

## GET /programs/{id}/courses

```JSON
"courses": [
        {
          "code": 26719,
          "name": "Projeto de Tecnologias de Informação",
          "initials": "PTI",
          "ects": 6
        },
        {
          "code": 26718,
          "name": "Projeto de Tecnologias de Redes",
          "initials": "PTR",
          "ects": 6
        },
        {
          "code": 26716,
          "name": "Planeamento e Gestão de Projeto",
          "initials": "PGP",
          "ects": 6
        },
        {
          "code": 22701,
          "name": "Introdução às Probabilidades e Estatística",
          "initials": "IPE",
          "ects": 6
        }
      ]
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
   "title": "Program Not Found",
  "status": 404,
  "detail": "Sorry, that course does not exist in our system."
}
```

## GET /programs/{id}/courses/{courseId}:

```JSON
        {
          "code": 26719,
          "name": "Projeto de Tecnologias de Informação",
          "initials": "PTI",
          "ects": 6
        },
      ]
    },
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

## GET /programs/{id}/courses/{courseId}/classes

```JSON
{
  "classes": [
    {
      "number": "T1",
      "beginsAt": "10:00",
      "endsAt": "11:30",
      "weekDay": 1,
      "academicYear": "2019/2020"
    },
    {
      "number": "T2",
      "beginsAt": "10:00",
      "endsAt": "11:30",
      "weekDay": 1,
      "academicYear": "2019/2020"
    },
    {
      "number": "T3",
      "beginsAt": "10:00",
      "endsAt": "11:30",
      "weekDay": 1,
      "academicYear": "2019/2020"
    }
  ]
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
