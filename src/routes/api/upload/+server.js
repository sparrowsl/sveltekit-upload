// @ts-nocheck
// import fs from "fs";
import fs from "fs/promises";
import path from "path";

import { json, fail } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, url }) {
	const form = await request.formData();

	try {
		const data = Object.fromEntries(await request.formData());
		const filePath = path.join(
			process.cwd(),
			"static",
			"avatars",
			`${crypto.randomUUID()}.${data.avatar.type.split("/")[1]}`
		);
		await fs.writeFile(filePath, Buffer.from(await data.avatar?.arrayBuffer()));
		// TODO: store the file path in database for further references.
		return json({ path: filePath });
	} catch (err) {
		throw fail(500, { err: err });
	}

	// console.log(data.file);
	// console.log(process.cwd());
	// try {
	// const data = Object.fromEntries(await request.formData());
	// const filePath = path.join(
	// 	process.cwd(),
	// 	"uploads",
	// 	`${data.file}`
	// 	//`${crypto.randomUUID()}.${data.avatar.type.split("/")[1]}`
	// );
	// console.log("ablob...");
	// const ablob = new Blob(await data.file.arrayBuffer());
	// console.log({ ablob });
	// console.log("before writing");
	// fs.writeFileSync("./", ablob);
	// // 	// TODO: store the file path in database for further references.
	// console.log("before returning");
	// return json(String({ path: filePath }));
	// } catch (err) {
	// 	throw fail(500, { err });
	// }

	return json({ image: form.get("file") });
}
