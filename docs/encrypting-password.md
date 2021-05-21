# Encrypting passwords

It's really bad practice to store passwords as plain text. I could not find official sequelize documentation for this, so here are a few difference sources:

- https://gist.github.com/JesusMurF/9d206738aa54131a6e7ac88ab2d9084e
- https://stackoverflow.com/questions/34120548/using-bcrypt-with-sequelize-model
- https://medium.com/@benjaminpwagner/using-sequelize-hooks-and-crypto-to-encrypt-user-passwords-5cf1a27513d9

## Trial and error...

I found that these answers didn't work for me, possibly because they were using a different version. For example, in the first link, they talked about defining instance methods using

```
{
  instanceMethods: {
    myMethod: function () {
      // run something
    }
  }
}
```

However, calling `.myMethod()` on an instance returns an error saying `myMethod` is not a function. Further searching revealed that the correct way to define an instance method is to use

```
<model>.prototype.myMethod = function () {
  // run something
};
```

One commenter on this answer also stated that using the `async` version of bcrypt is better for performance. Unfortunately, most of the other answers I found did not have the async version, or used inferior hashing algorithms, or had a completely different syntax.

Taking the working pieces from each of these answers and from my own understanding, the following is my approach. Please, please inform me if there is a better way to do it.

## Solution

### Approach

1. The password should be hashed before the database entry is created, otherwise the data must be retrieved and then saved again.
2. Before creating the entry, a method should be called to hash the password and overwrite the password string.
3. After the entry is created, the instance should be able to call another method to check the password against the hashed version.

#### Modify the password before creating a database entry

Source: https://sequelize.org/v5/manual/hooks.html#declaring-hooks

Sequelize has a `beforeCreate()` method that can be called on the model, which runs a callback function that takes two arguments:

1. An instance of the model.
2. Optional configuration (options)

Taking our User model as an example:

```
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate(async function (user, options) {
    const hash = await User.generateHash(user.password);
    user.password = hash;
  });
```

The callback function will run before inserting into the database, replacing the `user` instance's password with the generated hash. When the database entry is created, it will have the password hash instead of plain-text password.

This uses the async version of bcrypt method, which will not cause the server to freeze while processing the bcrypt methods.

#### Checking the password

Now that the password is hashed, we need to way to check whether an incoming login attempt to see if the password is correct. To do this, we need to create an instance method.

Just before/after `User.beforeCreate()`:

```
  User.prototype.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
```

When we want to call this instance method, we can run `.findOne()` or `.createOne()` to get a User instance, then call `.checkPassword(password)` on that instance to check if the password is correct.

```
// login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const targetUser = await User.findOne({
      where: {
        email: email,
      },
    });
    if (await targetUser.checkPassword(password)) {
      // authenticate user
      return res.end("Logged in");
    }
    return res.end("Wrong password");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});
```
