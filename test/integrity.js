'use strict'

const test = require('tap').test

const ssri = require('..')

test('toString()', t => {
  const sri = ssri.parse('sha1-eUN/Xt2hP5wGabl43XqQZt0gWfE= sha256-Qhx213Vjr6GRSEawEL0WTzlb00whAuXpngy5zxc8HYc=')
  t.equal(
    sri.toString(),
    'sha1-eUN/Xt2hP5wGabl43XqQZt0gWfE= sha256-Qhx213Vjr6GRSEawEL0WTzlb00whAuXpngy5zxc8HYc=',
    'integrity objects from ssri.parse() can use toString()'
  )
  t.equal(
    sri.toString({strict: true}),
    'sha256-Qhx213Vjr6GRSEawEL0WTzlb00whAuXpngy5zxc8HYc=',
    'accepts strict mode option'
  )
  t.equal(
    sri.toString({sep: '\n'}),
    'sha1-eUN/Xt2hP5wGabl43XqQZt0gWfE=\nsha256-Qhx213Vjr6GRSEawEL0WTzlb00whAuXpngy5zxc8HYc=',
    'accepts separator option'
  )
  t.done()
})

test('concat()', t => {
  const sri = ssri.parse('sha512-foo')
  t.equal(
    sri.concat('sha512-bar').toString(),
    'sha512-foo sha512-bar',
    'concatenates with a string'
  )
  t.equal(
    sri.concat({digest: 'bar', algorithm: 'sha384'}).toString(),
    'sha512-foo sha384-bar',
    'concatenates with an IntegrityMetadata-like'
  )
  t.equal(
    sri.concat({
      'sha384': [{digest: 'bar', algorithm: 'sha384'}],
      'sha1': [{digest: 'baz', algorithm: 'sha1'}]
    }).toString(),
    'sha512-foo sha384-bar sha1-baz',
    'concatenates with an Integrity-like'
  )
  t.equal(
    sri.concat(
      {digest: 'bar', algorithm: 'sha1'}
    ).concat(
      'sha1-baz'
    ).concat(
      'sha512-quux'
    ).toString(),
    'sha512-foo sha512-quux sha1-bar sha1-baz',
    'preserves relative order for algorithms between different concatenations'
  )
  const strictSri = ssri.parse('sha512-WrLorGiX4iEWOOOaJSiCrmDIamA47exH+Bz7tVwIPb4sCU8w4iNqGCqYuspMMeU5pgz/sU7koP5u8W3RCUojGw==')
  t.equal(
    strictSri.concat('sha1-eUN/Xt2hP5wGabl43XqQZt0gWfE=', {
      strict: true
    }).toString(),
    'sha512-WrLorGiX4iEWOOOaJSiCrmDIamA47exH+Bz7tVwIPb4sCU8w4iNqGCqYuspMMeU5pgz/sU7koP5u8W3RCUojGw==',
    'accepts strict mode option'
  )
  t.done()
})

test('semi-private', t => {
  t.equal(ssri.Integrity, undefined, 'Integrity class is module-private.')
  t.done()
})
