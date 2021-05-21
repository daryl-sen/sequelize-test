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

## Read (one)

Source: https://sequelize.org/master/manual/model-querying-finders.html#-code-findone--code-

To find a single user in the database, we can use `User.findOne()`.

```
app.get("/user", async (req, res) => {
  const { email } = req.query;
  try {
    const user = await User.findOne({
      where: {
        email: email, // attribute: targetValue
      },
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});
```

## Read (many)

Source: https://sequelize.org/master/manual/model-querying-basics.html#simple-select-queries

You can find all the entries in a table using `User.findAll()`. Additional filters can be used using `where` similar to how it's used in `findOne()`.

## Update

Source: https://sequelize.org/master/manual/model-querying-basics.html#simple-update-queries

The target must first be identified before it can be updated.

```
// update
app.put("/user", async (req, res) => {
  const { email } = req.query;
  try {
    const target = await User.findOne({
      where: {
        email: email,
      },
    });
    target.name = "new name";
    await target.save();
    return res.json(target);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});
```

After finding the target, its attribute values can be reassigned directly. After reassigning, call `target.save()` to commit the change.

## Delete

Source: https://sequelize.org/master/manual/model-querying-basics.html#simple-delete-queries

Similar to the update
