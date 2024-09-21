import http from "node:http";
import path from "node:path";
import os from "node:os";
import fs from "node:fs";
import EventEmitter from "node:events";

const eventEmitter = new EventEmitter();

eventEmitter.on("end", (number, x) => {
  console.log(`done ${number} ${x} !!!!!`);
});

eventEmitter.emit("end", 2, 3);

// let data = fs.readFileSync("./hello.txt", "utf8");
// console.log(data);
fs.writeFileSync("./hello.txt", "hello txt");
http
  .createServer((request, response) => {
    response.write("<h1>Hello, Express!</h1>");
    response.end();
  })
  .listen(8080);

// function sum(a, b, fun) {
//   let c = 0;
//   setTimeout(() => {
//     c = a + b;
//     fun(c);
//   }, 0);
// }

// let a = sum(1, 4, function (data) {
//   console.log(data);
// });

function getUserID(fn) {
  setTimeout(() => {
    let userID = 10;
    fn(userID);
  });
}

function getPostUser(userID, fun) {
  setTimeout(() => {
    let post = { id: 12, name: "dfdfd" };
    fun(post);
  });
}

function getCommentPostUser(post, fun) {
  setTimeout(() => {
    let comment = { id: 13, name: "dfdfd" };
    fun(comment);
  });
}

// getUserID(function (userID) {
//   getPostUser(userID, function (post) {
//     getCommentPostUser(post, function (comment) {
//       console.log(comment);
//     });
//   });
// });

let abc = new Promise((resolve, reject) => {
  setTimeout(() => {
    getUserID((data) => {
      resolve(data);
    });
  }, 0);
});

abc
  .then((data) => {
    getPostUser(data, function (post) {
      return post;
    });
  })
  .then((post) => {
    getCommentPostUser(post, function (comment) {
      console.log(comment);
    });
  })
  .catch((data) => {
    console.log(data);
  })
  .finally(() => {
    console.log("finally");
  });
