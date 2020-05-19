GOOS=windows CGO_ENABLED=1 GOARCH=amd64 CC=x86_64-w64-mingw32-gcc CXX=x86_64-w64-mingw32-g++ go build -ldflags '-w -s' .
