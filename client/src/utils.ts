export const classes = (...args: Array<string | undefined | null | boolean>) : string => {
    const cssClass = args.reduce<string>((_classes, _class) => {
        if(_class) {
            _classes += `${_class} `;
        }
        return _classes;
    }, '')
    
    return cssClass.substr(0, cssClass.length - 1);
};

export const between = (val: number, min: number, max: number) => Math.max(
    Math.min(val, max),
    min
);