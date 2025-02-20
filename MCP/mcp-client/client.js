import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

export async function createClient(){
    const transport = new StdioClientTransport({
    command: "node",
    args: ["..\\mcp-server\\build\\weatherMCPServer.js"]
    });

    const client = new Client(
    {
        name: "example-client",
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

    await client.connect(transport);

    var tools = await client.listTools();
    console.log("Tools \n")
    console.log(JSON.stringify(tools, null, 2));
}

