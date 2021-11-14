import { useRef } from 'react';
import styled from 'styled-components';
import { useTransition, animated } from 'react-spring';
import Button from './Button';

export interface Props {
  isOpen: boolean;
  close: () => void;
  children: React.ReactNode;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
`;

const Modal = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  width: 580px;
  padding: 1px;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background: linear-gradient(#bcff67 0%, #17ffe3 30%, transparent 70%);
  box-shadow: 0 0 20px 10px rgba(23, 255, 227, 0.3);
`;

const ModalBackground = styled.div`
  background: #000;
`;

export const ModalHeading = styled.h3`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0;
  margin-bottom: 2em;
  padding: 1.5em 2em;
  font-family: '3616 Grammastile', sans-serif;
  font-size: 14px;
  width: 100%;
  border-bottom: 1px solid #17ffe3;
`;

export const ModalContent = styled.div`
  padding: 0 2em 1em;
`;

const CloseButton = styled(Button)`
  position: absolute;
  top: 1em;
  right: 1em;
  padding: 0.5em;
  background: none;
  font-family: '3616 Grammastile', sans-serif;
  font-size: 14px;
  font-weight: 600;

  &:hover:not([disabled]) {
    background: none;
  }
`;

export default ({ isOpen, children, close }: Props) => {
  const overlay = useRef<HTMLDivElement>(null);

  const transitions = useTransition(isOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: isOpen,
  });

  return transitions(
    (styles, item) =>
      item && (
        <animated.div style={styles}>
          <Overlay
            ref={overlay}
            onClick={e => {
              if (e.target === overlay.current) {
                close();
              }
            }}
          >
            <Modal>
              <ModalBackground>
                {children}

                <CloseButton size="sm" onClick={close}>
                  X
                </CloseButton>
              </ModalBackground>
            </Modal>
          </Overlay>
        </animated.div>
      )
  );
};
