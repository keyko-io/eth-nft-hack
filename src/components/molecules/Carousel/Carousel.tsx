import Slider from "@farbenmeer/react-spring-slider";
import Slide from "./Slide";
import { useSlider } from "../../../context/SliderProvider";
import { DDO } from "@nevermined-io/nevermined-sdk-js";

interface IProps {
  ddos: DDO[];
}

const Carousel = ({ ddos }: IProps) => {
  const slides = ddos.map((ddo) => <Slide ddo={ddo} />);
  const { currentIndex } = useSlider();

  return (
    <>
      <Slider activeIndex={currentIndex}>{slides}</Slider>
    </>
  );
};

export default Carousel;
