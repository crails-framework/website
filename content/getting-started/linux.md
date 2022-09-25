---
title: Installing on Linux, FreeBSD and MacOS
---
# Installing on Linux, FreeBSD and MacOS

## Using the install script

The most simple way to install Crails on your system is to use the interactive install script, which you
can download and run with the same following command:

	bash <(curl -s "https://raw.githubusercontent.com/crails-framework/crails/master/install.sh")

The install script will install all dependencies to <code>/usr/local</code> by default, and
should work on any Unix-like system (Linux, FreeBSD, Mac).

Make sure you have a C++ compiler (g++ or clang++) installed on your system before running the install
script. The installer will let you pick your preferred compiler before installing crails.

### Database backends

The installer will prompt you to pick database backends.

If you pick any SQL backends, you will be asked whether you also want to install the ODB compiler. The
ODB compiler is essential to building SQL-backed applications. However, the ODB compiler can only be
compiled with g++, so make sure you have gcc and the `gcc-plugins` development package installed.

### Comet.cpp

The installer will then ask you whether you want to build Comet or not. Comet is a MVC frontend library
that uses a _C++ to JavaScript transpiler_, which can be very useful to share code betweem backend and
frontend.

You will need to have [Cheerp](https://docs.leaningtech.com/cheerp/) installed beforehand, if you
want to build Comet.

### Using system libraries

Lastly, the installer will ask you if you want to use system libraries when available.

Using this option will reduce the compilation time and the size of the packaged web application.
However, you are expected to ensure that the required boost libraries are installed on both
your system and your production environments.

Not using this option (or leaving the default) will locally build all dependencies for crails.
When packaging the application, all dependencies will be included, meaning you won't need
to use your production's machine package managers.

## Custom build

Alternatively, you can also build crails on your own. It will give you more options for building,
and will make you familiar with how crails is built for deployment. If you want to try this
method, the following chapters of this tutorials are meant to guide you through the steps:

## Preparing a build2 package

Crails uses the build2 build system, which will take care of managing dependencies and packaging
the Crails for your development or production environments.

### Installing build2

Let's start by installing build2:

	export BUILD2_VERSION="0.15.0"
	curl -sSfO https://download.build2.org/$BUILD2_VERSION/build2-install-$BUILD2_VERSION.sh
	chmod +x build2-install-$BUILD2_VERSION.sh
	sh build2-install-$BUILD2_VERSION.sh

### Preparing a package

Now that build2 is installed, we'll create a package configuration. Here's an example of
what we would do to prepare a build using g++ and installing at `/usr/local`:

	bpkg create -d build-crails cc \
	  config.cxx=g++ \
	  config.cc.coptions=-O3 \
	  config.install.root=/usr/local \
	  config.install.sudo=sudo

This will create the `build-crails` directory where we'll build crails and its dependencies.

## Installing Crails

We will now install the Crails CLI (Command Line Interface) along with `libcrails` (the core
library for the crails framework).

### Adding repositories

We need to add repositories which build2 will use to fetch the code from both crails and its dependencies:

	bpkg add https://pkg.cppget.org/1/beta
  	bpkg add "https://github.com/crails-framework/crails.git#2.0.0"
  	bpkg add "https://github.com/crails-framework/libcrails.git#2.0.0"

Note how we added a version tag after "crails.git" and "libcrails.git".
Change that tag to the version you wish to use (such as master if you want to build the current development version of crails).

#### Downloading the code

Now that we have added all the repositories we may need, run the following command to fetch
the code. This will take a short while:

	bpkg fetch

### Building crails

The code is here. Let's build it:

	bpkg build crails # Command Line Interface
	bpkg build libcrails # core library

### Installing to the system

Last step, we'll install it all to `/usr/local`, as configured when we ran `bpkg create`.

	bpkg install --all --recursive

## Installing optional dependencies

### Crails plugins

You will likely also want to use some of the optional plugins from the crails framework. Here's a little
bash script that defines which crails plugins you may wish to use:

	crails_packages=(
	  libcrails-templates
	  libcrails-action
	  libcrails-controllers
	  libcrails-crud
	  libcrails-cookies
	  libcrails-form-parser
	  libcrails-multipart-parser
	  libcrails-url-parser
	  libcrails-xml-parser
	  libcrails-json-parser
	  libcrails-json-views
	  libcrails-html-views
	  libcrails-databases
	  libcrails-http-client
	  libcrails-xmlrpc
	  libcrails-proxy
	  libcrails-tests
	)

Then we just use this `$crails_packages` variable to fetch, build and install all our selected plugins:

	for package in ${crails_packages[@]} ; do
	  bpkg add "https://github.com/crails-framework/$package.git#2.0.0"
	done

	bpkg fetch

	for package in ${crails_packages[@]} ; do
	  bpkg build $package
	done

	bpkg install --all --recursive


### SQL database support

SQL support in Crails is based on the ODB compiler and library. From the same directory as earlier,
you can build them with the following commands, which you should now be familiar with:

	bpkg build odb
	bpkg build libodb libodb-pgsql

ODB also comes with support for sqlite, mysql and oracle databases. Customize the previous command
to your own needs: here's what it would look like if you wanted to include all the backends:

	bpkg build libodb libodb-sqlite libodb-mysql libodb-oracle libodb-pgsql

_We don't recommend including everything though, as your application build will expect you to link
with all the backends libraries. Only build the backends you need in your current environment._

Now that ODB is available, we'll build the libcrails-odb module:

	bpkg add "https://github.com/crails-framework/libcrails-odb.git#2.0.0"
	bpkg fetch
	bpkg build libcrails-odb

You may now re-install the build2 package with our newly built libraries:

	bpkg install --all --recursive
