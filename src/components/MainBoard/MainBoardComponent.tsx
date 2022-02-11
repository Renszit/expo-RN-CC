import React, { useEffect, useState } from "react";
import { View, Text, Animated } from "react-native";

import candyColors from "../../constants/colors";
import metrics from "../../constants/metrics";
import { Draggable } from "../Draggable/Draggable";

const MainBoardComponent = () => {
  const [currentColorArray, setCurrentColorArray] = useState([]);
  const width = 8;

  const checkForColumnOfThree = () => {
    for (let i = 0; i < 47; i++) {
      const columnOfThree = [i, i + width, i + width * 2];
      const decidedColor = currentColorArray[i];

      if (
        columnOfThree.every(
          (number) => currentColorArray[number] === decidedColor
        )
      ) {
        columnOfThree.forEach((square) => (currentColorArray[square] = ""));
      }
    }
  };

  const checkForColumnOfFour = () => {
    for (let i = 0; i < 47 - 1; i++) {
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = currentColorArray[i];

      if (
        columnOfFour.every(
          (number) => currentColorArray[number] === decidedColor
        )
      ) {
        columnOfFour.forEach((square) => (currentColorArray[square] = ""));
      }
    }
  };

  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfThree = [i, i + 1, i + 2];
      const decidedColor = currentColorArray[i];
      const notValid = [
        6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
      ];

      if (notValid.includes(i)) continue;

      if (
        rowOfThree.every((number) => currentColorArray[number] === decidedColor)
      ) {
        rowOfThree.forEach((square) => (currentColorArray[square] = ""));
      }
    }
  };

  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {
      const rowOfFour = [i, i + 1, i + 2, i + 3];
      const decidedColor = currentColorArray[i];
      const notValid = [
        5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
        54, 55, 60, 63, 64,
      ];

      if (notValid.includes(i)) continue;

      if (
        rowOfFour.every((number) => currentColorArray[number] === decidedColor)
      ) {
        rowOfFour.forEach((square) => (currentColorArray[square] = ""));
      }
    }
  };

  const moveDown = () => {
    const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];

    for (let i = 0; i < 64 - width; i++) {
      const isFirstRow = firstRow.includes(i);

      if (isFirstRow && currentColorArray[i] === "") {
        let randomNumber = Math.floor(Math.random() * candyColors.length);
        currentColorArray[i] = candyColors[randomNumber];
      }

      if (currentColorArray[i + width] === "") {
        currentColorArray[i + width] = currentColorArray[i];
        currentColorArray[i] = "";
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
    const timer = setInterval(() => {
      checkForColumnOfFour();
      checkForColumnOfThree();
      checkForRowOfFour();
      checkForRowOfThree();
      moveDown();
      setCurrentColorArray([...currentColorArray]);
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, [
    checkForRowOfThree,
    checkForRowOfFour,
    checkForColumnOfFour,
    checkForColumnOfThree,
    currentColorArray,
    moveDown,
  ]);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: metrics.screenWidth,
          height: metrics.screenHeight,
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          flexDirection: "row",
        }}
      >
        {currentColorArray.map((color, index) => (
          <Draggable key={index + color + Math.random()} color={color} />
        ))}
      </View>
    </View>
  );
};

export default MainBoardComponent;
