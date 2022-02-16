import React, { useRef } from "react";
import { View, Text } from "react-native";
import metrics from "../../constants/metrics";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

export type DraggableProps = {
  color: string;
  dataId: number;
};

export type ContextInterface = {
  translateX: number;
  translateY: number;
};

export const Draggable = ({ color, dataId }: DraggableProps) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  
  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextInterface
  >({
    onStart: (evt, context) => {
      console.log(dataId);
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (evt, context) => {
      translateX.value = evt.translationX + context.translateX;
      translateY.value = evt.translationY + context.translateY;
    },
    onEnd: () => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <View>
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View
          style={[
            animatedStyle,
            {
              backgroundColor: color,
              width: metrics.screenWidth / 8,
              height: metrics.screenHeight / 8,
              borderRadius: 1,
            },
          ]}
        />
      </PanGestureHandler>
    </View>
  );
};
