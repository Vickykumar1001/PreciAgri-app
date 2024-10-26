import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const TopBar = ({ navigation }) => {
    return (
        <View style={styles.topBar}>
            {/* Drawer Button */}
            <TouchableOpacity style={{ paddingHorizontal: 5 }} onPress={() => navigation.openDrawer()}>
                <Ionicons name="menu" size={28} color="#333" />
            </TouchableOpacity>

            {/* App Title: PreciAgri with two colors */}
            <Text style={styles.appTitle}>
                <Text style={{ color: '#4A90E2' }}>Preci</Text>
                <Text style={{ color: '#4CAF50' }}>Agri</Text>
            </Text>

            {/* Action Icons */}
            <View style={styles.icons}>
                <TouchableOpacity style={{ paddingHorizontal: 5 }} onPress={() => navigation.navigate('search')}>
                    <Ionicons name="search" size={28} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingHorizontal: 5 }} onPress={() => navigation.navigate('notification')}>
                    <Ionicons name="notifications" size={28} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingHorizontal: 5 }} onPress={() => navigation.navigate('wishlist')}>
                    <Ionicons name="heart" size={28} color="#333" />
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingHorizontal: 5 }} onPress={() => navigation.navigate('Cart')}>
                    <Ionicons name="cart" size={28} color="#333" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TopBar;
const styles = {
    topBar: {
        width: '100%',           // Full width
        flexDirection: 'row',     // Arrange items horizontally
        alignItems: 'center',     // Align items vertically
        justifyContent: 'space-between', // Space between drawer, title, and icons
        marginBottom: 10,
        padding: 10,    // Optional: Horizontal padding for layout
        backgroundColor: '#FFFFFF', // Set background color to white
        elevation: 4,             // Optional: Add shadow (Android)
        shadowColor: '#000',      // Optional: Shadow (iOS)
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    appTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        flexDirection: 'row',    // Ensure both parts of text align in one line
        marginLeft: -40,
    },
    icons: {
        flexDirection: 'row',    // Arrange icons in a row
        alignItems: 'center',    // Vertical alignment
    },
};
