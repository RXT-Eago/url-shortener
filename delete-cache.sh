#!/bin/bash

find . -type d \( -name node_modules -o -name dist -o -name .next \) -prune -exec rm -rf '{}' +