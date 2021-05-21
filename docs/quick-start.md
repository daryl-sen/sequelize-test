# Project Setup

## Installation

Sources:

- https://www.youtube.com/watch?v=3qlnR9hK-lQ&t
- https://sequelize.org/master/manual/getting-started.html

These are installation instructions for ubuntu only.

### 1. Install sequelize and sequelize-cli

```
npm i sequelize
sudo npm i -g sequelize-cli
```

### 2. Install database dependencies

ONE of the following, depending on the database.

```
npm install --save pg pg-hstore # Postgres
npm install --save mysql2
npm install --save mariadb
npm install --save sqlite3
npm install --save tedious # Microsoft SQL Server
```

### 3. Initialize sequelize

Run `sequelize init` to automatically generate the /config, /models, /migrations and /seeders directories. This will create:

- 'config.json' file inside /config
- 'index.js' file inside /models

The other two directories will be empty.

### 4. Configure config.json and create database

The 'config.json' file created in the previous step contains information that sequelize needs to function properly. It contains a JSON containing an array of 3 objects. Each object refers to a different database - one for development, one for testing, and one for production. Only one will be used at a time.

Fill in the correct credentials for your database. Since this file contains sensitive information like your database username and password, I recommend adding this file to your .gitignore so this information does not go into your online repo.

If you have not created the database, you can run `sequelize db:create` and sequelize will generate the database for you.

### 5. Generate models

The model part of MVC refers to classes that represent tables in the database. The sequelize-cli allows you to generate models easily.

```
sequelize model:generate --name <name> --attributes <attributes>
```

`name` refers to the name of the model. Since models are classes, the convention is to use a capitalized word, for example, `Users`. There's debate about whether the model should be singular or plural. We will stick to singular for this tutorial.

`attributes` refers to the model attributes (a.k.a table names). Each attribute should be separated by a comma, with no spaces in between, and follows this format: `<attributeName>:<type>`. The `attributeName` can be any alphanumerical value and will be the table column names. The same restrictions to column names in your database of choice will apply here (i.e. no `-` in postgres table column names). The `type` refers to the intended [data type](https://sequelize.org/v5/manual/data-types.html).

Example:

```
sequelize model:generate --name User --attributes name:string,email:string,password:string
```

This will generate a new model, 'user.js', in the /models directory, as well as the corresponding migration file in the /migrations directory. Each file in the /models directory represents a model (excluding index.js).

### 5. Setup express

Now that we have the database and one model setup, we can start creating the Express app. The Express app can be created normally, but you will need to import Sequelize and the models you created in order to use Sequelize.

```
const { sequelize } = require("./models");
```

This imports ./models/index.js, which also imports all the models in that directory. To import specific models, add the model names to the destructuring:

```
// imports sequelize and the User model.
const { sequelize, User } = require("./models");
```

At this point, your models are created, imported, and ready to go. However, your database is still empty. To create your User table, you need to run the following: (you might consider [customizing your model](/docs/customizing-models.md), but you can do that later.)

```
sequelize.sync();
```

This will create tables based on all the models you created and imported. Note that this is an asynchronous function. You can put this in your `app.listen()` callback with `async` and `await`.

```
app.listen(PORT, async () => {
  try {
    await sequelize.sync();
  } catch (error) {
    return console.log(error);
  }
  console.log(`Running on port: ${PORT}`);
});
```

Now that your Express app and sequelize are set up, you can read about [CRUD basics](/docs/basic-crud.md).
