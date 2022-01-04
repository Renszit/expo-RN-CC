import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

import candyColors from "../../constants/colors";
import metrics from "../../constants/metrics";

const MainBoardComponent = () => {
  const [currentColorArray, setCurrentColorArray] = useState([]);
  const width = 6;

  const createBoard = () => {
    const randomColorArray = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor =
        candyColors[Math.floor(Math.random() * candyColors.length)];
      randomColorArray.push(randomColor);
    }
    setCurrentColorArray(randomColorArray);
  };

  useEffect(() => {
    createBoard();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <View
        style={{
          width: metrics.screenWidth,
          height: metrics.screenHeight,
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {currentColorArray.map((color, index) => (
          <View
            key={index}
            style={{
              backgroundColor: color,
              width: metrics.screenWidth / 6,
              height: metrics.screenHeight / 6,
            }}
          ></View>
        ))}
      </View>
    </View>
  );
};

export default MainBoardComponent;
