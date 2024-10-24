import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Dimensions, View, ScrollView } from "react-native";
import Swiper from "react-native-swiper/src";

var { width } = Dimensions.get("window");

const Banner = () => {
  const [bannerData, setBannerData] = useState([]);

  useEffect(() => {
    setBannerData([
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo5kieHiWmEbXLD2EjuY_l8R7010o47-3JCAZ4Hc_-sW2P5sbh9IT1sS2T82xMHAPgusI&usqp=CAU",
      "https://www.yardproduct.com/blog/wp-content/uploads/2016/01/gardening-banner.jpg",
      "https://t3.ftcdn.net/jpg/06/58/31/10/360_F_658311073_jv0oobaa7DOjWlya5LeEx2Wq64iRLyhB.jpg",
    ]);
    return () => {
      setBannerData([]);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Swiper
        style={styles.swiper}
        showButtons={false}
        autoplay={true}
        autoplayTimeout={2}
      >
        {bannerData.map((item) => (
          <Image
            key={item}
            style={styles.imageBanner}
            resizeMode="cover"
            source={{ uri: item }}
          />
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  swiper: {
    height: width / 2,
  },
  imageBanner: {
    height: width / 2,
    width: width, // Full width of the screen
    borderRadius: 10,
  },
});

export default Banner;
