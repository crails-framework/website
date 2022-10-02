---
title: Comet.cpp
---

## What's Comet.cpp
Comet.cpp is a C++ web-application framework for the frontend. It relies on [Cheerp](), a C++ to JavaScript
transpiler, and provides a minimalist wrapper API for managing DOM elements and events, as well as an [Model-View-Controller (MVC)](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) framework and scaffolding tools.

### Model
Collection and model templates are provided to help you fetch, parse and submit your application resources.

### View
Comet.cpp provides tools to write html templates that can be later rendered in your application. These
templates provide custom HTML semantics such as [slots](), repeaters or event handlers:

	<template>
	  <head>
	    <script>
	      virtual void on_clicked()
	      {
	        text_display.text("Hello world !");
	      }
	    </script>
	  </head>
	  <body tag-name="div">
	    <div ref="text_display" />
	    <button click.trigger="on_clicked()">
	      Click here !
	    </button>
	  </body>
	</template>

You can extend an HTML template to implement interface logic in C++, respectfing _separation of concerns_.

### Controller
Serving as glue between the models and the views, the controller layer allows you to react
to changes in the window's current location.

	// a controller header
	#pragma once
	#include <comet/mvc/controller.hpp>
	class Controller : public Comet::Controller
	{
	public:
	  Controller(const Comet::Params& params) : Comet::Controller(params)
	  {}
	
	  void index();
	};
	
	// a router:
	#include <comet/router.hpp>
	void Comet::Router::initialize()
	{
	  match("/?", Controller, index);
	  match("/resource/:resource_id", ResourceController, show);
	}

# Getting started

* [Getting Started with Comet](/comet/getting-started)
* [Comet Guides](/comet/tutorials)
* The API Documentation
