export PATH=.:/sbin:/usr/sbin:/usr/local/sbin:/usr/local/bin:/bin:/usr/bin:/usr/local/bin
USER=${USER/-/_}

NG=/data/x/tools/rigger-ng/rg

echo "Init the project ? "
echo "y(Yes) / n(No)? "d
read  yes
if ( test "$yes" = "y")
then
    echo "...........init data.......\n"
    # $NG conf,restart -e dev -s init,front
else
    # $NG conf,restart -e dev -s front
    echo ""
fi
