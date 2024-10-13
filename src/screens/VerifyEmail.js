import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function VerifyEmail({ navigation }) {
    const [otp, setOtp] = useState('');
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes = 300 seconds
    const timerRef = useRef(null); // Reference to keep track of the timer

    // Enable the button if the OTP length is 5
    useEffect(() => {
        setIsButtonEnabled(otp.length === 5);
    }, [otp]);

    // Start the countdown timer on component mount
    useEffect(() => {
        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        // Clear the timer on component unmount
        return () => clearInterval(timerRef.current);
    }, []);

    // Format the time as MM:SS
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    // Handle OTP input
    const handleOtpChange = (text) => {
        // Allow only numeric input and limit to 5 characters
        if (/^\d*$/.test(text) && text.length <= 5) {
            setOtp(text);
        }
    };

    // Handle Continue button press
    const handleContinue = () => {
        if (otp.length === 5) {
            Alert.alert('OTP Verified', `Your OTP: ${otp}`);
            // Perform OTP verification logic here
            navigation.reset({
                index: 0,
                routes: [{ name: 'ChangePassword' }],
            })
        }
    };

    // Handle Resend OTP
    const handleResend = () => {
        setOtp('');
        setTimeLeft(300); // Reset timer to 5 minutes
        Alert.alert('OTP Resent', 'A new OTP has been sent to your email.');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Verify Your Email</Text>

            <Text style={styles.subtitle}>
                Enter the 5-digit code sent to your email.
            </Text>

            <TextInput
                style={styles.otpInput}
                value={otp}
                onChangeText={handleOtpChange}
                keyboardType="numeric"
                placeholder="Enter OTP"
                maxLength={5}
            />

            <Text style={styles.timer}>
                {timeLeft > 0 ? `Code expires in ${formatTime(timeLeft)}` : 'Code expired!'}
            </Text>

            <TouchableOpacity
                style={[styles.button, isButtonEnabled ? styles.buttonEnabled : styles.buttonDisabled]}
                onPress={handleContinue}
                disabled={!isButtonEnabled}
            >
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleResend} disabled={timeLeft > 0}>
                <Text style={[styles.resendLink, timeLeft > 0 && styles.resendDisabled]}>
                    Didn’t get the email? Resend
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color: '#666',
    },
    otpInput: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 18,
        backgroundColor: '#FFF',
        textAlign: 'center',
        marginBottom: 10,
    },
    timer: {
        textAlign: 'center',
        fontSize: 14,
        color: '#FF6347', // Tomato color for emphasis
        marginBottom: 20,
    },
    button: {
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonEnabled: {
        backgroundColor: '#4CAF50', // Green
    },
    buttonDisabled: {
        backgroundColor: '#B0BEC5', // Greyed out
    },
    buttonText: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold',
    },
    resendLink: {
        textAlign: 'center',
        fontSize: 16,
        color: '#1E90FF', // Dodger Blue for the link
    },
    resendDisabled: {
        color: '#A9A9A9', // Grey when disabled
    },
});
