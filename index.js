const AWS = require('aws-sdk')

class S3_SSG {

  constructor(s3_key, s3_secret, s3_bucket, s3_prefix = '', s3_acl = 'private', s3_endpoint = false) {
    this.s3_key = s3_key
    this.s3_secret = s3_secret
    this.s3_bucket = s3_bucket
    this.s3_prefix = s3_prefix
    this.s3_acl = s3_acl

    var s3_config = {
      accessKeyId: s3_key,
      secretAccessKey: s3_secret
    }
    if (s3_endpoint) {
      const endpoint = new AWS.Endpoint(s3_endpoint);
      s3_config.endpoint = endpoint
    }
    AWS.config.update(s3_config);

    this.s3Bucket = new AWS.S3({
      params: {
        Bucket: s3_bucket,
        timeout: 6000000
      }
    });
  }

  async get(path) {

    var params = {
      Bucket: this.s3_bucket,
      Key: this.s3_prefix + path
    };

    return await this.s3Bucket.getObject(params).promise()
      .then(function(data) {
        return data.Body.toString('utf-8')
      })
      .catch(function(error) {
        return []
      })

  }

  async save(path, data) {

    // save
    var params = {
      ACL: this.s3_acl,
      Key: this.s3_prefix + path,
      Body: data,
      ContentType: 'text/html'
    };

    console.log(params);

    return await this.s3Bucket.putObject(params).promise()

  }

}
module.exports = S3_SSG;