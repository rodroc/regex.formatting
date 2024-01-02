import * as Formatting from '../Formatting'

const parseFirstAndLastName = (firstName:string,lastName:string):Formatting.IFormattedName=>{
    return Formatting.parseFirstAndLastName({
        first_name:firstName,last_name:lastName
    })
}

const formatName = (input:string):string=>{
    return Formatting.formatName(input)
}

test(`parseFirstAndLastName()`,()=>{
    let r:Formatting.IFormattedName = parseFirstAndLastName('Mr.','Dr.')
    // expect(r).toBe(false)
    console.log(r)
    expect(r.first_name).toBe('Mr.')
    expect(r.last_name).toBe('Dr.')

    r = parseFirstAndLastName('mr','dr robert')
    console.log(r)    
    expect(r.first_name).toBe('')
    expect(r.last_name).toBe('Robert')

    r = parseFirstAndLastName(' mr','dr robert')
    console.log(r)    
    expect(r.first_name).toBe('')
    expect(r.last_name).toBe('Robert')

    r = parseFirstAndLastName('mr ','dr robert')
    console.log(r)    
    expect(r.first_name).toBe('')
    expect(r.last_name).toBe('Robert')

    r = parseFirstAndLastName(' mr ','dr robert')
    console.log(r)    
    expect(r.first_name).toBe('')
    expect(r.last_name).toBe('Robert')

    r = parseFirstAndLastName(' mr ',' dr robert')
    console.log(r)    
    expect(r.first_name).toBe('')
    expect(r.last_name).toBe('Robert')

    r = parseFirstAndLastName(' mr ','drrobert')
    console.log(r)    
    expect(r.first_name).toBe('')
    expect(r.last_name).toBe('Drrobert')

    r = parseFirstAndLastName('mr','dr.robert')
    console.log(r)    
    expect(r.first_name).toBe('')
    expect(r.last_name).toBe('Robert')

    r = parseFirstAndLastName('mr','dr. robert')
    console.log(r)    
    expect(r.first_name).toBe('')
    expect(r.last_name).toBe('Robert')

    r = parseFirstAndLastName('mr.','dr.robert')
    console.log(r)    
    expect(r.first_name).toBe('')
    expect(r.last_name).toBe('Robert')

    r = parseFirstAndLastName('mr.','dr. robert')
    console.log(r)    
    expect(r.first_name).toBe('')
    expect(r.last_name).toBe('Robert')

    r = parseFirstAndLastName('mr.','   dr. robert')
    console.log(r)    
    expect(r.first_name).toBe('')
    expect(r.last_name).toBe('Robert')

    r = parseFirstAndLastName('mr.','dr. robert  ')
    console.log(r)    
    expect(r.first_name).toBe('')
    expect(r.last_name).toBe('Robert')

    r = parseFirstAndLastName('mr.','   dr. robert  ')
    console.log(r)    
    expect(r.first_name).toBe('')
    expect(r.last_name).toBe('Robert')

    r = parseFirstAndLastName('dr.robert','mr')
    console.log(r)    
    expect(r.first_name).toBe('Robert')
    expect(r.last_name).toBe('')

    r = parseFirstAndLastName('dr.robert','mr.downey')
    console.log(r)    
    expect(r).toBeInstanceOf(Object)
    expect(r.first_name).toBe('Robert')
    expect(r.last_name).toBe('Downey')

    r = parseFirstAndLastName('ROBERT','DOWNEY')
    console.log(r)    
    expect(r).toBeInstanceOf(Object)
    expect(r.first_name).toBe('Robert')
    expect(r.last_name).toBe('Downey')

    r = parseFirstAndLastName('Mis-lead','fortune Llc.')
    console.log(r)    
    expect(r.first_name).toBe('Mis-Lead')
    expect(r.last_name).toBe('Fortune LLC')

    r = parseFirstAndLastName('jANT','PLC llc')
    console.log(r)    
    expect(r.first_name).toBe('Jant')
    expect(r.last_name).toBe('Plc LLC')

    r = parseFirstAndLastName('Ana','volo-casin')
    console.log(r)    
    expect(r.first_name).toBe('Ana')
    expect(r.last_name).toBe('Volo-Casin')

    r = parseFirstAndLastName('Roles','Groups llC')
    console.log(r)    
    expect(r.first_name).toBe('Roles')
    expect(r.last_name).toBe('Groups LLC')

    r = parseFirstAndLastName('Menu','Site lLc')
    console.log(r)    
    expect(r.first_name).toBe('Menu')
    expect(r.last_name).toBe('Site LLC')

    r = parseFirstAndLastName('IVONNA','WILLIAMS')
    console.log(r)    
    expect(r.first_name).toBe('Ivonna')
    expect(r.last_name).toBe('Williams')

    r = parseFirstAndLastName('DR','LATIF')
    console.log(r)    
    expect(r.first_name).toBe('')
    expect(r.last_name).toBe('Latif')

    r = parseFirstAndLastName('DR. SOPHIA','')
    console.log(r)    
    expect(r.first_name).toBe('Sophia')
    expect(r.last_name).toBe('')

    r = parseFirstAndLastName('Mrs. grasya','')
    console.log(r)    
    expect(r.first_name).toBe('Grasya')
    expect(r.last_name).toBe('')

    r = parseFirstAndLastName('Mr.','james')
    console.log(r)    
    expect(r.first_name).toBe('')
    expect(r.last_name).toBe('James')

})

test(`formatName(Person)`,()=>{
    let r = formatName('mr')
    console.log(r)    

    r = formatName('mr.')
    console.log(r)    
    expect(r).toBe('')

    r = formatName('mrs')
    console.log(r)    
    expect(r).toBe('')
    
    r = formatName('mrs.')
    console.log(r)    
    expect(r).toBe('')
    
    r = formatName('dr')
    console.log(r)    
    expect(r).toBe('')
    
    r = formatName('dr.')
    console.log(r)    
    expect(r).toBe('')
    
    r = formatName('miss')
    console.log(r)    
    expect(r).toBe('')

    r = formatName('first last')
    console.log(r)    
    expect(r).toBe('First Last')

    r = formatName(' first last')
    console.log(r)    
    expect(r).toBe('First Last')

    r = formatName('first last xtra')
    console.log(r)    
    expect(r).toBe('First Last Xtra')

    r = formatName(' first last xtra')
    console.log(r)    
    expect(r).toBe('First Last Xtra')

    r = formatName('mr first last')
    console.log(r)    
    expect(r).toBe('First Last')

    r = formatName('MR first               last')
    console.log(r)    
    expect(r).toBe('First Last')

    r = formatName(' mr first last')
    console.log(r)    
    expect(r).toBe('First Last')

    r = formatName(' mr first                  last xtra')
    console.log(r)    
    expect(r).toBe('First Last Xtra')

    r = formatName(' mrfirst last ')
    console.log(r)    
    expect(r).toBe('Mrfirst Last')

    r = formatName('mr.first last')
    console.log(r)    
    expect(r).toBe('First Last')

    r = formatName('Mr.first last')
    console.log(r)    
    expect(r).toBe('First Last')

    r = formatName('mr.first              last')
    console.log(r)    
    expect(r).toBe('First Last')
    
    r = formatName('mR.first                   last')
    console.log(r)    
    expect(r).toBe('First Last')

    r = formatName('mRfirst                        last')
    console.log(r)    
    expect(r).toBe('Mrfirst Last')

    r = formatName('mrs first last')
    console.log(r)    
    expect(r).toBe('First Last')

    r = formatName('mrs.               first last')
    console.log(r)    
    expect(r).toBe('First Last')

    r = formatName('mrs.first last')
    console.log(r)    
    expect(r).toBe('First Last')

    r = formatName('MRS first last')
    console.log(r)    
    expect(r).toBe('First Last')

    r = formatName('MRS.               first last')
    console.log(r)    
    expect(r).toBe('First Last')

    r = formatName('MRS.first last')
    console.log(r)    
    expect(r).toBe('First Last')

    r = formatName('mrS.                first last')
    console.log(r)    
    expect(r).toBe('First Last')

    r = formatName('mrsfirst last')
    console.log(r)    
    expect(r).toBe('Mrsfirst Last')

    r = formatName('miss first last')
    console.log(r)    
    expect(r).toBe('First Last')

    r = formatName('ms first last')
    console.log(r)    
    expect(r).toBe('First Last')

    r = formatName('ms. first last')
    console.log(r)    
    expect(r).toBe('First Last')

    r = formatName('dr first       last   xtra whatever')
    console.log(r)    
    expect(r).toBe('First Last Xtra Whatever')

    r = formatName('dr. first  last    xtra')
    console.log(r)    
    expect(r).toBe('First Last Xtra')

    r = formatName('dr.first                   last    xtra    somemore')
    console.log(r)    
    expect(r).toBe('First Last Xtra Somemore')

    r = formatName('dr.FIRST LAST')
    console.log(r)    
    expect(r).toBe('First Last')

    r = formatName('Mis-lead fortune Llc.')    
    console.log(r)    
    expect(r).toBe('Mis-lead Fortune LLC')
})

test(`formatName(Company)`,()=>{
    let r = formatName('llc')
    console.log(r)    
    expect(r).toBe('LLC')

    r = formatName('llc.')
    console.log(r)    
    expect(r).toBe('LLC')

    r = formatName('left      llc')
    console.log(r)    
    expect(r).toBe('Left LLC')

    r = formatName('left             llc.')
    console.log(r)    
    expect(r).toBe('Left LLC')

    r = formatName('left               llc')
    console.log(r)    
    expect(r).toBe('Left LLC')

    r = formatName('left                  llc.   xtra')
    console.log(r)    
    expect(r).toBe('Left LLC Xtra')

    r = formatName('left llc   xtra ')
    console.log(r)    
    expect(r).toBe('Left LLC Xtra')

    r = formatName('left llc.    ')
    console.log(r)    
    expect(r).toBe('Left LLC')

    r = formatName('left    llc    ')
    console.log(r)    
    expect(r).toBe('Left LLC')

    r = formatName('left    llc.    ')
    console.log(r)    
    expect(r).toBe('Left LLC')

    r = formatName('   left llc    ')
    console.log(r)    
    expect(r).toBe('Left LLC')

    r = formatName('   left llc.    ')
    console.log(r)    
    expect(r).toBe('Left LLC')

    r = formatName('   left     llc    ')
    console.log(r)    
    expect(r).toBe('Left LLC')

    r = formatName('   left     llc.    ')
    console.log(r)    
    expect(r).toBe('Left LLC')

    r = formatName('left llc right')
    console.log(r)    
    expect(r).toBe('Left LLC Right')

    r = formatName('left llc. right')
    console.log(r)    
    expect(r).toBe('Left LLC Right')

    r = formatName('left   llc   right')
    console.log(r)    
    expect(r).toBe('Left LLC Right')

    r = formatName('left   llc.   right')
    console.log(r)    
    expect(r).toBe('Left LLC Right')

    r = formatName('left llc right    xtra')
    console.log(r)    
    expect(r).toBe('Left LLC Right Xtra')

    r = formatName('left llc. right    xtra')
    console.log(r)    
    expect(r).toBe('Left LLC Right Xtra')

    r = formatName('left   llc   right    xtra')
    console.log(r)    
    expect(r).toBe('Left LLC Right Xtra')

    r = formatName('left   llc.   right    xtra')
    console.log(r)    
    expect(r).toBe('Left LLC Right Xtra')

    r = formatName('           left llc right')
    console.log(r)    
    expect(r).toBe('Left LLC Right')

    r = formatName('           bleft llc. right')
    console.log(r)    
    expect(r).toBe('Bleft LLC Right')

    r = formatName('            left   llc     right')
    console.log(r)    
    expect(r).toBe('Left LLC Right')

    r = formatName('           left   llc.     right')
    console.log(r)    
    expect(r).toBe('Left LLC Right')

    r = formatName('           left llc right')
    console.log(r)    
    expect(r).toBe('Left LLC Right')


    r = formatName('           left llc. right')
    console.log(r)    
    expect(r).toBe('Left LLC Right')

    r = formatName('           left llc right')
    console.log(r)    
    expect(r).toBe('Left LLC Right')

    r = formatName('           left llc. right')
    console.log(r)    
    expect(r).toBe('Left LLC Right')

    r = formatName('           left   llc   right')
    console.log(r)    
    expect(r).toBe('Left LLC Right')

    r = formatName('           left   llc.   right')
    console.log(r)    
    expect(r).toBe('Left LLC Right')

    r = formatName(' left llc right   ')
    console.log(r)    
    expect(r).toBe('Left LLC Right')

    r = formatName('    left llc. right   ')
    console.log(r)    
    expect(r).toBe('Left LLC Right')

    r = formatName('    left    llc    right  xtra  ')
    console.log(r)    
    expect(r).toBe('Left LLC Right Xtra')

    r = formatName('    left    llc.    right   xtra somemore')
    console.log(r)    
    expect(r).toBe('Left LLC Right Xtra Somemore')

    r = formatName('llc right')
    console.log(r)    
    expect(r).toBe('LLC Right')

    r = formatName('llc. right')
    console.log(r)    
    expect(r).toBe('LLC Right')

    r = formatName(' llc right')
    console.log(r)    
    expect(r).toBe('LLC Right')

    r = formatName(' llc. right')
    console.log(r)    
    expect(r).toBe('LLC Right')

    r = formatName('  llc    right')
    console.log(r)    
    expect(r).toBe('LLC Right')

    r = formatName('  llc.    right')
    console.log(r)    
    expect(r).toBe('LLC Right')

    r = formatName(' llc right ')
    console.log(r)    
    expect(r).toBe('LLC Right')

    r = formatName(' llc. right ')
    console.log(r)    
    expect(r).toBe('LLC Right')

    r = formatName(' llc right')
    console.log(r)    
    expect(r).toBe('LLC Right')

    r = formatName(' llc. right')
    console.log(r)    
    expect(r).toBe('LLC Right')

    r = formatName(' llc    right')
    console.log(r)    
    expect(r).toBe('LLC Right')

    r = formatName(' llc.    right')
    console.log(r)    
    expect(r).toBe('LLC Right')

    r = formatName(' llc    right ')
    console.log(r)    
    expect(r).toBe('LLC Right')

    r = formatName(' llc.    right ')
    console.log(r)    
    expect(r).toBe('LLC Right')

    r = formatName(' llc    right   ')
    console.log(r)    
    expect(r).toBe('LLC Right')

    r = formatName(' llc.    right   ')
    console.log(r)    
    expect(r).toBe('LLC Right')

    r = formatName(' llc    right   ')
    console.log(r)    
    expect(r).toBe('LLC Right')

    r = formatName(' llc.    right   ')
    console.log(r)    
    expect(r).toBe('LLC Right')

    r = formatName('llc')
    console.log(r)    
    expect(r).toBe('LLC')

    r = formatName('Llc.')
    console.log(r)    
    expect(r).toBe('LLC')

    r = formatName('ASD 123 DFDF llC.')
    console.log(r)    
    expect(r).toBe('Asd 123 Dfdf LLC')

})