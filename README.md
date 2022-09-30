# really-bad-command-framework
![npm](https://img.shields.io/npm/v/really-bad-command-framework)

A capable, type-safe, BSD-2 licensed text-based command library. It's modeled around Minecraft's command system.

## Usage

This library is quite strongly opinionated, and some of the  concepts can be a little difficult to understand at first.

#### Nodes

A command is made up of a chain of command **nodes**. These nodes:
- have a name and description
- have an immutable array of **arguments** (see below)
- have a **condition** that determines whether
- have an `execute` method that accepts values for the defined arguments
- have a `next` method that, given argument values, provides the next node in the chain


#### Arguments

Arguments are very important - they're responsible for parsing the input string and turning the values into something
more useful.
