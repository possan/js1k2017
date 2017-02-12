#!/bin/sh

# combine
cat src/js/*js >tmp/all.js

cat src/html/shim.html | \
	sed -e '/{CODE}/ {' -e 'r tmp/all.js' -e 'D' -e '}' | \
	sed -e 's/{SIZE}/'$(stat -f "%z" tmp/all.js)'/g' > \
	build/output-original.html

figlet -fnancyj -w800 $(stat -f "%z" tmp/all.js)b orig

# uglify-ish
$(npm bin)/babel --no-comments --minify --compact -o tmp/all.min.in.js tmp/all.js
cat tmp/all.min.in.js | sed -e 's/var\ [a-zA-Z]\;//g' | sed -e "s/'\+'//g" >tmp/all.min.js

cat src/html/shim.html | \
	sed -e '/{CODE}/ {' -e 'r tmp/all.min.js' -e 'D' -e '}' | \
	sed -e 's/{SIZE}/'$(stat -f "%z" tmp/all.min.js)'/g' > \
	build/output-min.html

figlet -fnancyj -w800 $(stat -f "%z" tmp/all.min.js)b min

# just crush
#node scripts/jscrushish.js tmp/all.js tmp/all.crush.js >/dev/null

#cat src/html/shim.html | \
#	sed -e '/{CODE}/ {' -e 'r tmp/all.crush.js' -e 'D' -e '}' | \
#	sed -e 's/{SIZE}/'$(stat -f "%z" tmp/all.crush.js)'/g' > \
#	build/output-crushed.html

# uglify+crush
node scripts/jscrushish.js tmp/all.min.js tmp/all.min.crush.js >/dev/null

cat src/html/shim.html | \
	sed -e '/{CODE}/ {' -e 'r tmp/all.min.crush.js' -e 'D' -e '}' | \
	sed -e 's/{SIZE}/'$(stat -f "%z" tmp/all.min.crush.js)'/g' > \
	build/output-min-crushed.html

# debug
# ls -la tmp/*
figlet -fnancyj -w800 $(stat -f "%z" tmp/all.min.crush.js)b min+cru

