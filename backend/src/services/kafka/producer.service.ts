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
          service: "kafka-producer"
        },

        "Kafka producer connected"
      );


    } catch (error) {


      logger.fatal(
        {
          err: error,

          service: "kafka-producer",

          incidentType:
            "KAFKA_PRODUCER_CONNECT_FAILURE"

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
          service: "kafka-producer"
        },

        "Kafka producer disconnected"
      );


    } catch (error) {


      logger.error(
        {
          err: error,

          service: "kafka-producer",

          incidentType:
            "KAFKA_PRODUCER_DISCONNECT_FAILURE"

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
          service: "kafka-producer",

          topic,

          messageSize:
            JSON.stringify(payload).length

        },

        "Kafka message published"
      );



    } catch (error) {


      logger.error(
        {
          err: error,

          service: "kafka-producer",

          incidentType:
            "KAFKA_PUBLISH_FAILURE",

          metadata: {

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


export const producerService = new ProducerService();