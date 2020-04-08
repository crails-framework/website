---
title: Crails Framework
---

## What's Crails
Crails is a C++ web-application framework that includes everything needed to create database-backed web applications according to the [Model-View-Controller (MVC)](https://en.wikipedia.org/wiki/Model-view-controller) pattern.

Understanding the MVC pattern is key to understanding Crails. MVC divides your application into three layers: Model, View and Controller, each with a specific responsability.

### Model layer
The Model layer represents the domain model (such as Account, Product, Person, Post, etc.) and encapsulates the business logic specific to your application. In Crails, database-backed model classes are implemented using the [ODB orm](https://www.codesynthesis.com/products/odb/). ODB allows you to present the data from database rows as objects and embellish these data objects with business logic methods.

### Controller layer
The Controller layer is responsible for handling incoming HTTP requests and providing a suitable response. Crails controllers can generate JSON, HTML, XML, or any type of response. Controllers load and manipulate models, and render view templates in order to generate the appropriate HTTP response. In Crails, incoming requests are routed by `Crails::Router` to an appropriate controller, and controller classes are derived from `Crails::Controller`.

### View layer
The View layer is composed of "templates" that are responsible for providing appropriate representations of your application's resources. Templates can come in a variety of formats. Crails comes with modules for writing HTML or JSON templates with embedded C++ code. Views are typically rendered to generate a controller response or to generate the body of an email.

## Framework and modules
Crails comes with a small variety of modules providing features commonly needed in web-applications.

* **crails-sidekic** adds a service for simple _background task processing_
* **crails-cache** allows you to _cache_ your controller responses using memcached
* **crails-mail** includes a mail client to generate and send _raw or html emails_
* **crails-image** brings features to handles _image storage and thumbnail generation_
* **crails-sentry** handles server _errors monitoring_ through [Sentry](http://sentry.io/)

### Code generation
Crails provides several code-generating tools, most notably with **MetaRecord** which provides a simple DSL for describing models:

	add_include "app/models/degree.hpp"
	
	Model.add "StudentGroup", header: "app/models/student_group.hpp" do
	  resource_name "student_group"
	  property "std::string",    "code"
	  property "std::string",    "name",        validate: { required: true }, db: { type: "TEXT", column: "alt_name" }
	  property "unsigned short", "course",      validate: { required: true }
	  property "bool",           "is_category", db: { default: true }
	
	  has_one "::StudentGroup", "parent", dependent: :destroy, validate: { self_reference: true }
	  has_one "::Degree",       "degree", joined: false, read_only: true
	end

### Frontend C++ development
Crails integrates **Comet.cpp**, which uses [Cheerp](https://www.leaningtech.com/pages/cheerp.html) to provide a frontend C++ MVC-based development framework. While Cheerp compiles your C++ code into JavaScript, Comet.cpp provides C++ utilities for view templating, interacting with the DOM, making HTTP queries, and so on...

	#include <comet/element.hpp>
	#include <comet/globals.hpp>
	
	void webMain()
	{
	  Comet::Element header_element("h1");

	  Comet::body > header_element.text("Hello world!");
	}

## Getting started

**1**. Install Crails using one of the following guides:

* [Ubuntu](/getting-started/ubuntu.html)
* [ArchLinux](/getting-started/archlinux.html)

**2**. At the command prompt, create a new Crails application:

	crails new my_application

Where "my_application" is your application's name.

**3**. Change directory to `my_application` and compile the application:

	cd my_application
	crails compile

**4**. Run the server

	build/server

**5**. Go to `http://localhost:3000` and you'll see: "Welcome to your new Crails Application".

### What next ?

Follow our guides to start developing your application:

* [Getting Started with Crails](/getting-started)
* [Crails Guides](/tutorials)
* The API Documentation
