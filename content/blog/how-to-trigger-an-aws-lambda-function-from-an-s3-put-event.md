---
title: "How to Trigger an AWS Lambda Function from an S3 Put Event"
slug: "how-to-trigger-an-aws-lambda-function-from-an-s3-put-event"
description: "In this post, we are going to use the AWS CDK to build an AWS Lambda Function that is triggered from an AWS S3 Put request.\nAll of the code can be found in this repository.\nSetup\nWe need to run a few commands to set up our CDK app.\nmkdir how-to-trigg..."
publishedAt: "2022-01-16T20:06:08.624Z"
readTimeInMinutes: 4
tags: ["100daysofcode","developer","aws"]
coverImage: "/blog/how-to-trigger-an-aws-lambda-function-from-an-s3-put-event/cover.png"
draft: false
---
In this post, we are going to use the AWS CDK to build an AWS Lambda Function that is triggered from an AWS S3 Put request.

All of the code [can be found in this repository](https://github.com/alexkates/how-to-trigger-lambda-from-s3).

## Setup
We need to run a few commands to set up our CDK app.

```shell
mkdir how-to-trigger-lambda-from-s3
cd how-to-trigger-lambda-from-s3
npx cdk init app --language typescript

```

This should give you the following directory structure.
![Directory structure after running the CDK init command](/blog/how-to-trigger-an-aws-lambda-function-from-an-s3-put-event/image-01.png)

Also, make sure you have your AWS CLI configured. For more information follow [the AWS CLI quickstart guide](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html).

## Create an S3 Bucket
Install the S3 CDK package.

```shell
npm i @aws-cdk/aws-s3
```

Open `lib/how-to-trigger-lambda-from-s3-stack.ts`, add a new S3 Bucket, and deploy.

```typescript
import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';

export class HowToTriggerLambdaFromS3Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'OurBucket', {
      /**
       * The following properties ensure the bucket is properly 
       * deleted when we run cdk destroy */
      autoDeleteObjects: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    })
  }
}

```

`npm run cdk deploy`

You may need to confirm some IAM changes.
![Confirm IAM changes when running cdk deploy](/blog/how-to-trigger-an-aws-lambda-function-from-an-s3-put-event/image-02.png)

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
    console.log('Event Name: %s', record.eventName);
    console.log('S3 Request: %j', record.s3);
  });
};
```

Open `lib/how-to-trigger-lambda-from-s3-stack.ts`, add a new Lambda function, and deploy.

```typescript
import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as lambda from '@aws-cdk/aws-lambda';

export class HowToTriggerLambdaFromS3Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'OurBucket', {
      /**
       * The following properties ensure the bucket is properly 
       * deleted when we run cdk destroy */
      autoDeleteObjects: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    const lambdaFunction = new lambda.Function(this, 'Function', {
      code: lambda.Code.fromAsset('src'),
      handler: 'index.handler',
      functionName: 'BucketPutHandler',
      runtime: lambda.Runtime.NODEJS_12_X,
    });
  }
}

```
Deploy again ...
```shell
npm run cdk deploy
```

You may need to confirm _more_ IAM changes.
![More IAM changes after deploying stack with Lambda function](/blog/how-to-trigger-an-aws-lambda-function-from-an-s3-put-event/image-03.png)

## Create the Event Source
Install the Lambda Event Sources CDK package.

```shell
npm i @aws-cdk/aws-lambda-event-sources
```

Open lib/how-to-trigger-lambda-from-s3-stack.ts, add a new S3EventSource to the Lambda Function.

```typescript
import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as lambda from '@aws-cdk/aws-lambda';
import * as lambdaEventSources from '@aws-cdk/aws-lambda-event-sources';

export class HowToTriggerLambdaFromS3Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'OurBucket', {
      /**
       * The following properties ensure the bucket is properly 
       * deleted when we run cdk destroy */
      autoDeleteObjects: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    const lambdaFunction = new lambda.Function(this, 'Function', {
      code: lambda.Code.fromAsset('src'),
      handler: 'index.handler',
      functionName: 'BucketPutHandler',
      runtime: lambda.Runtime.NODEJS_12_X,
    });

    const s3PutEventSource = new lambdaEventSources.S3EventSource(bucket, {
      events: [
        s3.EventType.OBJECT_CREATED_PUT
      ]
    });

    lambdaFunction.addEventSource(s3PutEventSource);
  }
}
```
One more deployment ...

```shell
npm run cdk deploy
```

One last time, you may need to approve IAM changes.

![IAM changes approval after deploying the S3 event source](/blog/how-to-trigger-an-aws-lambda-function-from-an-s3-put-event/image-04.png)

## Testing
Create a text file that we will use to upload to the S3 bucket.

```shell
echo "This is a test" > testFile.txt
```

Use the AWS CLI to upload this file into our S3 bucket from earlier. Your bucket name will vary, but for me, this command looks like this.

```shell
aws s3 cp ./testFile.txt s3://howtotriggerlambdafroms3stack-ourbucket48caf57c-1p9g74rol1cza/testFile.txt
```

Verify that the Lambda was executed by looking in CloudWatch. Find the LogGroup named `/aws/lambda/BucketPutHandler` and open up the latest LogStream. You should see some log messages that look similar to this.

![CloudWatch results after uploading an object to S3](/blog/how-to-trigger-an-aws-lambda-function-from-an-s3-put-event/image-05.png)

## Clean Up
Don't forget to delete your stack when you are finished!
```shell
npm run cdk destroy
```

Thanks for reading! If you found this useful, please follow me on Twitter! 
https://twitter.com/thealexkates
