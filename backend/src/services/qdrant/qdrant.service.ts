import { QdrantClient } from '@qdrant/js-client-rest';

class QdrantService {
  public client: QdrantClient;

  constructor() {
    this.client = new QdrantClient({ url: process.env.QDRANT_URL || 'http://localhost:6333' });
  }

  async createCollection() {
    const collections = await this.client.getCollections();

    const exists = collections.collections.some(c => c.name === 'incident_knowledge');

    if (exists) return;

    await this.client.createCollection('incident_knowledge', {
      vectors: {
        size: 1536, // OpenAI embedding size
        distance: 'Cosine',
      },
    });
  }
}

export const qdrantService = new QdrantService();
