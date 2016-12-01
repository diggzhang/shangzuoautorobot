YEAR=(`date -d -0day '+%Y'`)
MONTH=(`date -d -0day '+%m'`)
DAY=(`date -d -0day '+%d'`)

MONGOINSTANCE="time mongo --quiet --host 10.8.8.111 onions"

echo "++++++++++++++++++++++++++"
date
echo "daily update user atrribute"

echo "running dim_user"
$MONGOINSTANCE ./dim_user.js > data_dim_user_$YEAR$MONTH$DAY.csv

echo "running user_school"
$MONGOINSTANCE ./user_school.js > data_user_school.csv

echo "running dim_rooms"
$MONGOINSTANCE ./dim_rooms.js > data_dim_rooms.csv

echo "running dim_circles"
$MONGOINSTANCE ./dim_circles.js > data_dim_circles_$YEAR$MONTH$DAY.csv

echo "compress all csv"
mv *.csv ./data
7za a daily_user_attr_csv_$YEAR$MONTH$DAY.7z ./data/*
rm ./data/*.csv

date
echo "--------------------------"
