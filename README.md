# mongoose
URL: https://mongoosejs.com/

**Mongoose** is an ODM (Object Data Modeling) library for MongoDB. By default, MongoDB has a flexible data model. This makes MongoDB databases very easy to alter and update in the future. But a lot of developers are accustomed to having rigid schemas.
Mongoose forces a semi-rigid schema from the beginning. With Mongoose, developers must define a Schema and Model.

A **Schema** defines the structure of your collection documents. A Mongoose schema maps directly to a MongoDB collection.

**Models** take your schema and apply it to each document in its collection.
Models are responsible for all document interactions like creating, reading, updating, and deleting (CRUD).

Features: 
- custom "method" function of the model instance
- custom "static" function of the model
- custom "query helper" function of the model
- custom "virtual" property of the model instance
- middleware