import { Request, Response } from "express";
import crypto from "crypto";
import SSEService from "../services/sse/sse.service.js";

class SSEController {

    connect(req: Request, res: Response) {

        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        res.flushHeaders();

        const clientId = crypto.randomUUID();

        SSEService.addClient(clientId, res);

        res.write(`event: connected\n`);
        res.write(`data: ${JSON.stringify({ clientId })}\n\n`);

        req.on("close", () => {
            SSEService.removeClient(clientId);
        });
    }

}

export default new SSEController();