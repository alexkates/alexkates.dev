---
title: "How to Trigger an AWS Lambda Function From an SQS Message"
slug: "how-to-trigger-an-aws-lambda-function-from-an-sqs-message"
description: "In this post, we are going to use the AWS CDK to build an AWS Lambda Function that is triggered from an AWS SQS message.\nAll of the code can be found in this repository.\nSetup\nWe need to run a few commands to set up our CDK app.\nmkdir how-to-trigger-..."
publishedAt: "2022-01-27T03:34:48.578Z"
readTimeInMinutes: 3
tags: ["aws","javascript","aws-cdk","2articles1week"]
coverImage: "/blog/how-to-trigger-an-aws-lambda-function-from-an-sqs-message/cover.png"
draft: false
---
In this post, we are going to use the AWS CDK to build an AWS Lambda Function that is triggered from an AWS SQS message.

All of the code [can be found in this repository](https://github.com/alexkates/how-to-trigger-lambda-from-sqs).

# Setup
We need to run a few commands to set up our CDK app.

```shell
mkdir how-to-trigger-lambda-from-sqs
cd how-to-trigger-lambda-from-sqs
npx cdk init app --language typescript
```

This should give you the following directory structure.
![Directory structure after running the CDK init command](/blog/how-to-trigger-an-aws-lambda-function-from-an-sqs-message/image-01.png)

Also, make sure you have your AWS CLI configured. For more information follow [the AWS CLI quickstart guide](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html).

# Create an SQS Queue
Install the SQS CDK package.

```shell
npm i @aws-cdk/aws-sqs
```

Open `lib/how-to-trigger-lambda-from-sqs-stack.ts`, add a new SQS queue, and deploy.

```typescript
import * as cdk from '@aws-cdk/core';
import * as sqs from '@aws-cdk/aws-sqs';

export class HowToTriggerLambdaFromSqsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const queue = new sqs.Queue(this, 'OurSqsQueue', {
      queueName: 'OurSQSQueue',
    });
  }
}

```
Nice! Let's deploy the stack.

`npm run cdk deploy`

# Create a Lambda

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

Open `lib/how-to-trigger-lambda-from-sqs-stack.ts`, add a new Lambda function, and deploy.

```typescript
import * as cdk from '@aws-cdk/core';
import * as sqs from '@aws-cdk/aws-sqs';
import * as lambda from '@aws-cdk/aws-lambda';

export class HowToTriggerLambdaFromSqsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const queue = new sqs.Queue(this, 'OurSqsQueue', {
      queueName: 'OurSQSQueue',
    });

    const lambdaFunction = new lambda.Function(this, 'Function', {
      code: lambda.Code.fromAsset('src'),
      handler: 'index.handler',
      functionName: 'SqsMessageHandler',
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
![IAM changes after deploying stack with Lambda function](/blog/how-to-trigger-an-aws-lambda-function-from-an-sqs-message/image-02.png)

# Create the Event Source
Install the Lambda Event Sources CDK package.

```shell
npm i @aws-cdk/aws-lambda-event-sources
```

Open lib/how-to-trigger-lambda-from-sqs-stack.ts, add a new SqsEventSource to the Lambda Function.

```typescript
import * as cdk from '@aws-cdk/core';
import * as sqs from '@aws-cdk/aws-sqs';
import * as lambda from '@aws-cdk/aws-lambda';
import * as lambdaEventSources from '@aws-cdk/aws-lambda-event-sources';

export class HowToTriggerLambdaFromSqsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const queue = new sqs.Queue(this, 'OurSqsQueue', {
      queueName: 'OurSQSQueue',
    });

    const lambdaFunction = new lambda.Function(this, 'Function', {
      code: lambda.Code.fromAsset('src'),
      handler: 'index.handler',
      functionName: 'SqsMessageHandler',
      runtime: lambda.Runtime.NODEJS_12_X,
    });

    const eventSource = new lambdaEventSources.SqsEventSource(queue);

    lambdaFunction.addEventSource(eventSource);
  }
}
```
One more deployment ...

```shell
npm run cdk deploy
```

One last time, you may need to approve IAM changes.

![IAM changes approval after deploying the SQS event source](/blog/how-to-trigger-an-aws-lambda-function-from-an-sqs-message/image-03.png)

# Testing
We are going to make use of the AWS CLI to test our stack.

First, we need the Queue URL of our SQS queue, which you can get using the following command
```shell
aws sqs get-queue-url --queue-name OurSQSQueue
```

Next, using the Queue URL from the previous command, use the AWS CLI to send a new message to `OurSQSQueue`. Your Queue URL  may vary, but for me this command looks like this.

```shell
aws sqs send-message \
--message-body "Hello, world" \
--queue-url https://sqs.us-east-2.amazonaws.com/472331918655/OurSQSQueue
```

Verify that the Lambda was executed by looking in CloudWatch. Find the LogGroup named `/aws/lambda/SqsMessageHandler` and open up the latest LogStream. You should see some log messages that look similar to this.

![CloudWatch results after sending a new SQS message](/blog/how-to-trigger-an-aws-lambda-function-from-an-sqs-message/image-04.png)

# Clean Up
Don't forget to delete your stack when you are finished!
```shell
npm run cdk destroy
```

Thanks for reading! If you found this useful, please follow me here 
https://dev.to/thealexkates
https://twitter.com/thealexkates
