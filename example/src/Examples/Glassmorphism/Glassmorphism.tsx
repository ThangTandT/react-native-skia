import {
  add,
  Canvas,
  Circle,
  LinearGradient,
  vec,
  sub,
  Fill,
  useLoop,
  mix,
  BackdropFilter,
  Blur,
  useDerivedValue,
  Image,
  useImage,
  useTouchHandler,
  useValue,
  BlurMask,
  BackdropBlur,
  Box,
} from "@shopify/react-native-skia";
import React, { useRef, useState } from "react";
import { Dimensions } from "react-native";
import { debounce } from "lodash";

const { width, height } = Dimensions.get("window");
const c = vec(width / 2, height / 2);
const r = c.x - 32;

export const Glassmorphism = () => {
  const image = useImage(require("../../assets/oslo.jpg"));
  const [rect, updateRect] = useState({ x: 0, y: 0, width: 50, height: 50 });
  const [arr, updateArr] = useState([{ x: 0, y: 0, width: 50, height: 50 }]);
  const dataDraws = useRef([]);
  const offsetX = useValue(0);
  const offsetY = useValue(0);
  
  const onTouch = useTouchHandler({
    onStart: (pos) => {
      offsetX.current = pos.x;
      offsetY.current = pos.y;
    },
    onActive: debounce((pos) => {
      // console.log({ pos });
      // const newRect = { ...rect, x: pos.x, y: pos.y, r: 150 / 2 };
      // dataDraws.current.push(newRect);
      // updateArr(dataDraws.current);
      // console.log(dataDraws.current.length);
      // if (arr[arr.length - 1].x !== pos.x || arr[arr.length - 1].y !== pos.y) {
      //   // arr.concat(newRect);
      //   dataDraws.current.push(newRect);
      //   updateArr(dataDraws.current);
      //   console.log(dataDraws.current.length);
      // }
      // debounce(() => {
      //   // const newRect = { ...rect, x: pos.x, y: pos.y };
      //   // dataDraws.current.push(newRect);
      //   // updateArr(dataDraws.current);
      //   console.log(dataDraws.current.length);
      // }, 300);
      // const newArr = [...arr];
      // newArr.push(newRect);
      // console.log(dataDraws.current[0].x);
      // updateRect(newRect);
    }, 300),
    onEnd: (pos) => {
      const newRect = { ...rect, x: pos.x, y: pos.y, r: 150 / 2 };
      // updateRect(newRect);
      dataDraws.current.push(newRect);
      updateArr(dataDraws.current);
      console.log(dataDraws.current.length);
    },
  });
  // const progress = useLoop({ duration: 2000 });
  // const start = useDerivedValue(
  //   () => sub(c, vec(0, mix(progress.current, r, r / 2))),
  //   [progress]
  // );
  // const end = useDerivedValue(
  //   () => add(c, vec(0, mix(progress.current, r, r / 2))),
  //   []
  // );
  // const radius = useDerivedValue(
  //   () => mix(progress.current, r, r / 2),
  //   [progress]
  // );
  if (!image) {
    return null;
  }
  console.log("heloo");
  const vertices = [vec(64, 0), vec(128, 256), vec(0, 256)];
  return (
    <Canvas style={{ flex: 1 }} onTouch={onTouch}>
      <Image
        image={image}
        x={0}
        y={0}
        width={width}
        height={height}
        fit="cover"
      />

      {arr.map((item) => {
        console.log(item);

        return (
          <BackdropBlur blur={4} clip={item}>
            {/* <Fill color="rgba(0, 0, 0, 0.3)" /> */}
          </BackdropBlur>
        );
      })}
    </Canvas>
  );
};
