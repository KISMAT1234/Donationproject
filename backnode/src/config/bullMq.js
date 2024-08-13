export const defaultQueueConfig = {
    delay: 3000,
    attempts : 3,
    backoff : {
        type: "exponential",
        delay: 1000,
        maxDelay: 60 * 60 * 1000,
        factor: 2,
    },
    lifo: true,
    priority: 2,
    removeOnComplete:true,
    removeOnFail: true,
    timeout: 30000,
    dependsOn: ['job1', 'job2']
}