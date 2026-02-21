
function getFirstElement<T>(arr: T[]): T {
    return arr[0];
}

const firstNumber = getFirstElement([10, 20, 30]); 
console.log(firstNumber); 

const firstWord = getFirstElement(["apple", "banana", "cherry"]); 
console.log(firstWord); 

interface HasLength {
    length: number;
}

function getLength<T extends HasLength>(item: T): number {
    return item.length;
}

console.log(getLength("Hello")); 
console.log(getLength([1, 2, 3])); 
