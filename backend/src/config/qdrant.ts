import { QdrantClient } from '@qdrant/js-client-rest';

export const client = new QdrantClient({
  url: process.env.QDRANT_URL || 'http://localhost:6333',
});
