# Basic CRUD using sequelize

The main objective of an ORM is to help with querying the database. Here are some basic CRUD operations.

## Create

Source: https://sequelize.org/master/manual/model-querying-basics.html#simple-insert-queries

Import the model first.

```
const { sequelize, User } = require('./models');
```

In your app route, you can call `User.create()` to create a new user. Recall that sequelize runs asynchronously, so call `async` on the callback, then `await` on `User.create()`. The `create()` method takes an object with keys corresponding to attributes of the model that calls it. So our User model will expect:

```
{
  "name": "some name",
  "email": "someone@website.com",
  "password": "password"
}
```

Ideally, this object will be passed as a POST request. So we can use the spread `...` operator on `req.body` in an empty object and pass that to `create()`. We will [encrypt the password](/docs/encrypting-password.md) in a later article.

```
app.post("/user", async (req, res) => {
  try {
    const user = await User.create({ ...req.body });
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});
```

The `try ... catch` block is important because the query may fail, especially after we [add validation](/doc/validation.md) to the model. If the request runs successfully, we should get back a JSON of the new user that we created.
