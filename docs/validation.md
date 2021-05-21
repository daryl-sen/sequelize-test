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
