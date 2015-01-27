var db = require("./db").db,
    name = "book-test-collection",
    Book = db.collection(name);

module.exports.name = name;

module.exports.insert = function(book, callback){
  Book.insert(book, {strict: true}, callback);
};

module.exports.find = function(criteria, callback){
  Book.find(criteria).toArray(callback);
};

module.exports.update = function(query, update, option, callback){
  Book.update(query, update, option, callback);
};

module.exports.remove = function(query, callback){
  Book.remove(query, callback);
};
