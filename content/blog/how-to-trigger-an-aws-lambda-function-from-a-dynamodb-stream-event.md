---
title: "How to Trigger an AWS Lambda Function from a DynamoDB Stream Event"
slug: "how-to-trigger-an-aws-lambda-function-from-a-dynamodb-stream-event"
description: "In this post, we are going to use the AWS CDK to build an AWS Lambda Function that triggers from DynamoDB Stream Events.\nAll of the code can be found in this repository.\nSetup\nWe need to run a few commands to set up our CDK app.\nmkdir how-to-trigger-..."
publishedAt: "2022-01-15T21:02:29.292Z"
readTimeInMinutes: 3
tags: ["aws","developer","javascript"]
coverImage: "/blog/how-to-trigger-an-aws-lambda-function-from-a-dynamodb-stream-event/cover.png"
draft: false
---
In this post, we are going to use the AWS CDK to build an AWS Lambda Function that triggers from DynamoDB Stream Events.

All of the code [can be found in this repository](https://github.com/alexkates/how-to-trigger-lambda-from-ddb-stream).

## Setup

We need to run a few commands to set up our CDK app.

```shell
mkdir how-to-trigger-lambda-from-ddb-stream
cd how-to-trigger-lambda-from-ddb-stream
npx cdk init app --language typescript
```

This should give you the following directory structure.

![Alt Text](/blog/how-to-trigger-an-aws-lambda-function-from-a-dynamodb-stream-event/image-01.png align="left")

Also, make sure you have your AWS CLI configured. For more information follow [the AWS CLI quickstart guide](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html).

## DynamoDB

Install the DynamoDB CDK package.

```bash
npm i @aws-cdk/aws-dynamodb
```

Open `lib/how-to-trigger-lambda-from-ddb-stream-stack.ts`, add a new DynamoDB table, and deploy.

```typescript
import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

export class HowToTriggerLambdaFromDdbStreamStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, 'Table', {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      stream: dynamodb.StreamViewType.NEW_AND_OLD_IMAGES,
      tableName: 'Table',
    });
  }
}
```

```shell
npm run cdk deploy
```

## Lambda

Install the Lambda CDK package.

```shell
npm i @aws-cdk/aws-lambda
```

Deploying Lambda functions requires [bootstrapping your CDK app](https://docs.aws.amazon.com/cdk/latest/guide/bootstrapping.html) which gives us an S3 bucket where our Lambda's source code will live.

```shell
npm run cdk bootstrap
```

Create `src/index.js` and paste the following code

```javascript
exports.handler = async (event) => {
    event.Records.forEach((record) => {
        console.log('Event Id: %s', record.eventID);
        console.log('Event Id: %s', record.eventName);
        console.log('DynamoDB Record: %j', record.dynamodb);
    });
};
```

Open `lib/how-to-trigger-lambda-from-ddb-stream-stack.ts`, add a new Lambda function and deploy.

```typescript
import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';

export class HowToTriggerLambdaFromDdbStreamStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, 'Table', {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      tableName: 'Table',
    });

    const lambdaFunction = new lambda.Function(this, 'Function', {
      code: lambda.Code.fromAsset('src'),
      handler: 'index.handler',
      functionName: 'TableStreamHandler',
      runtime: lambda.Runtime.NODEJS_12_X,
    });
  }
}
```

```shell
npm run cdk deploy
```

## Event Source

Install the Lambda Event Sources CDK package.

```shell
npm i @aws-cdk/aws-lambda-event-sources
```

Open `lib/how-to-trigger-lambda-from-ddb-stream-stack.ts`, add a new DynamoEventSource to the Lambda Function.

```typescript
import * as cdk from '@aws-cdk/core';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as lambda from '@aws-cdk/aws-lambda';
import { DynamoEventSource } from '@aws-cdk/aws-lambda-event-sources';

export class HowToTriggerLambdaFromDdbStreamStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new dynamodb.Table(this, 'Table', {
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      stream: dynamodb.StreamViewType.NEW_AND_OLD_IMAGES,
      tableName: 'Table',
    });

    const lambdaFunction = new lambda.Function(this, 'Function', {
      code: lambda.Code.fromAsset('src'),
      handler: 'index.handler',
      functionName: 'TableStreamHandler',
      runtime: lambda.Runtime.NODEJS_12_X,
    });

    lambdaFunction.addEventSource(new DynamoEventSource(table, {
      startingPosition: lambda.StartingPosition.LATEST,
    }));
  }
}
```

```shell
npm run cdk deploy
```

## Testing

Using the AWS CLI, insert a new item into the DynamoDB table.

```shell
aws dynamodb put-item \
    --table-name Table \
    --item '{
        "id": {"S": "test123"}
      }'
```

Verify that the Lambda executed by looking in CloudWatch. Find the LogGroup named `/aws/lambda/TableStreamHandler` and open up the latest LogStream. You should see some log messages that look similar to this.

```plaintext
2021-05-14T19:08:55.487Z	ffba16f2-846b-4c6e-9ff5-189c3293116e	INFO	Event Id: e6db4f872fd1997f0f459bcebb8163e8
```

```plaintext
2021-05-14T19:08:55.527Z	ffba16f2-846b-4c6e-9ff5-189c3293116e	INFO	Event Id: INSERT
```

```plaintext
2021-05-14T19:08:55.527Z	ffba16f2-846b-4c6e-9ff5-189c3293116e	INFO	DynamoDB Record: {
    "ApproximateCreationDateTime": 1621019335,
    "Keys": {
        "id": {
            "S": "test123"
        }
    },
    "NewImage": {
        "id": {
            "S": "test123"
        }
    },
    "SequenceNumber": "733400000000008471956488",
    "SizeBytes": 18,
    "StreamViewType": "NEW_AND_OLD_IMAGES"
}
```

## Summary

Congratulations. If you've made it this far then you successfully ...

1. Scaffolded a new CDK app
    
2. Created a DynamoDB table
    
3. Created a Lambda Function
    
4. Created a DynamoEventSource for the Lambda Function
