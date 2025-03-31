import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
const server = new McpServer({
    name: "pocha-api-generator",
    version: "1.0.0",
});
server.tool("generate-api-function", {
    functionName: z.string(),
    route: z.string(),
    method: z.enum(["GET", "POST", "PUT", "DELETE"]),
    params: z
        .array(z.object({
        name: z.string(),
        type: z.string(),
    }))
        .optional(),
    returnType: z.string(),
}, async ({ functionName, route, method, params = [], returnType }) => {
    var _a;
    const functionParams = [
        ...params.map((p) => `${p.name}: ${p.type}`),
        "token: string",
    ].join(", ");
    const code = `/**
 * @desc ${functionName}
 * @route ${method} ${route}
 */
export async function ${functionName}(${functionParams}): Promise<${returnType}> {
  const url = \`${route}\`;
  try {
    const response = await client.${method.toLowerCase()}(url, {
      headers: {
        Authorization: \`Bearer \${token}\`,
      },
      ${method === "POST" || method === "PUT"
        ? `data: ${((_a = params[0]) === null || _a === void 0 ? void 0 : _a.name) || "{}"},`
        : ""}
    });

    return response?.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error in ${functionName}");
  }
}`;
    return {
        content: [{ type: "text", text: code }],
    };
});
const transport = new StdioServerTransport();
await server.connect(transport);
console.error("Pocha API Generator MCP Server running on stdio");
//# sourceMappingURL=index.js.map