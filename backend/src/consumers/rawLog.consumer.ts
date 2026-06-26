import { ConsumerService } from "../services/kafka/consumer.service.js";
import { TOPICS } from "../services/kafka/topics.js";
import { logger } from "../config/logger.js";
import { logRepository } from "../repositories/log.repository.js";
import { normalizeFluentBitLog } from "../services/normalizers/fluentbit_normalizer.js";


const consumer = new ConsumerService(
  "raw-log-group"
);


export async function startRawLogConsumer() {

  try {

    await consumer.connect();


    logger.info(
      {
        service: "raw-log-consumer",
        groupId: "raw-log-group"
      },
      "Raw log consumer connected"
    );



    await consumer.subscribe(
      [TOPICS.RAW_LOGS]
    );


    logger.info(
      {
        topic: TOPICS.RAW_LOGS
      },
      "Subscribed to raw logs topic"
    );



    await consumer.run(async (_, message) => {


      const receivedAt = new Date();


      try {

        const payload = JSON.parse(message);



        logger.debug(
          {
            topic: TOPICS.RAW_LOGS,

            receivedAt,

            source:
              payload.service ||
              payload.container ||
              payload.tag ||
              "unknown"

          },

          "Raw log received"
        );



        const normalized =
          normalizeFluentBitLog(payload);



        await logRepository.create(
          normalized
        );



        logger.info(
          {
            topic: TOPICS.RAW_LOGS,

            source:
              normalized.source ||
              "unknown",

            severity:
              normalized.severity ||
              "unknown"
          },

          "Raw log stored"
        );



      } catch (error) {


        logger.error(
          {
            err: error,

            service: "raw-log-consumer",

            component:
              "fluentbit-ingestion",

            incidentType:
              "RAW_LOG_PROCESSING_FAILURE",

            metadata: {
              topic: TOPICS.RAW_LOGS,
              receivedAt
            }

          },

          "Failed to process raw log"

        );

      }

    });


  } catch (error) {


    logger.fatal(
      {
        err: error,

        service: "raw-log-consumer",

        component:
          "fluentbit-ingestion",

        incidentType:
          "RAW_LOG_CONSUMER_START_FAILURE"
      },

      "Raw log consumer failed to start"
    );


    process.exit(1);
  }
}