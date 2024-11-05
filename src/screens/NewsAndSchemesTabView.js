import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
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
    {
        id: '3',
        title: 'Soil Degradation Threatens Global Food Security',
        date: '7d ago',
        source: 'The Guardian',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSbqDyRd7_9e9fZPApSmPzBNHA1Kd2f-LizDHANrzWQg4fzeVnu6v9vzSa_VZ8zbg6FBw&usqp=CAU',
        description: 'Soil health is essential for sustainable agriculture, yet intensive farming practices have left large portions of arable land depleted of nutrients. Without adequate intervention, degraded soil could reduce global crop yields by up to 50% in the coming decades. Regenerative agriculture, which includes practices like crop rotation, reduced tillage, and cover cropping, is emerging as a solution to restore soil vitality and prevent erosion.',
    },
    {
        id: '4',
        title: 'India’s Organic Farming Push Gains Momentum',
        date: '10d ago',
        source: 'Hindustan Times',
        image: 'https://bmp.assam.org/wp-content/uploads/2019/11/tribal-farming-in-Mizoram-and-Nagaland.jpg',
        description: 'India is seeing a significant shift towards organic farming as consumers become more health-conscious and environmentally aware. States like Sikkim and Kerala are leading the movement, with policies that promote organic practices and ban chemical pesticides. While organic farming is beneficial for soil health and biodiversity, it presents challenges, including lower yields and higher labor costs. The government is incentivizing farmers to adopt organic methods, aiming for a sustainable agricultural future.',
    },
    {
        id: '5',
        title: 'Water Scarcity Poses Threat to Irrigation and Crop Production',
        date: '3w ago',
        source: 'Water Conservation Journal',
        image: 'https://kvklunglei.mizoram.gov.in/uploads/attachments/486d60b7bb5e7c753209ee85afdece66/farmers-field-day-1.jpg',
        description: 'Water scarcity is becoming a critical issue for agriculture worldwide. In many regions, over-extraction of groundwater has left wells dry, and rivers are running low. Climate change exacerbates the problem, leading to more severe droughts. This issue has forced farmers to adopt water-saving techniques like drip irrigation and rainwater harvesting. Without immediate action, water scarcity could lead to significant food shortages and price hikes in the coming years.',
    },
    {
        id: '6',
        title: 'Rise of Urban Agriculture: Farming Moves to City Rooftops',
        date: '1mo ago',
        source: 'Urban Farm Magazine',
        image: 'https://bmp.assam.org/wp-content/uploads/2019/11/tribal-farming-in-Mizoram-and-Nagaland.jpg',
        description: 'With limited space in urban areas, city dwellers are turning to innovative methods to grow their own food. Rooftop gardens and vertical farming are becoming popular, allowing urban residents to produce fresh fruits and vegetables. This trend not only promotes sustainability but also reduces food transportation costs. Cities like New York and Tokyo have adopted policies to encourage urban farming, making it a viable option for reducing carbon footprints and improving food security.',
    },
    {
        id: '7',
        title: 'AI and Big Data Transform Precision Agriculture',
        date: '2mo ago',
        source: 'Tech in Agriculture',
        image: 'https://kvklunglei.mizoram.gov.in/uploads/attachments/486d60b7bb5e7c753209ee85afdece66/farmers-field-day-1.jpg',
        description: 'Artificial intelligence and big data are reshaping agriculture, helping farmers make data-driven decisions. Precision agriculture uses these technologies to analyze soil health, monitor crop growth, and predict weather patterns. This approach leads to optimal resource allocation, maximizing yield while minimizing environmental impact. Despite the high upfront costs, AI and big data offer promising solutions for efficient farming, especially in larger operations that can benefit from scale.',
    },
    {
        id: '8',
        title: 'Pest Management Crisis: New Challenges for Farmers',
        date: '3mo ago',
        source: 'Agro Insights',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSbqDyRd7_9e9fZPApSmPzBNHA1Kd2f-LizDHANrzWQg4fzeVnu6v9vzSa_VZ8zbg6FBw&usqp=CAU',
        description: 'Farmers worldwide are facing new challenges in pest management as pests develop resistance to commonly used pesticides. Crop losses due to pests and diseases are on the rise, causing significant economic damage. Integrated pest management (IPM) techniques, including biological control and crop rotation, are being promoted as sustainable alternatives. However, farmers need more training and support to implement these methods effectively, highlighting the need for government and industry cooperation.',
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
    {
        id: '3',
        title: 'Agricultural Equipment Subsidy Scheme',
        date: '2w ago',
        source: 'Mizoram Agriculture Department',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOT61c7uwzrKXN1IDnCeqJsGAZNYWtBtUm7vPCOlWwoqfWWTAJaaErWwRfL3TeOfyZJQo&usqp=CAU',
        description: 'This scheme aims to reduce the burden on farmers by providing subsidies on agricultural equipment like tractors, water pumps, and sprayers. Small and marginal farmers in Mizoram can benefit from discounts of up to 50% on these essential tools, enabling them to improve their efficiency and productivity in the fields.',
    },
    {
        id: '4',
        title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
        date: '1mo ago',
        source: 'Govt of India',
        image: 'https://northeastlive.s3.amazonaws.com/media/uploads/2024/11/new.png',
        description: 'The PMFBY scheme provides crop insurance to protect farmers against losses due to natural disasters, pests, and diseases. Farmers in Mizoram can enroll in this scheme to receive compensation for damages to their crops. This helps mitigate financial risks and encourages investment in quality inputs and techniques for improved yield.',
    },
    {
        id: '5',
        title: 'Livestock Development Program',
        date: '3w ago',
        source: 'Mizoram Animal Husbandry Department',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0-8YSVvfIGwuAYIk5D7GR5tKtC5OZvguEXw&s',
        description: 'Aimed at supplementing farmers’ income, this program provides support for livestock rearing, including poultry, piggery, and cattle. The government offers subsidies on feed, vaccinations, and training to enhance livestock management. This program helps Mizoram’s farmers diversify their sources of income, ensuring better financial stability.',
    },
    {
        id: '6',
        title: 'Horticulture Development Scheme',
        date: '2mo ago',
        source: 'Ministry of Horticulture, Mizoram',
        image: 'https://morungexpress.com/uploads/2024/09/25216753_1726753517_202409193226421.jpg',
        description: 'Focused on promoting horticultural crops like oranges, bananas, and spices, this scheme provides financial and technical assistance to farmers. The government offers subsidies on planting material, drip irrigation, and crop protection to encourage sustainable horticulture in Mizoram, given its favorable climate and soil conditions for such crops.',
    },
    {
        id: '7',
        title: 'Soil Health Card Scheme',
        date: '5mo ago',
        source: 'Govt of India',
        image: 'https://cf-img-a-in.tosshub.com/lingo/itne/images/story/202409/66ec46c5a724e-mizoram-cm-lalduhoma-launches-bana-kaih-financial-scheme-to-assist-small-entrepreneurs--farmers-194404723-16x9.jpg',
        description: 'This scheme provides soil health cards to farmers, helping them understand the nutrient status of their soil and the necessary measures to improve its fertility. By promoting balanced use of fertilizers based on soil test results, this initiative aims to increase crop productivity sustainably in Mizoram’s diverse agricultural landscapes.',
    },
    {
        id: '8',
        title: 'Rainwater Harvesting Subsidy Program',
        date: '1y ago',
        source: 'Mizoram Rural Development Agency',
        image: 'https://northeastlive.s3.amazonaws.com/media/uploads/2024/11/new.png',
        description: 'To combat water scarcity during dry seasons, this program offers subsidies to farmers who set up rainwater harvesting systems. The stored water can be used for irrigation during the off-season, enabling continuous agricultural production. This initiative is crucial in Mizoram, where irregular rainfall affects crop yields.',
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
                <Text style={styles.articleDate}>{item.date} • {item.source}</Text>
                <Text style={styles.articleDescription}>{item.description.substring(0, 70)}...</Text>
            </View>
        </TouchableOpacity>
    );

    return <FlatList data={data} keyExtractor={(item) => item.id} renderItem={renderItem} />;
};

const NewsRoute = () => <ArticleList data={articles} section="News" />;
const SchemesRoute = () => <ArticleList data={schemes} section="Schemes" />;

const renderScene = SceneMap({
    news: NewsRoute,
    schemes: SchemesRoute,
});

export default function NewsAndSchemesTabView({ navigation }) {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'news', title: 'News' },
        { key: 'schemes', title: 'Schemes' },
    ]);

    return (
        <>
            <NewsTopBar navigation={navigation} />

            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={(props) => (
                    <TabBar
                        {...props}
                        indicatorStyle={styles.tabIndicator}
                        style={styles.tabBar}
                        labelStyle={styles.tabLabel}
                    />

                )}
            />
        </>
    );
}

const styles = StyleSheet.create({
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
        color: '#2f4f2f', // Dark green for title
        marginBottom: 5,
    },
    articleDate: {
        color: '#6e8b3d', // Lighter green for date/source
        fontSize: 12,
        marginBottom: 5,
    },
    articleDescription: {
        color: '#555',
        fontSize: 13,
    },
    tabBar: {
        backgroundColor: '#d4edda', // Light green background for tabs
    },
    tabIndicator: {
        backgroundColor: '#388e3c', // Dark green for active tab indicator
    },
    tabLabel: {
        fontWeight: 'bold',
        color: '#2f4f2f',
    },
});
