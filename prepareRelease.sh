# only necessary on macOS, otherwise just extract the zip
rm -rf exe
mkdir exe
unzip Release.zip -d exe
xattr -d com.apple.quarantine exe/*
