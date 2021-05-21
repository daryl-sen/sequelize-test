# Customizing models

## Hiding fields

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
