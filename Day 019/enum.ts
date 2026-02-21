
enum Direction {
    Up,
    Down,
    Left,
    Right
}

const myMove: Direction = Direction.Up;
console.log(myMove); 



enum UserRole {
    Admin = "ADMIN",
    Editor = "EDITOR",
    Viewer = "VIEWER"
}

function checkAccess(role: UserRole) {
    if (role === UserRole.Admin) {
        console.log("Access Granted: Welcome Admin!");
    } else {
        console.log("Access Denied: You need Admin privileges.");
    }
}

checkAccess(UserRole.Admin);  