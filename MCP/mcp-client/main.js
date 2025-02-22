import {WeatherMCPClient} from './client.js';

async function main() {
    const weatherClient = new WeatherMCPClient();
    await weatherClient.connectToClient();

    var weatherTools = await weatherClient.getTools();
    console.log("Tools \n")
    console.log(JSON.stringify(weatherTools, null, 2));
}

// Call the main function
main().catch(console.error);
