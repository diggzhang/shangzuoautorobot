YEAR=(`date -d -0day '+%Y'`)
MONTH=(`date -d -0day '+%m'`)
DAY=(`date -d -0day '+%d'`)


echo "++++++++++++++++++++++++++"
date


echo "running daily_update_payment_success.py"
`which python` ./daily_update_payment_success.py > data_daily_update_payment_success_$YEAR$MONTH$DAY.csv

echo "running daily_user.py"
`which python` ./daily_user.py > data_daily_user_$YEAR$MONTH$DAY.csv

echo "running daily_user_activatedate.py"
`which python` ./daily_user_activatedate.py > data_daily_user_activatedate_$YEAR$MONTH$DAY.csv

echo "compress all csv"
mv *.csv ./data
7za a daily_append_csv_$YEAR$MONTH$DAY.7z ./data/*
rm ./data/*.csv

date
echo "--------------------------"
