# MANUAL TEST

```bash
yarn dev
```

## CREATE USER

```bash
curl --location --request POST 'http://localhost:3000/api/v1/users' \
--header 'Content-Type: application/json' \
--data-raw '{
"firstName": "Thanh",
"lastName": "LE",
"profile": {"interest": ["tennis", "beer"]},
"email": "thanhlq@gmail.com"
}'


# sample output

[
  {
    "id": "jubcmEvCxhDPQlxLI_YcR",
    "firstName": "Thanh",
    "lastName": "LE",
    "age": null,
    "createdAt": "2022-03-13T20:10:35.000Z",
    "updatedAt": "2022-03-13T20:10:35.000Z",
    "deletedAt": null,
    "createdBy": null,
    "updatedBy": null,
    "deletedBy": null,
    "orgId": null,
    "email": "thanhlq@gmail.com",
    "password": null,
    "optCodeSms": null,
    "optCodeToken": null,
    "profile": null,
    "address": null,
    "activatedAt": null,
    "lastLoginAt": null,
    "fullName": "Thanh LE",
    "isFemale": false
  }
]
```

## Test Get User

```bash
curl --location --request GET 'http://localhost:3000/api/v1/users' \
--header 'Content-Type: application/json'
```

## Test Language

// not working yet, set at begining worked.

```bash
curl --location --request GET 'http://localhost:3000/health' \
--header 'Content-Type: application/json' -H 'Accept-Language: kr'
```
