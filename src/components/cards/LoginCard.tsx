import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import COLORS from '../../theme/colors';
import SHADOWS from '../../theme/shadows';

type Props={
    children:React.ReactNode;
}

export default function LoginCard({children}:Props){

    return(

        <View style={styles.card}>

            {children}

        </View>

    );

}

const styles=StyleSheet.create({

card:{

backgroundColor:'rgba(255, 255, 255, 0.77)',

borderRadius:28,

padding:24,

borderWidth:1,

borderColor:'rgba(255,255,255,0.35)',

...SHADOWS.card,

}

});