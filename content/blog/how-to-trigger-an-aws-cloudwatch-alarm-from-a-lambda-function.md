---
title: "How to Trigger an AWS CloudWatch Alarm from a Lambda Function"
slug: "how-to-trigger-an-aws-cloudwatch-alarm-from-a-lambda-function"
description: "In this post, we are going to use the AWS CDK and TypeScript to build a Lambda Function that triggers a CloudWatch Alarm that sends an email when an invocation error occurs.\nAll of the code can be found in this repository.\nSetup\nWe need to run a few ..."
publishedAt: "2022-05-10T15:18:47.656Z"
readTimeInMinutes: 4
tags: ["aws","typescript","aws-cdk"]
coverImage: "/blog/how-to-trigger-an-aws-cloudwatch-alarm-from-a-lambda-function/cover.png"
draft: false
---
In this post, we are going to use the AWS CDK and TypeScript to build a Lambda Function that triggers a CloudWatch Alarm that sends an email when an invocation error occurs.

All of the code [can be found in this repository](https://github.com/alexkates/how-to-trigger-cloudwatch-alarm-from-lambda).

## Setup
We need to run a few commands to set up our CDK app.

```shell
mkdir how-to-trigger-cloudwatch-alarm-from-lambda
cd how-to-trigger-cloudwatch-alarm-from-lambda
npx cdk init app --language typescript
```

This should build the following directory structure.
![Directory structure after running the CDK init command](/blog/how-to-trigger-an-aws-cloudwatch-alarm-from-a-lambda-function/image-01.png align="left")

Also, make sure to have the AWS CLI configured. For more information follow [the AWS CLI quickstart guide](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html).

## Create the Lambda Function

Deploying a Lambda function requires bootstrapping the CDK app which builds an S3 bucket where the Lambda's source code will live. This is a one-time operation.

```shell
npx cdk bootstrap
```

Install esbuild so the TypeScript can be efficiently compiled and minified into JavaScript. This isn't a requirement, but having [esbuild installed will bypass the need for docker](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda_nodejs-readme.html#local-bundling).
```shell
npm install -D esbuild
```

Create src/index.ts and paste the following code which will throw an error on invocation.

```typescript
export function handler() {
  throw new Error("error");
}
```

Open `lib/how-to-trigger-cloudwatch-alarm-from-lambda.ts` and define the new Lambda function.

```typescript
const nodejsFunction = new NodejsFunction(
  this,
  "how-to-trigger-cloudwatch-alarm-from-lambda",
  {
    handler: "handler", // The name of the TypeScript function to invoke.
    runtime: Runtime.NODEJS_14_X, // The Node.js runtime to use.
    entry: "src/index.ts", // The TypeScript file that contains the handler function.
  }
);
```
Now let's deploy the Stack to AWS.
```shell
npx cdk deploy --require-approval never
```

## Create the CloudWatch Alarm

Open lib/how-to-trigger-cloudwatch-alarm-from-lambda.ts and add the CloudWatch Metric and Alarm.

```typescript
const numberOfFunctionErrors = nodejsFunction.metricErrors( // Capture invocation errors.
  {
    period: Duration.minutes(1), // Sum invocation errors each minute.
  }
);

const alarm = new Alarm(
  this,
  "how-to-trigger-cloudwatch-alarm-from-lambda-alarm",
  {
    metric: numberOfFunctionErrors, // Watch the number of invocations.
    threshold: 1, // Compare to the threshold of 1.
    evaluationPeriods: 1, // Look within the context of 1 evaluation period.
    comparisonOperator:
      ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD, // Trigger if greater than or equal to 1.
  }
);

## Create the SNS Email Subscription

Open `lib/how-to-trigger-cloudwatch-alarm-from-lambda.ts` and add the SNS Topic, Email Subscription and SNS Action.

```typescript
const topic = new Topic(
  this,
  "how-to-trigger-cloudwatch-alarm-from-lambda-topic"
);
topic.addSubscription(new EmailSubscription("your@email.com")); // Add a new email subscription to the SNS topic.
alarm.addAlarmAction(new SnsAction(topic)); // Add a new SNS Action to the CloudWatch Alarm.
```

## Stack Summary
After piecing everything together, your `lib/how-to-trigger-cloudwatch-alarm-from-lambda.ts` should look like this.

```typescript
import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { Alarm, ComparisonOperator } from "aws-cdk-lib/aws-cloudwatch";
import { Topic } from "aws-cdk-lib/aws-sns";
import { EmailSubscription } from "aws-cdk-lib/aws-sns-subscriptions";
import { SnsAction } from "aws-cdk-lib/aws-cloudwatch-actions";

export class HowToTriggerCloudwatchAlarmFromLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const nodejsFunction = new NodejsFunction(
      this,
      "how-to-trigger-cloudwatch-alarm-from-lambda",
      {
        handler: "handler",
        runtime: Runtime.NODEJS_14_X,
        entry: "src/index.ts",
      }
    );

    const numberOfFunctionErrors = nodejsFunction.metricErrors({
      period: Duration.minutes(1),
    });

    const alarm = new Alarm(
      this,
      "how-to-trigger-cloudwatch-alarm-from-lambda-alarm",
      {
        metric: numberOfFunctionErrors,
        threshold: 1,
        evaluationPeriods: 1,
        comparisonOperator:
          ComparisonOperator.GREATER_THAN_OR_EQUAL_TO_THRESHOLD,
      }
    );

    const topic = new Topic(
      this,
      "how-to-trigger-cloudwatch-alarm-from-lambda-topic"
    );

    topic.addSubscription(new EmailSubscription("your@email.com")); // Update with your email!

    alarm.addAlarmAction(new SnsAction(topic));
  }
}

```

Let's do one final deployment.

```shell
npx cdk deploy --require-approval never
```

## Testing
Let's use the AWS CLI to test everything.

First, let's get the Lambda Function name, which can be found using the following command
```shell
aws lambda list-functions
```

Next, using the Lambda Function name from the previous command, use the AWS CLI to invoke the Lambda Function.

```shell
 aws lambda invoke \
  --function-name "HowToTriggerCloudwatchAla-howtotriggercloudwatchal-aYncvjc4a5RT" \
  response.json
```

Wait about a minute and check the email address that was configured for the SNS Email subscription. If all went well, an email should have been sent with a subject similar to `ALARM: "HowToTriggerCloudwatchAlarmFromLambdaStack-howtotriggercloudwat..." in US East (N. Virginia)`

## Clean Up
Don't forget to delete the stack when finished!
```shell
npx cdk destroy
```

Thanks for reading! If you found this useful, please follow me here 
https://dev.to/thealexkates
https://twitter.com/thealexkates
