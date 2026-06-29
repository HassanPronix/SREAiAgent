class SSEService {
    private eventSource: EventSource | null = null;

    connect() {
        if (this.eventSource) return this.eventSource;

        this.eventSource = new EventSource(
            `${process.env.NEXT_PUBLIC_API_URL}/events`
        );

        this.eventSource.onopen = () => {
            console.log("SSE Connected");
        };

        this.eventSource.onerror = (error) => {
            console.error("SSE Error", error);
        };

        return this.eventSource;
    }

    disconnect() {
        this.eventSource?.close();
        this.eventSource = null;
    }
}

export const sseService = new SSEService();