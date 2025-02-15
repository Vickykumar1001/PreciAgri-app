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
import { mobileValidator } from '../helpers/mobileValidator'

export default function RegisterScreen({ navigation }) {
  const [firstName, setFirstName] = useState({ value: '', error: '' })
  const [lastName, setLastName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [mobile, setMobile] = useState({ value: '', error: '' })
  const [role, setRole] = useState({ value: '', error: '' })
  const [businessName, setBusinessName] = useState({ value: '', error: '' });
  const [businessType, setBusinessType] = useState({ value: '', error: '' });

  const data = [
    { label: 'Farmer', value: 'Farmer' },
    { label: 'Seller', value: 'Seller' },
  ];

  const businessTypeOptions = [
    { label: 'Shopkeeper', value: 'Shopkeeper' },
    { label: 'Wholesaler', value: 'Wholesaler' },
    { label: 'Distributor', value: 'Distributor' },
    { label: 'Service Provider', value: 'Service Provider' },
  ];

  const onSignUpPressed = () => {
    const firstNameError = nameValidator(firstName.value)
    const lastNameError = nameValidator(lastName.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const mobileError = mobileValidator(mobile.value)
    const roleError = roleValidator(role.value)
    let businessNameError = '';
    let businessTypeError = '';

    if (role.value === 'Seller') {
      businessNameError = nameValidator(businessName.value);
      businessTypeError = roleValidator(businessType.value); // Use a role-like validator
    }
    if (emailError || passwordError || firstNameError || lastNameError || roleError) {
      setFirstName({ ...firstName, error: firstNameError })
      setLastName({ ...lastName, error: lastNameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      setRole({ ...role, error: roleError })
      setMobile({ ...mobile, error: mobileError })
      if (role.value === 'Seller') {
        setBusinessName({ ...businessName, error: businessNameError });
        setBusinessType({ ...businessType, error: businessTypeError });
      }
      return;
    }
    const userData = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
      mobile: mobile.value,
      role: role.value,
      ...(role.value === 'Seller' && {
        businessName: businessName.value,
        businessType: businessType.value,
      }),
    }
    console.log("Signup")
    axios
      .post("http://192.168.198.195:5454/auth/signup", userData)
      .then((response) => {
        console.log(response.data.message);
        Alert.alert('Registration Successfull! Verify OTP sent on you email.');
        navigation.navigate('VerifyEmailonRegister', { email: email });
      })
      .catch((error) => {
        console.log("errrrrorrrrr", error)

        if (error.response?.data?.message === 'User exists, but email verification is pending.') {
          // Redirect to OTP verification page
          Alert.alert('User exists, but email verification is pending.');
          navigation.navigate('VerifyEmailonRegister', { email });
        } else {
          // Handle other errors, like "User already exists"
          Alert.alert('Error', error.response?.data?.message || error.message);
        }
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
          {role.value === 'Seller' && (
            <>
              <TextInput
                label="Business Name"
                value={businessName.value}
                onChangeText={(text) => setBusinessName({ value: text, error: '' })}
                error={!!businessName.error}
                errorText={businessName.error}
              />
              <Dropdown
                style={[!businessType.error ? styles.dropdown : styles.dropdownError]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={businessTypeOptions}
                labelField="label"
                valueField="value"
                placeholder="Select Business Type"
                value={businessType.value}
                onChange={(item) => setBusinessType({ value: item.value, error: '' })}
              />
              {businessType.error ? <Text style={styles.error}>{businessType.error}</Text> : null}
            </>
          )}

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
