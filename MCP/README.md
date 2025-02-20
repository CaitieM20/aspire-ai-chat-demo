
# MCP
Spawns Servers by launching a process and communicating with it over stdin/stdout...These "servers" are really just python on javascript scripts that are being invoked. There is no process isolation.

The protocol defines ways to expose tools, prompts, resources... However most implementations only define Tools.  

```json
Tools

{
  "tools": [
    {
      "name": "get-alerts",
      "description": "Get weather alerts for a state",
      "inputSchema": {
        "type": "object",
        "properties": {
          "state": {
            "type": "string",
            "minLength": 2,
            "maxLength": 2,
            "description": "Two-letter state code (e.g. CA, NY)"
          }
        },
        "required": [
          "state"
        ],
        "additionalProperties": false,
        "$schema": "http://json-schema.org/draft-07/schema#"
      }
    },
    {
      "name": "get-forecast",
      "description": "Get weather forecast for a location",
      "inputSchema": {
        "type": "object",
        "properties": {
          "latitude": {
            "type": "number",
            "minimum": -90,
            "maximum": 90,
            "description": "Latitude of the location"
          },
          "longitude": {
            "type": "number",
            "minimum": -180,
            "maximum": 180,
            "description": "Longitude of the location"
          }
        },
        "required": [
          "latitude",
          "longitude"
        ],
        "additionalProperties": false,
        "$schema": "http://json-schema.org/draft-07/schema#"
      }
    }
  ]
}
```

MCP also standarizes the response types from tools

```json
{
    "content":{
            "type": "text",
            "text": "No active alerts for WA",
          }
}
```

# OpenAI Functions Definitions
[text](https://platform.openai.com/docs/guides/function-calling)

```json
tools = [{
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "Get current temperature for a given location.",
        "parameters": {
            "type": "object",
            "properties": {
                "location": {
                    "type": "string",
                    "description": "City and country e.g. Bogotá, Colombia"
                }
            },
            "required": [
                "location"
            ],
            "additionalProperties": False
        },
        "strict": True
    }
}]
```
With OpenAI's Function calling implementation developers must define the tools and then implement the calling of them once invoked by the model.

MCP provides extensibility modules via scripts (Python or TypeScript). The basic protocol supplies an API to get all supported tools

It then provides an API for passing the calls to the script to be invoked on the users behalf.  Each script must configure it's own auth, etc...

# Notes
This feels like its ripe for some kind of IDL and auto client generation. Also should we really just be invoking scripts?  Seems like having a more robust process/API boundary here would be better.

If we can get a real RPC here then we can instrument distributed tracing, auth, metrics, etc...
