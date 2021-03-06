// TODO:
//   Convert "expects" file to `.js` type
//   so that each can run custom assertions!

const fs = require('fs');
const test = require('tape');
const premove = require('premove');
const { parse, join } = require('path');
const { spawnSync } = require('child_process');
const bin = require.resolve('..');

const fixtures = join(__dirname, 'fixtures');

const tests = {
	cjs: /(module\.)?exports(\.?)/,
	esm: /export (default )?(function|const|class|let|var)/,
	umd: new RegExp(`"object"==typeof exports&&"undefined"!=typeof module`)
};

function exec(cwd, src, flags=[]) {
	let args = [bin].concat(src || [], flags);
	return spawnSync('node', args, { cwd });
}

function toFiles(t, dir, obj={}) {
	let k, file, data;

	for (k in obj) {
		if (/entry|name|argv/.test(k)) continue;
		file = join(dir, obj[k]);
		t.true(fs.existsSync(file), `(${k}) ~> file exists`);
		data = fs.readFileSync(file, 'utf8');
		t.true(tests[k].test(data), `(${k}) ~> contents look right`);
		if (k === 'cjs') {
			t.doesNotThrow(() => new Function(data), SyntaxError, `(${k}) ~> does not throw`);
		} else if (k === 'umd' && 'name' in obj) {
			t.true(data.includes(obj.name), `(${k}) ~> has custom UMD name`);
		}
	}

	premove(parse(file).dir).then(tmp => {
		fs.existsSync(tmp = join(dir, 'dist')) && premove(tmp);
		fs.existsSync(tmp = join(dir, 'foobar')) && premove(tmp);
	});
}

function toTest(dirname) {
	let dir = join(fixtures, dirname);
	let expects = require( join(dir, 'expects.json') );

	test(dirname, t => {
		let pid = exec(dir, expects.entry, expects.argv);
		t.is(pid.status, 0, 'runs without error');
		t.ok(pid.stdout.length, 'prints table to stdout');
		toFiles(t, dir, expects);
		t.end();
	});
}

// --- init

fs.readdir(fixtures, (err, dirs) => {
	if (err) throw err;
	dirs.forEach(toTest);
});
