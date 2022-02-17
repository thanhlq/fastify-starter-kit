# MANUAL TEST

```bash
yarn dev
```

## CREATE USER

```bash
curl --location --request POST 'http://localhost:3006/api/v1/users' \
--header 'Content-Type: application/json' \
--data-raw '{
"firstName": "Thanh",
"lastName": "LE",
"email": "thanhlq@gmail.com"
}'
```


