# S3-SSG

Static Site Generator (SSG) for files stored in an S3 Bucket

## About

Git-based static site generators are awesome, but the build step can take (a lot of) time, which isn't ideal if you use it in combination with a CMS where users expect instant previews. This static site generator aims to provide the best of both worlds: the file-based workflow, developer freedom and fast static hosting of the git-based approach, and the instant feedback and reliability of S3 hosting.

## Installation

`npm install @dashpilot/s3-ssg`

## Example usage

The example below takes a template from `src/template.html` and json data from `src/data.json`, renders the template and saves it to `index.html` in your bucket. The example uses handlebars for the template engine, and json for the data, but you can use any template engine or data source. You could also use an external data source, whatever you like!

```javascript
const S3_SSG = require('@dashpilot/s3-ssg');
const ssg = new S3_SSG(s3_key, s3_secret, s3_bucket, s3_prefix, s3_acl, s3_endpoint);

const tpl_path = "src/template.html";
const data_path = "src/data.json";
const save_path = "index.html";

// get the template and the data
ssg.get(tpl_path).then(tpl => {
  console.log(tpl);

  ssg.get(data_path).then(data => {
    data = JSON.parse(data);
    console.log(data);

    // do something with the data
    var template = Handlebars.compile(tpl);
    var html = template(data);

    // save the new html
    ssg.save(save_path, html).then(result => {
      console.log(result);
    });

  });

});
```

## Configuration

    s3_key (required): your S3 API key
    s3_secret (required): your S3 API secret
    s3_bucket (required): your S3 bucket
    s3_prefix (optional): optional file prefix or subfolder (for the latter end with a slash). default "";
    s3_acl (optional): ACL (https://docs.aws.amazon.com/AmazonS3/latest/dev/acl-overview.html#canned-acl). Default: "private", set to "public-read" if you want your data to be public (to use with a client-side app).
    s3_endpoint (optional): change the endpoint if you use Digitalocean Spaces, Linode Object Storage, Backblaze B2, etc. Default: false.

## Press the :star: button

Don't forget to press the :star: button to let me know I should continue improving this project.
