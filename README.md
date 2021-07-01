# Customer Embed Iframe
Files to place on customers page with iframe pointed to their Returns page. It listens to the React app for document size changes.

### How it works
The parent window contains this JS code for listening to postMessages {object} send from within a child iframe.
1. First default iframe height set and stored by the parent: 80vh.
2. Parent listens for a height param from child and changes height of its iframe.
3. Parent listens for a resetStyle param from child and will reset iframe height to the stored height 80vh (this is used when pages have changed i.e. Home > Success)

### Sample Shopify Template Usage
```liquid
{% assign shop_url = 'https://360.postco.co/<shop_name>' %}

<iframe id="postco360-iframe" src="{{shop_url}}?embed=true" width="100%" style="border: none;"></iframe>
{{ page.content }}

<!-- Files from this repo -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/PostCo/embed-iframe/iframe-listener.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/PostCo/embed-iframe/style.min.css" />
```
### 
