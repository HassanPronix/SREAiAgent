## Folder structure
src/
│
├── app/
│   ├── dashboard/
│   ├── incidents/
│   │    └── [id]/
│   ├── recommendations/
│   ├── chat/
│   ├── clusters/
│   ├── deployments/
│   ├── runbooks/
│   ├── postmortems/
│   ├── settings/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── layout/
│   ├── dashboard/
│   ├── incidents/
│   ├── recommendations/
│   ├── clusters/
│   ├── deployments/
│   ├── chat/
│   ├── runbooks/
│   └── ui/
│
├── services/
│   ├── api.ts
│   ├── websocket.ts
│   ├── incidents.ts
│   ├── recommendations.ts
│   └── clusters.ts
│
├── store/
│   ├── incident-store.ts
│   ├── chat-store.ts
│   ├── recommendation-store.ts
│   └── cluster-store.ts
│
├── hooks/
│   ├── useIncidents.ts
│   ├── useSocket.ts
│   ├── useRecommendations.ts
│   └── useClusters.ts
│
├── providers/
│   ├── QueryProvider.tsx
│   ├── SocketProvider.tsx
│   └── ThemeProvider.tsx
│
├── types/
│   ├── incident.ts
│   ├── cluster.ts
│   ├── recommendation.ts
│   └── chat.ts
│
├── lib/
├── styles/
└── assets/
