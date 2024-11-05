import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Button, Share } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SwiperFlatList from 'react-native-swiper-flatlist';

const ArticleDetail = ({ route, navigation }) => {
    const { data, initialIndex } = route.params;

    const handleShare = async (title, url) => {
        try {
            await Share.share({
                message: `${title}\nRead more: ${url}`,
            });
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <SwiperFlatList
            data={data}
            index={initialIndex}
            renderItem={({ item }) => (
                <View style={styles.container}>
                    {/* Back Button */}
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Ionicons name="close" size={24} color="black" />
                    </TouchableOpacity>

                    {/* Article Content */}
                    <Image source={{ uri: item.image }} style={styles.image} />
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.date}>{item.date}</Text>
                    <Text style={styles.source}>Source: {item.source}</Text>
                    <Text style={styles.description}>{item.description}</Text>

                    {/* Share Button */}
                    <TouchableOpacity style={styles.shareButton} onPress={() => handleShare(item.title, item.image)}>
                        <Ionicons name="share-social-outline" size={24} color="white" />
                        <Text style={styles.shareButtonText}>Share</Text>
                    </TouchableOpacity>
                </View>
            )}
        />
    );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        width,
        padding: 20,
        backgroundColor: '#fff',
    },
    backButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 10,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    date: {
        fontSize: 14,
        color: '#888',
    },
    source: {
        fontSize: 14,
        color: '#444',
        marginVertical: 5,
    },
    description: {
        fontSize: 16,
        marginVertical: 10,
    },
    shareButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    shareButtonText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 5,
    },
});

export default ArticleDetail;
