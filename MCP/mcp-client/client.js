import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";


class WeatherMCPClient{
    constructor(){
        this.transport = new StdioClientTransport({
            command: "node",
            args: ["..\\mcp-server\\build\\weatherMCPServer.js"]
            });
    }

    async connectToClient(){
        this.client = new Client(
            {
                name: "weather-client",
                version: "1.0.0"
            },
            {
                capabilities: {
                prompts: {},
                resources: {},
                tools: {}
                }
            }
        );

        await this.client.connect(this.transport);
    }

    async getTools(){
        if(this.client.tools === undefined){
            this.client.tools = await this.client.listTools();
        }

        return this.client.tools;
    }

    async getPrompts(){
        if(this.client.prompts === undefined){
            this.client.prompts = await this.client.listPrompts();
        }

        return this.client.prompts;
        
    }

}

export {WeatherMCPClient};

