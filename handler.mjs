import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import { createGeneratorByType } from "struct-fakerator";

import { customMatch } from "./generate.mjs";

export const app = new Hono();

app.post("/", async (c) => {
	const contentType = c.req.header("content-type");

	if (contentType !== "application/json") {
		throw new HTTPException(400, { message: "Bad request message" });
	}

	const body = await c.req.json();

	const { config } = body;

	try {
		const result = createGeneratorByType(config, customMatch)();
		return c.json({ result });
	} catch (err) {
		throw new HTTPException(400, { message: err.toString() });
	}
});
