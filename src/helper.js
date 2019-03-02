import uuid from "uuid";

const setActiveClass = (index, selectedIndex) => {
    return index === selectedIndex ? 'active-row' : null;
}

const generateUUID = () => uuid.v4();

export {
    setActiveClass,
    generateUUID
}
