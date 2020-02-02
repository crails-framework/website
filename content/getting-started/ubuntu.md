---
title: Installing on Ubuntu
---
## Ubuntu

### Installing package dependencies

	sudo apt-get install cmake build-essential libbz2-dev libssl-dev git ruby ruby-dev \
	                     libpq-dev libboost-all-dev
	gem install bundler

### Building dependencies

#### cpp-netlib

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

#### ODB orm

	ODB_MAJOR_VERSION=2
	ODB_MINOR_VERSION=4
	ODB_PATCH_VERSION=0
	ODB_SHORT_VERSION="$ODB_MAJOR_VERSION.$ODB_MINOR_VERSION"
	ODB_VERSION="$ODB_MAJOR_VERSION.$ODB_MINOR_VERSION.$ODB_PATCH_VERSION"

	sudo apt-get install gcc-5-plugin-dev

	CUTL_VERSION_MAJOR=1
	CUTL_VERSION_MINOR=9
	CUTL_VERSION_PATCH=0
	CUTL_VERSION="$CUTL_VERSION_MAJOR.$CUTL_VERSION_MINOR.$CUTL_VERSION_PATCH"

	wget http://www.codesynthesis.com/download/libcutl/$CUTL_VERSION_MAJOR.$CUTL_VERSION_MINOR/libcutl-$CUTL_VERSION.tar.gz
	tar -xvzf libcutl-$CUTL_VERSION.tar.gz
	cd libcutl-$CUTL_VERSION
	./configure
	make
	sudo make install
	cd ..

	for package_name in odb libodb libodb-pgsql ; do
	  wget http://www.codesynthesis.com/download/odb/$ODB_SHORT_VERSION/$package_name-$ODB_VERSION.tar.gz
	  tar -xzvf $package_name-$ODB_VERSION.tar.gz
	  cd $package_name-$ODB_VERSION
	  ./configure
	  make
	  sudo make install
	  cd ..
	done

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
