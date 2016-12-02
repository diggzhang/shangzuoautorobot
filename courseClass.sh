YEAR=(`date -d -0day '+%Y'`)
MONTH=(`date -d -0day '+%m'`)
DAY=(`date -d -0day '+%d'`)

MONGOINSTANCE="time mongo --quiet --host 10.8.8.111 onions"

echo "++++++++++++++++++++++++++"
date
echo "daily update courses class"

echo "running dim_chapters"
$MONGOINSTANCE ./dim_chapter.js > data_dim_chapter_$YEAR$MONTH$DAY.csv

echo "running dim_themes"
$MONGOINSTANCE ./dim_themes.js > data_dim_themes_$YEAR$MONTH$DAY.csv

echo "running dim_topcis"
$MONGOINSTANCE ./dim_topics.js > data_dim_topics_$YEAR$MONTH$DAY.csv

echo "running dim_hypervideos"
$MONGOINSTANCE ./dim_hypervideos.js > data_dim_hypervideos_$YEAR$MONTH$DAY.csv

echo "running dim_practices"
$MONGOINSTANCE ./dim_practices.js > data_dim_practices_$YEAR$MONTH$DAY.csv

echo "compress all csv"
mv *.csv ./data
7za a daily_course_csv_$YEAR$MONTH$DAY.7z ./data/*
rm ./data/*.csv

date
echo "--------------------------"
