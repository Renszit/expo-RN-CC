import React, { useRef } from "react";
import { View, Text } from "react-native";
import metrics from "../../constants/metrics";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  useAnimatedGestureHandler,
} from "react-native-reanimated";

import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
export type DraggableProps = {
  color: string;
};

type ContextInterface = {
  translateX: number;
  translateY: number;
};

export const Draggable = ({ color }: DraggableProps) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextInterface
  >({
    onStart: (evt, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (evt, context) => {
      translateX.value = evt.translationX + context.translateX;
      translateY.value = evt.translationY + context.translateY;
    },
    onEnd: (evt) => {},
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
              borderRadius: 50,
            },
          ]}
        />
      </PanGestureHandler>
    </View>
  );
};
