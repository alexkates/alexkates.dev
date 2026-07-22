---
title: "How We Scaled the Credit Genie Platform with AWS Serverless"
slug: "how-we-scaled-the-credit-genie-platform-with-aws-serverless"
description: "I was recently interviewed by Elise Greve of AWS about how we scaled Credit Genie from MVP to a full-scale platform with over 20 AWS Amplify applications. You can find the original article here. In this post I want to expand on some of the topics cov..."
publishedAt: "2022-02-26T20:54:34.342Z"
readTimeInMinutes: 7
tags: ["startups","aws"]
coverImage: "/blog/how-we-scaled-the-credit-genie-platform-with-aws-serverless/cover.png"
draft: false
---
I was recently interviewed by [Elise Greve of AWS](https://twitter.com/elisesuzette) about how we scaled [Credit Genie](https://creditgenie.com) from MVP to a full-scale platform with over 20 AWS Amplify applications. You can find the [original article here](https://aws.amazon.com/blogs/mobile/fintech-startup-creditgenie-ultimate-speed-from-mvp-to-growth/). In this post I want to expand on some of the topics covered in that interview.

# Who is Credit Genie?
![Credit Genie laptop and mobile image](/blog/how-we-scaled-the-credit-genie-platform-with-aws-serverless/image-01.png)

Credit Genie is a Fintech company focused on helping 10 million consumers get out of credit card debt. We've partnered with one of the largest non-profit credit counseling organizations in the United States to provide a platform for Credit Counseling Agencies to provide debt relief to consumers struggling with credit card debt. 

# The Product
Credit Genie provides a SaaS-based customer servicing platform that enables Credit Counseling agencies to collect consumer financial data including income, expenses, and debt history in order to evaluate consumer financial health and offer needs-based debt management plans.

To achieve this, Credit Genie offers an online web application that allows a consumer to securely submit their financial information. Also, several web portals exist where the credit counselor and consumer can log in and view various financial-related information. The Credit Genie platform also integrates with several third-party systems such as TransUnion and Plaid to accurately confirm consumer financial information.

# The Tech
Credit Genie is [Serverless-First](https://aws.amazon.com/resources/analyst-reports/451-serverless-first-enterprises-on-aws/), reaching for managed services to solve our business and technical problems. We believe that the future of software development and architecture is a cloud-based, serverless-first world where elasticity and pay-as-you-go are at the forefront. 

We've also picked AWS to be our cloud provider and were early adopters of [AWS Amplify](https://aws.amazon.com/amplify/) to facilitate our web application development and cloud infrastructure provisioning needs. Leveraging Amplify has allowed us to go from MVP to a multi-account, single-tenant platform serving millions of requests per month in under a year. Amplify is used to orchestrate our AWS serverless footprint including AppSync, DynamoDB, Lambda, APIGW, S3, SQS, Cognito, Redshift, and more.

# Guiding Principles
Building a SaaS-based solution within FinTech offers its own set of unique problems. At the forefront are security, scalability, and cost-effectiveness. We believe a [shift-left](https://www.checkpoint.com/cyber-hub/cloud-security/what-is-shift-left-security/) approach on these 3 concerns, along with the adoption of serverless technologies is what defines a modern, well-architected FinTech platform. 

## Security
Security within FinTech is a hot-button issue these days. [A quick google search](https://www.google.com/search?q=top+data+breaches+in+fintech&oq=top+data+breaches+in+fintech) shows several high profile data breaches over the past 10 years. 

Here at Credit Genie, we have 5 guiding principles for security.

1. Customer data must always be segregated. We have several counseling agencies servicing their customers on our platform, and it's important that each agency's customer data is isolated. The core idea here is to [limit the blast radius](https://securosis.com/blog/cloud-security-best-practice-limit-blast-radius-with-multiple-accounts) if an incident were to occur.

2. Customer data must always be encrypted. Whenever customer data is in transit or at rest, it must be encrypted. Credit Genie leverages [AWS KMS](https://aws.amazon.com/kms/) and [TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security) to ensure our customer's data is encrypted.

3. Humans and services must adhere to [the principle of least privilege](https://digitalguardian.com/blog/what-principle-least-privilege-polp-best-practice-information-security-and-compliance). Humans and services will always need permissions to do things; there's no way around that. The principle of least privilege means that these actors only receive the minimal amount of access needed to fulfill the task.

4. Tasks performed by humans and services must be observable and auditable. Credit Genie leverages CloudWatch and CloudTrail to ensure that all compute services are monitorable and all AWS API requests are auditable.

5. All permission grants must be time-boxed. Whether a human or a service needs permissions to perform a task, they must re-authenticate within the context of each unit of work. In other words, no permanent authorization.

## Scalability
At Credit Genie, we “build today with tomorrow in mind,” meaning everything we build is designed to cater to current scale requirements as well as anticipated growth. 

This is why we love AWS Amplify and Serverless in general. Every managed service we leverage in AWS has this same mantra baked into its design. AWS calls it this [elasticity](https://wa.aws.amazon.com/wellarchitected/2020-07-02T19-33-23/wat.concept.elasticity.en.html), but the general idea is that your services should be able to scale up/down/in/out as the load on the system changes over time.

## Cost-Effectiveness
Growth is fundamental to the success of a startup. Technology costs can be a wet blanket on growth if left unchecked. We design our systems with cost in mind from the start.

By always reaching for serverless and managed services in AWS first, we are getting elasticity in both scale and cost. AppSync, Lambda, S3, DynamoDB, Amplify, and CloudFront all follow on-demand, pay-as-you-go pricing models.

# The Architecture
At its core, the Credit Genie platform is comprised of an Online Transactional Platform (OLTP) and an Online Analytical Platform (OLAP) and is all managed under a single AWS Organization. 

The OLTP is a collection of single-tenant AWS accounts for each participating agency, with a few extra accounts to solve cross-cutting concerns like IAM and DNS. These environments service the day-to-day operations of the consumer and credit counselor like collecting and storing consumer data and facilitating credit counselor daily activities.

The OLAP consists of a data warehouse in [RedShift and S3 via Spectrum](https://docs.aws.amazon.com/redshift/latest/dg/c-using-spectrum.html) and an Airflow cluster managing numerous ETL workflows. The OLAP also enables our data scientists, analytics, and business intelligence experts to do what they do best.

![Credit Genie architectural diagram](/blog/how-we-scaled-the-credit-genie-platform-with-aws-serverless/image-02.png)

Let's step through this architecture diagram.
1. Customers are funneled to a single URL, which is a CloudFront distribution with a Viewer Request Lambda@Edge. 

2. The Viewer Request Lambda@Edge intercepts every URL visit and determines which participating agency will receive the customer; ultimately redirecting the customer to the agency Amplify application URL. Think of this as a traffic router. From this point, the customer completes the online application within the agency isolated AWS Amplify application, allowing for physical separation of customer data across member agencies.

3. As customers are routed into isolated Amplify applications and submit their financial information, subsets of that data are streamed into a centralized data warehouse in AWS RedShift. This enables our Reporting, Analytics, and Data Science teams to perform analysis and business intelligence on all sorts of dimensional data sets. 

4. DNS management with a multi-account single-tenant architecture can be tricky. Our solution involves having a dedicated AWS account with the single responsibility of managing all DNS records via Route53. 

5. Identity and Access Management is also a complex problem to solve in this type of architecture. We lean heavily on AWS Organizations and SSO to manage all of our internal AWS Users, Roles, and Permission Sets.

6. How do new features get introduced in architecture like this? We have a single repository with several branches. Features are merged into our main branch which triggers the development environment's build, test, and deploy steps. If successful, the main branch is merged into a pre-production environment where all the same checks are run one more time. Finally, changes are merged into several customer environments and deployed into production.

# Our Scale So Far
The following charts span the 10 months between August 2020 to May 2021 during which our platform scaled from 3 to 15+ environments. In general, we've seen steady growth over the past 10 months as we've onboarded more and more Credit Counseling Agencies. 

## AppSync
AppSync requests/month increased from ~1.8 to ~6.2 million requests per month. 
![Credit Genie AppSync scaling over 10 months](/blog/how-we-scaled-the-credit-genie-platform-with-aws-serverless/image-03.png)

## Lambda
Lambda GB-seconds increased from ~0.5 to ~2 million GB-seconds per month.
![Credit Genie Lambda scaling over 10 months](/blog/how-we-scaled-the-credit-genie-platform-with-aws-serverless/image-04.png)

## Amplify
Amplify Build usage increased from ~2 to ~4 thousand minutes per month.
![Credit Genie Amplify scaling over 10 months](/blog/how-we-scaled-the-credit-genie-platform-with-aws-serverless/image-05.png)

## S3
S3 storage increased from ~400 to ~900 GB per month
![Credit Genie S3 scaling over 10 months](/blog/how-we-scaled-the-credit-genie-platform-with-aws-serverless/image-06.png)

# The Team
AWS operates under the [Shared Responsibility Model](https://aws.amazon.com/compliance/shared-responsibility-model/). At a high level, this means that AWS guarantees the infrastructure, but it's up to you to responsibly drive and navigate it.

Our growth would not be possible without our amazing team of drivers, navigating AWS like the NASCAR champs that they are (sorry for the cheesy metaphor gang). I would be remiss to not mention each one of them here. Connect with all of these amazing engineers!

* [Casey McDevitt](https://www.linkedin.com/in/casey-mcdevitt-298bab2b/)
* [Ian Yoder](https://www.linkedin.com/in/ian-yoder-475a2214/)
* [Justin Aurand](https://www.linkedin.com/in/justin-aurand/)
* [Kyle Good](https://www.linkedin.com/in/kyle-good-433966129/)
* [Valon Rama](https://www.linkedin.com/in/vrama21/)

# Wrapping Things Up
Thank you so much for reading through our technology journey over the past 10 months. AWS and Serverless technologies are very powerful tools for solving your security, scaling, and cost problems and I hope this article helps you navigate your own AWS adventures! 

If you enjoyed this, [follow me over on Twitter](twitter.com/thealexkates)!
