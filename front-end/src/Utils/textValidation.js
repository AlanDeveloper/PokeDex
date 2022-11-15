const validation = {
    required: "The :attribute field is required.",
    max: "The :attribute field hold up to max :max characters.",
    min: "The :attribute field hold up to min :min characters.",
};

const textValidation = (field, args) => {
    let text; 
    let key = Object.keys(args)[0];
    
    text = validation[key].replace(":attribute", field);
    if (args[key] !== "required") {
        text = text.replace(`:${key}`, args[key]);
    }
    
    return text;
}

export default textValidation;