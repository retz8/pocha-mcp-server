# Pocha MCP Server

A Model Context Protocol (MCP) server that generates TypeScript API functions for the Pocha project. This server provides a tool to automatically generate type-safe API function templates following a consistent pattern.

## Features

- Generates TypeScript API functions with proper typing
- Supports GET, POST, PUT, DELETE HTTP methods
- Includes authentication token handling
- Generates proper error handling and response typing
- Supports optional parameters and return types

## Installation

```bash
# Clone the repository
git clone https://github.com/jiohjung98/pocha-mcp-server.git

# Install dependencies
pnpm install

# Build the project
pnpm build
```

## Usage

The server provides a tool called `generate-api-function` that accepts the following parameters:

```typescript
{
  functionName: string;          // Name of the API function to generate
  route: string;                 // API route path (e.g., "/pocha/${pochaid}")
  method: "GET" | "POST" | "PUT" | "DELETE";  // HTTP method
  params?: {                     // Optional array of parameters
    name: string;               // Parameter name
    type: string;               // Parameter type
  }[];
  returnType: string;           // Return type of the API function
}
```

### Example

To generate an API function for fetching Pocha information:

```typescript
// Input parameters
{
  "functionName": "getPocha",
  "route": "/pocha/${pochaid}",
  "method": "GET",
  "params": [
    {
      "name": "pochaid",
      "type": "number"
    }
  ],
  "returnType": "PochaInfo"
}

// Generated output
/**
 * @desc getPocha
 * @route GET /pocha/${pochaid}
 */
export async function getPocha(pochaid: number, token: string): Promise<PochaInfo> {
  const url = `/pocha/${pochaid}`;
  try {
    const response = await client.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response?.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error in getPocha");
  }
}
```

## Development

The server is built using:

- TypeScript
- MCP TypeScript SDK
- Zod for schema validation

To start development:

```bash
# Install dependencies
pnpm install

# Build in watch mode
pnpm dev
```

## Project Structure

```
pocha-mcp-server/
├── src/
│   └── index.ts     # Main server implementation
├── dist/            # Compiled JavaScript
├── package.json
└── tsconfig.json
```

## Cursor Setup

To use this MCP server in your Cursor IDE:

1. Open your Cursor MCP configuration file:

   ```bash
   # macOS
   ~/.cursor/mcp.json

   # Windows
   %APPDATA%/cursor/mcp.json

   # Linux
   ~/.cursor/mcp.json
   ```

2. Add the following configuration to the `mcpServers` object:

   ```json
   {
     "mcpServers": {
       "pocha-api-generator": {
         "command": "/opt/homebrew/bin/npx",
         "args": ["-y", "node", "/path/to/your/pocha-mcp-server/dist/index.js"]
       }
     }
   }
   ```

   Replace `/path/to/your/pocha-mcp-server` with the actual path where you cloned this repository.

3. Restart Cursor for the changes to take effect.

4. The MCP server will now be available in Cursor, and you can use it to generate API functions by typing natural language commands like:
   ```
   Can you create a sample API for pocha project that fetches PochaInfo from "/pocha/${pochaid}" using "pocha-api-generator" mcp?
   ```

## License

MIT License
