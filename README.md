# mongoskin-CRUD-sample
It's a CRUD demo for Mongoskin with Mocha testing.

I perform a "Book" model for this sample, in the following is a sample document 

```js
{
      name: "Book Name",
      price: 10,
      year: 2000,
      publisher:{
        name: "Publisher2",
        tel: "333-159434"
      },
      keywords: ["Sample", "Book"],
      author:[
        {name: "Allen", mail: "allen@mail.com"}
      ]
}
```

### Install

```bash
$ git clone https://github.com/AllenFang/mongoskin-CRUD-sample.git
$ cd mongoskin-CRUD-sample
$ npm install
```
After installation, you can modify the db.js to match your MongoDB connection url

### Run
```bash
$ npm test
```
