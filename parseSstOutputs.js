import * as fs from "fs";

function parseOutputs() {
	const outputFile = "./.sst/outputs.json";
	let fileContent = JSON.parse(fs.readFileSync(outputFile, "utf-8"));

	Object.keys(fileContent).some((k) => {
		if (k.endsWith("Pg") || k.endsWith("Mysql")) {
			if (fileContent[k]?.logdriveroptions) {
				fileContent[k].logdriveroptions = JSON.parse(
					fileContent[k].logdriveroptions
				);
			}
		}
	});
	fileContent = JSON.stringify(fileContent, null, 2);
	fs.writeFileSync(outputFile, fileContent);
}
parseOutputs();	
