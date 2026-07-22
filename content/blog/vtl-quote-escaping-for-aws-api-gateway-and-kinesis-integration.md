---
title: "VTL Quote Escaping for AWS API Gateway and Kinesis Integration"
slug: "vtl-quote-escaping-for-aws-api-gateway-and-kinesis-integration"
description: "Introduction\nAWS provides a wide range of services that, when combined, can produce powerful results. One such combination is the direct integration of API Gateway with Kinesis, although it comes with its own set of challenges. In this post, we will ..."
publishedAt: "2023-09-01T11:42:36.010Z"
readTimeInMinutes: 3
tags: ["aws"]
coverImage: "/blog/vtl-quote-escaping-for-aws-api-gateway-and-kinesis-integration/cover.png"
draft: false
---
## Introduction

AWS provides a wide range of services that, when combined, can produce powerful results. One such combination is the direct integration of API Gateway with Kinesis, although it comes with its own set of challenges. In this post, we will discuss a common issue developers encounter when working with VTL transformations for this integration: escaping VTL quotes.

%[https://twitter.com/thealexkates/status/1696879825653293468] 

Utilizing API Gateway to direct payloads into a Kinesis stream is a valuable configuration in event-driven architectures. By removing intermediaries like Lambda, you achieve a more efficient workflow. However, the trade-off is that you must use VTL in API Gateway to ensure the payload meets Kinesis's requirements.

## Our CDK Stack

The Cloud Development Kit (CDK) provides a high-level, object-oriented abstraction over AWS CloudFormation. For direct integration, the CDK stack establishes an API Gateway endpoint that is directly integrated with a Kinesis stream:

```typescript
import { Stack, App } from '@aws-cdk/core';
import { RestApi, Integration, PassthroughBehavior } from '@aws-cdk/aws-apigateway';
import { Stream } from '@aws-cdk/aws-kinesis';

class ApiGatewayKinesisIntegrationStack extends Stack {
  constructor(scope: App, id: string) {
    super(scope, id);

    const kinesisStream = new Stream(this, 'MyKinesisStream');

    const api = new RestApi(this, 'MyApi', {
      restApiName: 'Kinesis Integration Service',
    });

    const kinesisIntegration = new Integration({
      type: IntegrationType.AWS,
      options: {
        passthroughBehavior: PassthroughBehavior.NEVER,
        requestTemplates: {
          'application/json': `{
            "StreamName": "YourKinesisStreamName",
            "Data": "WHAT SHOULD I DO HERE???", 
            "PartitionKey": "yourPartitionKey"
          }`,
        },
        integrationResponses: [{
          statusCode: '200',
        }],
      },
      integrationHttpMethod: 'POST',
      uri: `arn:aws:apigateway:your-region:kinesis:action/PutRecord`,
    });

    api.root.addMethod('ANY', kinesisIntegration, { apiKeyRequired: true });
  }
}
```

This stack creates a Kinesis stream and an API Gateway endpoint. The endpoint employs direct integration with Kinesis. The `requestTemplates` section is where the VTL transformation occurs. Pay attention to the Data property in `requestTemplates`, as this is our primary focus.

## **Wrapping the Request Body and the VTL Quote Escaping Challenge**

When directly integrating API Gateway with Kinesis using VTL, a frequent requirement is to wrap the request body in a new object structure. This may be to add metadata, contextual information, or simply reformat the payload for consistent processing downstream. But this nesting of JSON brings its own challenges due to VTL's unique way of handling quotes.

Imagine our first naive attempt to construct the payload:

```plaintext
#set($data = $input.json('$'))
{
  "StreamName": "YourKinesisStreamName",
  "Data": "$util.base64Encode('{type: $context.resourcePath, data: $data}')",
  "PartitionKey": "yourPartitionKey"
}
```

It's evident from the above that while we're attempting to wrap the payload, the mishandling of quotes will throw us into issues.

A slightly improved, but still flawed, attempt could look something like:

```plaintext
#set($data = $input.json('$'))
{
  "StreamName": "YourKinesisStreamName",
  "Data": "$util.base64Encode('{"type": "$context.resourcePath", "data": "$data"}')",
  "PartitionKey": "yourPartitionKey"
}
```

Here, we are trying to nest the JSON correctly. But again, this will fail due to how quotes are mishandled.

## A Solution Emerges

Those familiar with other languages might expect a backslash (`\`) to be the go-to for escaping, but in VTL, we escape double quotes with another double quote (`""`).

```plaintext
#set($data = $input.json('$'))
#set($type = $context.resourcePath)

{
  "StreamName": "YourKinesisStreamName",
  "Data": "$util.base64Encode("{""type"": ""$type"", ""data"": $data}")",
  "PartitionKey": "yourPartitionKey"
}
```

By properly managing our quotes, the JSON is correctly structured, and we avoid transformation errors.

### **Conclusion**

The combination of API Gateway with Kinesis offers a fast, direct method of ingesting events into your stream. Yet, the intricacies of VTL can sometimes be a stumbling block. By understanding the subtleties of quote handling and the need for nested JSON structures, you can ensure smooth data flow into Kinesis. Happy streaming!
