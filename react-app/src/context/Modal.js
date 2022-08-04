import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  // value state variable will be set to modalRef.current after initial render
  const [value, setValue] = useState();

  useEffect(() => {
    // modalRef.current will be set to the actual HTML DOM element that gets rendered from the div
    setValue(modalRef.current);
  }, [])

  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal({ onClose, onChange, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    // Divs must come first to get elements to show up in the ModalProvider component
    <div id="modal">
      <div id="modal-background" onClick={onClose} onChange={onChange} />
      <div id="modal-content">
        {children}
      </div>
    </div>,
    // reference to the actual HTML DOM element of the ModalProvider's div
    modalNode
  );
}
