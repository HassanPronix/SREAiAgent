import { client } from "../../config/qdrant.js";

export async function bootstrapQdrant() {


    const collectionName = process.env.QDRANT_COLLECTION || "incident_knowledge";

    const collections = await client.getCollections();

    const exists = collections.collections.some(c => c.name === collectionName);

    if (exists) return;

    await client.createCollection(
        collectionName,
        {
            vectors: {
                size: 1536,
                distance: "Cosine"
            }
        }
    );

    console.log(
        `${collectionName} collection created`
    );
}