# Sequelize video tutorial notes

## Repo setup

A few files have been added to .gitignore:

```
.env
/config/config.json
```

Reconstruct these files using their respective .example files to set up this repo.

## Sources

https://www.youtube.com/watch?v=3qlnR9hK-lQ&t

https://sequelize.org/master/manual/getting-started.html

## Installation

Install sequelize

```
npm i sequelize
(sudo) npm i -g sequelize-cli
```

Depending on the database:

```
# One of the following:
npm install --save pg pg-hstore # Postgres
npm install --save mysql2
npm install --save mariadb
npm install --save sqlite3
npm install --save tedious # Microsoft SQL Server
```

## Create a database using CLI

Update `config.json` and run `sequelize db:create` to create a database if it doesn't already exist.

## Create a table using CLI

Run `sequelize model:generate --name <name> --attributes <attributes>` to generate a table.

Attributes should be separated by a comma with no spaces, i.e. `--attributes name:string,role:string`. This will generate a new model inside /models with a lower-case version of the name provided.

## Using sequelize in app.js

```
const { sequelize } = require('./models');

async function main() {
    await sequelize.sync();
}

main();
```

## CRUD

### Create

```
// import the model
const { sequelize, <model> } = require('./models');

// ...
const newEntry = await <model>.create({ attr1, attr2 });
return res.json(newEntry);
// ...
```

### Read

```
// ...
const target = await <model>.findOne({
    where: { attr: query }
})
// ...

```

### Update

```
//...
const target = await <model>.findOne({ where: { attr: query}});
target.attr1 = 'newValue';
await target.save();
await target.destroy()
//...
```

### Delete

```
//...
const target = await <model>.findOne({ where: { attr: query}})
await target.destroy()
//...
```

## Associations (relationships)

### One to many

Find in `/models/<model>.js`

In the parent model:

```
// ...
static associate({ <parentModel> }) {
    this.belongsTo(<parentModel>, { foreignKey: '<parentModelName>Id'});
}
// ...
```

In the child model:

```
// ...
static associate({ <childModel> }) {
    this.hasMany(<childModel>, { foreignKey: '<childModelName>Id' })
}
```

## Model aliases

When defining a relationship, an alias can be passed to `.belongsTo`

```
// ...
static associate({ <parentModel> }) {
    this.belongsTo(<parentModel>, { foreignKey: '<parentModelName>Id' }, as: 'alias');
}
// ...
```

## Hiding fields

To hide specific fields when retrieving data, go to its model and add the following:

```
toJSON() {
    return { ...this.get(), <attr>: undefined }
}
```

## Validation

https://sequelize.org/master/manual/validations-and-constraints.html#validators

Add to model attribute:

```
//...
name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        notNull: { msg: 'error message' },
        // ... add more validators
    }
}
//...
```

## Timestamps

Video: https://www.youtube.com/watch?v=3qlnR9hK-lQ&t=2021s&ab_channel=Classsed

```
1:51 - install dependencies and project setup
2:16 - install `sequelize-cli` globally
2:33 - run `sequelize init` and fill in json.config
4:30 - create database using `sequelize db:create`
5:16 - create a table using `sequelize model:generate --name <name> --attributes <attributes>`
7:18 - use sequelize instance in app.js using `sequelize.sync()`
8:40 - change table 'Users' to 'users'
9:19 - edit attributes in 'users' table
10:10 - pass `{ force: true }` to `sequelize.sync()` to update table
11:25 - install express and set up express app
11:57 - create express route to create user in database
14:42 - use Insomnia to test the route
15:52 - implement uuid in 'User' model
16:49 - migrations explanation
18:35 - run `sequelize db:drop` to delete database
18:55 - create db again, use `sequelize.authenticate()`
19:34 - run `sequelize db:migrate` to run migrations
20:40 - hide user ID
21:56 - create endpoint (route) to fetch all users
23:57 - create endpoint to find user
25:09 - create db model 'Post'
27:14 - run migration
27:45 - create one-to-many relationship between 'User' and 'Post'
29:55 - revert migration using `sequelize db:migrate:undo`
30:39 - create endpoint for creating posts
33:32 - hide user id and post id
34:09 - join tables to get user name on posts
35:24 - change 'User' to 'user' by using an alias
37:49 - add validation to model
41:57 - create DELETE endpoint
42:49 - create UPDATE endpoint
46:38 - seeders explanation
```
