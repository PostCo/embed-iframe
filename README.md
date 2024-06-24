# Embed Iframe
Files to place on customers page with iframe pointed to their Returns page. It listens to the React app for document size changes and hides or unhides the store's Shopify header when going through the exchange v2 process.

### How it works
The parent window contains this JS code for listening to postMessages {object} send from within a child iframe.
1. First default iframe height set and stored by the parent.
2. Parent listens for a height param from child and changes height of its iframe.
3. Parent listens for a resetStyle param from child and will reset iframe height to the stored height (this is used when pages have changed i.e. Home > Success)
4. Parent listens for a hideShopifyHeader param from child and will hide the Shopify header.
5. Parent listens for a showShopifyHeader param from child and will unhide the Shopify header.

### Sample Shopify Template Usage
```liquid
{% assign shop_url = 'https://360.postco.co/<shop_name>' %}

<iframe id="postco360-iframe" src="{{shop_url}}?embed=true" width="100%" style="border: none;"></iframe>
{{ page.content }}

<!-- Files from this repo -->
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/PostCo/embed-iframe/iframe-listener.min.js"></script>
```

### How to push a new version to jsdelivr
- Make change(s) to the code, push it to the remote repo as usually.
- Once all the changes have been made, update the minified version of all the `.js` files.
  - You can look for online JavaScript minifiers online like [Toptal's JavaScript Minifier](https://www.toptal.com/developers/javascript-minifier)
- Once the new code is merged into the `main` branch, draft a new release.
  - Visit the repo on GitHub, go to Releases section (it sits between the About section and Packages section).
  - Click "Draft a new release".
  - Fill in the fields:
    - Tag: create a new, incremented tag. For example, the latest release is `v1.0.4`, then the tag should be `v1.0.5`.
    - Target: the main branch.
    - Relase title: same as Tag.
    - Description: self-explanatory.
  - Check the "Set as the latest release".
  - Click on "Draft a new release".
- Once everything is reviewed and tested carefully, go to the Releases section, click on Edit icon of the draft release and click "Publish release".
