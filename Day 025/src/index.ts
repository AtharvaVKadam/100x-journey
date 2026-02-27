interface User {
    name : string;
    age : number
}

function sumOfAge( user1 : User, user2 : User) {
    return user1.age + user2.age
}

const age = sumOfAge ({ name : 'John' , age : 20 }, { name : 'Ronnie' , age : 24 });
console.log(age);