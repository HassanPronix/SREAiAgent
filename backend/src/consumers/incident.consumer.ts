import { ConsumerService } from "../services/kafka/consumer.service.js";
import { TOPICS } from "../services/kafka/topics.js";
import { logger } from "../config/logger.js";
import { IncidentService } from "../services/incident/incident.service.js";


const consumer = new ConsumerService(
    "incident-detector-group"
);


export async function startIncidentConsumer() {

    try {

        await consumer.connect();


        logger.info(
            {
                event: "incident_consumer_connected",

                metadata: {
                    component: "incident-detector",
                    groupId: "incident-detector-group"
                }
            },

            "Incident consumer connected"
        );


        await consumer.subscribe([
            TOPICS.BACKEND_LOGS,
            TOPICS.METRIC_ANOMALIES,
            TOPICS.POD_EVENTS,
            TOPICS.NODE_EVENTS,
            TOPICS.DEPLOYMENT_EVENTS,
        ]);


        logger.info(
            {
                event: "incident_consumer_subscribed",

                metadata: {
                    component: "incident-detector",

                    topics: [
                        TOPICS.BACKEND_LOGS,
                        TOPICS.METRIC_ANOMALIES,
                        TOPICS.POD_EVENTS,
                        TOPICS.NODE_EVENTS,
                        TOPICS.DEPLOYMENT_EVENTS,
                    ]
                }
            },

            "Incident consumer subscribed"
        );



        await consumer.run(async (topic, message) => {


            const receivedAt = new Date();


            try {

                const payload = JSON.parse(message);



                logger.debug(
                    {
                        event: "incident_event_received",

                        metadata: {
                            topic,

                            eventType:
                                payload.type ||
                                payload.reason ||
                                payload.level ||
                                "unknown",

                            receivedAt
                        }
                    },

                    "Incident event received"
                );



                await IncidentService.processEvent(
                    topic,
                    payload
                );



                logger.info(
                    {
                        event: "incident_event_processed",

                        metadata: {
                            topic,
                            processor: "completed"
                        }
                    },

                    "Incident event processed"
                );



            } catch (error) {


                logger.error(
                    {
                        event: "incident_processing_failed",

                        err: error,

                        metadata: {
                            component: "incident-detector",

                            incidentType:
                                "INCIDENT_PROCESSING_FAILURE",

                            topic,
                            receivedAt
                        }
                    },

                    "Failed to process incident event"
                );

            }

        });


    } catch (error) {


        logger.fatal(
            {
                event: "incident_consumer_start_failed",

                err: error,

                metadata: {
                    component: "incident-detector",

                    incidentType:
                        "INCIDENT_CONSUMER_START_FAILURE"
                }
            },

            "Incident consumer failed to start"
        );


        process.exit(1);
    }
}