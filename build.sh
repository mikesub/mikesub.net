#! /usr/bin/env bash

python3 -m mikesubnet

if [ "$#" -ne "1" ]; then
  exit 0
fi

python -m SimpleHTTPServer

