interface A {
    name: string;
    age: number;
}

const fn: () => A = () => (
    {name: 'hello', age: 10}
)

console.log(fn())