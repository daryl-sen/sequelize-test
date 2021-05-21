# Customizing models

## Hiding fields

Source: https://sequelize.org/master/class/lib/model.js~Model.html#instance-method-toJSON

By default, querying a Model using `.findOne()` will return all the associated fields. Sometimes it's beneficial to hide some of these fields.

To do so, go to the model file and add a `toJSON()` method.

```
static associate(models) {
  // associations
};

toJSON() {
  return { ...this.get(), <attr>: undefined }
}
```

This overrides the default `toJSON()` behavior. The spread operator lists all the model attributes, we can then redefine the target attributes to `undefined` so it doesn't show up when we query for it.

## Adding options to model attributes

Source: https://sequelize.org/master/class/lib/model.js~Model.html#static-method-init

Model attributes are defined in the `<model>.init()` method within the model file. The auto-generated attributes are quite basic, but we can fine-tune them with more options. Looking into the relevant section in the Post model:

```
heading: DataTypes.STRING,
```

We can configure attribute options such as `allowNull`, `unique`, `defaultValue`, or `validate`. More detailed on validation on the [validation page](/docs/validation.md).

```
heading: {
  type: DataTypes.STRING,
  unique: true,
  allowNull: false,
  defaultValue: 'Heading',
}
```

Not all of these options make sense for the `heading` attribute of the Post model, they're listed here just as an example.

## Changing model table names

You can override the default table name by specifying a 'tableName' option just below the generated 'modelName'. This allows better conformation to naming conventions that are not the same as the sequelize configuration (singular vs. plural names, camelCase vs. snake_case, etc).

```
  Post.init(
    {
      content: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Post",
      tableName: "post",
    }
  );
```

## Applying changes

These changes won't get applied until you run `sequelize.sync( {force: true} )` in your express app. Note that this will drop all the data in your tables! A better way to apply these changes would be through [migrations](/docs/migrations.md).
