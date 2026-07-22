---
title: "Introducing DynamoDB Extended - Query History, Favorites, and Editor Defaults"
slug: "introducing-dynamodb-extended-query-history-favorites-and-editor-defaults"
description: "DynamoDB Extended is a Chrome extension that adds quality-of-life improvements to the AWS DynamoDB web console, including persistent query history, auto-unmarshalled JSON, and query replay.\nEvery query you run is automatically saved, so you don't hav..."
publishedAt: "2025-06-09T10:56:59.502Z"
readTimeInMinutes: 1
tags: ["aws","dynamodb","chrome extension"]
coverImage: "/blog/introducing-dynamodb-extended-query-history-favorites-and-editor-defaults/cover.png"
draft: false
---
[DynamoDB Extended](https://chromewebstore.google.com/detail/dynamodb-extended-query-h/chdahhohgeddblidnmphgndkcbofpbaa?authuser=1&hl=en) is a Chrome extension that adds quality-of-life improvements to the AWS DynamoDB web console, including persistent query history, auto-unmarshalled JSON, and query replay.

Every query you run is automatically saved, so you don't have to rebuild from memory or search through browser history. You can rename and favorite queries for quick access, and replay them with all parameters preserved, including indexes, keys, attributes, and filters.

![DynamoDB Extended with side panel open and the AWS DynamoDB console with a query executed.](/blog/introducing-dynamodb-extended-query-history-favorites-and-editor-defaults/image-01.png align="center")

This first release includes the following MVP features. If you have an idea for another feature, please let me know!

* Auto-saves query history as you run them
    
* Favorites & rename support to keep things organized
    
* Replay queries with indexes, keys, attributes, and filters included
    
* Editor defaults like auto-unmarshalling JSON and height adjustment
    

![DynamoDB Extended with the side panel opened showing the favorites tab activated and the settings page open.](/blog/introducing-dynamodb-extended-query-history-favorites-and-editor-defaults/image-02.png align="center")

Install [DynamoDB Extended](https://chromewebstore.google.com/detail/dynamodb-extended-query-h/chdahhohgeddblidnmphgndkcbofpbaa?authuser=1&hl=en) from the Chrome Web Store and open the side panel to get started. Your queries will begin logging automatically.

Source code available on [GitHub](https://github.com/alexkates/dynamodb-extended). Feel free to open feature requests!

— Alex
