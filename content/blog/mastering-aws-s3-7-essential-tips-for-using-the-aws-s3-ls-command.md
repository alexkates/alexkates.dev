---
title: "Mastering AWS S3: 7 Essential Tips for Using the aws s3 ls Command"
slug: "mastering-aws-s3-7-essential-tips-for-using-the-aws-s3-ls-command"
description: "In this article, we explore 7 useful AWS CLI commands for managing S3 buckets, including checking bucket size, listing objects with specific extensions, finding the largest files, listing objects from a specific date, listing objects with a specific ..."
publishedAt: "2023-10-30T11:14:50.796Z"
readTimeInMinutes: 3
tags: ["aws","cloud","developer"]
coverImage: "/blog/mastering-aws-s3-7-essential-tips-for-using-the-aws-s3-ls-command/cover.png"
draft: false
---
> In this article, we explore 7 useful AWS CLI commands for managing S3 buckets, including checking bucket size, listing objects with specific extensions, finding the largest files, listing objects from a specific date, listing objects with a specific prefix, listing recently modified objects, and identifying empty directories. These commands will help you manage and optimize your S3 storage more effectively.

Whether you're experienced with AWS or new to cloud storage, mastering the AWS CLI, particularly the `aws s3 ls` command, can help you manage your S3 buckets. I've collected 7 of my most common and useful `aws s3 ls` commands that I've been recently using that have helped make s3 interactions so straightforward.

### **1\. Check the Size of an S3 Bucket**

Ever wondered how much data you've stored in a specific bucket? This command helps you calculate the total size of an S3 bucket, giving you insights into your storage utilization.

```bash
aws s3 ls s3://YOUR_BUCKET_NAME --recursive | awk '{total += $3} END {print "Total:", total/1024/1024 " MB"}'
```

### **2\. List All Objects with a Specific Extension**

Filtering by file extension is useful when you're trying to get an overview of specific file types stored in your bucket, like PDFs.

```bash
aws s3 ls s3://YOUR_BUCKET_NAME --recursive | grep ".pdf"
```

### **3\. List Top 10 Largest Files in a Bucket**

This command helps you spot the 10 largest files in your bucket, which might assist in clean-up or storage optimization.

```bash
aws s3 ls s3://YOUR_BUCKET_NAME --recursive | sort -k 3 -n -r | head -n 10
```

### **4\. List Objects from a Specific Date**

If you've uploaded or modified files on a particular date and want to view them, this command is your go-to. Just replace the date accordingly.

```bash
aws s3 ls s3://YOUR_BUCKET_NAME --recursive | grep "2023-08-21"
```

### **5\. List Objects with a Specific Prefix**

Organizing your S3 bucket with prefixes helps in data management. This command lets you view objects under a specific prefix.

```bash
aws s3 ls s3://YOUR_BUCKET_NAME/PREFIX/
```

### **6\. List All Objects Modified Within the Last 10 Days**

Want to see what's been updated recently? This command lists all the objects modified in the last 10 days, helping you keep track of recent changes.

```bash
aws s3 ls s3://YOUR_BUCKET_NAME --recursive | grep "$(date +%Y-%m-%d -d '10 days ago')"
```

### **7\. Find Empty Directories in a Bucket**

Empty directories can clutter your bucket and might be remnants of older structures. Use this command to identify and possibly clean them up.

```bash
for prefix in $(aws s3 ls s3://YOUR_BUCKET_NAME/ | awk '{print $2}'); do 
    count=$(aws s3 ls s3://YOUR_BUCKET_NAME/$prefix --recursive | wc -l); 
    if [ $count -eq 0 ]; then 
        echo "Empty directory: $prefix"; 
    fi; 
done
```

Alright, folks, that's a wrap! Whether you're an AWS pro or just getting started, I hope these `aws s3 ls` tricks make your life a tad easier. The more you play around with these commands, the more you'll get the hang of it. Did I miss any that you regularly use?

Like this type of content? Follow me on [Twitter](https://twitter.com/thealexkates) for more!
