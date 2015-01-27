"use strict"

var should = require("should");
var db     = require("../db").db;
var Book   = require("../book");

describe("book.js", function(){
  before(function(done){
    db.createCollection(Book.name,{}, function(err, result){
      done(err);
    });
  });

  it("Should Book.insert(Book) be successful", function(done){
    var newBook = {
      name: "Java Restful Service",
      price: 10,
      year: 2015,
      publisher:{
        name: "Publisher2",
        tel: "333-159434"
      },
      keywords: ["Java", "RESTful"],
      author:[
        {name: "Allen", mail: "allen@mail.com"}
      ]
    };
    Book.insert(newBook, function(err, result){
      should.not.exist(err);
      should.exist(result);
      result.should.be.instanceof(Array).with.length(1);
      result[0].should.have.property("_id");
      done(err);
    });
  });

  it("Should Book.find({}) return all books", function(done){
    Book.find({}, function(err, result){
      should.not.exist(err);
      should.exist(result);
      result.should.be.instanceof(Array).with.length(1);
      done(err);
    });
  });

  it("Should Book.find({name:'Java Restful Service'}) return a book", function(done){
    var bookName = "Java Restful Service";
    Book.find({name: bookName}, function(err, result){
      should.not.exist(err);
      should.exist(result);
      result.should.be.instanceof(Array).with.length(1);
      (result[0].name).should.be.equal(bookName);
      done(err);
    });
  });

  it("Should Book.find({'publisher.name':'Publisher2'}) return a book", function(done){
    var publisher = "Publisher2";
    Book.find({"publisher.name": publisher}, function(err, result){
      should.not.exist(err);
      should.exist(result);
      result.should.be.instanceof(Array).with.length(1);
      (result[0].publisher.name).should.be.equal(publisher);
      done(err);
    });
  });

  it("Should Book.find({year: {$lt: 2015}}) return nothing", function(done){
    Book.find({"year": {$lt: 2015}}, function(err, result){
      should.not.exist(err);
      should.exist(result);
      result.should.be.instanceof(Array).with.length(0);
      done(err);
    });
  });

  it("Should Book.update({name: 'Java Restful Service'}, \n\t\t{$set: {price: 11,'publisher.tel':'123-45678'}}) be successful", function(done){
    var query = {name: "Java Restful Service"};
    var doc = {
        $set:{
          price: 11,
          "publisher.tel":"123-45678"
        }
    };

    Book.update(query, doc, function(err, success, result){
      should.not.exist(err);
      should.exist(result);
      success.should.be.equal(1);
      result.should.have.property("ok", true);
      Book.find(query, function(err, result){
        should.not.exist(err);
        should.exist(result);
        result.should.be.instanceof(Array).with.length(1);
        result[0].should.have.property("price", 11);
        result[0].publisher.should.have.property("tel", "123-45678");
        done(err);
      });
    });
  });

  it("Should Book.update({name: 'Java Restful Service'}, \n\t\t{$push:{keywords:'Programming'}}) be successful", function(done){
    var query = {name: "Java Restful Service"};
    var doc = {
      $push:{
        keywords: "Programming"
      }
    };

    Book.update(query, doc, function(err, success, result){
      should.not.exist(err);
      should.exist(result);
      success.should.be.equal(1);
      result.should.have.property("ok", true);
      Book.find(query, function(err, result){
        should.not.exist(err);
        should.exist(result);
        result.should.be.instanceof(Array).with.length(1);
        result[0].should.have.property("keywords").with.lengthOf(3);
        result[0].keywords.should.containEql("Programming");
        done(err);
      });
    });
  });

  it("Should Book.remove({name: 'Java Restful Service'} be successful", function(done){
    var query = {name: "Java Restful Service"};

    Book.remove(query, function(err, success, result){
      should.not.exist(err);
      should.exist(result);
      success.should.be.equal(1);
      result.should.have.property("ok", true);
      Book.find(query, function(err, result){
        should.not.exist(err);
        should.exist(result);
        result.should.be.instanceof(Array).with.length(0);
        done(err);
      });
    });
  });

  after(function(done){
    db.collection(Book.name).drop(function(err, result){
      done(err);
    });
  });

});
