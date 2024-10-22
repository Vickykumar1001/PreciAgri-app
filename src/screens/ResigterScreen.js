import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
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
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [mobile, setMobile] = useState({ value: '', error: '' })
  const [role, setRole] = useState({ value: '', error: '' })

  const data = [
    { label: 'Farmer', value: 'farmer' },
    { label: 'Buyer', value: 'buyer' },
  ];
  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const mobileError = mobileValidator(mobile.value)
    const roleError = roleValidator(role.value)
    if (emailError || passwordError || nameError || roleError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      setRole({ ...role, error: roleError })
      setMobile({ ...mobile, error: mobileError })
      return
    }
    navigation.navigate("VerifyEmailonRegister")
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />

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
        }
        }
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
        label="Mobile"
        returnKeyType="next"
        value={mobile.value}
        onChangeText={(text) => setMobile({ value: text, error: '' })}
        error={!!mobile.error}
        errorText={mobile.error}
        // textContentType="numeric"
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
    </Background>
  )
}

const styles = StyleSheet.create({
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
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
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
