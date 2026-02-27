interface User {
    name : string;
    age : number;
    id : string;
    email : string;
    password : string
}

type UpdateProps = Pick<User, 'name' | 'age' | 'password'>

type UpdatePropsOptional = Partial<UpdateProps>

function updateUser (updatedProps : UpdatePropsOptional) {

}
