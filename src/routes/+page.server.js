// @ts-nocheck
import fs from "fs/promises";
import path from "path";
import { fail, redirect } from "@sveltejs/kit";

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, route, url }) => {
		try {
			const data = Object.fromEntries(await request.formData());
			console.log("DATA:", data);
			const filePath = path.join(
				process.cwd(),
				"static",
				`${crypto.randomUUID()}.${data.avatar.type.split("/")[1]}`
			);
			// console.log("FILE_PATH:", filePath);
			await fs.writeFile(filePath, Buffer.from(await data.avatar.arrayBuffer()));

			return { success: true };
		} catch (err) {
			console.log({ err });
			return fail(500, { error: err?.message });
		}
	},
};
