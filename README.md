### Routes

| Method | Path                                                                         | Result                                     | Permissions |
| :----- | :--------------------------------------------------------------------------- | :----------------------------------------- | :---------- |
| GET    | /users                                                                       | Gets all users                             | Admin       |
| GET    | /users/{id}                                                                  | Gets a user by their id                    | User        |
| POST   | /users                                                                       | Creates a user                             | Admin       |
| PUT    | /users/{id}                                                                  | Updates a user                             | Admin       |
| DELETE | /users/{id}                                                                  | Deletes a user                             | Admin       |
| GET    | /users/students                                                              | Gets all students                          | Admin       |
| GET    | /users/students/{id}                                                         | Gets a student by their id                 | User        |
| GET    | /users/professors                                                            | Gets all professors                        | Admin       |
| GET    | /users/professors/{id}                                                       | Gets a professor by their id               | User        |
| GET    | /users/admins                                                                | Gets all admins                            | Admin       |
| GET    | /users/admins/{id}                                                           | Gets an admin by their id                  | Admin       |
| GET    | /programs/                                                                   | Gets all programs                          | User        |
| GET    | /programs/{id}                                                               | Gets a program by its id                   | User        |
| POST   | /programs/                                                                   | Creates a program                          | Admin       |
| PUT    | /programs/{id}                                                               | Updates a program                          | Admin       |
| DELETE | /programs/{id}                                                               | Deletes a program                          | Admin       |
| GET    | /programs/{id}/courses                                                       | Gets all courses of a program              | User        |
| GET    | /programs/{id}/courses/{courseId}                                            | Gets a course of a program by its courseId | User        |
| POST   | /programs/{id}/courses                                                       | Creates a course of a program              | Admin       |
| GET    | /programs/{id}/courses/{courseId}/classes                                    | Gets all classes                           | User        |
| GET    | /programs/{id}/courses/{courseId}/classes/{classId}                          | Gets a class by its id                     | User        |
| POST   | /programs/{id}/courses/{courseId}/classes/                                   | Creates a class                            | Admin       |
| PUT    | /programs/{id}/courses/{courseId}/classes/{classId}                          | Updates a class                            | Admin       |
| DELETE | /programs/{id}/courses/{courseId}/classes/{classId}                          | Deletes a class                            | Admin       |
| GET    | /programs/{id}/courses/{courseId}/classes/{classId}/students                 | Gets all students from a class             | User        |
| GET    | /programs/{id}/courses/{courseId}/classes/{classId}/students/{studentId}     | Gets a student from a class by their id    | User        |
| POST   | /programs/{id}/courses/{courseId}/classes/{classId}/students                 | Inserts a student into a class             | Admin       |
| DELETE | /programs/{id}/courses/{courseId}/classes/{classId}/students/{studentId}     | Deletes a student from a class             | Admin       |
| GET    | /programs/{id}/courses/{courseId}/classes/{classId}/professors               | Gets all professors from a class           | User        |
| GET    | /programs/{id}/courses/{courseId}/classes/{classId}/professors/{professorId} | Gets a professor from a class by their id  | User        |
| POST   | /programs/{id}/courses/{courseId}/classes/{classId}/professors               | Inserts a professor into a class           | Admin       |
| DELETE | /programs/{id}/courses/{courseId}/classes/{classId}/professors/{professorId} | Deletes a professor from a class           | Admin       |
| POST   | /login                                                                       | Logs user in                               | ---         |
| GET    | /me                                                                          | Verifies if the user is logged in          | User        |
| GET    | /logout                                                                      | Logs a user out                            | User        |

## GET /users

### Success: 200 OK

```JSON
[
   {
      "id": 1,
      "username": "fc12345",
      "firstName": "Exemplo",
      "lastName": "Aluno",
      "email": "fc12345@alunos.fc.ul.pt",
      "status": "offline",
      "avatarURL": null,
      "createdAt": "2020-03-18T14:30:22.000Z",
      "updatedAt": "2020-03-18T14:30:22.000Z",
   },
   {
      "id": 2,
      "username": "fc00000",
      "firstName": "Exemplo",
      "lastName": "Professor",
      "email": "fc00000@alunos.fc.ul.pt",
      "status": "online",
      "avatarURL": null,
      "createdAt": "2020-04-18T14:30:22.000Z",
      "updatedAt": "2020-04-18T14:30:22.000Z",
   }
]
```

### Erros possiveis

 401 Unauthorized

```JSON
{
   "title": "Not an Admin",
	"status": 401,
	"detail": "You don't have admin previleges to access this resource."
}
```

## GET /users/{id}

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

### Erros possiveis

404 Not Found

```JSON
{
   "title": "User Not Found",
	"status": 404,
	"detail": "Sorry, that user does not exist in our system."
}
```

401 Unauthorized

```JSON
{
   "title": "Not logged in",
	"status": 401,
	"detail": "You must be logged in to access this resource."
}
```


## POST /users
```JSON
{
   "users": [
      {
         "number": "fc12345",
         "firstName": "Exemplo",
         "lastName": "Aluno",
         "email": "fc12345@alunos.fc.ul.pt",
         "password": "test",
         "role": {
            "type": "student",
            "data": {}
          }
      },
      {
         "number": "fc00000",
         "firstName": "Exemplo",
         "lastName": "Professor",
         "email": "fc00000@alunos.fc.ul.pt",
         "password": "test",
         "role": {
            "type": "professor",
            "data": {
               "department" : "DI",
               "room" : "6.3.99"
            }
         }
      }
   ]
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
      "value": "username"
   }
}
```

## PUT /users/{id}

```JSON
"users": [
		{
			"username": "fc60000",
			"firstName": "Casimer",
			"lastName": "Goodwin",
			"email": "fc60000@alunos.fc.ul.pt",
			"password": "PTI/PTRzzz",
			"role": {
				"type": "student",
				"data": {}
			}
		},
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
   "title": "User Not Found",
	"status": 404,
	"detail": "Sorry, that user does not exist in our system."
}
```

## DELETE /users/{id}

### Erros Possiveis: 

404 Not Found

```JSON
{
   "title": "User Not Found",
	"status": 404,
	"detail": "Sorry, that user does not exist in our system."
}
```

## GET /users/students

### Success: 200 OK

```JSON
{
			"username": "fc60000",
			"firstName": "Casimer",
			"lastName": "Goodwin",
			"email": "fc60000@alunos.fc.ul.pt",
			"password": "K0Zv4yQYnoKVvLj",
			"role": {
				"type": "student",
				"data": {}
			}
		},
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


## GET /users/students/{id}

```JSON
"users": [
   {
			"username": "fc60000",
			"firstName": "Casimer",
			"lastName": "Goodwin",
			"email": "fc60000@alunos.fc.ul.pt",
			"password": "K0Zv4yQYnoKVvLj",
			"role": {
				"type": "student",
				"data": {}
			}
      },
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

404 Not Found

```JSON
{
   "title": "Student Not Found",
	"status": 404,
	"detail": "Sorry, that student does not exist in our system."
}
```

## GET /users/professors

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

## GET /users/professors/{id}

```JSON

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
   "title": "Professor Not Found",
	"status": 404,
	"detail": "Sorry, that professor does not exist in our system."
}
```

## GET /users/admins
```JSON
{
			"username": "fc60002",
			"firstName": "Trace",
			"lastName": "Ratke",
			"email": "traceratke@fc.ul.pt",
			"password": "Ri9mov2FmjjghOX",
			"role": {
				"type": "admin",
				"data": {}
         }
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

## GET /users/admins/{id}

```JSON
{
   "users": [
      {
      "username": "fc60002",
			"firstName": "Trace",
			"lastName": "Ratke",
			"email": "traceratke@fc.ul.pt",
			"password": "Ri9mov2FmjjghOX",
			"role": {
				"type": "admin",
				"data": {}
         }
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

404 Not Found

```JSON
{
   "title": "Admin Not Found",
	"status": 404,
	"detail": "Sorry, that admin does not exist in our system."
}
```

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
```JSON

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

```JSON

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


### Failiure: 401 Unauthorized

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
