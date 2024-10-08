import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { googleMapsApiKey } from "../database/googleMaps";

const anchoPantalla = Dimensions.get('screen').width


const MapPreview = ({location}) => {
  const mapPreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=15&size=400x400&maptype=roadmap&markers=color:red%7Clabel:Yo%7C${location.latitude},${location.longitude}&key=${googleMapsApiKey}`;

  return (
    <View style={styles.mapPreview}>
      <Image style={styles.mapImage} source={{ uri: mapPreviewUrl }} />
    </View>
  );
};

export default MapPreview;

const styles = StyleSheet.create({
    mapPreview: {
        justifyContent: "center",
        alignItems: "center",
    },
    mapImage: {
        width: anchoPantalla,
        height: 300,
    },
});
