import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import "./Carousel.scss";

interface CarouselProps {
  children: React.ReactNode;
  selectedIndex?: number;
}

export const Carousel = ({ children, selectedIndex = 0 }: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [selectedSnap, setSelectedSnap] = useState(0);

  const scrollTo = (index: number) => {
    emblaApi?.scrollTo(index);
  };

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.scrollTo(selectedIndex);
  }, [emblaApi, selectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;

    const updateDots = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      setSelectedSnap(emblaApi.selectedScrollSnap());
    };

    updateDots();
    emblaApi.on("select", updateDots);
    emblaApi.on("reInit", updateDots);

    return () => {
      emblaApi.off("select", updateDots);
      emblaApi.off("reInit", updateDots);
    };
  }, [emblaApi]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {React.Children.map(children, (child, index) => (
            <div className="embla__slide" key={index}>
              {child}
            </div>
          ))}
        </div>
      </div>

      <div className="embla__dots">
        {scrollSnaps.map((_, index) => (
          <button
            type="button"
            key={index}
            className={`embla__dot ${
              index === selectedSnap ? "embla__dot--selected" : ""
            }`}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
