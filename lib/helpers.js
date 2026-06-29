import { loadSync } from "jsr:@std/dotenv";
import { fromFileUrl } from "jsr:@std/path";
import Anthropic from "npm:@anthropic-ai/sdk";

// Load .env from the project root (one level up from this lib/ file) so your key
// is found no matter which directory the Jupyter kernel runs in. An existing
// ANTHROPIC_API_KEY in the environment wins; a missing .env is tolerated.
loadSync({ envPath: fromFileUrl(new URL("../.env", import.meta.url)), export: true });

export const MODEL = "claude-sonnet-4-6";

export const client = new Anthropic({ apiKey: Deno.env.get("ANTHROPIC_API_KEY") });

/**
 * Send a single-turn prompt to Claude and return the text of the response.
 * @param {string} prompt   the user message
 * @param {string} [system] optional system prompt ("" = none)
 */
export async function getCompletion(prompt, system) {
  system = system ?? "";
  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 2000,
    temperature: 0,
    system,
    messages: [{ role: "user", content: prompt }],
  });
  return message.content[0].text;
}
