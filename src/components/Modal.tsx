import React, { useRef } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import Button from './Button';

export interface Props {
  children: React.ReactNode;
  close: () => void;
}

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
`;

const Modal = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  padding: 1em 2em;
  width: 420px;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background: #222438;
`;

export const ModalHeading = styled.h3`
  margin-bottom: 2em;
`;

export const ModalContent = styled.div``;

const CloseButton = styled(Button)`
  position: absolute;
  top: 1em;
  right: 1em;
  padding: 0.5em;
  background: none;
  font-weight: 900;

  &:hover {
    background: none;
  }
`;

export default ({ children, close }: Props) => {
  const overlay = useRef<HTMLDivElement>(null);

  const animationProps = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  return (
    <animated.div style={animationProps}>
      <Overlay
        ref={overlay}
        onClick={(e) => {
          if (e.target === overlay.current) {
            close();
          }
        }}
      >
        <Modal>
          {children}

          <CloseButton onClick={close}>X</CloseButton>
        </Modal>
      </Overlay>
    </animated.div>
  );
};
