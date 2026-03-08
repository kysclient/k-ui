"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
} from "./carousel";

const slides = [
  { bg: "bg-[#004098]", label: "Slide 1", description: "First slide content" },
  { bg: "bg-[#1A5BC8]", label: "Slide 2", description: "Second slide content" },
  { bg: "bg-[#306DE0]", label: "Slide 3", description: "Third slide content" },
  { bg: "bg-[#6B9BF2]", label: "Slide 4", description: "Fourth slide content" },
];

export function CarouselBasicDemo() {
  return (
    <div className="w-full max-w-lg mx-auto">
      <Carousel loop>
        <CarouselContent>
          {slides.map((slide, i) => (
            <CarouselItem key={i}>
              <div
                className={`${slide.bg} flex flex-col items-center justify-center h-48 rounded-md text-white`}
              >
                <span className="text-xl font-semibold">{slide.label}</span>
                <span className="text-sm mt-1 opacity-80">{slide.description}</span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <CarouselDots />
      </Carousel>
    </div>
  );
}

export function CarouselAutoPlayDemo() {
  return (
    <div className="w-full max-w-lg mx-auto">
      <Carousel autoPlay interval={3000} loop>
        <CarouselContent>
          {slides.map((slide, i) => (
            <CarouselItem key={i}>
              <div
                className={`${slide.bg} flex flex-col items-center justify-center h-48 rounded-md text-white`}
              >
                <span className="text-xl font-semibold">{slide.label}</span>
                <span className="text-sm mt-1 opacity-80">{slide.description}</span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        <CarouselDots />
      </Carousel>
    </div>
  );
}
