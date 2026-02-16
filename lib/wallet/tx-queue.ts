type Task<T> = () => Promise<T>;

class AddressQueue {
    private queue: Promise<any> = Promise.resolve();

    enqueue<T>(task: Task<T>): Promise<T> {
        const result = this.queue.then(() => task());
        // Catch errors to ensure the queue continues processing subsequent tasks
        this.queue = result.catch(() => { });
        return result;
    }
}

const queues = new Map<string, AddressQueue>();

/**
 * Get the execution queue for a specific address
 * Ensures transactions for the same address generate sequentially
 */
export function getQueue(address: string): AddressQueue {
    if (!queues.has(address)) {
        queues.set(address, new AddressQueue());
    }
    return queues.get(address)!;
}
