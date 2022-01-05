import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

import candyColors from "../../constants/colors";
import metrics from "../../constants/metrics";

const MainBoardComponent = () => {
  const [currentColorArray, setCurrentColorArray] = useState([]);
  const width = 8;

  const checkForColumnOfThree = () => {
    for (let i = 0; i < 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      if (
        columnOfThree.every(
          (index) => currentColorArray[index] === currentColorArray[i]
        )
      ) {
        columnOfThree.forEach((index) => {
          currentColorArray[index] = "";
        });
        // console.log("columnOfThree", currentColorArray[i]);
        return true;
      } else {
        console.log("columnOfThree", columnOfThree);
        return false;
      }
    }
  };

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

  useEffect(() => {
    checkForColumnOfThree();
  }, [currentColorArray]);

  return (
    <View style={{ flex: 1 }}>
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
              width: metrics.screenWidth / 8,
              height: metrics.screenHeight / 8,
            }}
          ></View>
        ))}
      </View>
    </View>
  );
};

export default MainBoardComponent;
