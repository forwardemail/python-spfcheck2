const test = require('ava');

const spfCheck2 = require('..');

const ip = '178.128.149.101';
const address = 'support@forwardemail.net';
const host = 'mx1.forwardemail.net';

test('throws error', async t => {
  await t.throwsAsync(spfCheck2('boop'));
  t.pass();
});

test('returns fail', async t => {
  const [result, explanation] = await spfCheck2('1.2.3.4', address, host);
  t.is(result, 'fail');
  t.is(explanation, 'SPF fail - not authorized');
});

test('returns pass', async t => {
  const [result, explanation] = await spfCheck2(ip, address, host);
  t.is(result, 'pass');
  t.is(explanation, 'sender SPF authorized');
});
