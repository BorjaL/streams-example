const chai = require('chai')
const assert = chai.assert;
const should = chai.should();
const customTranform = require('../transform');

describe('Tranform', function() {
    const customJson = {
      "_id": {
          "$oid": "5aa104e0f20e84e6104ceccb"
      },
      "id": "997634548",
      "type": "add",
      "username": "said_buenrostro",
      "bio": "ñá1a🌏",
      "followed_by": 653,
      "mentions": ["tena2099", "berlinphil", "insurgentebrew", "cervezapacheco", "cervezafauna", "casacardinal", "moderntimesbeer", "eviltwinbrewing", "mikkellerbeer", "brewdogofficial"],
      "hashtags": []
    }

    it('should delete the _id field', function() {
      cleanJson = customTranform(customJson);

      assert.equal(cleanJson._id, undefined);
    });

    it('should delete empty arrays', function() {
      cleanJson = customTranform(customJson);

      assert.equal(cleanJson.hashtags, undefined);
      cleanJson.mentions.should.not.be.null
    });

    it('should clean bio field', function() {
      cleanJson = customTranform(customJson);

      assert.equal(cleanJson.hashtags, undefined);
      cleanJson.bio.should.equal('1a')
    });
});
