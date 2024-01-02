
export const singleSpaceBetweenWords = (input:string) => input.replace(/\s\s+/g, ' ')

export const upperFirstCharAllWords = (input:string) => {
    return input.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
}

export const trimOpenParenthesis = (input:string) => input.replace(/(\()\s+/gi, '(' )
export const trimCloseParenthesis = (input:string) => input.replace(/\s+(\))/gi, ')' )
export const trimInsideParenthesis = (input:string) => {
    if (input.match(/\(|\)/g)===null){
        return input
    }
    let string = trimOpenParenthesis(input)
    string = trimCloseParenthesis(string)
    return string
}

/**
 * upperFirstCharAfterPrefix
 * @param  {string} input e.g Winston/juliet, Jean-louis, Inc. D/b/a
, American-italian, C/o Daniel
 * @return {string} Winston/Juliet, Jean-Louis, Inc. D/B/A
, American-Italian, C/o Daniel
*/
export const upperFirstCharAfterPrefix = (input:string) => {
    let string = input.replace(/(\-|\/)(\s+)?\w{1}/gi, letter => letter.toUpperCase())
    return string.replace(/c\/o/gi,'C/o') // exclude 'c/o' care of
}

/**
 * upperFirstCharInParenthesis
 * @param  {string} input e.g Samira (perez),Samira (perez lopez),Samira (perez-lopez)
 * @return {string} Samira (Perez),Samira (Perez Lopez),Samira (Perez-Lopez)
*/
export const upperFirstCharInParenthesis = (input:string) => {
    if (input.match(/\(|\)/g)===null){
        return input
    }
    return input.replace(/(\(+(\s+)?\w{1})|(\(+(\s+)?\-(\s+)?\w{1})/g, letter => letter.toUpperCase())
}

export const defaultFormat = (input:string):string => {
    let str:string = input.toLowerCase()
    str = upperFirstCharAllWords(str.trim())
    str = upperFirstCharAfterPrefix(str)
    str = singleSpaceBetweenWords(str)
    str = upperFirstCharInParenthesis(str)
    str = trimInsideParenthesis(str)
    return str
}

export interface IMatchPersonResult{
    input:string,
    match:boolean,
    prefix:string,
    name:string|null
}

export const matchPerson = (input:string):IMatchPersonResult => {
    let prefix:string='',name:string|null=null
    if( !input ){
        return {
            input,
            match:false,
            prefix,
            name
        }
    }
    let str:string = ``
    const regexp = new RegExp(/^(?<prefix>(\s+)?((mr)|(mrs)|(miss)|(ms)|(dr))((\.)|\b))(?<name>([\w ]*){1,})/,'gi')
    const match = regexp.exec(input)
    if( match ){
        if( match.groups ){
            if( match.groups.prefix ){
                prefix = match.groups.prefix.toLowerCase()
            }
            if( match.groups.name ){
                str = match.groups.name
                str = defaultFormat(str)
                name = str
            }
        }
    }
    if( !prefix && !name ){
        name = defaultFormat(input)
    }
    return {
        input,
        match:match?true:false,
        prefix,
        name
    } as IMatchPersonResult
}

export const formatName = (input:string):string => {
    // person
    let rxResult = matchPerson(input)
    if( rxResult.match ){
        return rxResult.name??'' // ?rxResult.name:''
    }
    // company
    let regexp = new RegExp(/((^)|(\s+))(?<llc>(LLC\.?))((\s+)|($))/,'gi')
    const match = regexp.exec(input)
    if( match ){
        let str = input.toLowerCase()
        str = str.replace(/llc\.?/gi, "LLC")
        str = upperFirstCharAllWords(str.trim())
        str = singleSpaceBetweenWords(str)
        return str
    }
    // default
    return defaultFormat(input)
}

export interface IFullName{
    first_name:string,
    last_name:string
}

export interface IFormattedName{
    first_name: string,
    last_name:string,
    display_name:string
}

export const parseFirstAndLastName = (props:IFullName):IFormattedName => {
    const trace = false
    
    const inputNames:IFormattedName = {
        first_name: props.first_name,
        last_name: props.last_name,
        display_name:   `${props.first_name} ${props.last_name}`
    }

    // determine if person
    let firstName:string|null,lastName:string|null,fullName:string|null,formatted:IFormattedName
                    
    const firstNameResult = matchPerson(props.first_name)
    const lastNameResult = matchPerson(props.last_name)

    trace?console.log({
        firstNameResult,lastNameResult
    }):null

    // check prefixes
    if( firstNameResult.prefix || lastNameResult.prefix ){ // is a person

        // firstname|lastname

        // 0|0 e.g mr|dr = bad data
        if( !firstNameResult.name && !lastNameResult.name ){
            return inputNames
        }

        // 0|1 e.g mr|dr.robert
        // 1|0 e.g dr.robert|mr
        // first/last name was fully used as prefix

        if( ( !firstNameResult.name && lastNameResult.name ) ||
            ( firstNameResult.name && !lastNameResult.name ) ){

            // try full name

            if( !firstNameResult.name && lastNameResult.name ){
                fullName = lastNameResult.name
            }else if( firstNameResult.name && !lastNameResult.name ){
                fullName = firstNameResult.name
            }else{ // shouldn't get here
                return inputNames
            }

            trace?console.log(`parsing if '${fullName}' is a complete name.`):null

            const fullNameResult = matchPerson(fullName)

            trace?console.log({fullNameResult}):null

            let fullNameFormatted:string|null = ``
            if( fullNameResult.match ){
                fullNameFormatted = fullNameResult.name
            }else{
                // try default formatting
                fullNameFormatted = defaultFormat(fullName)
            }
            if( !fullNameFormatted ){
                return inputNames
            }
            const names = fullNameFormatted.split(' ')

            trace?console.log({names}):null
            
            if( names.length<=1){

                trace?console.log(`...not a complete name`):null
                firstName = firstNameResult.name?firstNameResult.name:''
                lastName = lastNameResult.name?lastNameResult.name:''
                formatted = {
                    first_name:firstName ,
                    last_name: lastName ,
                    display_name: `${firstName} ${lastName}`
                }
                trace?console.log({original: props,formatted}):null
                return formatted

            }else if( names.length==2 ){
                
                // assign the most probable name
                firstName = names[0]
                lastName = names[1]
                trace?console.log('possible full name:',{firstName,lastName}):null

                formatted = {
                    first_name: firstName,
                    last_name: lastName,
                    display_name: `${firstName} ${lastName}`
                }
                trace?console.log({original: props,formatted}):null
                return formatted

            }else{
                trace?console.log(`could not identify if first name is just first word`):null
                return inputNames
            }
        }

        // 1|1 e.g dr.robert|mr.downey

        if( firstNameResult.name && lastNameResult.name ){

            formatted = {
                first_name: firstNameResult.name,
                last_name: lastNameResult.name,
                display_name: `${firstNameResult.name} ${lastNameResult.name}`
            }
            trace?console.log({original: props,formatted}):null
            return formatted
        }
    }

    trace?console.log(`this can be a person w/out prefix or a company name`):null

    firstName = formatName(props.first_name)
    lastName = formatName(props.last_name)

    formatted = {
        first_name: firstName??'',
        last_name: lastName??'',
        display_name: `${firstName} ${lastName}`
    }
    trace?console.log({original: props,formatted}):null
    return formatted
}


