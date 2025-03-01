import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import { Text } from 'react-native-paper'
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'
import { roleValidator } from '../helpers/roleValidator'

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' })
  const [role, setRole] = useState({ value: '', error: '' })

  const data = [
    { label: 'User', value: 'User' },
    { label: 'Seller', value: 'Seller' },
  ];

  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const confirmPasswordError = passwordValidator(confirmPassword.value)
    const roleError = roleValidator(role.value)

    if (emailError || passwordError || confirmPasswordError || nameError || roleError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ value: "", error: passwordError })
      setConfirmPassword({ value: "", error: confirmPasswordError })
      setRole({ ...role, error: roleError })
      return;
    }
    const userData = {
      Name: name.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
      accountType: role.value
    }
    console.log("Signup")
    navigation.navigate('VerifyEmailonRegister', userData);
    // axios
    //   .post("http://192.168.88.1:4000/auth/signup", userData)
    //   .then((response) => {
    //     console.log(response.data.message);
    //     Alert.alert('Registration Successfull! Verify OTP sent on you email.');
    // navigation.navigate('VerifyEmailonRegister', { email: email });
    //   })
    //   .catch((error) => {
    //     console.log("errrrrorrrrr", error)

    //     if (error.response?.data?.message === 'User exists, but email verification is pending.') {
    //       // Redirect to OTP verification page
    //       Alert.alert('User exists, but email verification is pending.');
    //       navigation.navigate('VerifyEmailonRegister', { email });
    //     } else {
    //       // Handle other errors, like "User already exists"
    //       Alert.alert('Error', error.response?.data?.message || error.message);
    //     }
    //   });
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

          <Logo />
          <Header>Create Account</Header>
          <Dropdown
            style={[!role.error ? styles.dropdown : styles.dropdownError]}
            placeholderStyle={!role.error ? styles.placeholderStyle : styles.placeholderStyleError}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            returnKeyType="next"
            placeholder={'Select Your Role'}
            value={role.value}
            onChange={item => {
              setRole({ value: item.value, error: '' })
            }}
            error={!!role.error}
            errorText={role.error}
          />
          <View style={styles.container}>
            {role.error ? <Text style={styles.error}>{role.error}</Text> : null}
          </View>

          <TextInput
            label="Name"
            returnKeyType="next"
            value={name.value}
            onChangeText={(text) => setName({ value: text, error: '' })}
            error={!!name.error}
            errorText={name.error}
          />
          <TextInput
            label="Email"
            returnKeyType="next"
            value={email.value}
            onChangeText={(text) => setEmail({ value: text, error: '' })}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          <TextInput
            label="Password"
            returnKeyType="next"
            value={password.value}
            onChangeText={(text) => setPassword({ value: text, error: '' })}
            error={!!password.error}
            errorText={password.error}
            secureTextEntry
          />
          <TextInput
            label="confirmPassword"
            returnKeyType="done"
            value={confirmPassword.value}
            onChangeText={(text) => setConfirmPassword({ value: text, error: '' })}
            error={!!confirmPassword.error}
            errorText={confirmPassword.error}
            secureTextEntry
          />
          <Button
            mode="contained"
            onPress={onSignUpPressed}
            style={{ marginTop: 24 }}
          >
            Sign Up
          </Button>
          <View style={styles.row}>
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
              <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Background>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    margin: 0,
    padding: 0,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 8,
    textAlign: 'left'
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
    paddingBottom: 10
  },
  link: {
    fontWeight: 'bold',
    color: 'green',
  },
  container: {
    width: '100%',
    marginBottom: 12,
  },
  dropdown: {
    minWidth: 300,
    height: 50,
    borderColor: 'grey',
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  dropdownError: {
    minWidth: 300,
    height: 50,
    borderColor: 'red',
    backgroundColor: theme.colors.surface,
    borderWidth: 1.3,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  placeholderStyleError: {
    fontSize: 16,
    color: theme.colors.error
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  }
})
