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
"profile": ""
"email": "thanhlq@gmail.com"
}'
```

```bash
curl --location --request GET 'http://localhost:3000/api/v1/users' \
--header 'Content-Type: application/json'
```
