import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Make sure to install react-native-vector-icons or @expo/vector-icons

const ReviewComponent = ({ reviewCount }) => {
    const totalRatings = reviewCount.reduce((sum, count) => sum + count, 0);
    const rating = (
        reviewCount.reduce((sum, count, index) => sum + count * (index + 1), 0) / totalRatings
    ).toFixed(1);

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
                    {[...reviewCount].reverse().map((count, index) => {
                        const starLevel = 5 - index; // Start with 5 stars at the top
                        const percentage = totalRatings > 0 ? (count / totalRatings) * 100 : 0;
                        return (
                            <View key={index} style={styles.starRow}>
                                <Text style={styles.starLabel}>{starLevel}</Text>
                                <FontAwesome name="star" size={16} color="black" />
                                <View style={styles.progressBar}>
                                    <View style={[styles.progressBarFilled, { width: `${percentage}%` }]} />
                                </View>
                                <Text style={styles.starCount}>{count}</Text>
                            </View>
                        );
                    })}
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
    starLabel: {
        paddingRight: 10,
        fontWeight: 'bold',
    },
    progressBar: {
        flex: 1,
        height: 8,
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
        marginHorizontal: 8,
    },
    progressBarFilled: {
        height: '100%',
        backgroundColor: '#4CAF50',
        borderRadius: 4,
    },
    starCount: {
        width: 20,
        textAlign: 'right',
    },
});

export default ReviewComponent;
