import { QdrantVectorStore } from "@langchain/qdrant";
import { embeddings } from "../embeddings/embeddings.service.js";
import { logger } from "../../config/logger.js";


let vectorStore: QdrantVectorStore;



export async function initializeVectorStore() {


    logger.info(
        {
            event: "vector_store_initialization_started",

            metadata: {

                component:
                    "qdrant",

                collection:
                    "incidents"

            }

        },

        "Initializing vector store"
    );


    try {


        vectorStore =
            await QdrantVectorStore.fromExistingCollection(
                embeddings,
                {
                    url: process.env.QDRANT_URL!,
                    collectionName: "incidents",
                }
            );



        logger.info(
            {
                event: "vector_store_initialized",

                metadata: {

                    component:
                        "qdrant",

                    collection:
                        "incidents",

                    url:
                        process.env.QDRANT_URL

                }

            },

            "Vector store initialized successfully"
        );


        return vectorStore;


    } catch (error) {


        logger.error(
            {
                event: "vector_store_initialization_failed",

                err: error,

                metadata: {

                    component:
                        "qdrant",

                    collection:
                        "incidents"

                }

            },

            "Failed to initialize vector store"
        );


        throw error;
    }
}





export function getVectorStore() {


    if (!vectorStore) {


        const error =
            new Error(
                "Vector store not initialized"
            );


        logger.error(
            {
                event: "vector_store_not_ready",

                err: error,

                metadata: {

                    component:
                        "qdrant"

                }

            },

            "Attempted to access vector store before initialization"
        );


        throw error;
    }



    logger.debug(
        {
            event: "vector_store_accessed",

            metadata: {

                component:
                    "qdrant"

            }

        },

        "Returning vector store instance"
    );


    return vectorStore;
}