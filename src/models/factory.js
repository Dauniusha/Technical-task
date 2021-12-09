class Factory {
    createElem(className) {
        const elem = document.createElement('div');
        elem.classList.add(className);

        return elem;
    };

    createInput(className, initValue) {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = initValue;
        input.classList.add(className);

        return input;
    };
};

const factory = new Factory();

export default factory;
