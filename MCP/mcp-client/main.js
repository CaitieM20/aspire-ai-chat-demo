// filepath: /c:/Users/camccaff/src/AspireAgent/aspire-ai-chat-demo/MCP/mcp-client/main.js
import { createClient } from './client.js';

async function main() {
  const client = await createClient();

}

// Call the main function
main().catch(console.error);
