import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
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
import { mobileValidator } from '../helpers/mobileValidator'

export default function RegisterScreen({ navigation }) {
  const [firstName, setFirstName] = useState({ value: '', error: '' })
  const [lastName, setLastName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [mobile, setMobile] = useState({ value: '', error: '' })
  const [role, setRole] = useState({ value: '', error: '' })

  const data = [
    { label: 'Farmer', value: 'Farmer' },
    { label: 'Seller', value: 'Seller' },
  ];

  const onSignUpPressed = () => {
    const firstNameError = nameValidator(firstName.value)
    const lastNameError = nameValidator(lastName.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const mobileError = mobileValidator(mobile.value)
    const roleError = roleValidator(role.value)
    if (emailError || passwordError || firstNameError || lastNameError || roleError) {
      setFirstName({ ...firstName, error: firstNameError })
      setLastName({ ...lastName, error: lastNameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      setRole({ ...role, error: roleError })
      setMobile({ ...mobile, error: mobileError })
      return
    }
    const userData = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      mobile: mobile.value,
      role: role.value,
    }
    console.log("Signup")
    axios
      .post("http://192.168.0.106:5454/auth/signup", userData)
      .then((response) => {
        console.log(response.data.message);
        navigation.navigate('VerifyEmailonRegister', { email: email.value });
      })
      .catch((error) => {
        console.log(error.message);
      });
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
            label="First Name"
            returnKeyType="next"
            value={firstName.value}
            onChangeText={(text) => setFirstName({ value: text, error: '' })}
            error={!!firstName.error}
            errorText={firstName.error}
          />
          <TextInput
            label="Last Name"
            returnKeyType="next"
            value={lastName.value}
            onChangeText={(text) => setLastName({ value: text, error: '' })}
            error={!!lastName.error}
            errorText={lastName.error}
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
            label="Mobile"
            returnKeyType="next"
            value={mobile.value}
            onChangeText={(text) => setMobile({ value: text, error: '' })}
            error={!!mobile.error}
            errorText={mobile.error}
            keyboardType="numeric"
          />
          <TextInput
            label="Password"
            returnKeyType="done"
            value={password.value}
            onChangeText={(text) => setPassword({ value: text, error: '' })}
            error={!!password.error}
            errorText={password.error}
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
