import React from 'react';

// export const ModalShowingContext = React.createContext(false);

const ModalShowingContext = React.createContext({
    displayModal: false,
    setDisplayModal: () => { }
});

export default ModalShowingContext;
