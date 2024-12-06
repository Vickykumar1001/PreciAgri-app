import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NewsTopBar from '../components/NewsTopBar';

const articles = [
    {
        id: '1',
        title: 'Climate Change and Agriculture: Urgent Need for Adaptive Measures',
        date: '5d ago',
        source: 'Times of India',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8diEZo2l24HPmlLMKa48IBvVYNKf13lscaw&s',
        description: 'The urgency of addressing climate-induced loss and damage in agriculture cannot be overstated. With rising temperatures, irregular rainfall, and frequent droughts, crops are under severe stress. Farmers in vulnerable regions are struggling to adapt, and the sector faces significant economic losses. Effective solutions, including drought-resistant crops, precision irrigation, and government support, are essential to protect food security and rural livelihoods.',
    },
    {
        id: '2',
        title: 'New Technologies Revolutionize Crop Yield in Developing Nations',
        date: '2d ago',
        source: 'AgriTech News',
        image: 'https://bmp.assam.org/wp-content/uploads/2019/11/tribal-farming-in-Mizoram-and-Nagaland.jpg',
        description: 'Ram thang mekte chuan agriculture technology lama hmasawnna nasa tak an hmu mek a, hei hian thlai thar chhuah tihchangtlun leh hnathawktu senso tihtlem a tiam a ni. Drone, soil sensor, leh AI hmanga farming software te chu thil thar siam chak tak tak zingah a tel a ni. Heng technology te hian tui leh fertilizer te dik taka hman theihna a siam a, bawlhhlawh tihtlem a ni a, productivity pawh a ti sang thei hle. Loneitute chuan beiseina sang tak an nei a, mahse a tir lama senso sang tak chu heng hmasawnna mamawh ber, thil siamtu tenau tan chuan daltu a la ni reng a ni.',
    },
];

const schemes = [
    {
        id: '1',
        title: 'PM Kisan Samman Nidhi Yojana',
        date: '3d ago',
        source: 'Govt of India',
        image: 'https://morungexpress.com/uploads/2024/09/25216753_1726753517_202409193226421.jpg',
        description: 'The PM Kisan Samman Nidhi Yojana provides direct financial support to small and marginal farmers. Under this scheme, farmers receive a yearly amount of ₹6,000 in three equal installments. This initiative aims to improve the income of farmers, enabling them to purchase seeds, fertilizers, and other essentials to support agricultural activities.',
    },
    {
        id: '2',
        title: 'Mizoram Organic Farming Support Scheme',
        date: '7d ago',
        source: 'Department of Agriculture, Mizoram',
        image: 'https://morungexpress.com/uploads/2024/09/25216753_1726753517_202409193226421.jpg',
        description: 'With the growing demand for organic produce, the Mizoram government has launched an organic farming support scheme to help farmers transition to organic practices. This scheme provides subsidies for organic seeds, compost, and training sessions on organic farming techniques. It also helps farmers obtain organic certification to increase the marketability of their produce.',
    },
];

const ArticleList = ({ data, section }) => {
    const navigation = useNavigation();

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate('ArticleDetail', { data: data, section: section, initialIndex: data.indexOf(item) })
            }
            style={styles.articleContainer}
        >
            <Image source={{ uri: item.image }} style={styles.articleImage} />
            <View style={styles.articleTextContainer}>
                <Text style={styles.articleTitle}>{item.title}</Text>
                <Text style={styles.articleDate}>
                    {item.date} • {item.source}
                </Text>
                <Text style={styles.articleDescription}>
                    {item.description.substring(0, 70)}...
                </Text>
            </View>
        </TouchableOpacity>
    );
    return <FlatList data={data} keyExtractor={(item) => item.id} renderItem={renderItem} />;
};

export default function NewsAndSchemesTabView({ navigation }) {
    const [activeTab, setActiveTab] = useState('news');

    const renderContent = () => {
        if (activeTab === 'news') return <ArticleList data={articles} />;
        if (activeTab === 'schemes') return <ArticleList data={schemes} />;
    };

    return (
        <View style={styles.container}>
            <NewsTopBar navigation={navigation} />
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'news' && styles.activeTab]}
                    onPress={() => setActiveTab('news')}
                >
                    <Text style={[styles.tabText, activeTab === 'news' && styles.activeTabText]}>
                        News
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'schemes' && styles.activeTab]}
                    onPress={() => setActiveTab('schemes')}
                >
                    <Text style={[styles.tabText, activeTab === 'schemes' && styles.activeTabText]}>
                        Schemes
                    </Text>
                </TouchableOpacity>
            </View>
            {renderContent()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#d4edda',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    tab: {
        flex: 1,
        padding: 15,
        alignItems: 'center',
    },
    activeTab: {
        borderBottomWidth: 3,
        borderBottomColor: '#388e3c',
    },
    tabText: {
        fontSize: 16,
        color: '#2f4f2f',
    },
    activeTabText: {
        fontWeight: 'bold',
        color: '#388e3c',
    },
    articleContainer: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        marginHorizontal: 10,
        marginVertical: 8,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    articleImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 15,
    },
    articleTextContainer: {
        flex: 1,
    },
    articleTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#2f4f2f',
        marginBottom: 5,
    },
    articleDate: {
        color: '#6e8b3d',
        fontSize: 12,
        marginBottom: 5,
    },
    articleDescription: {
        color: '#555',
        fontSize: 13,
    },
});
