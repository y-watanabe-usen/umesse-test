#!/bin/bash

set -x
awslocal s3 mb s3://mybucket
set +x

awslocal s3 cp broadcasting-end1.mp3 s3://mybucket
awslocal s3 cp broadcasting-start1.mp3 s3://mybucket
