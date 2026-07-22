---
title: "How to Trigger an AWS Lambda Function from an SNS Message"
slug: "how-to-trigger-an-aws-lambda-function-from-an-sns-message"
description: "In this post, we are going to use the AWS CDK to build an AWS Lambda Function that triggers an AWS SNS message.\nAll of the code can be found in this repository.\nSetup\nWe need to run a few commands to set up our CDK app.\nmkdir how-to-trigger-lambda-fr..."
publishedAt: "2022-01-21T01:33:35.935Z"
readTimeInMinutes: 3
tags: ["aws","100daysofcode","cloud"]
coverImage: "/blog/how-to-trigger-an-aws-lambda-function-from-an-sns-message/cover.png"
draft: false
---
In this post, we are going to use the AWS CDK to build an AWS Lambda Function that triggers an AWS SNS message.

All of the code [can be found in this repository](https://github.com/alexkates/how-to-trigger-lambda-from-sns).

## Setup
We need to run a few commands to set up our CDK app.

```shell
mkdir how-to-trigger-lambda-from-sns
cd how-to-trigger-lambda-from-sns
npx cdk init app --language typescript

```

This should give you the following directory structure.
![Directory structure after running the CDK init command](/blog/how-to-trigger-an-aws-lambda-function-from-an-sns-message/image-01.png)

Also, make sure you have your AWS CLI configured. For more information follow [the AWS CLI quickstart guide](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html).

## Create an SNS Topic
Install the SNS CDK package.

```shell
npm i @aws-cdk/aws-sns
```

Open `lib/how-to-trigger-lambda-from-sns-stack.ts`, add a new SNS topic, and deploy.

```typescript
import * as cdk from '@aws-cdk/core';
import * as sns from '@aws-cdk/aws-sns';

export class HowToTriggerLambdaFromSnsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const topic = new sns.Topic(this, 'OurSnsTopic', {
      displayName: 'Our SNS Topic',
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

Open `lib/how-to-trigger-lambda-from-sns-stack.ts`, add a new Lambda function, and deploy.

```typescript
import * as cdk from '@aws-cdk/core';
import * as sns from '@aws-cdk/aws-sns';
import * as lambda from '@aws-cdk/aws-lambda';

export class HowToTriggerLambdaFromSnsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const topic = new sns.Topic(this, 'OurSnsTopic', {
      displayName: 'Our SNS Topic',
    });

    const lambdaFunction = new lambda.Function(this, 'Function', {
      code: lambda.Code.fromAsset('src'),
      handler: 'index.handler',
      functionName: 'SnsMessageHandler',
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
![IAM changes after deploying stack with Lambda function](/blog/how-to-trigger-an-aws-lambda-function-from-an-sns-message/image-02.png)

## Create the Event Source
Install the Lambda Event Sources CDK package.

```shell
npm i @aws-cdk/aws-lambda-event-sources
```

Open lib/how-to-trigger-lambda-from-s3-stack.ts, add a new S3EventSource to the Lambda Function.

```typescript
import * as cdk from '@aws-cdk/core';
import * as sns from '@aws-cdk/aws-sns';
import * as lambda from '@aws-cdk/aws-lambda';
import * as lambdaEventSources from '@aws-cdk/aws-lambda-event-sources';

export class HowToTriggerLambdaFromSnsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const topic = new sns.Topic(this, 'OurSnsTopic', {
      displayName: 'Our SNS Topic',
    });

    const lambdaFunction = new lambda.Function(this, 'Function', {
      code: lambda.Code.fromAsset('src'),
      handler: 'index.handler',
      functionName: 'SnsMessageHandler',
      runtime: lambda.Runtime.NODEJS_12_X,
    });

    const eventSource = new lambdaEventSources.SnsEventSource(topic);

    lambdaFunction.addEventSource(eventSource);
  }
}
```
One more deployment ...

```shell
npm run cdk deploy
```

One last time, you may need to approve IAM changes.

![IAM changes approval after deploying the SNS event source](/blog/how-to-trigger-an-aws-lambda-function-from-an-sns-message/image-03.png)

## Testing
We are going to make use of the AWS CLI to test our stack.

First, we need the ARN of our SNS topic, which you can get using the following command
```shell
aws sns list-topics --query "Topics[?contains(TopicArn, 'OurSnsTopic')]"
```

Next, using the TopicArn from the previous command, use the AWS CLI to publish a new message to Our SNS Topic. Your topic ARN may vary, but for me this command looks like this.

```shell
aws sns publish \
    --topic-arn "arn:aws:sns:us-east-2:472331918655:HowToTriggerLambdaFromSnsStack-OurSnsTopic2ED19057-1GAA1XT2U6XXH" \
    --message "Hello from SNS"
```

Verify that the Lambda was executed by looking in CloudWatch. Find the LogGroup named `/aws/lambda/SnsMessageHandler` and open up the latest LogStream. You should see some log messages that look similar to this.

![CloudWatch results after publish a new SNS message](/blog/how-to-trigger-an-aws-lambda-function-from-an-sns-message/image-04.png)

## Clean Up
Don't forget to delete your stack when you are finished!
```shell
npm run cdk destroy
```

Thanks for reading! If you found this useful, please follow me at https://twitter.com/thealexkates
