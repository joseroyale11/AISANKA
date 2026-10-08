import React from 'react';

import {
View,
Text,
StyleSheet
} from 'react-native';


import {loginMock} from '../../services/authMock';

import {
getLearningSession
} from '../../engine/LearningEngine';



export default function TestEngineScreen(){


const student = loginMock(
  'bengeesoza@gmail.com',
  'MINED2026*'
);


if(!student){

return(
<View>
<Text>
Usuario no encontrado
</Text>
</View>
);

}



const session =
getLearningSession(student);



return(

<View style={styles.container}>


<Text>
AISANKA ENGINE TEST
</Text>


<Text>
Estudiante:
{session.student.nombre}
</Text>


<Text>
Idioma:
{session.student.idioma}
</Text>


<Text>
Perfil:
{session.student.profile}
</Text>


<Text>
Mundo:
{session.student.currentWorld}
</Text>


<Text>
Nivel:
{session.student.currentLevel}
</Text>


<Text>
Lección:
{session.lesson?.title}
</Text>


<Text>
Palabra:
{session.lesson?.word}
</Text>


</View>

);

}



const styles=StyleSheet.create({

container:{
flex:1,
justifyContent:'center',
alignItems:'center'
}

});