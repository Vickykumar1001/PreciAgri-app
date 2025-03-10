import React from "react";
import {
    StyleSheet,
    View,
    Dimensions,
    Image,
    Text,
    Button,
} from "react-native";

// import { connect } from "react-redux";
// import * as actions from "../../Redux/Actions/cartActions";
import Toast from "react-native-toast-message";
import EasyButton from "../Shared/StyleComponents/EasyButton";

// import { hostIP } from "../../assets/common/baseUrl";

var { width } = Dimensions.get("window");
const ProductCard = () => {
    const props = {
        name: 'Tomato',
        price: 100,
        image: "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
        countInStock: 10,
    }
    const { name, price, image, countInStock } = props;
    //   console.log("image", `${hostIP}${image}`);
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                resizeMode="contain"
                source={{
                    uri: image
                        ? "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png"
                        : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
                }}
            />
            <View style={styles.card}></View>
            <Text style={styles.title}>
                {name.length > 15 ? name.substring(0, 15 - 3) + "..." : name}
            </Text>
            <Text style={styles.price}>₹{price}</Text>
            {countInStock > 0 ? (
                <View style={{ marginBottom: 60 }}>
                    <EasyButton
                        primary
                        medium
                        onPress={() => {
                            props.addItemToCart(props);
                            Toast.show({
                                topOffset: 60,
                                type: "success",
                                text1: `${name} added to card`,
                                text2: "GO to your card to compleat order",
                            });
                        }}
                    >
                        <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Add</Text>
                    </EasyButton>
                </View>
            ) : (
                <Text style={{ marginTop: 20 }}>Currently Unavailable</Text>
            )}
        </View>
    );
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addItemToCart: (product) =>
//       dispatch(actions.addToCart({ quantity: 1, product })),
//   };
// };

const styles = StyleSheet.create({
    container: {
        width: width / 2 - 20,
        height: width / 1.7,
        padding: 10,
        borderRadius: 10,
        marginTop: 55,
        marginBottom: 5,
        marginLeft: 10,
        alignItems: "center",
        elevation: 8,
        backgroundColor: "white",
    },
    image: {
        width: width / 2 - 20 - 10,
        height: width / 2 - 20 - 30,
        backgroundColor: "transparent",
        position: "absolute",
        top: -45,
    },
    card: {
        marginBottom: 10,
        height: width / 2 - 20 - 90,
        backgroundColor: "transparent",
        width: width / 2 - 20 - 10,
    },
    title: {
        fontWeight: "bold",
        fontSize: 14,
        textAlign: "center",
    },
    price: {
        fontSize: 20,
        color: "orange",
        marginTop: 10,
    },
});

// export default connect(null, mapDispatchToProps)(ProductCard);
export default ProductCard;
