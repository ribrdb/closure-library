
#!/bin/bash
for n in $(find . -name "*.clutz.d.ts"); do
    jsfile=$(dirname $n)/$(basename $n .clutz.d.ts).js
    if [ ! -f $jsfile ]; then
        rm $n
        continue
    fi
    buildfile=$(dirname $n)/BUILD
    if ! grep -q $(basename $n) $buildfile; then
        target=$(bazel query "same_pkg_direct_rdeps(${jsfile#./})")
        echo "Adding $n to $buildfile"
        buildozer "add srcs $(basename $n)" $target
    fi
done