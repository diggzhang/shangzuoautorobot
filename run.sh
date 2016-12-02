cd `pwd`
time sh ./courseClass.sh > csv_generator.log
time sh ./userAttrClass.sh >> csv_generator.log
time sh ./daily_append.sh >> csv_generator.log
