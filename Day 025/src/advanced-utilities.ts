
type User = {
    name: string;
    age: number;
    id: string;
    email: string;
    password: string;
};

type UserCache = Record<string, User>;

const activeUsers: UserCache = {
    "user_123": { name: "John", age: 20, id: "123", email: "john@test.com", password: "pwd" },
    "user_456": { name: "Ronnie", age: 24, id: "456", email: "ronnie@test.com", password: "pwd" }
};

type AvailableRoles = "admin" | "editor" | "viewer" | "guest";

type StandardRoles = Exclude<AvailableRoles, "admin">; 

const newHireRole: StandardRoles = "editor";

type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getSystemStatus() {
    return { status: "Online", uptime: 99.99 };
}

type StatusResponse = GetReturnType<typeof getSystemStatus>;

const userSessions = new Map<string, Date>();
userSessions.set("user_123", new Date());