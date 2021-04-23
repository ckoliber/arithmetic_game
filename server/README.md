# Arithmetic web game exercise starter code

A simple web-based game that asks the user to try and correctly answer arithmetic questions as fast as possible.

## Background
This project was built for Python 2 in August 2015, and then was ported to Python 3 in March 2021.

It is not intended to set a standard for Python programming, since the code still reflects Python 2 practices, and since most of the project's dependencies are older libraries.

## Setup

### Install Poetry
1. For a local installation of Poetry run the following BASH shell command:
  ```
  curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python -
  ```
  (For other installation methods, see https://python-poetry.org/docs/)
2. Poetry can be uninstalled after you are finished with this repository as follows:
  1. Run `wget https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py` to save the installer script to a file, `get-poetry.py`.
  2. Run `python get-poetry.py --uninstall`

### Install dependencies
1. Run `poetry install` to install dependencies.

   If the command fails, a possible workaround is to create and activate a new Python virtual environment, and then re-run the command. Run all future Poetry commands from inside the virtual environment.

## Operating instructions
1. Launch the program from this directory with `poetry run main`.
2. Navigate to the URL that gets output in the console, and follow the instructions shown on the webpage that appears.

## Tests
1. To run tests, run `poetry run nosetests` from this directory.

## Licenses

This program makes use of [jQuery](./static/jquery-2.1.4.min.js), a third-party library for which the copyright and license can be found [here](https://jquery.org/license/).