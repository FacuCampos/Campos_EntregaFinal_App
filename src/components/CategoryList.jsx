import { FlatList, StyleSheet, useWindowDimensions, View } from "react-native";
import React, { useEffect, useState } from "react";
import Card from "./Card";

import { useGetCategoriesQuery } from "../services/shopServices";
import Loading from "./Loading";

const CategoryList = ({ navigation }) => {
  const { data } = useGetCategoriesQuery();

  const { width, height } = useWindowDimensions();
  const [orientacion, setOrientacion] = useState("portrait");

  useEffect(() => {
    if (width > height) {
      setOrientacion("landscape");
    } else {
      setOrientacion("portrait");
    }
  }, [width, height]);

  const numColumns = orientacion === "portrait" ? 2 : 4;

  const formatData = (catData, numColumns) => {
    const newData = [...catData];

    const numberOfFullRows = Math.floor(newData.length / numColumns);

    let numberOfElementsLastRow =
      newData.length - numberOfFullRows * numColumns;

    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      newData.push({ nombre: "vacio" });
      numberOfElementsLastRow = numberOfElementsLastRow + 1;
    }
    return newData;
  };

  if (!data) {
    return <Loading />;
  }

  return (
    <FlatList
      key={`key-${orientacion}`}
      data={formatData(data, numColumns)}
      numColumns={numColumns}
      columnWrapperStyle={{ gap: 10, paddingHorizontal: 12 }}
      contentContainerStyle={{ gap: 10, paddingBottom: 20, paddingTop: 10 }}
      keyExtractor={(categoria, idx) => categoria.nombre + idx}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        if (item.nombre === "vacio") {
          return <View style={styles.itemInvisible} />;
        } else {
          return <Card categoriaElegida={item} navigation={navigation} />;
        }
      }}
    />
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  itemInvisible: {
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    height: 200,
    borderRadius: 20,
  },
});
