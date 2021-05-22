# Errors

In the `try ... catch` block, the error we get when the query fails is a fairly large object. Most of the time, only a small portion of that is relevant to debugging or understanding the problem.

```
try {
  const newUser = User.create({ ...req.body });
} catch (error) {
  console.log(error);
}
```

If we run `console.log` on the entire object, the following is what we would see for a unique constraint failed error...

```
{
  "name": "SequelizeUniqueConstraintError",
  "errors": [
    {
      "message": "email must be unique",
      "type": "unique violation",
      "path": "email",
      "value": "sensworks.ca@gmail.com",
      "origin": "DB",
      "instance": {
        "uuid": "pANDtpndVdxhytEjcJxc",
        "id": null,
        "display_name": "Daryl",
        "email": "sensworks.ca@gmail.com",
        "password": "password",
        "bio": "I created bugdiary.com",
        "user_type_id": 3,
        "updatedAt": "2021-05-22T04:59:02.415Z",
        "createdAt": "2021-05-22T04:59:02.415Z"
      },
      "validatorKey": "not_unique",
      "validatorName": null,
      "validatorArgs": []
    }
  ],
  "fields": {
    "email": "sensworks.ca@gmail.com"
  },
  "parent": {
    "length": 223,
    "name": "error",
    "severity": "ERROR",
    "code": "23505",
    "detail": "Key (email)=(sensworks.ca@gmail.com) already exists.",
    "schema": "public",
    "table": "app_user",
    "constraint": "app_user_email_key",
    "file": "nbtinsert.c",
    "line": "534",
    "routine": "_bt_check_unique",
    "sql": "INSERT INTO \"app_user\" (\"id\",\"uuid\",\"display_name\",\"email\",\"password\",\"bio\",\"created_at\",\"updated_at\",\"user_type_id\") VALUES (DEFAULT,$1,$2,$3,$4,$5,$6,$7,$8) RETURNING \"id\",\"uuid\",\"display_name\",\"email\",\"password\",\"bio\",\"created_at\",\"updated_at\",\"user_type_id\";",
    "parameters": [
      "pANDtpndVdxhytEjcJxc",
      "Daryl",
      "sensworks.ca@gmail.com",
      "password",
      "I created bugdiary.com",
      "2021-05-22 04:59:02.415 +00:00",
      "2021-05-22 04:59:02.415 +00:00",
      3
    ]
  },
  "original": {
    "length": 223,
    "name": "error",
    "severity": "ERROR",
    "code": "23505",
    "detail": "Key (email)=(sensworks.ca@gmail.com) already exists.",
    "schema": "public",
    "table": "app_user",
    "constraint": "app_user_email_key",
    "file": "nbtinsert.c",
    "line": "534",
    "routine": "_bt_check_unique",
    "sql": "INSERT INTO \"app_user\" (\"id\",\"uuid\",\"display_name\",\"email\",\"password\",\"bio\",\"created_at\",\"updated_at\",\"user_type_id\") VALUES (DEFAULT,$1,$2,$3,$4,$5,$6,$7,$8) RETURNING \"id\",\"uuid\",\"display_name\",\"email\",\"password\",\"bio\",\"created_at\",\"updated_at\",\"user_type_id\";",
    "parameters": [
      "pANDtpndVdxhytEjcJxc",
      "Daryl",
      "sensworks.ca@gmail.com",
      "password",
      "I created bugdiary.com",
      "2021-05-22 04:59:02.415 +00:00",
      "2021-05-22 04:59:02.415 +00:00",
      3
    ]
  },
  "sql": "INSERT INTO \"app_user\" (\"id\",\"uuid\",\"display_name\",\"email\",\"password\",\"bio\",\"created_at\",\"updated_at\",\"user_type_id\") VALUES (DEFAULT,$1,$2,$3,$4,$5,$6,$7,$8) RETURNING \"id\",\"uuid\",\"display_name\",\"email\",\"password\",\"bio\",\"created_at\",\"updated_at\",\"user_type_id\";"
}
```

At most, what we'd realistically need would be the object from the `"errors"` key. Given the structure of the error object, you can figure out what you want to print in your console when an error occurs.

```
for (const errorObj of error.errors) {
  const { message, type, value } = errorObj;
  console.log(`ERROR: ${type}\n${message}\nValue received:#{value}`);
}
```
