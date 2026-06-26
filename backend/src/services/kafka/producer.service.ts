import { Producer } from "kafkajs";
import { kafka } from "../../config/kafka.js";
import { logger } from "../../config/logger.js";


class ProducerService {

  private producer: Producer;


  constructor() {

    this.producer =
      kafka.producer();

  }



  async connect() {

    try {

      await this.producer.connect();


      logger.info(
        {
          event: "kafka_producer_connected",

          metadata: {
            component: "kafka-producer"
          }
        },

        "Kafka producer connected"
      );


    } catch (error) {


      logger.fatal(
        {
          event: "kafka_producer_connect_failed",

          err: error,

          metadata: {

            component:
              "kafka-producer",

            incidentType:
              "KAFKA_PRODUCER_CONNECT_FAILURE"

          }

        },

        "Kafka producer connection failed"
      );


      throw error;
    }

  }





  async disconnect() {


    try {


      await this.producer.disconnect();



      logger.info(
        {
          event: "kafka_producer_disconnected",

          metadata: {
            component: "kafka-producer"
          }
        },

        "Kafka producer disconnected"
      );


    } catch (error) {


      logger.error(
        {
          event: "kafka_producer_disconnect_failed",

          err: error,

          metadata: {

            component:
              "kafka-producer",

            incidentType:
              "KAFKA_PRODUCER_DISCONNECT_FAILURE"

          }

        },

        "Kafka producer disconnect failed"
      );


      throw error;
    }

  }






  async publish(
    topic: string,
    payload: unknown
  ) {


    try {


      const messageSize =
        JSON.stringify(payload).length;



      await this.producer.send({

        topic,

        messages: [
          {
            value:
              JSON.stringify(payload)
          }
        ]

      });




      logger.debug(
        {
          event: "kafka_message_published",

          metadata: {

            component:
              "kafka-producer",

            topic,

            messageSize

          }

        },

        "Kafka message published"
      );



    } catch (error) {


      logger.error(
        {
          event: "kafka_publish_failed",

          err: error,

          metadata: {

            component:
              "kafka-producer",

            incidentType:
              "KAFKA_PUBLISH_FAILURE",

            topic,

            messageSize:
              JSON.stringify(payload).length

          }

        },

        "Kafka publish failed"
      );


      throw error;
    }

  }

}


export const producerService =
  new ProducerService();