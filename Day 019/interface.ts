
interface User {
    id: number;
    username: string;
    email: string;
}

interface AdminUser extends User {
    adminLevel: number;
}

const myAdmin: AdminUser = {
    id: 1,
    username: "coder100x",
    email: "coder@example.com",
    adminLevel: 5
};

interface WindowShape {
    width: number;
    height: number;
}

interface WindowShape {
    title: string;
}

const appWindow: WindowShape = {
    width: 1920,
    height: 1080,
    title: "My React App"
};

console.log(myAdmin, appWindow);