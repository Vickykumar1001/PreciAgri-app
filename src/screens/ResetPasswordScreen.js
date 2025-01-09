import React, { useState } from 'react'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { emailValidator } from '../helpers/emailValidator'
import axios from 'axios'
import { Alert } from 'react-native'

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })

  const sendResetPasswordEmail = async () => {
    // Validate email
    const emailError = emailValidator(email.value)
    if (emailError) {
      setEmail({ ...email, error: emailError })
      return
    }

    try {
      // Send POST request to /forgot-password
      const response = await axios.post('http://192.168.158.195:5454/auth/forgot-password', { email: email.value })

      // Handle success response
      if (response.data.message) {
        Alert.alert('Success', response.data.message)
        // Navigate to OTP verification screen
        navigation.navigate('VerifyEmail', { email: email.value })
      }
    } catch (error) {
      // Handle error response
      console.error(error)
      Alert.alert('Error', error.response?.data?.message || 'Something went wrong. Please try again later.')
    }
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Restore Password</Header>
      <TextInput
        label="E-mail address"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="You will receive an OTP to reset your password."
      />
      <Button
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={{ marginTop: 16 }}
      >
        Send OTP
      </Button>
    </Background>
  )
}
