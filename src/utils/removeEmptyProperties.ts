interface AnyObject {
    [key: string]: any;
};

export function removeEmptyProperties(obj: AnyObject): AnyObject {
    let newObj = {...obj};
    for(let key in newObj) {
        if(newObj[key] === '' || newObj[key] === null || newObj[key] === undefined) {
            delete newObj[key];
        }
    }
    return newObj;
};
