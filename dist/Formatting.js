"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseFirstAndLastName = exports.formatName = exports.matchPerson = exports.defaultFormat = exports.upperFirstCharInParenthesis = exports.upperFirstCharAfterPrefix = exports.trimInsideParenthesis = exports.trimCloseParenthesis = exports.trimOpenParenthesis = exports.upperFirstCharAllWords = exports.singleSpaceBetweenWords = void 0;
const singleSpaceBetweenWords = (input) => input.replace(/\s\s+/g, ' ');
exports.singleSpaceBetweenWords = singleSpaceBetweenWords;
const upperFirstCharAllWords = (input) => {
    return input.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
};
exports.upperFirstCharAllWords = upperFirstCharAllWords;
const trimOpenParenthesis = (input) => input.replace(/(\()\s+/gi, '(');
exports.trimOpenParenthesis = trimOpenParenthesis;
const trimCloseParenthesis = (input) => input.replace(/\s+(\))/gi, ')');
exports.trimCloseParenthesis = trimCloseParenthesis;
const trimInsideParenthesis = (input) => {
    if (input.match(/\(|\)/g) === null) {
        return input;
    }
    let string = (0, exports.trimOpenParenthesis)(input);
    string = (0, exports.trimCloseParenthesis)(string);
    return string;
};
exports.trimInsideParenthesis = trimInsideParenthesis;
/**
 * upperFirstCharAfterPrefix
 * @param  {string} input e.g Winston/juliet, Jean-louis, Inc. D/b/a
, American-italian, C/o Daniel
 * @return {string} Winston/Juliet, Jean-Louis, Inc. D/B/A
, American-Italian, C/o Daniel
*/
const upperFirstCharAfterPrefix = (input) => {
    let string = input.replace(/(\-|\/)(\s+)?\w{1}/gi, letter => letter.toUpperCase());
    return string.replace(/c\/o/gi, 'C/o'); // exclude 'c/o' care of
};
exports.upperFirstCharAfterPrefix = upperFirstCharAfterPrefix;
/**
 * upperFirstCharInParenthesis
 * @param  {string} input e.g Samira (perez),Samira (perez lopez),Samira (perez-lopez)
 * @return {string} Samira (Perez),Samira (Perez Lopez),Samira (Perez-Lopez)
*/
const upperFirstCharInParenthesis = (input) => {
    if (input.match(/\(|\)/g) === null) {
        return input;
    }
    return input.replace(/(\(+(\s+)?\w{1})|(\(+(\s+)?\-(\s+)?\w{1})/g, letter => letter.toUpperCase());
};
exports.upperFirstCharInParenthesis = upperFirstCharInParenthesis;
const defaultFormat = (input) => {
    let str = input.toLowerCase();
    str = (0, exports.upperFirstCharAllWords)(str.trim());
    str = (0, exports.upperFirstCharAfterPrefix)(str);
    str = (0, exports.singleSpaceBetweenWords)(str);
    str = (0, exports.upperFirstCharInParenthesis)(str);
    str = (0, exports.trimInsideParenthesis)(str);
    return str;
};
exports.defaultFormat = defaultFormat;
const matchPerson = (input) => {
    let prefix = '', name = null;
    if (!input) {
        return {
            input,
            match: false,
            prefix,
            name
        };
    }
    let str = ``;
    const regexp = new RegExp(/^(?<prefix>(\s+)?((mr)|(mrs)|(miss)|(ms)|(dr))((\.)|\b))(?<name>([\w ]*){1,})/, 'gi');
    const match = regexp.exec(input);
    if (match) {
        if (match.groups) {
            if (match.groups.prefix) {
                prefix = match.groups.prefix.toLowerCase();
            }
            if (match.groups.name) {
                str = match.groups.name;
                str = (0, exports.defaultFormat)(str);
                name = str;
            }
        }
    }
    if (!prefix && !name) {
        name = (0, exports.defaultFormat)(input);
    }
    return {
        input,
        match: match ? true : false,
        prefix,
        name
    };
};
exports.matchPerson = matchPerson;
const formatName = (input) => {
    // person
    let rxResult = (0, exports.matchPerson)(input);
    if (rxResult.match) {
        return rxResult.name ?? ''; // ?rxResult.name:''
    }
    // company
    let regexp = new RegExp(/((^)|(\s+))(?<llc>(LLC\.?))((\s+)|($))/, 'gi');
    const match = regexp.exec(input);
    if (match) {
        let str = input.toLowerCase();
        str = str.replace(/llc\.?/gi, "LLC");
        str = (0, exports.upperFirstCharAllWords)(str.trim());
        str = (0, exports.singleSpaceBetweenWords)(str);
        return str;
    }
    // default
    return (0, exports.defaultFormat)(input);
};
exports.formatName = formatName;
const parseFirstAndLastName = (props) => {
    const trace = false;
    const inputNames = {
        first_name: props.first_name,
        last_name: props.last_name,
        display_name: `${props.first_name} ${props.last_name}`
    };
    // determine if person
    let firstName, lastName, fullName, formatted;
    const firstNameResult = (0, exports.matchPerson)(props.first_name);
    const lastNameResult = (0, exports.matchPerson)(props.last_name);
    trace ? console.log({
        firstNameResult, lastNameResult
    }) : null;
    // check prefixes
    if (firstNameResult.prefix || lastNameResult.prefix) { // is a person
        // firstname|lastname
        // 0|0 e.g mr|dr = bad data
        if (!firstNameResult.name && !lastNameResult.name) {
            return inputNames;
        }
        // 0|1 e.g mr|dr.robert
        // 1|0 e.g dr.robert|mr
        // first/last name was fully used as prefix
        if ((!firstNameResult.name && lastNameResult.name) ||
            (firstNameResult.name && !lastNameResult.name)) {
            // try full name
            if (!firstNameResult.name && lastNameResult.name) {
                fullName = lastNameResult.name;
            }
            else if (firstNameResult.name && !lastNameResult.name) {
                fullName = firstNameResult.name;
            }
            else { // shouldn't get here
                return inputNames;
            }
            trace ? console.log(`parsing if '${fullName}' is a complete name.`) : null;
            const fullNameResult = (0, exports.matchPerson)(fullName);
            trace ? console.log({ fullNameResult }) : null;
            let fullNameFormatted = ``;
            if (fullNameResult.match) {
                fullNameFormatted = fullNameResult.name;
            }
            else {
                // try default formatting
                fullNameFormatted = (0, exports.defaultFormat)(fullName);
            }
            if (!fullNameFormatted) {
                return inputNames;
            }
            const names = fullNameFormatted.split(' ');
            trace ? console.log({ names }) : null;
            if (names.length <= 1) {
                trace ? console.log(`...not a complete name`) : null;
                firstName = firstNameResult.name ? firstNameResult.name : '';
                lastName = lastNameResult.name ? lastNameResult.name : '';
                formatted = {
                    first_name: firstName,
                    last_name: lastName,
                    display_name: `${firstName} ${lastName}`
                };
                trace ? console.log({ original: props, formatted }) : null;
                return formatted;
            }
            else if (names.length == 2) {
                // assign the most probable name
                firstName = names[0];
                lastName = names[1];
                trace ? console.log('possible full name:', { firstName, lastName }) : null;
                formatted = {
                    first_name: firstName,
                    last_name: lastName,
                    display_name: `${firstName} ${lastName}`
                };
                trace ? console.log({ original: props, formatted }) : null;
                return formatted;
            }
            else {
                trace ? console.log(`could not identify if first name is just first word`) : null;
                return inputNames;
            }
        }
        // 1|1 e.g dr.robert|mr.downey
        if (firstNameResult.name && lastNameResult.name) {
            formatted = {
                first_name: firstNameResult.name,
                last_name: lastNameResult.name,
                display_name: `${firstNameResult.name} ${lastNameResult.name}`
            };
            trace ? console.log({ original: props, formatted }) : null;
            return formatted;
        }
    }
    trace ? console.log(`this can be a person w/out prefix or a company name`) : null;
    firstName = (0, exports.formatName)(props.first_name);
    lastName = (0, exports.formatName)(props.last_name);
    formatted = {
        first_name: firstName ?? '',
        last_name: lastName ?? '',
        display_name: `${firstName} ${lastName}`
    };
    trace ? console.log({ original: props, formatted }) : null;
    return formatted;
};
exports.parseFirstAndLastName = parseFirstAndLastName;
