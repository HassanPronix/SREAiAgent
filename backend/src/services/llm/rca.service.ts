import { llm } from './llm.service.js';
import { PromptTemplate } from '@langchain/core/prompts';
import { z } from 'zod';

export class RCAService {

  static async analyze(currentIncident: any, similarIncidents: any[] = []) {

    const schema = z.object({
      summary: z.string(),
      rootCause: z.string(),

      remediation: z.array(z.string()),

      commands: z.array(z.string()),

      kubernetesYaml: z
        .string()
        .describe('Valid Kubernetes YAML manifest only. No explanation.'),

      confidence: z.number().min(0).max(100),

      explanation: z.string(),
    });

    const structuredLlm = llm.withStructuredOutput(schema);

    const formattedIncident = `
              [TITLE]
              ${currentIncident.title || ''}
                
              [SEVERITY]
              ${currentIncident.severity || ''}
                
              [MESSAGE]
              ${currentIncident.message || ''}
                
              [RESOURCE]
              ${currentIncident.resourceName || ''}
                
              [NAMESPACE]
              ${currentIncident.namespace || ''}
                
              [TIMESTAMP]
              ${currentIncident.occurredAt || ''}
                  `.trim();

    const topHistory = (similarIncidents || [])
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .slice(0, 5);

    const history = topHistory.length
      ? topHistory.map((incident, i) => `
              [SIMILAR INCIDENT ${i + 1}]
              Score: ${incident.score?.toFixed(3)}
                
              CONTENT:
              ${incident.content}
                
              METADATA:
              ${JSON.stringify(incident.metadata, null, 2)}
                    `.trim()).join('\n\n')
      : 'No historical incidents available';

    const prompt = PromptTemplate.fromTemplate(`
              You are a Senior Site Reliability Engineer (SRE) working in a Kubernetes + ArgoCD GitOps environment.
                  
              You MUST return output strictly matching the required schema.
                  
              ---
                  
              CURRENT INCIDENT:
              {incident}
                  
              ---
                  
              SIMILAR INCIDENTS:
              {history}
                  
              ---
                  
              TASK:
              1. Identify root cause based on evidence
              2. Generate safe remediation steps
              3. Provide SAFE kubectl commands only
              4. Generate VALID Kubernetes YAML for ArgoCD GitOps if needed
                  
              ---
                  
              STRICT RULES:
              - kubernetesYaml must be ONLY valid YAML (no markdown, no explanation)
              - commands must be SAFE (no destructive operations)
              - remediation must be actionable steps
              - confidence must be 0–100
              - do NOT include any extra text outside schema
                  
              ---
                  
              Return structured output only.
                  `);

    const chain = prompt.pipe(structuredLlm);

    try {
      const response = await chain.invoke({
        incident: formattedIncident,
        history,
      });

      return response;
    } catch (err) {
      console.error('RCA analysis failed:', err);

      return {
        summary: 'RCA generation failed',
        rootCause: 'Unknown',
        remediation: [],
        commands: [],
        kubernetesYaml: '',
        confidence: 0,
        explanation: 'Fallback triggered due to LLM parsing failure',
      };
    }
  }
}