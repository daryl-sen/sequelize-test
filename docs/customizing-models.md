## Hiding fields

To hide specific fields when retrieving data, go to its model and add the following:

```

// ...
static associate() {};
toJSON() {
return { ...this.get(), <attr>: undefined }
}
// ...

```
