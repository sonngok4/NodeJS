let abc = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve("Resolved")
        reject("Rejected")
    }, 5000);
})

abc.then((data) => {
    console.log(data);

}).catch((data) => {
    console.log(data);

}).finally(() => {
    console.log("Finally");
})

const getUserId = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let userId = 1
            resolve(userId)
        }, 1000)
    })
}
const getPostUserId = (userId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let post = { id: 2, name: "User 2" }
            resolve(post)
        }, 1000)
    })
}
const getComments = (post) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let comment = { id: 2, name: "User 2", comment: "comment User 2" }
            resolve(comment)
        }, 1000)
    })
}
// getUserID( function(userID){


// getPostUserID(userID, function(post){
//    getCommentPostUserID(post, function(comment){
//       console.log(comment);
//    });
// });
// });

// let getCommentPostUser = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         getUserID((data) => {
//             resolve(data);
//         });
//     }, 0);
// });
// getCommentPostUser
//     .then((data) => {

//         getPostUserID(data, function (post) {
//             return post;
//         });
//     })
//     .then((post) => {
//         getCommentPostUserID(post, function (comment) {
//             console.log(comment);
//         });
//     })
//     .catch((data) => {
//         console.log(data);
//     })
//     .finally((data) => {
//         console.log("finally");
//     });

async function xyz() {
    let userId = await getUserId();
    let post = await getPostUserId(userId);
    let comment = await getComments(post);
    return ["async await", comment, post, userId]
}

Promise.all([getUserId(), getPostUserId(), getComments()]).then((data) => {
    console.log("Promise all", data);
})
xyz().then((data) => {
    console.log(data);
})