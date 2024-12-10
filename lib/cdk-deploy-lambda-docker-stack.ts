import { CfnOutput, Duration, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import cdk = require("aws-cdk-lib");
import {
  Architecture,
  DockerImageCode,
  DockerImageFunction,
  FunctionUrlAuthType,
} from "aws-cdk-lib/aws-lambda";
export class CdkDeployLambdaDockerStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Define the Docker image Lambda function
    const lambdaFunction = new DockerImageFunction(
      this,
      "lambdaFunction",
      {
        code: DockerImageCode.fromImageAsset("lib/docker"),
        architecture: Architecture.X86_64,
        memorySize: 512,
        timeout: cdk.Duration.seconds(15),
        environment: {
          NODE_OPTIONS: "--enable-source-maps",
        },
      }
    );
    // Add a Function URL
    const functionUrl = lambdaFunction.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
    });

    new CfnOutput(this, "FunctionUrl", {
      value: functionUrl.url,
    });
  }
}
