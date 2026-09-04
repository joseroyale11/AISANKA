import { MOCK_USERS } from '../mock/auth';
import { STUDENTS } from '../mock/students';


export function loginMock(
correo:string,
password:string
){

const user = MOCK_USERS.find(

(item)=>

item.correo === correo
&&
item.password === password

);


if(!user){

return null;

}


const student = STUDENTS.find(

(item)=>

item.correo === user.correo

);


return student ?? null;

}