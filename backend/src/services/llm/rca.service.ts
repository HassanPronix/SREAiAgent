import { llm } from "./llm.service.js";
import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "@langchain/core/output_parsers";


export class RCAService {

    static async analyze(currentIncident: any, similarIncidents: any[] = []) {

        const hasHistory = similarIncidents.length > 0;

        const parser = StructuredOutputParser.fromNamesAndDescriptions({
            summary: "Short summary of the incident",
            rootCause: "Probable root cause",
            remediation: "Array of remediation steps",
            confidence: "Confidence percentage number between 0 and 100",
            explanation: "Reasoning behind the RCA"
        });


        const history = hasHistory ? similarIncidents.map((incident, index) => `
                            Incident ${index + 1}
                                
                            Content:
                            ${incident.content}
                                
                            Metadata:
                            ${JSON.stringify(incident.metadata)}`)
            .join("\n") : "No historical incidents available";

        const prompt = PromptTemplate.fromTemplate(`
                            You are an expert Kubernetes Site Reliability Engineer.
                                    
                            Analyze the CURRENT INCIDENT.
                                    
                            CURRENT INCIDENT:
                            {incident}
                                    
                                    
                            ${hasHistory ? `
                            SIMILAR HISTORICAL INCIDENTS:
                            
                            {history}
                            
                            Use historical incidents to:
                            - identify patterns
                            - compare failures
                            - suggest proven remediation steps
                            ` : `
                            No similar historical incident exists.
                            
                            Only provide:
                            - probable root cause
                            - explanation
                            
                            Do NOT invent remediation from history.
                            `}
                            
                            
                            Rules:
                            - Return only valid JSON.
                            - Confidence must be a number.
                            - remediation must be an array.
                            
                            {format}
                            `);


        const chain = prompt.pipe(llm).pipe(parser);


        const response = await chain.invoke({

            incident: JSON.stringify(currentIncident, null, 2),

            history,

            format: parser.getFormatInstructions()
        });

        return response;
    }
}