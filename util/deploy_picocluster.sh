#!/bin/bash

scp k8s-deploy.yml picocluster@pc0:/home/picocluster/Projects/tts-ui/

ssh -t picocluster@pc0 "cd Projects/tts-ui && kubectl apply -f k8s-deploy.yml"