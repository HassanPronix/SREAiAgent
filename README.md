## Architecture
                        +-------------------+
                        | Kubernetes Cluster|
                        +---------+---------+
                                  |
             +--------------------+----------------------+
             |                    |                      |
      FluentBit Logs      K8s Events/API         Prometheus Metrics
             |                    |                      |
             v                    v                      v

                     +----------------------+
                     |    Kafka Cluster     |
                     |----------------------|
                     | logs-topic           |
                     | metrics-topic        |
                     | k8s-events-topic     |
                     | incidents-topic      |
                     | remediation-topic    |
                     +----------+-----------+
                                |
      -----------------------------------------------------
      |                    |                     |         |
      v                    v                     v         v

+-------------+   +----------------+   +---------------+  +----------------+
| Log Service |   | CorrelationSvc |   | EmbeddingSvc |  | Alert Service  |
+-------------+   +----------------+   +---------------+  +----------------+
| Consume     |   | Build incident |   | Generate      |  | Slack/Teams    |
| Store logs  |   | timeline       |   | embeddings    |  | PagerDuty      |
| MongoDB     |   | Root cause     |   | Store Qdrant  |  |                |
+------+------+   +--------+-------+   +-------+-------+  +--------+-------+
       |                    |                   |                   |
       |                    |                   |                   |
       v                    v                   v                   v

                +-------------------------------------+
                |              MongoDB               |
                |-------------------------------------|
                | Raw Logs                           |
                | Incident History                   |
                | Remediation Actions                |
                | K8s Events                         |
                | RCA Reports                        |
                +-------------------------------------+

                +-------------------------------------+
                |              Qdrant                |
                |-------------------------------------|
                | Log Embeddings                     |
                | Incident Embeddings                |
                | RCA Embeddings                     |
                | Runbook Embeddings                 |
                +-------------------------------------+

                               |
                               v

                  +----------------------------+
                  | Recommendation Engine      |
                  |----------------------------|
                  | LangChain                  |
                  | LangGraph                  |
                  | Similarity Search          |
                  | LLM                        |
                  +-------------+--------------+
                                |
                                v

                  +----------------------------+
                  | SRE Dashboard/API          |
                  | ExpressJS + TS             |
                  +-------------+--------------+
                                |
            ------------------------------------------------
            |                                              |
            v                                              v

+--------------------------+              +-----------------------------+
| Manual Approval          |              | Auto Remediation (optional)|
+--------------------------+              +-----------------------------+
| SRE approves action      |              | GitOps workflow            |
+------------+-------------+              +-------------+--------------+
             |                                            |
             v                                            v

     +----------------+                        +----------------+
     | Git Service    |                        | Git Repository |
     +----------------+                        +----------------+
     | Create YAML PR |----------------------->| k8s manifests |
     | Commit Changes |                        +--------+-------+
     +--------+-------+                                 |
              |                                         |
              v                                         v

                    +----------------------------------+
                    |            ArgoCD               |
                    +----------------------------------+
                    | Syncs deployment changes        |
                    +----------------------------------+
                                       |
                                       v

                           +--------------------+
                           | Kubernetes Cluster |
                           +--------------------+