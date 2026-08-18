import React from 'react';

import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import LevelNode from './LevelNode';

import {StudentProfile} from '../../types/StudentProfile';



interface Props {

  student: StudentProfile | null;

}



const levels = [

{
id:1,
top:535,
left:50,
},


{
id:2,
top:425,
right:40,
},


{
id:3,
top:305,
left:50,
},


{
id:4,
top:115,
right:35,
},


{
id:5,
top:15,
left:50,
},


];



export default function LevelMap({
student
}:Props){



return (

<ScrollView
style={styles.container}
showsVerticalScrollIndicator={false}
>


<View style={styles.map}>


{levels.map(level=>{


const unlocked =
student?.unlockedLevels.includes(level.id)
?? false;



return(

<View

key={level.id}

style={[
styles.node,

{

top:level.top,

left:level.left,

right:level.right,

},

]}

>


<LevelNode

number={level.id}

unlocked={unlocked}

/>


</View>


);


})}



</View>



</ScrollView>


);

}




const styles = StyleSheet.create({


container:{

flex:1,

},



map:{


position:'relative',

height:980,

width:'100%',


},



node:{


position:'absolute',


},


});