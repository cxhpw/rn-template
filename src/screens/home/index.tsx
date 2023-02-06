import { Container } from '@/components';
import React, { useEffect, useRef } from 'react';
import { Dimensions, Text } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  getRelativeCoords,
  useAnimatedRef,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import * as echarts from 'echarts/core';
// @ts-ignore
import { SVGRenderer, SkiaChart } from 'wrn-echarts';
import { BarChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
} from 'echarts/components';
import { EChartsOption, EChartsType } from 'echarts';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  SVGRenderer,
  BarChart,
]);

const E_HEIGHT = 250;
const E_WIDTH = 300;
// @ts-ignore
function SkiaComponent({ option }) {
  const skiaRef = useRef<any>(null);
  useEffect(() => {
    let chart: EChartsType;
    if (skiaRef.current) {
      // @ts-ignore
      chart = echarts.init(skiaRef.current, 'light', {
        renderer: 'svg',
        width: SCREEN_WIDTH,
        height: E_HEIGHT,
      });
      chart.setOption(option);
    }
    return () => chart.dispose();
  }, [option]);
  return <SkiaChart ref={skiaRef} />;
}

const { width: SCREEN_WIDTH, height } = Dimensions.get('window');
const THREHOLD = SCREEN_WIDTH / 3;
type Props = {};
const Index: React.FC<Props> = () => {
  const option: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 130, 1000],
        type: 'bar',
      },
    ],
    textStyle: {
      fontWeight: 'bold',
      color: 'blue',
    },
  };
  const aref = useAnimatedRef();
  const translateX = useSharedValue(0);
  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number }
  >({
    onStart(event, context) {
      context.x = translateX.value;
    },
    onActive(event, context) {
      translateX.value = event.translationX + context.x;
    },
    onEnd(event) {
      getRelativeCoords(aref, event.absoluteX, event.absoluteY);
      if (translateX.value <= THREHOLD) {
        translateX.value = withTiming(0);
      } else {
        translateX.value = withTiming(SCREEN_WIDTH / 2);
      }
    },
  });
  const rStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [0, SCREEN_WIDTH / 3],
      [0, 3],
      Extrapolate.CLAMP,
    );
    return {
      transform: [
        { translateX: translateX.value },
        { perspective: 100 },
        { rotateY: `-${rotate}deg` },
      ],
    };
  });

  return (
    <Container backgroundColor="#1e1e23">
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View
          style={[{ flex: 1, backgroundColor: '#ffffff' }, rStyle]}>
          <SkiaComponent option={option} />
          <Text>
            {SCREEN_WIDTH} * {height}
          </Text>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
};

export default Index;
