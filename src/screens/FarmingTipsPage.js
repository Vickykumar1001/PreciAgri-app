import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import CustomTopBar from '../components/CustomTopBar';
const FarmingTipsPage = ({ navigation }) => {
    const [tips] = useState([
        {
            id: '1',
            title: 'Soil Preparation Tips',
            summary: 'Learn how to prepare your soil for better yield.',
            content:
                'Proper soil preparation is crucial for successful farming. Start by testing your soil pH levels and nutrient content. Add organic compost to improve fertility and use crop rotation techniques to maintain soil health. Avoid over-tilling to prevent erosion.',
        },
        {
            id: '2',
            title: 'Efficient Irrigation Methods',
            summary: 'Optimize water usage for better crop growth.',
            content:
                'Drip irrigation is a water-efficient method that delivers water directly to the roots of plants. Mulching around plants can help retain soil moisture. Monitor weather forecasts to avoid overwatering and install rainwater harvesting systems for sustainable irrigation.',
        },
        {
            id: '3',
            title: 'Pest Control Strategies',
            summary: 'Protect your crops from pests naturally.',
            content:
                'Integrated Pest Management (IPM) is an effective way to control pests. Use natural predators like ladybugs to control aphids. Avoid overusing chemical pesticides as they can harm beneficial insects and lead to resistance in pests.',
        },
        {
            id: '4',
            title: 'Choosing the Right Seeds',
            summary: 'Select the best seeds for your farming needs.',
            content:
                'Selecting high-quality seeds suited for your region’s climate is essential. Use certified seeds to ensure disease resistance and higher yields. Diversify your crops to minimize risks associated with market fluctuations.',
        },
    ]);

    const [selectedTip, setSelectedTip] = useState(null);

    const renderTip = ({ item }) => (
        <TouchableOpacity
            style={styles.tipCard}
            onPress={() => setSelectedTip(item)}
        >
            <Text style={styles.tipTitle}>{item.title}</Text>
            <Text style={styles.tipSummary}>{item.summary}</Text>
        </TouchableOpacity>
    );

    return (
        <><CustomTopBar navigation={navigation} title={"Farming Tips"} />
            <View style={styles.container}>
                {selectedTip ? (
                    <View style={styles.detailContainer}>
                        <Text style={styles.detailTitle}>{selectedTip.title}</Text>
                        <Text style={styles.detailContent}>{selectedTip.content}</Text>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => setSelectedTip(null)}
                        >
                            <Text style={styles.backButtonText}>Back to Tips</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <FlatList
                        data={tips}
                        renderItem={renderTip}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.tipList}
                    />
                )}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f9f9f9', padding: 10 },
    tipList: { paddingBottom: 20 },
    tipCard: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        elevation: 2,
    },
    tipTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    tipSummary: { fontSize: 14, color: '#666', marginTop: 5 },
    detailContainer: { padding: 15, backgroundColor: '#fff', borderRadius: 10, elevation: 2 },
    detailTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 10 },
    detailContent: { fontSize: 16, color: '#555', lineHeight: 22 },
    backButton: {
        marginTop: 20,
        paddingVertical: 10,
        backgroundColor: 'green',
        borderRadius: 8,
        alignItems: 'center',
    },
    backButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default FarmingTipsPage;
