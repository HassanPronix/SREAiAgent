import { Response } from "express";

class SSEService {
    private clients = new Map<string, Response>();

    addClient(clientId: string, res: Response) {
        this.clients.set(clientId, res);
    }

    removeClient(clientId: string) {
        this.clients.delete(clientId);
    }

    send(clientId: string, event: string, data: any) {
        const client = this.clients.get(clientId);

        if (!client) return;

        client.write(`event: ${event}\n`);
        client.write(`data: ${JSON.stringify(data)}\n\n`);
    }

    broadcast(event: string, data: any) {

        console.log(data)
        for (const client of this.clients.values()) {
            client.write(`event: ${event}\n`);
            client.write(`data: ${JSON.stringify(data)}\n\n`);
        }
    }
}

export default new SSEService();