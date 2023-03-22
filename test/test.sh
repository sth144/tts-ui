#!/bin/bash

HAVE_FAILURE=false
CLIENT_BASE_DIR=./client
SERVER_BASE_DIR=./server

while getopts "c:s:" arg; do
  case $arg in
    c)
      CLIENT_BASE_DIR=${OPTARG} 
      ;;
    s)
      SERVER_BASE_DIR=${OPTARG}
      ;;
  esac
done

shift $(($OPTIND - 1))
REMAINING_ARGS_AFTER_OPTS="$@"

test() {
	test_server
	test_client
}

#========== Server ==========#

test_server() {
	echo "Running Server Tests"
	test_server_unit
	test_server_integration
	test_server_e2e
}

test_server_unit() {
	echo "Running Server Unit Tests"
	cd $SERVER_BASE_DIR
	npm run test:unit
    if [ $? != 0 ];
    then 
        HAVE_FAILURE=true;
    fi
	cd ../
}

test_server_integration() {
	echo "Running Server Integration Tests"
	# TODO: write server integration tests
}

test_server_e2e() {
	echo "Running Server e2e Tests"
	cd $SERVER_BASE_DIR 
	npm run test:e2e
    if [ $? != 0 ];
    then 
        HAVE_FAILURE=true;
    fi
	cd ../
}

#========== client ==========#

test_client() {
	echo "Running Client Tests"
	test_client_unit
	test_client_integration
	test_client_e2e
}

test_client_unit() {
	echo "Running Client Unit Tests"
	cd $CLIENT_BASE_DIR
	react-scripts test --watchAll=false
    if [ $? != 0 ];
    then 
        HAVE_FAILURE=true;
    fi
	cd ../
}

test_client_integration() {
	echo "Running Client Integration Tests"
	# TODO: write client integration tests
}

test_client_e2e() {
	echo "Running Client e2e Tests"
	# TODO: write client e2e tests
}

if (( "$#" == 0 ));
then
	test
else
  $REMAINING_ARGS_AFTER_OPTS
fi

if [ $HAVE_FAILURE = true ];
then
    echo -e "$(tput setaf 1)"
    echo "======================================================================================================="    
	  echo "====================================== 1 OR MORE TESTS FAILED ========================================="
    echo "======================================================================================================="
    echo -e "$(tput sgr0)"

    echo "EXITING WITH CODE 1"
    exit 1
fi