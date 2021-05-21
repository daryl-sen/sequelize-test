# Associations (relationships)

For now, we will only look at one-to-one and one-to-many relationships because they're the most common ones.
To explore this topic, we will need to create two new models.

## New models

Let's turn this app into a blog app, generate the following models:

```
sequelize model:generate --name Post --attributes heading:string,content:text
sequelize model:generate --name Tag --attributes name:string
```

## Establish relationships

- Each user can have many posts, but each post can only have one author (one-to-many)
- Each post can have many tags, and each tag may be associated with multiple posts (many-to-many)

### One-to-many

#### Parent Model (User)

Sometimes, the `one` in one-to-many is called the parent and the `many` is the child. In this case, the `User` model is the parent and the `Post` model is the child.

In the `User` model, we find a static method `associate` (you can see this entire file in /models/user.js). As the auto-generated comments tell us, this is where we define assocations.

```
    static associate(models) {
      this.hasMany(models.Post, { foreignKey: "user_id" });
    }
```

`this.hasMany()` is quite verbose. It takes in two arguments here: the child model and an optional object for additional configuration. If a `foreignKey` were not specified here, the default column name would have been `UserId`. Passing a foreignKey here overrides the default value, and is useful if you're using a different set of naming conventions. Personally, I recommend going with the default so that sequelize won't be fighting you every step of the way. I used `"user_id"` here to show that a different option is available.

#### Child model (Post)

In the `Post` model, we'll call `this.belongsTo()`.

```
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "cascade",
      });
    }
```

The same syntax is used here, and we see an additional `onDelete` key. If this is set to `"cascade"`, all the posts by the same author will be deleted when the author is deleted. This is `false` by default on one-to-many relationships. Additionally, we also notice that the `foreignKey` here refers to the parent model's id. This will create a `user_id` column on the child model's table. This makes sense because in one-to-many relationships, the child table is usually the one that has a foreign key, not the parent.

### Many-to-many

A common way to implement a many-to-many relationship between two tables is to create a third 'bridge' table. Sequelize calls this the 'through' table. In our case, the 'through' table is between `Post` and `Tag`. There are different naming conventions, we will call our bridge table `PostTags`.

#### Creating the 'through' table

The documentation tells us that the simplest way to create a many-to-many relationship is to call `this.belongsToMany()` on both models.

In the `Post` model:

```
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "cascade",
      });
      this.belongsToMany(models.Tag, { through: "PostTags", as: "tag" });
    }
```

In the `Tag` model:

```
    static associate(models) {
      this.belongsToMany(models.Post, { through: "PostTags", as: "post" });
    }
```

This will automatically create a `"PostTags"` table if it doesn't exist, and the post table will have a `PostId` column and `TagId` column, both are foreign keys to their corresponding models.
