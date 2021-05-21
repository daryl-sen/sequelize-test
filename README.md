# Sequelize Beginners' Tutorial

## Repo setup

Create a `.env` file based on `.env.example`, then run `node construct-config-json` to generate a config.json file based on your environment variables.

## Contents

- [Quick start guide](/docs/quick-start.md)
- [Performing CRUD operations](/docs/basic-crud.md)
- [Associations (relationships)](/docs/assocations.md)

## Video timestamps

Parts of this guide are based on the following YouTube video.

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

## Sources

- https://sequelize.org/
- https://www.youtube.com/watch?v=3qlnR9hK-lQ&t=2021s&ab_channel=Classsed
- https://stackoverflow.com/questions/28821812/sequelize-many-to-many-how-to-create-a-new-record-and-update-join-table
- https://stackoverflow.com/questions/28401465/allow-null-value-for-sequelize-foreignkey
- https://stackoverflow.com/questions/34120548/using-bcrypt-with-sequelize-model
- https://stackoverflow.com/questions/53946532/how-to-define-an-index-within-a-sequelize-model
