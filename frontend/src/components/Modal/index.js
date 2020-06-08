import React, { useRef, useEffect } from 'react';

function useOutsideAlerter(ref, contentState, setContentState) {
	useEffect(() => {
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target) && contentState) {
				setContentState();
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref, contentState, setContentState]);
}

function Modal({ children, contentState, setContentState }) {
	const ref = useRef(null);
	useOutsideAlerter(ref, contentState, setContentState);

	return <div ref={ref}>{children}</div>;
}

export default Modal;
