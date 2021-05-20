cd ../bookingF
git pull origin
npm run build
mv dist ../booking
cd ../booking
git add .
git commit -m 'added new build from script'
git push production node

