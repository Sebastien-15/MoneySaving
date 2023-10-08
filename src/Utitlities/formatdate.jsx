export function FormatDate ( date ){
            let current = String(date).split('-')
        let future = new Date(Number(current[0]), Number(current[1]) - 1, Number(current[2]))
        future = String(future).split(' ')
        future = future[1] + ' ' + future[2]
    
    return future
}