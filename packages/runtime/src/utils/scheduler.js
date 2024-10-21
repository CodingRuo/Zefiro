let isScheduled = false
const jobs = []

function processJobs() {
    while( jobs.length ) {
        const job = jobs.shift()
        const result = job()

        Promise.resolve( result ).then(() => {
            // Job completed successfully
        }, ( error ) => {
            console.error(`[scheduler]: ${error}`)
        })

        job()
    }

    isScheduled = false
}

function scheduleUpdate() {
    if ( isScheduled ) return

    isScheduled = true
    queueMicrotask( processJobs )
}

export function enqueueJob( job ) {
    jobs.push( job )
    scheduleUpdate()
}

export function nextTick() {
    scheduleUpdate()
    return flushPromises()
}

function flushPromises() {
    return new Promise( resolve => setTimeout( resolve) )
}