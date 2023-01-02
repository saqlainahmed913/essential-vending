import React, {Children} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';

function ViewTextKeyboard({children}) {
  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        //style={{flex: 1}}
        enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {children}
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default ViewTextKeyboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#46B2E0',
  },
});
