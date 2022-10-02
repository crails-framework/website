---
title: Installing on Linux, FreeBSD and MacOS
---
# Installing on Linux, FreeBSD and MacOS

## Installing Cheerp

Comet.cpp relies on the [Cheerp](https://docs.leaningtech.com/cheerp/) C++ to JavaScript transpiler. Before
installing comet, you must install the cheerp compiler, using a version equal or above to cheerp 2.7.

## Using the install script

The most simple way to install Comet.cpp on your system is to use the interactive install script, which you
can download and run with the same following command:

	bash <(curl -s "https://raw.githubusercontent.com/crails-framework/comet.cpp/master/install.sh")

The install script will install the <code>libcomet</code> library and the <code>comet</code> command line interface to <code>/usr/local</code> by default.
