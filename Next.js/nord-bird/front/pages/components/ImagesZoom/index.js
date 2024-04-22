import PropTypes from "prop-types";
import { useState } from "react";
import Slick from "react-slick";
import {
  Overlay,
  Header,
  CloseBtn,
  SlickWrapper,
  ImgWrapper,
  Indicator,
  Global,
  SlickPrevBtn,
} from "./styles";

const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const PrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <RightCircleOutlined
        className={className} // 슬릭에서 사용하는 클래스 적용
        onClick={onClick} // 클릭 이벤트 핸들러
      />
    );
  };
  return (
    <Overlay>
      <Global />
      <Header>
        <h1>상세 이미지</h1>
        <CloseBtn onClick={onClose} />
      </Header>
      <SlickWrapper>
        <div>
          <Slick
            initialSlide={0}
            beforeChange={(slide) => setCurrentSlide(slide)}
            infinite
            arrows={false}
            slidesToShow={1}
            slidesToScroll={1}
            prevArrow={<SlickPrevBtn />}
          >
            {images.map((v) => (
              <ImgWrapper key={v.src}>
                <img
                  src={`http://localhost:3065/${v.src}`}
                  alt={`http://localhost:3065/${v.src}`}
                />
              </ImgWrapper>
            ))}
          </Slick>
          <Indicator>
            <div>
              {currentSlide + 1} / {images.length}
            </div>
          </Indicator>
        </div>
      </SlickWrapper>
    </Overlay>
  );
};

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;
