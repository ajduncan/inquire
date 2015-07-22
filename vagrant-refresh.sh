#!/bin/sh

vagrant halt
vagrant destroy -f
rm -f logs/*
vagrant up
