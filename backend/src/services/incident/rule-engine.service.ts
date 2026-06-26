import { NormalizedEvent } from "../../interfaces/normalized-event.interface.js";

export class RuleEngine {

    static shouldCreateIncident(
        event: NormalizedEvent
    ): boolean {

        if (
            event.severity === "CRITICAL"
        ) {
            return true;
        }

        const msg =
            event.message.toLowerCase();

        const keywords = [
            "crashloopbackoff",
            "oomkilled",
            "node notready",
            "deployment failed",
            "out of memory"
        ];

        return keywords.some(keyword =>
            msg.includes(keyword)
        );
    }
}