/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { jsx } from '@emotion/react';
import { AnimatePresence, motion } from 'framer-motion';
import { range } from 'ramda';
import tw from 'twin.macro';

import Arrow from 'components/Arrow';
import Icon from 'components/Icon';

type Props = {
  setRef: any;
  children: React.ReactNode;
  currentIndex: number | null;
  total: number;
  transition?: boolean;
  rich?: boolean;
  onContainerClick: () => void;
};

const PhotoSwipeWrapper = ({
  setRef,
  children,
  currentIndex,
  total,
  transition,
  rich,
  onContainerClick,
}: Props): JSX.Element => (
  <div
    ref={setRef}
    className={`pswp ${rich ? 'pswp__rich' : ''}`}
    id="pswp"
    tabIndex={-1}
    role="dialog"
    aria-hidden="true"
  >
    {/* Background of PhotoSwipe.
        It's a separate element as animating opacity is faster than rgba( */}
    <div className="pswp__bg" />
    {rich && <div className="pswp__infobox">{children}</div>}
    {/* Slides wrapper with overflow:hidden. */}
    <div className="pswp__scroll-wrap">
      {/* Container that holds slides.
            PhotoSwipe keeps only 3 of them in the DOM to save memory.
            Don't modify these 3 pswp__item elements, data is added later on. */}
      <div
        className="pswp__container"
        css={
          transition &&
          tw`md:transition-transform md:duration-500 md:ease-in-out`
        }
        onClick={onContainerClick}
      >
        <div className="pswp__item" />
        <div className="pswp__item" />
        <div className="pswp__item" />
      </div>
      {/* Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. */}
      <div className="pswp__ui pswp__ui--hidden">
        <div className="pswp__top-bar">
          {/* Controls are self-explanatory. Order can be changed. */}
          <div className="pswp__counter" />
          <div className="pswp__count">
            <span tw="relative inline-block">
              <span aria-hidden tw="opacity-0">
                {total}
              </span>
              <AnimatePresence>
                {range(0, total).map(
                  i =>
                    i === currentIndex && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        key={`count-${i}`}
                        tw="absolute top-0 right-0"
                      >
                        {currentIndex ? currentIndex + 1 : 1}
                      </motion.span>
                    )
                )}
              </AnimatePresence>
            </span>
            <span tw="inline-block text-gray-500 transform translate-y-2">
              /{total}
            </span>
          </div>
          <button
            type="button"
            className="pswp__button pswp__button--close"
            title="Close (Esc)"
          >
            <Icon name="pswpclose" tw="text-lg pointer-events-none" />
          </button>
          <button
            type="button"
            className="pswp__button pswp__button--zoom"
            title="Zoom in/out"
          >
            <Icon name="pswpzoom" tw="text-lg pointer-events-none" />
          </button>
          <button
            type="button"
            className="pswp__button pswp__button--fs"
            title="Toggle fullscreen"
          >
            <Icon name="pswpfullscreen" tw="text-lg pointer-events-none" />
          </button>
          {/* Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR */}
          {/* element will get class pswp__preloader--active when preloader is running */}
          <div className="pswp__preloader">
            <div className="pswp__preloader__icn">
              <div className="pswp__preloader__cut">
                <div className="pswp__preloader__donut" />
              </div>
            </div>
          </div>
        </div>
        <div className="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
          <div className="pswp__share-tooltip" />
        </div>
        <button
          type="button"
          className="pswp__button pswp__button--arrow--left"
          title="Previous (arrow left)"
        >
          <Arrow direction="left" />
        </button>
        <button
          type="button"
          className="pswp__button pswp__button--arrow--right"
          title="Next (arrow right)"
        >
          <Arrow direction="right" />
        </button>
        <div className="pswp__caption">
          <div className="pswp__caption__center" />
        </div>
      </div>
    </div>
  </div>
);

export default PhotoSwipeWrapper;
