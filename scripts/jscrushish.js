// jscrush-ish
// from https://github.com/possan/jsintros/blob/master/a/src/crush.js

function calcsafechars(inputscript) {
	var usedchars = [];
	var safechars = '';
	for(var i=0; i<inputscript.length; i++) {
		var ch = inputscript.substring(i, i+1);
		if (usedchars.indexOf(ch) == -1)
			usedchars.push(ch);
	}
	usedchars = usedchars.sort(function(a,b) {
		return a.charCodeAt(0) - b.charCodeAt(0);
	});
	usedchars = usedchars.join('');
	// console.log('used chars', usedchars);
	var allchars = '';
	allchars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ&%#!$%/=?+-:;^~<>@,._(){}[]|';
	// for(var i=32; i<250; i++) allchars += String.fromCharCode(i);

	for(var i=0; i<allchars.length; i++) {
		var ac = allchars.substring(i, i+1);
		if (usedchars.indexOf(ac) == -1)
			safechars += ac;
	}
	return safechars;
}

function count(inputscript, subset) {
	var n = inputscript.split(subset).length;
	return n;
}

function escapeRegExp(str) {
 	return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

function smartQuotes(str) {
	var a = str.split('"').length;
	var b = str.split("'").length;
	if (a >= b) {
		return '\'' + str.replace(new RegExp('\''), '\"') + '\'';
	}
	return '\"' + str.replace(new RegExp('\"'), '\'') + '\"';
}

function crush(inputscript) {
	// console.log('crushing', inputscript);
	var safechars = calcsafechars(inputscript);
	var commonwords = [];
	var candidates = [];

	// pass 1, find all long words
	for (var L=inputscript.length>>2; L>=3; L--) {
		// console.log('looking for words with length: '+L);
		for (var i=0; i<inputscript.length-L; i++) {
			var word = inputscript.substring(i, i+L);
			var n = count(inputscript, word);
			if (n > 2) {
				// console.log('pass', i, word, n);
				if (commonwords.indexOf(word) == -1) {
					commonwords.push(word);
					candidates.push({
						word: word,
						n: n,
						total: n * L
					});
				}
			}
		}
	}

	candidates.sort(function(a,b) {
		return b.total - a.total;
	});

	// console.log(candidates);

	// do the replacements

	var swaps = [];
	var leftover = inputscript;
	var stop = false;
	for(var i=0; i<candidates.length && !stop; i++) {
		var word = candidates[i].word;
		var n = count(leftover, word);
		if (n > 2) {
			if (safechars.length > 0) {
				var safechar = safechars[0];
				// console.log('Swapping \"' + word + '\" for \"' + safechar + '\"');
				try {
					var re = new RegExp(escapeRegExp(word), 'g');
					leftover = leftover.replace(re, safechar);
					swaps.push({ from: word, to: safechar });
					safechars = safechars.substring(1);
				} catch(e) {
					console.log(e);
				}
			} else {
				console.log('Ran out of safe chars.');
				stop = true;
			}
		}
	}

	// pass two - check all possible combos

	var instr = [];
	swaps.forEach(function(a) {
		// instr.push(JSON.stringify(a.from));
		// instr.push(JSON.stringify(a.to));
		instr.push(a.from);
		instr.push(a.to);
	});
	instr.reverse();

	var safechars = calcsafechars(instr.join(''));
	var safechar = '$$$';
	if (safechars.length > 0) {
		safechar = safechars[0];
		safechars = safechars.substring(1);
	} else {
		console.log('Ran out of safe chars.');
	}

	var output = '_='+smartQuotes(leftover);
	output += ',$=' + smartQuotes(instr.join(safechar));
	output += '.split(\''+safechar+'\')';
	output += ';while(x=$.pop()){';
	output += 'y=$.pop();_=_.split(y).join(x)';
	output += '}';
	output += 'eval(_)';

	///onsole.log('// input is '+inputscript.length+' bytes');
	//console.log('// output is '+output.length+' bytes');
	//console.log('// result, output is '+(inputscript.length-output.length)+' bytes smaller');
	//console.log('// result, output is '+(output.length-1024)+' bytes away from 1024');

	if (inputscript.length <= output.length) {
		// if output is bigger, return original.
		return inputscript;
	} else {
		// console.log(output);
		return output;
	}
}

if (process.argv.length < 3) {
	console.log('Syntax: jscrushish.js [inputfile] [outputfile]');
	return;
}

var fs = require('fs');
var incode = fs.readFileSync(process.argv[2], 'utf8').trim();
code = crush(incode);
code = crush(code);
code = crush(code);

var targetsize = Math.floor(incode.length / 1024) * 1024;
var targetsize2 = Math.ceil(incode.length / 1024) * 1024;

// console.log('Input is '+incode.length+' bytes');
console.log('Output is '+code.length+' bytes ('+Math.abs(code.length-targetsize)+' from ' + targetsize+', '+Math.abs(code.length-targetsize2)+' from ' + targetsize2+')');

// console.log(code);
fs.writeFileSync(process.argv[3], code, 'ascii');
