# Customer Embed Iframe
Files to place on customers page with return form iframe. It listens to React clients/customers for document size changes.

## Example
```liquid
{% assign shop_url = 'https://360.postco.co/<shop_name>' %}

<iframe id="postco360-iframe" src="{{shop_url}}?embed=true" width="100%" style="border: none;"></iframe>
{{ page.content }}

<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/PostCo/embed-iframe/iframe-listener.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/PostCo/embed-iframe/style.min.css" />
```
