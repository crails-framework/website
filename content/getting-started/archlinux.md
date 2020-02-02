---
title: Installing on ArchLinux
---
#### Warning

This section is currently under work. The information provided here might not be exhaustive.

## ArchLinux

### Installing package dependencies

	sudo pacman -S cmake ruby ruby-bundler ruby-dev boost-libs postgresql-libs

### Building dependencies

#### Build ODB from AUR

You may install the ODB orm using the following packages from AUR `libodb` `libodb-pgsql`

#### Build cpp-netlib

	git clone "https://github.com/cpp-netlib/cpp-netlib.git"
	mkdir cpp-netlib/build
	cd cpp-netlib/build
	git checkout 0.13-release
	git submodule init
	git submodule update
	cmake -DCMAKE_CXX_FLAGS=-std=c++11 \
	      -DCPP-NETLIB_BUILD_TESTS=OFF -DCPP-NETLIB_BUILD_EXAMPLES=OFF -DCPP-NETLIB_BUILD_SHARED_LIBS=ON \
	      -DUri_BUILD_TESTS=OFF -DUri_WARNINGS_AS_ERRORS=OFF \
	      ..
	make
	sudo make install

### Building Crails

	git clone "https://github.com/Plaristote/crails.git"
	mkdir crails/build
	cd crails/build
	cmake -DDEVELOPER_MODE=ON \
	      -DUSE_ODB=ON \
	      -DUSE_COOKIE_CIPHER=OFF \
	      ..
	make
	sudo make install
