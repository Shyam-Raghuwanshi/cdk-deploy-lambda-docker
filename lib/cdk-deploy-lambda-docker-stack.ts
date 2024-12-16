import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import cdk = require("aws-cdk-lib");
import {
  Architecture,
  DockerImageCode,
  DockerImageFunction,
} from "aws-cdk-lib/aws-lambda";
import * as apigw from 'aws-cdk-lib/aws-apigateway'
export class CdkDeployLambdaDockerStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Define the Docker image Lambda function
    const lambdaFunction = new DockerImageFunction(
      this,
      "lambdaFunction5",
      {
        code: DockerImageCode.fromImageAsset("lib/docker"),
        architecture: Architecture.X86_64,
        memorySize: 1024,
        timeout: cdk.Duration.seconds(300),
        environment: {
          NODE_OPTIONS: "--enable-source-maps",
        },
      }
    );
    // Add a Function URL
    // const functionUrl = lambdaFunction.addFunctionUrl({
    //   authType: FunctionUrlAuthType.NONE,
    // });

    // new CfnOutput(this, "FunctionUrl", {
    //   value: functionUrl.url,
    // });

    new apigw.LambdaRestApi(this, 'myapi', {
      handler: lambdaFunction,
    })
  }
}
