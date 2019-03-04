import uuid from "uuid";

const setActiveClass = (index, selectedIndex) => {
    return index === selectedIndex ? 'active-row' : null;
}

const setLabelStatus = (status) => {
    switch (status) {
        case 'ACTIVE':
            return { color: 'green' };
        case 'PASSIVE':
            return { color: 'red' };
    }
}

const generateUUID = () => uuid.v4();

export {
    setActiveClass,
    generateUUID,
    setLabelStatus
}
