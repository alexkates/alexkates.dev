---
title: "How to Trigger an AWS Lambda Function from a Kinesis Stream"
slug: "how-to-trigger-an-aws-lambda-function-from-a-kinesis-stream"
description: "In this post, we are going to use the AWS CDK to build an AWS Lambda Function that triggers from an AWS Kinesis Stream.\nAll of the code can be found in this repository.\nSetup\nWe need to run a few commands to set up our CDK app.\nmkdir how-to-trigger-l..."
publishedAt: "2022-01-28T01:31:45.989Z"
readTimeInMinutes: 3
tags: ["aws","2articles1week"]
coverImage: "/blog/how-to-trigger-an-aws-lambda-function-from-a-kinesis-stream/cover.png"
draft: false
---
In this post, we are going to use the AWS CDK to build an AWS Lambda Function that triggers from an AWS Kinesis Stream.

All of the code [can be found in this repository](https://github.com/alexkates/how-to-trigger-lambda-from-kinesis).

## Setup
We need to run a few commands to set up our CDK app.

```shell
mkdir how-to-trigger-lambda-from-kinesis
cd how-to-trigger-lambda-from-kinesis
npx cdk init app --language typescript
```

This should give you the following directory structure.
![Directory structure after running the CDK init command](/blog/how-to-trigger-an-aws-lambda-function-from-a-kinesis-stream/image-01.png)

Also, make sure you have your AWS CLI configured. For more information follow [the AWS CLI quickstart guide](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html).

## Create a Kinesis Stream
Install the Kinesis CDK package.

```shell
npm i @aws-cdk/aws-kinesis
```

Open `lib/how-to-trigger-lambda-from-kinesis-stack.ts`, add a new Kinesis stream, and deploy.

```typescript
import * as cdk from '@aws-cdk/core';
import * as kinesis from '@aws-cdk/aws-kinesis';

export class HowToTriggerLambdaFromKinesisStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const stream = new kinesis.Stream(this, 'MyKinesisStream', {
      streamName: 'MyKinesisStream',
    });
  }
}

```
Nice! Let's deploy the stack.

`npm run cdk deploy`

## Create a Lambda

Install the Lambda CDK package.

```shell
npm i @aws-cdk/aws-lambda
```

Deploying a Lambda function requires bootstrapping your CDK app which gives us an S3 bucket where our Lambda's source code will live. This is a one-time operation.

```shell
npm run cdk bootstrap
```

Create src/index.js and paste the following code

```javascript
exports.handler = async (event) => {
  event.Records.forEach((record) => {
    console.log('Record: %j', record);
  });
};
```

Open `lib/how-to-trigger-lambda-from-kinesis-stack.ts`, add a new Lambda function, and deploy.

```typescript
import * as cdk from '@aws-cdk/core';
import * as kinesis from '@aws-cdk/aws-kinesis';
import * as lambda from '@aws-cdk/aws-lambda';

export class HowToTriggerLambdaFromKinesisStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const stream = new kinesis.Stream(this, 'MyKinesisStream', {
      streamName: 'MyKinesisStream',
    });

    const lambdaFunction = new lambda.Function(this, 'Function', {
      code: lambda.Code.fromAsset('src'),
      handler: 'index.handler',
      functionName: 'KinesisMessageHandler',
      runtime: lambda.Runtime.NODEJS_12_X,
    });
  }
}
```
Deploy again ...
```shell
npm run cdk deploy
```

You may need to confirm some IAM changes.
![IAM changes after deploying stack with Lambda function](/blog/how-to-trigger-an-aws-lambda-function-from-a-kinesis-stream/image-02.png)

## Create the Event Source
Install the Lambda Event Sources CDK package.

```shell
npm i @aws-cdk/aws-lambda-event-sources
```

Open lib/how-to-trigger-lambda-from-kinesis-stack.ts, add a new KinesisEventSource to the Lambda Function.

```typescript
import * as cdk from '@aws-cdk/core';
import * as kinesis from '@aws-cdk/aws-kinesis';
import * as lambda from '@aws-cdk/aws-lambda';
import * as lambdaEventSources from '@aws-cdk/aws-lambda-event-sources';

export class HowToTriggerLambdaFromKinesisStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const stream = new kinesis.Stream(this, 'MyKinesisStream', {
      streamName: 'MyKinesisStream',
    });

    const lambdaFunction = new lambda.Function(this, 'Function', {
      code: lambda.Code.fromAsset('src'),
      handler: 'index.handler',
      functionName: 'KinesisMessageHandler',
      runtime: lambda.Runtime.NODEJS_12_X,
    });

    const eventSource = new lambdaEventSources.KinesisEventSource(stream, {
      startingPosition: lambda.StartingPosition.TRIM_HORIZON,
    });

    lambdaFunction.addEventSource(eventSource);
  }
}
```
One more deployment ...

```shell
npm run cdk deploy
```

One last time, you may need to approve IAM changes.

![IAM changes approval after deploying the Kinesis event source](/blog/how-to-trigger-an-aws-lambda-function-from-a-kinesis-stream/image-03.png)

## Testing
We are going to make use of the AWS CLI to test our stack.

First, we need the Stream name of our Kinesis queue, which you can get using the following command
```shell
aws kinesis list-streams
```

Next, using the Stream name from the previous command, use the AWS CLI to send a new message to `MyKinesisStream`. Please refer to [the Kinesis docs](https://docs.aws.amazon.com/cli/latest/reference/kinesis/put-record.html) for information about these arguments.

```shell
aws kinesis put-record \
  --data "aGVsbG8sIHdvcmxk" \
  --stream-name MyKinesisStream \
  --partition-key pk1
```

Verify that the Lambda was executed by looking in CloudWatch. Find the LogGroup named `/aws/lambda/KinesisMessageHandler` and open up the latest LogStream. You should see some log messages that look similar to this.

![CloudWatch results after sending a new Kinesis record](/blog/how-to-trigger-an-aws-lambda-function-from-a-kinesis-stream/image-04.png)

## Clean Up
Don't forget to delete your stack when you are finished!
```shell
npm run cdk destroy
```

Thanks for reading! If you found this useful, please follow me here 
https://dev.to/thealexkates
https://twitter.com/thealexkates
