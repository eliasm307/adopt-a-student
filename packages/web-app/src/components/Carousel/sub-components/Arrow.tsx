import clsx from 'clsx';
import React from 'react';

interface Props {
  hasArrow: boolean;
  isPrev: boolean;
  label: string;
  onClickHandler: () => void;
}

// ? use react memo

const CarouselArrow = ({ onClickHandler, hasArrow, label, isPrev }: Props) => {
  return (
    <>
      {hasArrow && (
        <div
          className={clsx("carousel-nav-button", isPrev ? "prev" : "next")}
          role='button'
          tabIndex={0}
          onClick={onClickHandler}
          title={label}
          onKeyUp={() => console.warn(__filename, `keyup handler tbc`)}
        >
          ARROW
        </div>
      )}
    </>
  );
};

export default React.memo(CarouselArrow);
