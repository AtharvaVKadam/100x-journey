
type Player = {
    id: number;
    nickname: string;
};

type SuperPlayer = Player & {
    specialPower: string;
};

const myPlayer: SuperPlayer = {
    id: 99,
    nickname: "typescript_ninja",
    specialPower: "Invisibility"
};

type ID = string | number;

const userId: ID = 101; 
const stringId: ID = "user-abc"; 

type AppStatus = "loading" | "success" | "error";

let currentStatus: AppStatus = "loading";
currentStatus = "success"; 

type RGBColor = [number, number, number];
const red: RGBColor = [255, 0, 0];

console.log(myPlayer, currentStatus);