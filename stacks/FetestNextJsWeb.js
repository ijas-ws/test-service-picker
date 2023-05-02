import { StaticSite } from "sst/constructs";

	export function FetestNextJsWeb({ stack }) {
		const bucketprefix = "fetest-next-js-web";
		const environment = "develop";
		const bucketName = `${bucketprefix}-${environment}`;
	
		// Deploy our web app
		const site = new StaticSite(stack, "FetestNextJsWebSite", {
			path: "fetest-next-js-web",
			buildCommand: "yarn run build:dev",
			buildOutput: "out",
			cdk: {
				bucket: {
					bucketName,
				},
				distribution: {
					comment: `Distribution for ${bucketName}`,
				},
			},
		});
	
		// Show the URLs in the output
		stack.addOutputs({
			SiteUrl: site.url || "http://localhost:3000/",
			distributionId: site.cdk?.distribution?.distributionId,
			bucketName: site.cdk?.bucket?.bucketName,
		});
	}