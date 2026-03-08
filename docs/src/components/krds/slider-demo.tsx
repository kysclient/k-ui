"use client";

import * as React from "react";
import { Slider } from "./slider";

export function SliderDemo() {
  return (
    <div className="w-full max-w-md">
      <Slider defaultValue={50} />
    </div>
  );
}

export function SliderRangeDemo() {
  const [value, setValue] = React.useState(30);

  return (
    <div className="w-full max-w-md">
      <Slider
        value={value}
        onValueChange={setValue}
        min={0}
        max={100}
        step={1}
        label="볼륨"
        showValue
      />
    </div>
  );
}

export function SliderDisabledDemo() {
  return (
    <div className="w-full max-w-md">
      <Slider defaultValue={40} label="비활성 슬라이더" showValue disabled />
    </div>
  );
}
