import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Make sure to install react-native-vector-icons or @expo/vector-icons

const ReviewComponent = () => {
    const rating = 4.3;
    const totalRatings = 20;
    const stars = [1, 2, 3, 4, 5];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Satisfied Customer Reviews</Text>
            <TouchableOpacity style={styles.reviewButton}>
                <Text style={styles.reviewButtonText}>WRITE REVIEW</Text>
            </TouchableOpacity>
            <View style={styles.ratingContainer}>
                <View style={styles.ratingInfo}>
                    <View style={styles.ratingBox}>
                        <Text style={styles.ratingText}>{rating}</Text>
                        <FontAwesome name="star" size={20} color="white" />
                    </View>
                    <Text style={styles.totalRatings}>{totalRatings} Satisfied Ratings</Text>
                </View>
                <View style={styles.starsContainer}>
                    {stars.map((star, index) => (
                        <View key={index} style={styles.starRow}>
                            <FontAwesome name="star" size={16} color="black" />
                            <View style={styles.progressBar}>
                                <View style={index === 0 ? styles.progressBarFilled : styles.progressBarEmpty} />
                            </View>
                            <Text style={styles.starCount}>{index === 0 ? totalRatings : 0}</Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        elevation: 4,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    reviewButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        marginBottom: 16,
    },
    reviewButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    ratingInfo: {
        alignItems: 'center',
        marginRight: 16,
    },
    ratingBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4CAF50',
        padding: 8,
        borderRadius: 8,
        marginBottom: 4,
    },
    ratingText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 4,
    },
    totalRatings: {
        color: '#333',
    },
    starsContainer: {
        flex: 1,
    },
    starRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    progressBar: {
        flex: 1,
        height: 8,
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
        marginHorizontal: 8,
    },
    progressBarFilled: {
        width: '100%',
        height: '100%',
        backgroundColor: '#4CAF50',
        borderRadius: 4,
    },
    progressBarEmpty: {
        width: '30%',
        backgroundColor: '#4CAF50',
        height: '100%',
        borderRadius: 4,
    },
    starCount: {
        width: 20,
        textAlign: 'right',
    },
});

export default ReviewComponent;
